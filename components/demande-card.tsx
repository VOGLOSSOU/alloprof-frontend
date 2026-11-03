import Link from "next/link";
import { ChevronRightIcon, MapPinIcon } from "lucide-react";
import { STATUT_DEMANDE } from "@/lib/labels";
import { formatDate } from "@/lib/format";
import type { Demande } from "@/lib/types";
import { StatutBadge } from "@/components/statut-badge";

/** Titre lisible d'une demande : ses matières. */
export function titreDemande(demande: Pick<Demande, "specialites">) {
  return demande.specialites.map((s) => s.libelle).join(", ") || "Demande";
}

/** Carte cliquable d'une demande (liste client, accueil client). */
export function DemandeCard({ demande, href }: { demande: Demande; href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50"
    >
      <div className="grid min-w-0 flex-1 gap-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{titreDemande(demande)}</span>
          <StatutBadge value={STATUT_DEMANDE[demande.statut]} />
        </div>
        <p className="text-sm text-muted-foreground">
          {demande.niveau.libelle} · <MapPinIcon className="inline size-3.5 align-[-2px]" aria-hidden="true" />{" "}
          {demande.ville.nom}
          {demande.quartier ? `, ${demande.quartier}` : ""}
        </p>
        <p className="text-xs text-muted-foreground">Envoyée le {formatDate(demande.createdAt)}</p>
      </div>
      <ChevronRightIcon className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
    </Link>
  );
}
