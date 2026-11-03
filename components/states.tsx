import type { LucideIcon } from "lucide-react";
import { AlertTriangleIcon, InboxIcon } from "lucide-react";
import { ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/** Chargement d'une liste de cartes. */
export function ListSkeleton({ count = 3, className = "h-24" }: { count?: number; className?: string }) {
  return (
    <div className="grid gap-3" aria-busy="true" aria-label="Chargement">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton key={index} className={`w-full rounded-xl ${className}`} />
      ))}
    </div>
  );
}

/** Liste vide : un texte utile et, si possible, une action. */
export function EmptyState({
  icon: Icon = InboxIcon,
  title,
  description,
  action,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed bg-card px-6 py-10 text-center">
      <Icon className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="font-medium">{title}</p>
      {description && <p className="max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/** Erreur de chargement : le message de l'API et un bouton Réessayer. */
export function ErrorState({ error, onRetry }: { error: unknown; onRetry?: () => void }) {
  const message = error instanceof ApiError ? error.message : "Le chargement a échoué.";
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
    >
      <AlertTriangleIcon className="size-8 text-destructive" aria-hidden="true" />
      <p className="font-medium">{message}</p>
      {onRetry && (
        <Button variant="outline" className="mt-2" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  );
}
