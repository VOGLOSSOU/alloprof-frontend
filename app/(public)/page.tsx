import Link from "next/link";
import { ClipboardListIcon, KeyRoundIcon, UserSearchIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

// Accueil provisoire : la version complète (villes couvertes, rendu serveur) arrive à l'étape 5.

const ETAPES = [
  {
    icon: ClipboardListIcon,
    titre: "Décrivez votre besoin",
    texte: "Ville, niveau, matières, jours souhaités et budget : quelques minutes suffisent.",
  },
  {
    icon: UserSearchIcon,
    titre: "Nous trouvons le professeur",
    texte: "Notre équipe sélectionne un professeur de maison adapté et organise le planning.",
  },
  {
    icon: KeyRoundIcon,
    titre: "Suivez chaque cours avec un code de présence",
    texte: "À chaque séance, vous donnez un code à 6 chiffres au professeur pour valider sa venue.",
  },
];

export default function AccueilPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
        <Logo />
        <Button asChild variant="ghost">
          <Link href="/connexion">Se connecter</Link>
        </Button>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16">
        <section className="py-12 text-center sm:py-20">
          <h1 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Le bon professeur de maison, sans chercher.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground sm:text-lg">
            Pour votre enfant ou pour vous-même, à Cotonou, Abomey-Calavi, Porto-Novo et Parakou.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/inscription">Trouver un professeur</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link href="/connexion">Se connecter</Link>
            </Button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {ETAPES.map(({ icon: Icon, titre, texte }, index) => (
            <div key={titre} className="rounded-xl border bg-card p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="text-sm font-medium text-muted-foreground">Étape {index + 1}</span>
              </div>
              <h2 className="font-semibold">{titre}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{texte}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
