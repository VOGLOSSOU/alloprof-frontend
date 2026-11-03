import type { Metadata } from "next";
import { ClientAccueil } from "./client-accueil";

export const metadata: Metadata = { title: "Accueil" };

export default function ClientPage() {
  return <ClientAccueil />;
}
