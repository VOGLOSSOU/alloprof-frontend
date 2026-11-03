import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Nouvelle demande" };

export default function Page() {
  return <ComingSoon title="Nouvelle demande" etape={2} />;
}
