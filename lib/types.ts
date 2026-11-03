// Types des objets renvoyés par l'API (voir docs/02-API.md, sections 2 et 3).

export type Role = "ADMIN" | "CLIENT" | "PROFESSEUR";
export type StatutCompte = "ACTIF" | "SUSPENDU";
export type Disponibilite = "DISPONIBLE" | "INDISPONIBLE";
export type TypeBeneficiaire = "ENFANT" | "SOI_MEME";
export type JourSouhaite =
  | "LUNDI"
  | "MARDI"
  | "MERCREDI"
  | "JEUDI"
  | "VENDREDI"
  | "SAMEDI"
  | "DIMANCHE";
export type StatutDemande = "EN_ATTENTE" | "EN_RECHERCHE" | "ASSIGNEE" | "ANNULEE" | "REJETEE";
export type StatutAssignation = "ACTIVE" | "SUSPENDUE" | "TERMINEE";
export type UniteTarif = "SEANCE" | "HEURE" | "MOIS";
export type StatutSeance = "PREVUE" | "EFFECTUEE" | "MANQUEE" | "ANNULEE";
export type SensPaiement = "CLIENT_VERS_ADMIN" | "ADMIN_VERS_PROF";
export type ModePaiement = "MOBILE_MONEY" | "ESPECES" | "VIREMENT";
export type StatutPaiement = "EN_ATTENTE" | "PAYE";
/** 1 = lundi ... 7 = dimanche (ISO) */
export type JourSemaine = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type TypeNotification =
  | "NOUVELLE_DEMANDE"
  | "DEMANDE_ANNULEE"
  | "SEANCE_BLOQUEE"
  | "DEMANDE_STATUT"
  | "SEANCE_VALIDEE"
  | "PAIEMENT_ENREGISTRE"
  | "PAIEMENT_RECU"
  | "NOUVELLE_ASSIGNATION"
  | "ASSIGNATION_STATUT"
  | "PLANNING_MODIFIE";

/** Montant décimal : chaîne en lecture ("5000.00"), parfois nombre. Toujours passer par Number(). */
export type Montant = string | number;

export interface UserPublic {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  statut: StatutCompte;
}

export interface User extends UserPublic {
  role: Role;
  mustChangePassword: boolean;
  passwordChangedAt: string | null;
  createdAt: string;
  updatedAt: string;
  client: Client | null;
  professeur: ProfesseurAvecReferentiels | null;
}

export interface Client {
  userId: number;
  adresse: string | null;
  user?: UserPublic;
}

export interface Professeur {
  userId: number;
  bio: string | null;
  disponibilite: Disponibilite;
  user?: UserPublic;
}

export interface ProfesseurAvecReferentiels extends Professeur {
  specialites: Specialite[];
  villes: Ville[];
  niveaux: Niveau[];
}

export interface Ville {
  id: number;
  nom: string;
  estActive: boolean;
}

export interface Specialite {
  id: number;
  libelle: string;
  estActive: boolean;
}

export interface Niveau {
  id: number;
  libelle: string;
  ordre: number;
  estActive: boolean;
}

export interface Referentiels {
  villes: Ville[];
  specialites: Specialite[];
  niveaux: Niveau[];
}

export interface Demande {
  id: number;
  clientId: number;
  villeId: number;
  niveauId: number;
  quartier: string | null;
  typeBeneficiaire: TypeBeneficiaire;
  description: string;
  /** Absent pour le prof */
  budget?: Montant | null;
  joursSouhaites: JourSouhaite[] | null;
  caracteristiquesProf: string | null;
  statut: StatutDemande;
  /** Admin uniquement */
  traiteePar?: number | null;
  /** Admin uniquement (note interne) */
  noteAdmin?: string | null;
  createdAt: string;
  updatedAt: string;
  ville: Ville;
  niveau: Niveau;
  specialites: Specialite[];
  client?: Client & { user: UserPublic };
}

export interface Creneau {
  id: number;
  assignationId: number;
  jourSemaine: JourSemaine;
  heureDebut: string;
  heureFin: string;
}

export interface Assignation {
  id: number;
  demandeId: number;
  professeurId: number;
  dateDebut: string;
  dateFin: string | null;
  uniteTarif: UniteTarif;
  /** Jamais envoyé au prof */
  tarifClient?: Montant;
  /** Jamais envoyé au client */
  tarifProf?: Montant;
  statut: StatutAssignation;
  createdAt: string;
  updatedAt: string;
  demande?: Demande;
  professeur?: Professeur & { user: UserPublic };
  creneaux?: Creneau[];
}

export interface Seance {
  id: number;
  assignationId: number;
  dateSeance: string;
  heureDebut: string;
  heureFin: string;
  /** Non null = le client a déjà affiché le code */
  codeGenereLe: string | null;
  /** 5 = validation bloquée */
  tentativesEchouees: number;
  statut: StatutSeance;
  dateValidation: string | null;
  motifAnnulation: string | null;
  createdAt: string;
  updatedAt: string;
  /** Uniquement dans GET /client/seances/aujourdhui */
  codeSecret?: string;
  assignation?: Partial<Assignation>;
}

export interface Paiement {
  id: number;
  assignationId: number;
  sens: SensPaiement;
  mois: number;
  annee: number;
  montant: Montant;
  mode: ModePaiement | null;
  reference: string | null;
  statut: StatutPaiement;
  commentaire: string | null;
  datePaiement: string | null;
  createdAt: string;
  updatedAt: string;
  assignation?: Partial<Assignation>;
}

export interface Notification {
  id: number;
  userId: number;
  type: TypeNotification;
  titre: string;
  message: string | null;
  data: {
    demandeId?: number;
    assignationId?: number;
    seanceId?: number;
    paiementId?: number;
    statut?: string;
  } | null;
  /** null = non lue */
  luLe: string | null;
  createdAt: string;
}

export interface MontantsRecap {
  du: number;
  paye: number;
  enAttente: number;
  reste: number;
}

export interface Recap {
  periode: { annee: number; mois: number };
  uniteTarif: UniteTarif;
  seances: {
    prevues: number;
    effectuees: number;
    manquees: number;
    annulees: number;
    heuresEffectuees: number;
  };
  /** Mois terminé et plus aucune séance PREVUE : le prof peut être payé */
  moisComplet: boolean;
  client: MontantsRecap;
  prof: MontantsRecap;
  marge: number;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}
