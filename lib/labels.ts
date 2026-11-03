// Libellés et couleurs des enums (voir docs/03-ECRANS-ET-PARCOURS.md, section 1).
// Ne jamais afficher une valeur brute d'enum dans l'interface.

import type {
  Disponibilite,
  JourSemaine,
  JourSouhaite,
  ModePaiement,
  SensPaiement,
  StatutAssignation,
  StatutCompte,
  StatutDemande,
  StatutPaiement,
  StatutSeance,
  TypeBeneficiaire,
  UniteTarif,
} from "@/lib/types";

export type Tone = "gray" | "grayLight" | "blue" | "green" | "orange" | "red";

export interface EnumLabel {
  label: string;
  tone: Tone;
}

export const TONE_CLASSES: Record<Tone, string> = {
  gray: "bg-slate-100 text-slate-700 border-slate-200",
  grayLight: "bg-slate-50 text-slate-400 border-slate-200 line-through",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-green-50 text-green-700 border-green-200",
  orange: "bg-orange-50 text-orange-700 border-orange-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

export const STATUT_DEMANDE: Record<StatutDemande, EnumLabel> = {
  EN_ATTENTE: { label: "En attente", tone: "gray" },
  EN_RECHERCHE: { label: "Recherche en cours", tone: "blue" },
  ASSIGNEE: { label: "Professeur trouvé", tone: "green" },
  ANNULEE: { label: "Annulée", tone: "grayLight" },
  REJETEE: { label: "Refusée", tone: "red" },
};

export const STATUT_ASSIGNATION: Record<StatutAssignation, EnumLabel> = {
  ACTIVE: { label: "En cours", tone: "green" },
  SUSPENDUE: { label: "Suspendue", tone: "orange" },
  TERMINEE: { label: "Terminée", tone: "gray" },
};

export const STATUT_SEANCE: Record<StatutSeance, EnumLabel> = {
  PREVUE: { label: "Prévue", tone: "blue" },
  EFFECTUEE: { label: "Effectuée", tone: "green" },
  MANQUEE: { label: "Manquée", tone: "red" },
  ANNULEE: { label: "Annulée", tone: "gray" },
};

/** Badge supplémentaire pour une séance PREVUE avec tentativesEchouees >= 5 */
export const SEANCE_BLOQUEE: EnumLabel = { label: "Bloquée", tone: "orange" };
export const MAX_TENTATIVES = 5;

export const STATUT_PAIEMENT: Record<StatutPaiement, EnumLabel> = {
  PAYE: { label: "Payé", tone: "green" },
  EN_ATTENTE: { label: "En attente", tone: "orange" },
};

export const DISPONIBILITE: Record<Disponibilite, EnumLabel> = {
  DISPONIBLE: { label: "Disponible", tone: "green" },
  INDISPONIBLE: { label: "Indisponible", tone: "gray" },
};

export const STATUT_COMPTE: Record<StatutCompte, EnumLabel> = {
  ACTIF: { label: "Actif", tone: "green" },
  SUSPENDU: { label: "Suspendu", tone: "red" },
};

export const SENS_PAIEMENT: Record<SensPaiement, string> = {
  CLIENT_VERS_ADMIN: "Reçu du client",
  ADMIN_VERS_PROF: "Versé au prof",
};

export const MODE_PAIEMENT: Record<ModePaiement, string> = {
  MOBILE_MONEY: "Mobile Money",
  ESPECES: "Espèces",
  VIREMENT: "Virement",
};

export const UNITE_TARIF: Record<UniteTarif, string> = {
  SEANCE: "par séance",
  HEURE: "par heure",
  MOIS: "par mois (forfait)",
};

export const TYPE_BENEFICIAIRE: Record<TypeBeneficiaire, string> = {
  ENFANT: "Pour mon enfant",
  SOI_MEME: "Pour moi-même",
};

export const JOURS_SEMAINE: Record<JourSemaine, string> = {
  1: "Lundi",
  2: "Mardi",
  3: "Mercredi",
  4: "Jeudi",
  5: "Vendredi",
  6: "Samedi",
  7: "Dimanche",
};

export const JOURS_SOUHAITES: JourSouhaite[] = [
  "LUNDI",
  "MARDI",
  "MERCREDI",
  "JEUDI",
  "VENDREDI",
  "SAMEDI",
  "DIMANCHE",
];

/** "LUNDI" → "Lundi" */
export function labelJourSouhaite(jour: JourSouhaite) {
  return jour.charAt(0) + jour.slice(1).toLowerCase();
}

/** "LUNDI" → 1 */
export function jourSouhaiteToSemaine(jour: JourSouhaite): JourSemaine {
  return (JOURS_SOUHAITES.indexOf(jour) + 1) as JourSemaine;
}
