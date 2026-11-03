import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Mes missions" };

export default function Page() {
  return <ComingSoon title="Mes missions" etape={5} />;
}
