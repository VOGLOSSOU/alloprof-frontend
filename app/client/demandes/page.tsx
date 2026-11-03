import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Mes demandes" };

export default function Page() {
  return <ComingSoon title="Mes demandes" etape={2} />;
}
