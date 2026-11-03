import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Référentiels" };

export default function Page() {
  return <ComingSoon title="Référentiels" etape={5} />;
}
