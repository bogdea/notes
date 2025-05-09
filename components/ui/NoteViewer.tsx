"use client";

import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useEffect, useState, useCallback, useRef } from "react";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";

type NoteViewerProps = {
  initialTitle?: string;
  initialContent?: string;
  existingNoteId?: string;
};

const NoteViewer = ({
  initialTitle = "",
  initialContent = "",
  existingNoteId,
}: NoteViewerProps) => {
  const [title, setTitle] = useState<string>(initialTitle);
  const [content, setContent] = useState<string>(initialContent);
  const [noteId, setNoteId] = useState<string | null>(existingNoteId || null);
  const router = useRouter();

  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const pathname = usePathname();
  const isNoteOpen = pathname.startsWith("/notes/") && pathname !== "/notes";

  const handleGoBack = () => {
    router.push("/notes");
  };

  useEffect(() => {
    const resize = (el: HTMLTextAreaElement | null) => {
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    };

    resize(titleRef.current);
    resize(bodyRef.current);
  }, [title, content]);

  useEffect(() => {
    if (existingNoteId) {
      setNoteId(existingNoteId);
    }
  }, [existingNoteId]);

  const saveNote = async (title: string, content: string) => {
    if (!(title.trim() || content.trim())) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (noteId) {
      const { error } = await supabase
        .from("notes")
        .update({ title, content })
        .eq("id", noteId)
        .eq("user_id", user.id);

      if (error) {
        console.error("failed to update note", error);
      }
    } else {
      const { data, error } = await supabase
        .from("notes")
        .insert({
          user_id: user.id,
          title,
          content,
        })
        .select()
        .single();

      if (error) {
        console.error("failed to insert note", error);
      } else {
        setNoteId(data.id);
      }
    }
  };

  const debouncedSave = useCallback(debounce(saveNote, 1000), [noteId]);

  useEffect(() => {
    debouncedSave(title, content);
  }, [title, content]);

  const handleCreateNewNote = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if ((title.trim() || content.trim()) && noteId) {
      const { error } = await supabase
        .from("notes")
        .update({ title, content })
        .eq("id", noteId)
        .eq("user_id", user.id);

      if (error) {
        router.push("/notes");
      }
    }

    const { data, error } = await supabase
      .from("notes")
      .insert({ user_id: user.id, title: "", content: "" })
      .select()
      .single();

    if (error) {
      router.push("/");
    }

    router.push(`/notes/${data.id}`);
  };

  // delete note
  const handleDelete = async () => {
    if (!noteId) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", noteId)
      .eq("user_id", user.id);

    if (error) {
      router.push("/notes");
    }

    router.push("/notes");
  };

  return (
    <div className={`${isNoteOpen ? "block p-5" : "hidden md:block"}`}>
      <div className="mb-8 flex items-center justify-between md:hidden">
        <div>
          <button
            className="flex cursor-pointer space-x-1 text-[14px]"
            onClick={handleGoBack}
          >
            <Image
              src={"/icons/back.svg"}
              height={16}
              width={16}
              alt={"add"}
              className="mt-0.5 cursor-pointer"
            />
            go back
          </button>
        </div>

        <div className="flex gap-2">
          <Image
            src={"/icons/add.svg"}
            height={20}
            width={20}
            alt={"add"}
            className="mt-0.5 cursor-pointer"
            onClick={handleCreateNewNote}
          />
          <Image
            src={"/icons/delete.svg"}
            height={20}
            width={20}
            alt={"delete"}
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-start justify-between">
          <textarea
            ref={titleRef}
            value={title}
            onInput={(e) => {
              const input = e.currentTarget.value.replace(/\n/g, "");
              setTitle(input);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                bodyRef.current?.focus();
              }
            }}
            className="w-full resize-none overflow-hidden bg-transparent text-2xl leading-5 font-semibold outline-none"
          />

          <div className="hidden gap-2 md:flex">
            <Image
              src={"/icons/add.svg"}
              height={20}
              width={20}
              alt={"add"}
              className="mt-0.5 cursor-pointer"
              onClick={handleCreateNewNote}
            />
            <Image
              src={"/icons/delete.svg"}
              height={20}
              width={20}
              alt={"delete"}
              className="cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
        <textarea
          ref={bodyRef}
          value={content}
          onInput={(e) => {
            setContent(e.currentTarget.value);
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
          }}
          className="w-full resize-none overflow-hidden bg-transparent text-[16px] leading-relaxed font-normal text-[var(--gray)] outline-none"
        />
      </div>
    </div>
  );
};

export default NoteViewer;
