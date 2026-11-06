import Image from "next/image";
import Link from "next/link";
import {
  ArrowRightIcon,
  BanknoteIcon,
  CheckIcon,
  CircleCheckIcon,
  ClipboardListIcon,
  GraduationCapIcon,
  KeyRoundIcon,
  SearchXIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  UserRoundIcon,
  UserSearchIcon,
} from "lucide-react";
import { Symbole } from "@/components/logo";
import { CtaFinal, SiteShell } from "@/components/marketing/site-shell";
import { VillesCouvertes } from "@/components/marketing/villes-couvertes";
import { Button } from "@/components/ui/button";
import heroEtude from "@/public/images/hero-etude.jpg";
import professeurClasse from "@/public/images/professeur-classe.jpg";

const ENGAGEMENTS = [
  {
    icon: SearchXIcon,
    titre: "Rien à chercher",
    texte: "Pas de catalogue à parcourir : vous décrivez votre besoin, notre équipe trouve le professeur.",
  },
  {
    icon: ShieldCheckIcon,
    titre: "Une présence vérifiée",
    texte: "Chaque cours est validé par un code que vous seul détenez.",
  },
  {
    icon: BanknoteIcon,
    titre: "Un paiement simple",
    texte: "Mobile Money, espèces ou virement, avec un suivi dans votre espace.",
  },
];

const ETAPES = [
  {
    icon: ClipboardListIcon,
    titre: "Décrivez votre besoin",
    texte: "Ville et quartier, niveau, matières, jours souhaités, budget et attentes sur le professeur.",
  },
  {
    icon: UserSearchIcon,
    titre: "Nous trouvons le professeur",
    texte: "Notre équipe cherche la bonne personne, fixe le planning de la semaine et vous présente votre professeur.",
  },
  {
    icon: KeyRoundIcon,
    titre: "Suivez chaque cours avec un code de présence",
    texte: "Le jour du cours, vous donnez votre code au professeur. Son passage est enregistré, et vous suivez tout dans votre calendrier.",
  },
];

const POINTS_CODE = [
  "Le code change à chaque cours et n'apparaît que sur votre téléphone.",
  "Le professeur le saisit dans son application pour valider sa présence.",
  "Un cours non validé reste visible : il est marqué comme manqué.",
];

const PUBLICS = [
  {
    icon: GraduationCapIcon,
    titre: "Pour votre enfant",
    texte: "Du CI à la Terminale : soutien régulier, préparation d'un examen ou reprise d'une matière difficile.",
  },
  {
    icon: UserRoundIcon,
    titre: "Pour vous-même",
    texte: "Étudiant ou adulte : avancer sur une matière à votre rythme, chez vous, avec un professeur dédié.",
  },
];

function CarteCode({ className }: { className?: string }) {
  return (
    <div className={`w-64 rounded-2xl border bg-card p-4 text-card-foreground shadow-xl ${className ?? ""}`}>
      <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Symbole taille={20} />
        Code du jour (exemple)
      </p>
      <p className="mt-1 font-mono text-3xl font-semibold tracking-[0.15em] text-primary">482 913</p>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-700">
        <CircleCheckIcon className="size-3.5" aria-hidden="true" />
        Cours validé par le code
      </p>
    </div>
  );
}

