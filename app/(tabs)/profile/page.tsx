import db from "@/lib/db";
import getSession from "@/lib/session";
import {notFound, redirect} from "next/navigation";
import {Suspense} from "react";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

async function Username() {
  const user = await getUser();
  return <h1>Welcom!e {user?.username}</h1>;
}

export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <Suspense fallback={"Hello!"}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
