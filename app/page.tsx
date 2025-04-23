import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

const Home = async () => {
  const user = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  } else {
    redirect("/notes");
  }
};

export default Home;
