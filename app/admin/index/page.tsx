import { auth } from "@/auth";

export default async () => {
  const session = await auth();
  return (
    <>
      <div>Index Page</div>
      <div>Access Token: {session?.user?.name || "no session user"}</div>
    </>
  );
};
