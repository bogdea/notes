"use client";

import NoteViewer from "@/components/ui/NoteViewer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

const Notes = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
      }
    };

    checkUser();
  }, [router]);

  return <NoteViewer />;
};

export default Notes;
