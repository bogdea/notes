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

      if (user) {
        const { data: notes } = await supabase
          .from("notes")
          .select("id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        // if (notes && notes.length > 0) {
        //   router.push(`/notes/${notes[0].id}`);
        // } else {
        //   router.push("/notes");
        // }
      } else {
        router.push("/auth");
      }
    };

    checkUser();
  }, []);

  return <NoteViewer />;
};

export default Notes;
