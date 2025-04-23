"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const Auth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/notes");
      }
    };
    checkUser();
  }, []);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-semibold">notes</h1>
        <p className="text-lg text-[var(--medium-gray)]">
          a place for your ideas.
        </p>
      </div>

      <AuthForm />
    </div>
  );
};

export default Auth;
