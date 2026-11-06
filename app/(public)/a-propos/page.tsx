import type { Metadata } from "next";
import Image from "next/image";
import { ChevronDownIcon, ClipboardCheckIcon, KeyRoundIcon, UsersRoundIcon, WalletCardsIcon } from "lucide-react";
import { CtaFinal, SiteShell } from "@/components/marketing/site-shell";
import { VillesCouvertes } from "@/components/marketing/villes-couvertes";
import elevesLecture from "@/public/images/eleves-lecture.jpg";
import elevesSourire from "@/public/images/eleves-sourire.jpg";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "AlloProf cherche pour vous un professeur de maison au Bénin et vous permet de suivre chaque cours avec un code de présence.",
};

const PRINCIPES = [
  {
    icon: UsersRoundIcon,
    titre: "Une personne cherche pour vous",
    texte:
      "Pas de catalogue ni de profils à comparer. Notre équipe lit votre demande et cherche un professeur selon la ville, le niveau, les matières et vos attentes.",
  },
  {
    icon: ClipboardCheckIcon,
    titre: "Un cadre clair dès le départ",
    texte:
      "Une fois le professeur trouvé, vous voyez son nom, son téléphone, le planning de la semaine et le tarif dans votre espace.",
  },
  {
    icon: KeyRoundIcon,
    titre: "Chaque cours est vérifié",
    texte:
      "Le jour du cours, vous donnez un code à 6 chiffres au professeur. C'est lui qui valide sa présence, et vous gardez l'historique dans votre calendrier.",
  },
  {
    icon: WalletCardsIcon,
    titre: "Un paiement adapté",
    texte: "Mobile Money, espèces ou virement. Chaque paiement est enregistré par notre équipe et visible dans votre espace.",
  },
];

const QUESTIONS = [
  {
    question: "Est-ce que je choisis mon professeur ?",
    reponse:
      "Non : c'est justement ce que nous faisons pour vous. Vous précisez vos attentes dans la demande (par exemple l'expérience d'un examen), et notre équipe cherche en conséquence.",
  },
  {
    question: "Combien coûtent les cours ?",
    reponse:
      "Le tarif dépend du besoin. Vous pouvez indiquer votre budget dans la demande. Le tarif retenu (par séance, par heure ou au mois) apparaît ensuite dans votre espace.",
  },
  {
    question: "Comment se passe le paiement ?",
    reponse:
      "Le paiement ne passe pas par le site : vous réglez AlloProf par Mobile Money, en espèces ou par virement. Le paiement est ensuite enregistré et vous le retrouvez dans votre espace.",
  },
  {
    question: "Que se passe-t-il si le cours n'est pas validé ?",
    reponse: "Un cours sans code validé le jour même passe en « manqué » dans le calendrier. Rien ne reste dans le flou.",
  },
  {
    question: "Puis-je annuler ma demande ?",
    reponse: "Oui, depuis votre espace, tant qu'aucun professeur ne vous a été attribué.",
  },
  {
    question: "Et si le professeur ne convient pas ?",
    reponse: "Notre équipe peut mettre fin à la mission et relancer la recherche pour trouver quelqu'un d'autre.",
  },
];

export default function AProposPage() {
  return (
    <SiteShell>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-16 lg:pb-24">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-ambre/20 px-3 py-1 text-sm font-medium">À propos d&apos;AlloProf</p>
          <h1 className="text-4xl leading-[1.1] font-semibold tracking-tight text-balance sm:text-5xl">
            Trouver un professeur de maison ne devrait pas être un parcours du combattant.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            AlloProf met en relation les familles et les adultes du Bénin avec des professeurs de maison. Vous nous
            dites ce qu&apos;il vous faut, nous cherchons, et vous gardez un œil sur chaque cours.
          </p>
        </div>
        <Image
          src={elevesLecture}
          alt="Deux élèves en uniforme lisent ensemble un livre"
          placeholder="blur"
          loading="eager"
          fetchPriority="high"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/3] w-full rounded-3xl object-cover object-top"
        />
      </section>

      <section className="border-y bg-card">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Notre façon de faire</h2>
          <ul className="mt-10 grid gap-8 md:grid-cols-2">
            {PRINCIPES.map(({ icon: Icon, titre, texte }) => (
              <li key={titre} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="grid gap-1">
                  <h3 className="text-lg font-semibold">{titre}</h3>
                  <p className="text-muted-foreground">{texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:py-24">
        <Image
          src={elevesSourire}
          alt="Deux élèves souriants en uniforme"
          placeholder="blur"
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
        <div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Où nous intervenons</h2>
          <p className="mt-4 mb-6 text-lg text-muted-foreground">
            Les professeurs se déplacent chez vous. Dans votre demande, vous indiquez votre ville et votre quartier.
          </p>
          <VillesCouvertes />
        </div>
      </section>

      <section className="border-t bg-card">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Questions fréquentes</h2>
          <div className="mt-8 divide-y border-y">
            {QUESTIONS.map(({ question, reponse }) => (
              <details key={question} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {question}
                  <ChevronDownIcon
                    className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-2 text-muted-foreground">{reponse}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal />
    </SiteShell>
  );
}
