"use client";

import { signOut } from "@/auth";
import { Button, Divider } from "@mantine/core";

export default () => {
  return (
    <>
      <Divider />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </>
  );
};
