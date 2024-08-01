import { auth, signOut } from "@/auth";

export default async () => {
  const session = await auth();
  return (
    <>
      <div>Index Page</div>
      <div>Access Token: {session?.user?.email || "no session user"}</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};
