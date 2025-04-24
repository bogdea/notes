import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "auth",
  description: "log in or sign up to start writing notes",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