export default function AccueilPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16 lg:pb-24">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-ambre/20 px-3 py-1 text-sm font-medium">
            <span className="size-2 rounded-full bg-ambre" aria-hidden="true" />
            Professeurs de maison au Bénin
          </p>
          <h1 className="text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Le bon professeur de maison,{" "}
            <span className="underline decoration-ambre decoration-[6px] underline-offset-[10px]">sans chercher.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Pour votre enfant ou pour vous-même : décrivez votre besoin, notre équipe trouve le professeur et vous
            suivez chaque cours depuis votre téléphone.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6 text-base">
              <Link href="/inscription">
                Trouver un professeur
                <ArrowRightIcon />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base">
              <Link href="/connexion">Se connecter</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-2">
            <p className="text-sm font-medium text-muted-foreground">Villes couvertes</p>
            <VillesCouvertes />
          </div>
        </div>

        <div className="relative pb-10 lg:pb-0">
          <div className="absolute -top-3 -right-3 hidden size-40 rounded-3xl bg-ambre sm:block" aria-hidden="true" />
          <Image
            src={heroEtude}
            alt="Un groupe d'élèves penchés sur un cahier, guidés par un adulte"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="relative aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
          />
          <CarteCode className="absolute bottom-0 left-4 sm:left-6 lg:-bottom-6 lg:-left-8" />
        </div>
      </section>

      {/* Engagements */}
      <section className="border-y bg-card">
        <ul className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {ENGAGEMENTS.map(({ icon: Icon, titre, texte }) => (
            <li key={titre} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div className="grid content-start gap-1">
                <h2 className="font-semibold">{titre}</h2>
                <p className="text-sm text-muted-foreground">{texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Comment ça marche</h2>
          <p className="mt-3 text-lg text-muted-foreground">Trois étapes, et vous n&apos;avez à chercher personne.</p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {ETAPES.map(({ icon: Icon, titre, texte }, index) => (
            <li key={titre} className="rounded-2xl border bg-card p-6">
              <div className="flex items-center justify-between">
                <span className="flex size-11 items-center justify-center rounded-xl bg-ambre/20 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-4xl font-semibold text-border" aria-hidden="true">
                  {index + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{titre}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{texte}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Code de présence */}
      <section id="code-de-presence" className="scroll-mt-16 bg-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <KeyRoundIcon className="size-9 text-ambre" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Vous savez si le cours a vraiment eu lieu.
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Le code de présence remplace les doutes et les discussions de fin de mois.
            </p>
            <ul className="mt-8 grid gap-4">
              {POINTS_CODE.map((point) => (
                <li key={point} className="flex gap-3">
                  <CheckIcon className="mt-0.5 size-5 shrink-0 text-ambre" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustration des deux écrans : données fictives */}
          <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
            <div className="rounded-3xl bg-card p-5 text-card-foreground shadow-xl sm:-rotate-1">
              <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <SmartphoneIcon className="size-4" />
                Votre téléphone
              </p>
              <p className="mt-6 text-sm font-semibold">Cours de 16h00</p>
              <p className="mt-2 rounded-xl bg-accent py-4 text-center font-mono text-2xl font-semibold tracking-[0.12em] text-primary">
                482 913
              </p>
              <p className="mt-4 text-xs text-muted-foreground">Donnez ce code à votre professeur au début du cours.</p>
            </div>
            <div className="rounded-3xl bg-card p-5 text-card-foreground shadow-xl sm:mt-8 sm:rotate-1">
              <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <SmartphoneIcon className="size-4" />
                Téléphone du professeur
              </p>
              <p className="mt-6 text-sm font-semibold">Code du client</p>
              <div className="mt-2 grid grid-cols-6 gap-1">
                {"482913".split("").map((chiffre, index) => (
                  <span
                    key={index}
                    className="flex h-11 items-center justify-center rounded-lg border bg-background font-mono font-semibold"
                  >
                    {chiffre}
                  </span>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-green-700">
                <CircleCheckIcon className="size-4" />
                Présence validée
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* À propos (court) */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <Image
          src={professeurClasse}
          alt="Un enseignant penché sur le cahier d'un élève, dans une salle de classe"
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[3/2] w-full rounded-3xl object-cover"
        />
        <div>
          <Symbole taille={56} className="mb-4" />
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">À propos d&apos;AlloProf</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trouver un bon professeur de maison passe souvent par le bouche-à-oreille, et ensuite il est difficile de
            savoir si les cours ont bien lieu. AlloProf prend en charge la recherche et apporte un suivi clair, pour
            que vous puissiez vous concentrer sur les progrès.
          </p>
          <Button asChild variant="outline" size="lg" className="mt-6 h-12 px-6 text-base">
            <Link href="/a-propos">
              En savoir plus sur AlloProf
              <ArrowRightIcon />
            </Link>
          </Button>
        </div>
      </section>

      {/* Pour qui */}
      <section className="border-t bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Des cours pour qui ?</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {PUBLICS.map(({ icon: Icon, titre, texte }) => (
              <li key={titre} className="flex gap-4 rounded-2xl border bg-background p-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="grid content-start gap-1">
                  <h3 className="text-lg font-semibold">{titre}</h3>
                  <p className="text-muted-foreground">{texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaFinal />
    </SiteShell>
  );
}
