"use client";

import { useUser } from "@/lib/auth";
import { PageHeader } from "@/components/page-header";

/** Accueil provisoire d'un espace, en attendant ses vrais écrans. */
export function Welcome({ etape, description }: { etape: number; description: string }) {
  const user = useUser();
  return (
    <>
      <PageHeader title={`Bonjour ${user.prenom}`} description={description} />
      <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
        Le contenu de cet écran arrive à l&apos;étape {etape}.
      </div>
    </>
  );
}
