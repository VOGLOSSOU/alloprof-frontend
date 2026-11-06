import { Suspense } from "react";
import { cacheLife } from "next/cache";
import { MapPinIcon } from "lucide-react";
import type { Referentiels } from "@/lib/types";

// Affichées si l'API ne répond pas : la vitrine ne doit jamais dépendre d'elle pour s'afficher.
const VILLES_PAR_DEFAUT = ["Abomey-Calavi", "Cotonou", "Parakou", "Porto-Novo"];

async function chargerVilles() {
  "use cache";
  cacheLife("hours");
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/referentiels`, {
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error(`Référentiels : ${response.status}`);
  const { villes } = (await response.json()) as Referentiels;
  return villes.map((ville) => ville.nom);
}

function Puces({ villes }: { villes: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {villes.map((ville) => (
        <li
          key={ville}
          className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-sm font-medium"
        >
          <MapPinIcon className="size-3.5 text-primary" aria-hidden="true" />
          {ville}
        </li>
      ))}
    </ul>
  );
}

async function VillesChargees() {
  // Une erreur levée dans la fonction en cache n'est pas mise en cache : l'appel suivant réessaie.
  const villes = await chargerVilles().catch(() => VILLES_PAR_DEFAUT);
  return <Puces villes={villes} />;
}

/** Villes couvertes (GET /referentiels), rendues côté serveur pour le référencement. */
export function VillesCouvertes() {
  return (
    <Suspense fallback={<Puces villes={VILLES_PAR_DEFAUT} />}>
      <VillesChargees />
    </Suspense>
  );
}
