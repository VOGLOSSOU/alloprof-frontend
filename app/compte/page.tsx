import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CompteInfos, ChangerMotDePasse } from "./compte-sections";

export const metadata: Metadata = { title: "Mon compte" };

export default function ComptePage() {
  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <PageHeader title="Mon compte" />
      <CompteInfos />
      <ChangerMotDePasse />
    </div>
  );
}
