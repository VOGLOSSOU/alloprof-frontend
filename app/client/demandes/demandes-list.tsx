"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardListIcon, PlusIcon } from "lucide-react";
import { STATUT_DEMANDE } from "@/lib/labels";
import type { StatutDemande } from "@/lib/types";
import { useClientDemandes } from "@/hooks/use-client-demandes";
import { DemandeCard } from "@/components/demande-card";
import { Pager } from "@/components/pager";
import { EmptyState, ErrorState, ListSkeleton } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LIMIT = 10;
const ONGLETS: { value: "TOUTES" | StatutDemande; label: string }[] = [
  { value: "TOUTES", label: "Toutes" },
  ...(Object.keys(STATUT_DEMANDE) as StatutDemande[]).map((statut) => ({
    value: statut,
    label: STATUT_DEMANDE[statut].label,
  })),
];

function parseStatut(value: string | null): StatutDemande | undefined {
  return value && value in STATUT_DEMANDE ? (value as StatutDemande) : undefined;
}

export function DemandesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statut = parseStatut(searchParams.get("statut"));
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const query = useClientDemandes({ statut, page, limit: LIMIT });

  const hrefFor = (params: { statut?: StatutDemande; page?: number }) => {
    const search = new URLSearchParams();
    if (params.statut) search.set("statut", params.statut);
    if (params.page && params.page > 1) search.set("page", String(params.page));
    const qs = search.toString();
    return `/client/demandes${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="grid gap-4">
      <Tabs
        value={statut ?? "TOUTES"}
        onValueChange={(value) => router.replace(hrefFor({ statut: parseStatut(value) }), { scroll: false })}
      >
        {/* Défilement horizontal sur mobile : 6 onglets */}
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none]">
          <TabsList>
            {ONGLETS.map((onglet) => (
              <TabsTrigger key={onglet.value} value={onglet.value} className="px-3">
                {onglet.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </Tabs>

      {query.isPending ? (
        <ListSkeleton />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : query.data.data.length === 0 ? (
        <EmptyState
          icon={ClipboardListIcon}
          title={statut ? `Aucune demande « ${STATUT_DEMANDE[statut].label} »` : "Aucune demande pour l'instant"}
          description={
            statut
              ? "Essayez un autre onglet."
              : "Décrivez votre besoin et nous vous trouvons un professeur de maison."
          }
          action={
            !statut && (
              <Button asChild>
                <Link href="/client/demandes/nouvelle">
                  <PlusIcon />
                  Nouvelle demande
                </Link>
              </Button>
            )
          }
        />
      ) : (
        <>
          <ul className="grid gap-3">
            {query.data.data.map((demande) => (
              <li key={demande.id}>
                <DemandeCard demande={demande} href={`/client/demandes/${demande.id}`} />
              </li>
            ))}
          </ul>
          <Pager
            page={query.data.page}
            total={query.data.total}
            limit={query.data.limit}
            hrefFor={(p) => hrefFor({ statut, page: p })}
          />
        </>
      )}
    </div>
  );
}
