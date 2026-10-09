import { redirect } from "next/navigation";

// The landing page is now the home page (app/page.tsx)
export default function Landing() {
  redirect("/");
}
