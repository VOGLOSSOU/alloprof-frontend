import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Symbole seul, décoratif : à utiliser sur fond clair (sur fond pétrole, le poser sur une plaque blanche). */
export function Symbole({ taille, className }: { taille: number; className?: string }) {
  return <Image src="/symbole.png" alt="" width={taille} height={taille} className={cn("shrink-0", className)} />;
}

/** Symbole officiel suivi du nom en texte (source : docs/identite-visuelle/logos/). */
export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <Symbole taille={32} />
      <span className="text-lg tracking-tight">AlloProf</span>
    </Link>
  );
}
