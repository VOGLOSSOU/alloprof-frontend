import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Referentiels } from "@/lib/types";

/** Villes, matières et niveaux actifs, pour les formulaires (route publique). */
export function useReferentiels() {
  return useQuery({
    queryKey: ["referentiels"],
    queryFn: ({ signal }) => api.get<Referentiels>("/referentiels", undefined, signal),
    staleTime: 10 * 60_000,
  });
}
