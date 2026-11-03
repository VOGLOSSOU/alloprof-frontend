import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { NouvelleDemandeForm } from "./nouvelle-demande-form";

export const metadata: Metadata = { title: "Nouvelle demande" };

export default function NouvelleDemandePage() {
  return (
    <>
      <PageHeader
        title="Nouvelle demande"
        description="Décrivez votre besoin : nous cherchons le professeur pour vous."
      />
      <NouvelleDemandeForm />
    </>
  );
}
