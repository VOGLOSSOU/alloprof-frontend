"use client";

import Link from "next/link";
import { ClipboardListIcon, KeyRoundIcon, PlusIcon } from "lucide-react";
import { useUser } from "@/lib/auth";
import { useClientDemandes } from "@/hooks/use-client-demandes";
import { DemandeCard } from "@/components/demande-card";
import { PageHeader } from "@/components/page-header";
import { EmptyState, ErrorState, ListSkeleton } from "@/components/states";
import { Button } from "@/components/ui/button";

function DemandesRecentes() {
  const query = useClientDemandes({ page: 1, limit: 3 });

  if (query.isPending) return <ListSkeleton />;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;
  if (query.data.data.length === 0)
    return (
      <EmptyState
        icon={ClipboardListIcon}
        title="Aucune demande pour l'instant"
        description="Décrivez votre besoin et nous vous trouvons un professeur de maison."
      />
    );

  return (
    <ul className="grid gap-3">
      {query.data.data.map((demande) => (
        <li key={demande.id}>
          <DemandeCard demande={demande} href={`/client/demandes/${demande.id}`} />
        </li>
      ))}
    </ul>
  );
}

export function ClientAccueil() {
  const user = useUser();

  return (
    <div className="grid gap-8">
      <section className="grid gap-3">
        <PageHeader title={`Bonjour ${user.prenom}`} />
        <h2 className="text-lg font-semibold">Mes cours aujourd&apos;hui</h2>
        {/* Code du jour : étape 4 du brief */}
        <EmptyState
          icon={KeyRoundIcon}
          title="Le code de présence du jour s'affichera ici"
          description="Disponible dès qu'un professeur vous est attribué."
        />
      </section>

      <section className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Mes demandes</h2>
          <Button asChild variant="link" className="px-0">
            <Link href="/client/demandes">Tout voir</Link>
          </Button>
        </div>
        <DemandesRecentes />
        <Button asChild size="lg" className="h-12 text-base">
          <Link href="/client/demandes/nouvelle">
            <PlusIcon />
            Nouvelle demande
          </Link>
        </Button>
      </section>
    </div>
  );
}
