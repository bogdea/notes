"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LinkButton from "./ui/LinkButton";

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      router.push("/notes");
    }

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: notes } = await supabase
          .from("notes")
          .select("id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (notes && notes.length > 0) {
          router.push(`/notes/${notes[0].id}`);
        } else {
          router.push("/notes");
        }
      } else {
        router.push("/auth");
      }
    }
  };

  return (
    <form className="m-auto w-64" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col">
        <label className="mb-[5px] ml-1 text-sm font-medium text-[var(--medium-gray)]">
          email
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border border-[var(--light-gray)] px-3 py-1 placeholder-[var(--soft-gray)] outline-0 transition focus:border-black"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-[5px] ml-1 text-sm font-medium text-[var(--medium-gray)]">
          password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-lg border border-[var(--light-gray)] px-3 py-1 placeholder-[var(--soft-gray)] outline-0 transition focus:border-black"
        />
        <Link
          href={"/auth/reset-password"}
          className="mt-2 text-right text-[12px] text-[var(--medium-gray)] transition hover:text-[var(--dark-gray)]"
        >
          {mode === "login" ? "forgot password?" : ""}
        </Link>
      </div>
      <Button className="mt-4 mb-3 w-full">
        {mode === "login" ? "log in" : "sign up"}
      </Button>
      <div className="text-center">
        <LinkButton
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "don't have an account?"
            : "already have an account?"}
        </LinkButton>
      </div>
    </form>
  );
};

export default AuthForm;
