import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { JOURS_SEMAINE } from "@/lib/labels";
import type { Creneau, Montant } from "@/lib/types";

export const TIMEZONE = "Africa/Porto-Novo";

const montantFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** "5000.00" ou 5000 → "5 000 FCFA" */
export function formatMontant(value: Montant | null | undefined) {
  if (value === null || value === undefined || value === "") return "—";
  return `${montantFormatter.format(Number(value))} FCFA`;
}

/** Date métier "AAAA-MM-JJ" ou horodatage ISO → "3 nov. 2026" (ou le motif donné). */
export function formatDate(value: string | null | undefined, pattern = "d MMM yyyy") {
  if (!value) return "—";
  return format(parseISO(value), pattern, { locale: fr });
}

/** Horodatage ISO → "3 nov. 2026 à 16:04" */
export function formatDateHeure(value: string | null | undefined) {
  return formatDate(value, "d MMM yyyy 'à' HH:mm");
}

/** "16:00:00" → "16h00" */
export function formatHeure(value: string | null | undefined) {
  if (!value) return "—";
  const [h, m] = value.split(":");
  return `${h}h${m}`;
}

/** { jourSemaine: 1, heureDebut: "16:00:00", heureFin: "18:00:00" } → "Lundi 16h00 – 18h00" */
export function formatCreneau(creneau: Pick<Creneau, "jourSemaine" | "heureDebut" | "heureFin">) {
  return `${JOURS_SEMAINE[creneau.jourSemaine]} ${formatHeure(creneau.heureDebut)} – ${formatHeure(creneau.heureFin)}`;
}

/** Créneaux triés par jour puis heure. */
export function trierCreneaux<T extends Pick<Creneau, "jourSemaine" | "heureDebut">>(creneaux: T[]) {
  return [...creneaux].sort(
    (a, b) => a.jourSemaine - b.jourSemaine || a.heureDebut.localeCompare(b.heureDebut),
  );
}

/** Date du jour à Porto-Novo, au format "AAAA-MM-JJ". */
export function aujourdhui() {
  // en-CA donne directement le format AAAA-MM-JJ
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE }).format(new Date());
}

/** "+2290197000000" → "2290197000000" pour les liens wa.me */
export function waNumber(telephone: string) {
  return telephone.replace(/\D/g, "");
}

export function waLink(telephone: string, message: string) {
  return `https://wa.me/${waNumber(telephone)}?text=${encodeURIComponent(message)}`;
}

export function nomComplet(user: { prenom: string; nom: string }) {
  return `${user.prenom} ${user.nom}`;
}
