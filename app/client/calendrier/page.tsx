import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Calendrier" };

export default function Page() {
  return <ComingSoon title="Calendrier" etape={4} />;
}
