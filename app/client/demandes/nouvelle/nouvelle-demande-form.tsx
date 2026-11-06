"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BabyIcon,
  Loader2Icon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import { ApiError } from "@/lib/api";
import { JOURS_SOUHAITES, labelJourSouhaite, TYPE_BENEFICIAIRE } from "@/lib/labels";
import { formatMontant } from "@/lib/format";
import type { TypeBeneficiaire } from "@/lib/types";
import { useReferentiels } from "@/hooks/use-referentiels";
import { useCreerDemande } from "@/hooks/use-client-demandes";
import { ChipGroup } from "@/components/chip-group";
import { FormField } from "@/components/form-field";
import { ErrorState, ListSkeleton } from "@/components/states";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const schema = z.object({
  typeBeneficiaire: z.enum(["ENFANT", "SOI_MEME"], { error: "Choisissez pour qui sont les cours" }),
  villeId: z.string().min(1, "Choisissez une ville"),
  quartier: z.string().trim().max(120, "120 caractères maximum"),
  niveauId: z.string().min(1, "Choisissez un niveau"),
  specialiteIds: z.array(z.number()).min(1, "Choisissez au moins une matière"),
  description: z
    .string()
    .trim()
    .min(10, "Décrivez votre besoin (10 caractères minimum)")
    .max(5000, "5000 caractères maximum"),
  joursSouhaites: z.array(z.enum(JOURS_SOUHAITES)),
  budget: z
    .string()
    .trim()
    .refine((value) => value === "" || /^\d+$/.test(value.replace(/\s/g, "")), "Saisissez un montant en chiffres"),
  caracteristiquesProf: z.string().trim().max(2000, "2000 caractères maximum"),
});

type Values = z.infer<typeof schema>;

const ETAPES: { titre: string; champs: FieldPath<Values>[] }[] = [
  { titre: "Pour qui ?", champs: ["typeBeneficiaire"] },
  { titre: "Où ?", champs: ["villeId", "quartier"] },
  { titre: "Quoi ?", champs: ["niveauId", "specialiteIds"] },
  { titre: "Détails", champs: ["description", "joursSouhaites", "budget", "caracteristiquesProf"] },
  { titre: "Récapitulatif", champs: [] },
];

/** Étape où se trouve un champ renvoyé en erreur par l'API. */
function etapeDuChamp(champ: string) {
  const index = ETAPES.findIndex((etape) => etape.champs.some((c) => champ === c || champ.startsWith(`${c}.`)));
  return index === -1 ? null : index;
}

const BENEFICIAIRES: { value: TypeBeneficiaire; icon: typeof UserIcon; aide: string }[] = [
  { value: "ENFANT", icon: BabyIcon, aide: "Cours pour un enfant ou un élève de la famille" },
  { value: "SOI_MEME", icon: UserIcon, aide: "Cours pour vous, adulte ou étudiant" },
];

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {message}
    </p>
  );
}

