import type { Metadata } from "next";
import { DemandeDetail } from "./demande-detail";

export const metadata: Metadata = { title: "Ma demande" };

export default function DemandePage() {
  return <DemandeDetail />;
}
