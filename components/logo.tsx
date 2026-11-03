import Link from "next/link";
import { GraduationCapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2 font-semibold", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <GraduationCapIcon className="size-5" />
      </span>
      <span className="text-lg tracking-tight">AlloProf</span>
    </Link>
  );
}
