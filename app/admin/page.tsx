import type { Metadata } from "next";
import { Welcome } from "@/components/welcome";

export const metadata: Metadata = { title: "Tableau de bord" };

export default function Page() {
  return <Welcome etape={5} description="Vue d'ensemble de l'activité AlloProf." />;
}
