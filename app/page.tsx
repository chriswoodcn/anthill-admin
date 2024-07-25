import Link from "next/link";

const main = () => {
  return (
    <>
      <h1>Main Page</h1>
      <Link className="p-10" href={"/home"}>
        Goto Home
      </Link>
    </>
  );
};

export default main;
