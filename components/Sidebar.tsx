"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import NoteCard from "./ui/NoteCard";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";

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
  const isNoteOpen = pathname.startsWith("/notes/") && pathname !== "/notes";
  const router = useRouter();

  const handleNewNote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: user.id, title: "", content: "" })
      .select()
      .single();

    if (error || !data) {
      router.push("/notes");
      return;
    }

    router.push(`/notes/${data.id}`);
  };

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
    <div
      className={`${isNoteOpen ? "hidden h-full overflow-auto border-r border-[var(--light-gray)] px-3 pt-2 md:block md:min-w-[300px] lg:min-w-[400px]" : "h-full w-full overflow-auto border-r border-[var(--light-gray)] px-3 pt-2 md:block md:w-auto md:min-w-[300px] lg:min-w-[400px]"}`}
    >
      <Button className="mt-2 w-full md:hidden" onClick={handleNewNote}>
        new note
      </Button>

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
