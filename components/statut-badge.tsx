import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TONE_CLASSES, type EnumLabel } from "@/lib/labels";

/**
 * Badge coloré pour tous les enums de lib/labels.ts.
 * Ex. <StatutBadge value={STATUT_DEMANDE[demande.statut]} />
 */
export function StatutBadge({ value, className }: { value: EnumLabel; className?: string }) {
  return (
    <Badge variant="outline" className={cn(TONE_CLASSES[value.tone], className)}>
      {value.label}
    </Badge>
  );
}
