"use client";

import { Button } from "@/components/ui/button";
import LinkButton from "@/components/ui/LinkButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/update-password`,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    setEmail("");
    toast.success("reset link sent - check your email");
  };

  return (
    <div className="m-auto w-64">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-semibold">notes</h1>
        <p className="text-lg text-[var(--medium-gray)]">
          get a reset link by email
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-[var(--light-gray)] px-3 py-1 placeholder-[var(--soft-gray)] outline-0 transition focus:border-black"
        />

        <Button className="mt-4 mb-3 w-full">send reset link</Button>
      </form>

      <div className="text-center">
        <LinkButton onClick={() => router.push("/auth")}>
          back to login
        </LinkButton>
      </div>
    </div>
  );
};

export default ResetPassword;
