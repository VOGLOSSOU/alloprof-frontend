"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeftIcon,
  BanIcon,
  CheckIcon,
  Loader2Icon,
  MessageCircleIcon,
  PhoneIcon,
  XCircleIcon,
} from "lucide-react";
import { ApiError } from "@/lib/api";
import { labelJourSouhaite, STATUT_DEMANDE, TYPE_BENEFICIAIRE, UNITE_TARIF } from "@/lib/labels";
import {
  formatCreneau,
  formatDate,
  formatMontant,
  nomComplet,
  trierCreneaux,
  waLink,
} from "@/lib/format";
import type { StatutDemande } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAnnulerDemande, useClientDemande, type AssignationClient } from "@/hooks/use-client-demandes";
import { titreDemande } from "@/components/demande-card";
import { StatutBadge } from "@/components/statut-badge";
import { EmptyState, ErrorState, ListSkeleton } from "@/components/states";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ETAPES_FRISE: { statut: StatutDemande; label: string }[] = [
  { statut: "EN_ATTENTE", label: "Envoyée" },
  { statut: "EN_RECHERCHE", label: "Recherche en cours" },
  { statut: "ASSIGNEE", label: "Professeur trouvé" },
];

const ANNULABLE: StatutDemande[] = ["EN_ATTENTE", "EN_RECHERCHE"];

