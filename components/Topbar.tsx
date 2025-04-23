"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";

const Topbar = () => {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setEmail(user?.email || "no user");
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();

    window.location.href = "/auth";
  };

  return (
    <div className="border-b border-[var(--light-gray)]">
      <div className="flex items-center justify-between px-5 py-2">
        <h1 className="text-5xl font-semibold">notes</h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={"/icons/user.svg"}
              alt="user"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="mx-1 font-normal text-[var(--medium-gray)]">
              {email}
            </DropdownMenuLabel>

            <DropdownMenuItem>
              <Button className="w-full" onClick={handleLogout}>
                log out
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Topbar;
