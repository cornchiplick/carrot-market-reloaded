## 9.4 Code Challenge

1. Login 이라는 function 만들기

- 같은 코드를 반복하지 않도록

```
  const session = await getSession();
  session.id = user.id;
  await session.save();
  return redirect("/profile");
```

<br/>

2. github username 과 고유의 username 이 겹치는 경우에 대한 해결책

- 이미 사용중인 username 인지 먼저 확인할 것

<br/>

3. github 에 id 뿐만 아니라 email 에 대한 읽기권한도 부여 받았으므로 동일한 access_token으로
   user프로필에 대한 정보와 email을 요청할 수 있다. 그 email을 가지고 와보기

<br/>

4. 많은 fetch 문이 있다. 이를 request 보내는 곳과 response를 JSON 으로 바꾸는 것을 따로 function으로
   만들기.

- typescript, type을 이용해서 각 function의 response 값이 무엇인지 알려줄 것

---

- **getAccessToken**
- parameter는 code만 받기

```
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
```

---

- **getGithubProfile**

```
  // github id를 이용해 user를 찾음
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });

  // user가 존재하면 session에 user id를 저장하고 profile 페이지로 redirect (이후 email/pwd 방식 로그인과 동일)
  const {id, avatar_url, login} = await userProfileResponse.json();
```

---

- **getGithubEmail**

---

---

## 9.8 Code Challenge

1. token 인증을 할 때 어떤 phone 번호로 토큰을 발급받았는지도 유효성 검사를 하라는 뜻(인것 같은데 잘
   모르겠다.)

## 11.1 Code Challenge

1. 유저가 이미지를 업로드했는지 확인할 것.
2. 이미지 사이즈가 4MB 이하인지 확인할 것.
