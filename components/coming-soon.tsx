import { ConstructionIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";

/** Écran provisoire, remplacé au fil des étapes du brief. */
export function ComingSoon({ title, etape }: { title: string; etape: number }) {
  return (
    <>
      <PageHeader title={title} />
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        <ConstructionIcon className="size-6" />
        <p>Cet écran arrive à l&apos;étape {etape}.</p>
      </div>
    </>
  );
}
