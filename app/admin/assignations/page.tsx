import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Assignations" };

export default function Page() {
  return <ComingSoon title="Assignations" etape={5} />;
}
