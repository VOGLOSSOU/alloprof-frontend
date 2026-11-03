import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Paiements" };

export default function Page() {
  return <ComingSoon title="Paiements" etape={5} />;
}
