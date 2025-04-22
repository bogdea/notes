"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NoteCard from "./ui/NoteCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";

type Note = {
  id: string;
  title: string;
  content: string;
};

const Sidebar = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const pathname = usePathname();
  const params = useParams();
  const activeNoteId = params?.noteId as string;

  useEffect(() => {
    const fetchUserNotes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("notes")
        .select("id, title, content")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("failed to fetch notes", error);
      } else {
        setNotes(data);
      }
    };

    fetchUserNotes();
  }, [pathname]);

  return (
    <div className="h-full min-w-[400px] overflow-auto border-r border-[var(--light-gray)] px-3 pt-2">
      {notes.map((note) => (
        <Link key={note.id} href={`/notes/${note.id}`}>
          <NoteCard
            title={note.title}
            preview={note.content}
            isActive={note.id === activeNoteId}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
