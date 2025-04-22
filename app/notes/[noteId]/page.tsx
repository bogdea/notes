"use client";

import { useEffect, useState } from "react";
import { redirect, useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import NoteViewer from "@/components/ui/NoteViewer";

const NotePage = () => {
  const { noteId } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<{
    title: string;
    content: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("notes")
        .select("id, title, content")
        .eq("id", noteId)
        .eq("user_id", user.id)
        .single();

      if (error) {
        redirect("/notes");
      }

      setNote(data);
    };

    fetchNote();
  }, [noteId, router]);

  if (!note) return <div></div>;

  return (
    <NoteViewer
      initialTitle={note.title}
      initialContent={note.content}
      existingNoteId={note.id}
    />
  );
};

export default NotePage;
