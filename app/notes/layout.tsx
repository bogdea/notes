import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </div>
  );
}