export function NouvelleDemandeForm() {
  const router = useRouter();
  const referentiels = useReferentiels();
  const creer = useCreerDemande();
  const [etape, setEtape] = useState(0);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      villeId: "",
      quartier: "",
      niveauId: "",
      specialiteIds: [],
      description: "",
      joursSouhaites: [],
      budget: "",
      caracteristiquesProf: "",
    },
  });
  const { errors } = form.formState;

  // Le passage d'étape valide avec trigger() (pas de submit) : on revalide nous-mêmes
  // un champ déjà en erreur dès qu'il change, pour que le message disparaisse une fois corrigé.
  useEffect(
    () =>
      form.subscribe({
        formState: { values: true },
        callback: ({ name }) => {
          const champ = name?.split(".")[0] as FieldPath<Values> | undefined;
          if (champ && form.getFieldState(champ).error) form.trigger(champ);
        },
      }),
    [form],
  );
  const values = useWatch({ control: form.control });

  if (referentiels.isPending) return <ListSkeleton count={3} className="h-20" />;
  if (referentiels.isError)
    return <ErrorState error={referentiels.error} onRetry={() => referentiels.refetch()} />;

  const { villes, niveaux, specialites } = referentiels.data;
  const niveauxTries = [...niveaux].sort((a, b) => a.ordre - b.ordre);

  const allerA = (index: number) => {
    setEtape(index);
    window.scrollTo({ top: 0 });
  };

  const suivant = async () => {
    if (await form.trigger(ETAPES[etape].champs)) allerA(etape + 1);
  };

  const envoyer = form.handleSubmit((values) => {
    creer.mutate(
      {
        typeBeneficiaire: values.typeBeneficiaire,
        villeId: Number(values.villeId),
        niveauId: Number(values.niveauId),
        specialiteIds: values.specialiteIds,
        description: values.description,
        quartier: values.quartier || null,
        budget: values.budget ? Number(values.budget.replace(/\s/g, "")) : null,
        joursSouhaites: values.joursSouhaites.length ? values.joursSouhaites : null,
        caracteristiquesProf: values.caracteristiquesProf || null,
      },
      {
        onSuccess: (demande) => router.replace(`/client/demandes/${demande.id}`),
        onError: (error) => {
          // Ramène l'utilisateur à la première étape fautive (ex. une matière désactivée entre-temps).
          if (!(error instanceof ApiError)) return;
          let premiere: number | null = null;
          for (const { champ, message } of error.fieldErrors) {
            const index = etapeDuChamp(champ);
            if (index === null) continue;
            form.setError(champ.split(".")[0] as FieldPath<Values>, { type: "server", message });
            premiere = premiere === null ? index : Math.min(premiere, index);
          }
          if (premiere !== null) allerA(premiere);
        },
      },
    );
  });

  const specialiteIds = values.specialiteIds ?? [];
  const joursSouhaites = values.joursSouhaites ?? [];
  const ville = villes.find((v) => String(v.id) === values.villeId);
  const niveau = niveaux.find((n) => String(n.id) === values.niveauId);
  const matieres = specialites.filter((s) => specialiteIds.includes(s.id));

  const globalError =
    creer.error instanceof ApiError && creer.error.fieldErrors.length === 0
      ? creer.error.message
      : creer.error && !(creer.error instanceof ApiError)
        ? "Une erreur est survenue"
        : null;

  const recap: { label: string; valeur: string; etape: number }[] = [
    { label: "Pour qui", valeur: values.typeBeneficiaire ? TYPE_BENEFICIAIRE[values.typeBeneficiaire] : "-", etape: 0 },
    { label: "Ville", valeur: [ville?.nom, values.quartier].filter(Boolean).join(", ") || "-", etape: 1 },
    { label: "Niveau", valeur: niveau?.libelle ?? "-", etape: 2 },
    { label: "Matières", valeur: matieres.map((m) => m.libelle).join(", ") || "-", etape: 2 },
    { label: "Votre besoin", valeur: values.description || "-", etape: 3 },
    {
      label: "Jours souhaités",
      valeur: joursSouhaites.map(labelJourSouhaite).join(", ") || "Pas de préférence",
      etape: 3,
    },
    {
      label: "Budget mensuel",
      valeur: values.budget ? formatMontant(values.budget.replace(/\s/g, "")) : "Non précisé",
      etape: 3,
    },
    { label: "Attentes sur le professeur", valeur: values.caracteristiquesProf || "Aucune", etape: 3 },
  ];

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (etape === ETAPES.length - 1) envoyer();
        else suivant();
      }}
      className="grid gap-6"
    >
      {/* Progression */}
      <div className="grid gap-2">
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-medium">{ETAPES[etape].titre}</span>
          <span className="text-muted-foreground">
            Étape {etape + 1} sur {ETAPES.length}
          </span>
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={ETAPES.length}
          aria-valuenow={etape + 1}
          aria-label="Progression"
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((etape + 1) / ETAPES.length) * 100}%` }}
          />
        </div>
      </div>

      {etape === 0 && (
        <div className="grid gap-3">
          <Controller
            control={form.control}
            name="typeBeneficiaire"
            render={({ field }) => (
              <div role="radiogroup" aria-label="Pour qui sont les cours ?" className="grid gap-3 sm:grid-cols-2">
                {BENEFICIAIRES.map(({ value, icon: Icon, aide }) => {
                  const selected = field.value === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(value)}
                      className={cn(
                        "flex items-center gap-4 rounded-xl border-2 bg-card p-5 text-left transition-colors hover:bg-muted/50",
                        selected && "border-primary bg-primary/5 hover:bg-primary/5",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground",
                          selected && "bg-primary text-primary-foreground",
                        )}
                      >
                        <Icon className="size-6" />
                      </span>
                      <span className="grid gap-0.5">
                        <span className="font-semibold">{TYPE_BENEFICIAIRE[value]}</span>
                        <span className="text-sm text-muted-foreground">{aide}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          />
          <FieldError id="typeBeneficiaire-error" message={errors.typeBeneficiaire?.message} />
        </div>
      )}

      {etape === 1 && (
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="villeId">Ville</Label>
            <NativeSelect
              id="villeId"
              className="w-full [&_select]:h-11 [&_select]:text-base md:[&_select]:h-9 md:[&_select]:text-sm"
              aria-invalid={errors.villeId ? true : undefined}
              aria-describedby={errors.villeId ? "villeId-error" : undefined}
              {...form.register("villeId")}
            >
              <NativeSelectOption value="">Choisir une ville</NativeSelectOption>
              {villes.map((v) => (
                <NativeSelectOption key={v.id} value={String(v.id)}>
                  {v.nom}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError id="villeId-error" message={errors.villeId?.message} />
          </div>
          <FormField
            label="Quartier (facultatif)"
            placeholder="Ex : Fidjrossè, Akpakpa..."
            error={errors.quartier?.message}
            {...form.register("quartier")}
          />
        </div>
      )}

      {etape === 2 && (
        <div className="grid gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="niveauId">Niveau</Label>
            <NativeSelect
              id="niveauId"
              className="w-full [&_select]:h-11 [&_select]:text-base md:[&_select]:h-9 md:[&_select]:text-sm"
              aria-invalid={errors.niveauId ? true : undefined}
              aria-describedby={errors.niveauId ? "niveauId-error" : undefined}
              {...form.register("niveauId")}
            >
              <NativeSelectOption value="">Choisir un niveau</NativeSelectOption>
              {niveauxTries.map((n) => (
                <NativeSelectOption key={n.id} value={String(n.id)}>
                  {n.libelle}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError id="niveauId-error" message={errors.niveauId?.message} />
          </div>
          <div className="grid gap-2">
            <Label asChild>
              <span>Matières</span>
            </Label>
            <Controller
              control={form.control}
              name="specialiteIds"
              render={({ field }) => (
                <ChipGroup
                  label="Matières"
                  options={specialites.map((s) => ({ value: s.id, label: s.libelle }))}
                  value={field.value}
                  onChange={field.onChange}
                  invalid={!!errors.specialiteIds}
                  describedBy={errors.specialiteIds ? "specialiteIds-error" : undefined}
                />
              )}
            />
            <FieldError id="specialiteIds-error" message={errors.specialiteIds?.message} />
          </div>
        </div>
      )}

      {etape === 3 && (
        <div className="grid gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="description">Décrivez votre besoin</Label>
            <Textarea
              id="description"
              rows={4}
              className="min-h-28"
              placeholder="Ex : mon fils est en 3e, il a des difficultés en maths, surtout en géométrie"
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={errors.description ? "description-error" : undefined}
              {...form.register("description")}
            />
            <FieldError id="description-error" message={errors.description?.message} />
          </div>

          <div className="grid gap-2">
            <Label asChild>
              <span>Jours souhaités (facultatif)</span>
            </Label>
            <Controller
              control={form.control}
              name="joursSouhaites"
              render={({ field }) => (
                <ChipGroup
                  label="Jours souhaités"
                  options={JOURS_SOUHAITES.map((jour) => ({ value: jour, label: labelJourSouhaite(jour).slice(0, 3) }))}
                  value={field.value}
                  onChange={(jours) =>
                    // Garde l'ordre de la semaine quel que soit l'ordre des clics.
                    field.onChange(JOURS_SOUHAITES.filter((jour) => jours.includes(jour)))
                  }
                />
              )}
            />
          </div>

          <FormField
            label="Budget mensuel en FCFA (facultatif)"
            inputMode="numeric"
            placeholder="Ex : 30000"
            error={errors.budget?.message}
            {...form.register("budget")}
          />

          <div className="grid gap-1.5">
            <Label htmlFor="caracteristiquesProf">Attentes sur le professeur (facultatif)</Label>
            <Textarea
              id="caracteristiquesProf"
              rows={2}
              placeholder="Ex : une femme, expérience du BEPC..."
              aria-invalid={errors.caracteristiquesProf ? true : undefined}
              aria-describedby={errors.caracteristiquesProf ? "caracteristiquesProf-error" : undefined}
              {...form.register("caracteristiquesProf")}
            />
            <FieldError id="caracteristiquesProf-error" message={errors.caracteristiquesProf?.message} />
          </div>
        </div>
      )}

      {etape === 4 && (
        <div className="grid gap-4">
          {globalError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertDescription>{globalError}</AlertDescription>
            </Alert>
          )}
          <Card>
            <CardContent>
              <dl className="grid gap-4 text-sm">
                {recap.map(({ label, valeur, etape: cible }) => (
                  <div key={label} className="flex items-start justify-between gap-3">
                    <div className="grid min-w-0 gap-0.5">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium break-words whitespace-pre-line">{valeur}</dd>
                    </div>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="shrink-0"
                      onClick={() => allerA(cible)}
                      aria-label={`Modifier : ${label}`}
                    >
                      Modifier
                    </Button>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex gap-3">
        {etape > 0 && (
          <Button type="button" variant="outline" size="lg" className="h-12" onClick={() => allerA(etape - 1)}>
            <ArrowLeftIcon />
            Retour
          </Button>
        )}
        {etape < ETAPES.length - 1 ? (
          <Button type="submit" size="lg" className="h-12 flex-1 text-base">
            Continuer
            <ArrowRightIcon />
          </Button>
        ) : (
          <Button type="submit" size="lg" className="h-12 flex-1 text-base" disabled={creer.isPending}>
            {creer.isPending ? <Loader2Icon className="animate-spin" /> : <SendIcon />}
            Envoyer ma demande
          </Button>
        )}
      </div>
    </form>
  );
}
