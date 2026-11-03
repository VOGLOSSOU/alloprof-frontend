import type { Metadata } from "next";
import { Welcome } from "@/components/welcome";

export const metadata: Metadata = { title: "Aujourd'hui" };

export default function Page() {
  return <Welcome etape={4} description="Vos cours du jour et la validation de présence." />;
}