function Frise({ statut }: { statut: StatutDemande }) {
  if (statut === "ANNULEE" || statut === "REJETEE") {
    return (
      <Alert variant={statut === "REJETEE" ? "destructive" : "default"}>
        {statut === "REJETEE" ? <XCircleIcon /> : <BanIcon />}
        <AlertTitle>{statut === "REJETEE" ? "Demande refusée" : "Demande annulée"}</AlertTitle>
        <AlertDescription>
          {statut === "REJETEE"
            ? "Nous n'avons pas pu donner suite à cette demande. Vous pouvez en faire une nouvelle."
            : "Cette demande a été annulée."}
        </AlertDescription>
      </Alert>
    );
  }

  const courante = ETAPES_FRISE.findIndex((etape) => etape.statut === statut);
  return (
    <ol className="grid grid-cols-3 gap-2" aria-label="Avancement de la demande">
      {ETAPES_FRISE.map((etape, index) => {
        const faite = index <= courante;
        return (
          <li
            key={etape.statut}
            aria-current={index === courante ? "step" : undefined}
            className="flex flex-col items-center gap-2 text-center"
          >
            <div className="flex w-full items-center">
              <span className={cn("h-0.5 flex-1", index === 0 ? "invisible" : faite ? "bg-primary" : "bg-border")} />
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold",
                  faite ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground",
                )}
              >
                {faite ? <CheckIcon className="size-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "h-0.5 flex-1",
                  index === ETAPES_FRISE.length - 1 ? "invisible" : index < courante ? "bg-primary" : "bg-border",
                )}
              />
            </div>
            <span className={cn("text-xs font-medium", faite ? "text-foreground" : "text-muted-foreground")}>
              {etape.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function VotreProfesseur({ assignation }: { assignation: AssignationClient }) {
  const prof = assignation.professeur.user;
  return (
    <Card className="border-green-200 bg-green-50/40">
      <CardHeader>
        <CardTitle>Votre professeur</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1">
          <p className="text-lg font-semibold">{nomComplet(prof)}</p>
          <p className="text-sm text-muted-foreground">{prof.telephone}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" size="lg" className="h-11">
            <a href={`tel:${prof.telephone}`}>
              <PhoneIcon />
              Appeler
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-11">
            <a href={waLink(prof.telephone, `Bonjour ${prof.prenom}, `)} target="_blank" rel="noopener noreferrer">
              <MessageCircleIcon />
              WhatsApp
            </a>
          </Button>
        </div>
        <dl className="grid gap-3 text-sm">
          <div className="grid gap-1">
            <dt className="text-muted-foreground">Planning de la semaine</dt>
            <dd>
              <ul className="grid gap-0.5 font-medium">
                {trierCreneaux(assignation.creneaux).map((creneau) => (
                  <li key={creneau.id}>{formatCreneau(creneau)}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="text-muted-foreground">Tarif</dt>
            <dd className="font-medium">
              {formatMontant(assignation.tarifClient)} {UNITE_TARIF[assignation.uniteTarif]}
            </dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="text-muted-foreground">Début des cours</dt>
            <dd className="font-medium">{formatDate(assignation.dateDebut, "EEEE d MMMM yyyy")}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}

function AnnulerDemande({ id }: { id: number }) {
  const annuler = useAnnulerDemande(id);
  const [open, setOpen] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={(value) => !annuler.isPending && setOpen(value)}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="lg" className="h-11 w-full sm:w-auto">
          Annuler la demande
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Annuler cette demande ?</AlertDialogTitle>
          <AlertDialogDescription>
            Nous arrêterons de chercher un professeur pour cette demande. Cette action est définitive.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Garder</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={annuler.isPending}
            onClick={(event) => {
              // Garde la boîte ouverte pendant l'appel, la ferme une fois l'annulation confirmée.
              event.preventDefault();
              annuler.mutate(undefined, { onSuccess: () => setOpen(false) });
            }}
          >
            {annuler.isPending && <Loader2Icon className="animate-spin" />}
            Oui, annuler
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DemandeDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const query = useClientDemande(id);

  const retour = (
    <Button asChild variant="ghost" className="-ml-2.5 mb-2 justify-self-start">
      <Link href="/client/demandes">
        <ArrowLeftIcon />
        Mes demandes
      </Link>
    </Button>
  );

  if (!Number.isInteger(id) || id <= 0 || (query.isError && query.error instanceof ApiError && query.error.status === 404)) {
    return (
      <div className="grid">
        {retour}
        <EmptyState title="Demande introuvable" description="Cette demande n'existe pas ou ne vous appartient pas." />
      </div>
    );
  }
  if (query.isPending)
    return (
      <div className="grid">
        {retour}
        <ListSkeleton count={3} className="h-32" />
      </div>
    );
  if (query.isError)
    return (
      <div className="grid">
        {retour}
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      </div>
    );

  const demande = query.data;
  const enCours = demande.assignations[0]?.statut === "ACTIVE" ? demande.assignations[0] : null;

  const details: { label: string; valeur: string }[] = [
    { label: "Pour qui", valeur: TYPE_BENEFICIAIRE[demande.typeBeneficiaire] },
    { label: "Lieu", valeur: [demande.ville.nom, demande.quartier].filter(Boolean).join(", ") },
    { label: "Niveau", valeur: demande.niveau.libelle },
    { label: "Matières", valeur: titreDemande(demande) },
    { label: "Votre besoin", valeur: demande.description },
    {
      label: "Jours souhaités",
      valeur: demande.joursSouhaites?.length
        ? demande.joursSouhaites.map(labelJourSouhaite).join(", ")
        : "Pas de préférence",
    },
    {
      label: "Budget mensuel",
      valeur: demande.budget != null ? formatMontant(demande.budget) : "Non précisé",
    },
    { label: "Attentes sur le professeur", valeur: demande.caracteristiquesProf || "Aucune" },
  ];

  return (
    <div className="grid gap-5">
      <div className="grid">
        {retour}
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">{titreDemande(demande)}</h1>
          <StatutBadge value={STATUT_DEMANDE[demande.statut]} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Envoyée le {formatDate(demande.createdAt, "d MMMM yyyy")}</p>
      </div>

      <Frise statut={demande.statut} />

      {enCours && <VotreProfesseur assignation={enCours} />}

      <Card>
        <CardHeader>
          <CardTitle>Votre demande</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-4 text-sm">
            {details.map(({ label, valeur }) => (
              <div key={label} className="grid gap-0.5">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium break-words whitespace-pre-line">{valeur}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      {ANNULABLE.includes(demande.statut) && <AnnulerDemande id={demande.id} />}
    </div>
  );
}
