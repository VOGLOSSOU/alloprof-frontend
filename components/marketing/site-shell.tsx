import Link from "next/link";
import { Logo, Symbole } from "@/components/logo";
import { Button } from "@/components/ui/button";

const LIENS = [
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/#code-de-presence", label: "Code de présence" },
  { href: "/a-propos", label: "À propos" },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {LIENS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" className="h-10 px-3">
            <Link href="/connexion">Se connecter</Link>
          </Button>
          <Button asChild className="hidden h-10 px-4 sm:inline-flex">
            <Link href="/inscription">Trouver un professeur</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-[2fr_1fr_1fr] sm:px-6">
        <div className="grid content-start gap-3">
          <Logo />
          <p className="max-w-sm text-sm text-muted-foreground">
            Des professeurs de maison au Bénin, pour vos enfants ou pour vous-même, et un suivi de chaque cours.
          </p>
        </div>
        <nav aria-label="Plateforme" className="grid content-start gap-2 text-sm">
          <p className="font-semibold">Plateforme</p>
          {LIENS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-muted-foreground hover:text-foreground">
              {label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Votre compte" className="grid content-start gap-2 text-sm">
          <p className="font-semibold">Votre compte</p>
          <Link href="/inscription" className="text-muted-foreground hover:text-foreground">
            Créer un compte
          </Link>
          <Link href="/connexion" className="text-muted-foreground hover:text-foreground">
            Se connecter
          </Link>
        </nav>
      </div>
      <div className="border-t">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-muted-foreground sm:px-6">
          © AlloProf. Photos d&apos;illustration.
        </p>
      </div>
    </footer>
  );
}

/** En-tête et pied de page des pages vitrine (accueil, à propos). */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Bandeau final d'appel à l'action, commun aux pages vitrine. */
export function CtaFinal() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-5">
          <span className="hidden rounded-3xl bg-white p-2 sm:block">
            <Symbole taille={64} />
          </span>
          <div className="grid gap-2">
            <h2 className="max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
              Dites-nous ce qu&apos;il vous faut, nous cherchons pour vous.
            </h2>
            <p className="text-primary-foreground/80">La demande se fait en quelques minutes, depuis votre téléphone.</p>
          </div>
        </div>
        <Button asChild size="lg" variant="secondary" className="h-12 px-6 text-base">
          <Link href="/inscription">Trouver un professeur</Link>
        </Button>
      </div>
    </section>
  );
}
