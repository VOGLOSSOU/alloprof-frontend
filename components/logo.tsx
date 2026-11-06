import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Symbole officiel suivi du nom en texte (source : docs/identite-visuelle/logos/). */
export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <Image src="/symbole.svg" alt="" width={32} height={32} unoptimized className="size-8" />
      <span className="text-lg tracking-tight">AlloProf</span>
    </Link>
  );
}
