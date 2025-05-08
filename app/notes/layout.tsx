import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "notes",
  description: "your notes",
};

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Topbar />
      <div className="h-screen w-full overflow-hidden md:flex">
        <Sidebar />
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
