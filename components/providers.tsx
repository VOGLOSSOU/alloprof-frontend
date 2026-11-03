"use client";

import { useState } from "react";
import { MutationCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthProvider } from "@/lib/auth";
import { ApiError } from "@/lib/api";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        // Inutile de réessayer une erreur 4xx : la réponse ne changera pas.
        retry: (failureCount, error) =>
          !(error instanceof ApiError && error.status >= 400 && error.status < 500) &&
          failureCount < 2,
        refetchOnWindowFocus: false,
      },
    },
    mutationCache: new MutationCache({
      // Toast d'erreur par défaut ; une mutation peut le désactiver avec meta: { silent: true }
      // (ex. formulaires qui affichent l'erreur sur les champs).
      onError: (error, _vars, _ctx, mutation) => {
        if (mutation.meta?.silent) return;
        toast.error(error instanceof ApiError ? error.message : "Une erreur est survenue");
      },
    }),
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          {children}
          <Toaster theme="light" position="top-center" richColors />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
