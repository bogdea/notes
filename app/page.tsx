"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/notes");
      } else {
        router.push("/auth");
      }
    };

    checkUser();
  }, []);

  return null;
};

export default Home;
