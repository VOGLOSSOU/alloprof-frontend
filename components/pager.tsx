import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Pagination simple Précédent / Suivant, la page courante vit dans l'URL (?page=). */
export function Pager({
  page,
  total,
  limit,
  hrefFor,
}: {
  page: number;
  total: number;
  limit: number;
  hrefFor: (page: number) => string;
}) {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (pages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mt-4 flex items-center justify-between gap-2">
      {page > 1 ? (
        <Button asChild variant="outline">
          <Link href={hrefFor(page - 1)}>
            <ChevronLeftIcon />
            Précédent
          </Link>
        </Button>
      ) : (
        <span />
      )}
      <span className="text-sm text-muted-foreground">
        Page {page} sur {pages}
      </span>
      {page < pages ? (
        <Button asChild variant="outline">
          <Link href={hrefFor(page + 1)}>
            Suivant
            <ChevronRightIcon />
          </Link>
        </Button>
      ) : (
        <span />
      )}
    </nav>
  );
}
