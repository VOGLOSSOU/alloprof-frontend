import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import type {
  Assignation,
  Creneau,
  Demande,
  JourSouhaite,
  Paginated,
  Professeur,
  StatutDemande,
  TypeBeneficiaire,
  UserPublic,
} from "@/lib/types";

/** Assignation telle que le client la voit dans le détail d'une demande (sans tarifProf). */
export type AssignationClient = Pick<
  Assignation,
  "id" | "statut" | "dateDebut" | "dateFin" | "uniteTarif" | "tarifClient"
> & {
  professeur: Professeur & { user: UserPublic };
  creneaux: Creneau[];
};

export type DemandeClient = Demande & { assignations: AssignationClient[] };

export interface NouvelleDemande {
  villeId: number;
  niveauId: number;
  specialiteIds: number[];
  typeBeneficiaire: TypeBeneficiaire;
  description: string;
  quartier: string | null;
  budget: number | null;
  joursSouhaites: JourSouhaite[] | null;
  caracteristiquesProf: string | null;
}

export const clientDemandesKeys = {
  all: ["client", "demandes"] as const,
  list: (params: { statut?: StatutDemande; page?: number; limit?: number }) =>
    [...clientDemandesKeys.all, "list", params] as const,
  detail: (id: number) => [...clientDemandesKeys.all, "detail", id] as const,
};

export function useClientDemandes(params: { statut?: StatutDemande; page?: number; limit?: number }) {
  return useQuery({
    queryKey: clientDemandesKeys.list(params),
    queryFn: ({ signal }) => api.get<Paginated<Demande>>("/client/demandes", params, signal),
    placeholderData: (previous) => previous,
  });
}

export function useClientDemande(id: number) {
  return useQuery({
    queryKey: clientDemandesKeys.detail(id),
    queryFn: ({ signal }) => api.get<DemandeClient>(`/client/demandes/${id}`, undefined, signal),
    enabled: Number.isInteger(id) && id > 0,
  });
}

export function useCreerDemande() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (demande: NouvelleDemande) => api.post<DemandeClient>("/client/demandes", demande),
    // Le formulaire affiche lui-même les erreurs de champ.
    meta: { silent: true },
    onSuccess: (demande) => {
      queryClient.setQueryData(clientDemandesKeys.detail(demande.id), demande);
      queryClient.invalidateQueries({ queryKey: clientDemandesKeys.all });
      toast.success("Demande envoyée, nous vous recontactons rapidement");
    },
  });
}

export function useAnnulerDemande(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<Demande>(`/client/demandes/${id}/annuler`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientDemandesKeys.all });
      toast.success("Demande annulée");
    },
  });
}
