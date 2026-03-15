"use client";

import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { signOut } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  return (
    <>
      <DropdownMenuItem
        className={"cursor-pointer hover:text-red-700  my-2"}
        onClick={async () => {
          const result = await signOut();
          if (result.data) {
            router.push("/sign-in");
          } else {
            alert("Failed to sign out...");
          }
        }}
      >
        Log out
      </DropdownMenuItem>
    </>
  );
};

export default SignOutButton;
