import {sessionLogin} from "@/app/login/actions";
import db from "@/lib/db";
import {NextRequest} from "next/server";

export async function GET(request: NextRequest) {
  // github로부터 redirect된 url에는 code라는 query parameter가 존재
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  // code를 이용해 access token을 받아옴
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;
  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });

  // access token을 이용해 user profile을 받아옴.
  // user profile에는 github id, avatar url, login 정보가 있음
  const {error, access_token} = await accessTokenResponse.json();
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  // email 가져와보기
  const userEmailResponse = await fetch("https://api.github.com/user/emails", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  const emails = await userEmailResponse.json();
  const userEmail = emails.find((email: {primary: boolean}) => email.primary)?.email;

  // github id를 이용해 user를 찾음
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  // user가 존재하면 session에 user id를 저장하고 profile 페이지로 redirect (이후 email/pwd 방식 로그인과 동일)
  const {id, avatar_url, login} = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await sessionLogin(user.id);
  }
  const newUser = await db.user.create({
    data: {
      // 주의! github 로그인을 통해 만들어지는 user의 username 과 email/pwd 방식으로 만들어지는 user의 username이 겹칠 수 있는 문제의 소지 있음
      username: login,

      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });
  await sessionLogin(newUser.id);
}
