"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const UpdatePassword = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      toast.error(error.message);
      return;
    }

    setNewPassword("");
    toast.success("password updated");
    router.push("/notes");
  };

  return (
    <div className="m-auto w-64">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-semibold">notes</h1>
        <p className="text-lg text-[var(--medium-gray)]">
          enter your new password
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-1 placeholder-[var(--soft-gray)] outline-0 transition focus:border-black"
        />

        <Button className="mt-4 w-full">update password</Button>
      </form>
    </div>
  );
};

export default UpdatePassword;
