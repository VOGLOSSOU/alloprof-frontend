"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { api, ApiError, getToken, setToken, setUnauthorizedHandler } from "@/lib/api";
import type { AuthResponse, Role, User } from "@/lib/types";
import { Button } from "@/components/ui/button";

type AuthStatus = "loading" | "authenticated" | "anonymous" | "error";

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  /** Enregistre la session renvoyée par login, register, invitation ou changement de mot de passe. */
  setSession: (session: AuthResponse) => void;
  setUser: (user: User) => void;
  logout: () => void;
  reload: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const HOME_BY_ROLE: Record<Role, string> = {
  CLIENT: "/client",
  PROFESSEUR: "/prof",
  ADMIN: "/admin",
};

/** Destination après connexion : `next` s'il appartient à l'espace du rôle, sinon l'accueil du rôle. */
export function redirectPathFor(role: Role, next?: string | null) {
  const home = HOME_BY_ROLE[role];
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    const path = next.split(/[?#]/)[0];
    if (path === home || path.startsWith(home + "/") || path === "/compte") return next;
  }
  return home;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [user, setUserState] = useState<User | null>(null);

  const clearSession = useCallback(() => {
    setToken(null);
    setUserState(null);
    setStatus("anonymous");
    queryClient.clear();
  }, [queryClient]);

  const loadUser = useCallback(async () => {
    if (!getToken()) {
      setStatus("anonymous");
      return;
    }
    setStatus("loading");
    try {
      const me = await api.get<User>("/auth/me");
      setUserState(me);
      setStatus("authenticated");
    } catch (error) {
      // Le 401 est déjà traité par le handler (session vidée).
      if (!(error instanceof ApiError && error.status === 401)) setStatus("error");
    }
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(clearSession);
    // Lecture de localStorage : uniquement côté navigateur, après le montage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUser();
  }, [clearSession, loadUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      setSession: ({ token, user }) => {
        setToken(token);
        setUserState(user);
        setStatus("authenticated");
      },
      setUser: (user) => setUserState(user),
      logout: clearSession,
      reload: loadUser,
    }),
    [status, user, clearSession, loadUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return context;
}

/** Utilisateur connecté, à utiliser sous un RequireRole. */
export function useUser(): User {
  const { user } = useAuth();
  if (!user) throw new Error("useUser doit être utilisé sous un RequireRole");
  return user;
}

export function FullPageLoader() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" aria-label="Chargement" />
    </div>
  );
}

/**
 * Protège un espace : sans session, renvoie vers /connexion?next=... ;
 * avec le mauvais rôle, renvoie vers l'espace du rôle. Le backend revérifie tout.
 */
export function RequireRole({
  role,
  children,
}: {
  role: Role | Role[];
  children: React.ReactNode;
}) {
  const { status, user, reload } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const roles = Array.isArray(role) ? role : [role];
  const allowed = status === "authenticated" && user !== null && roles.includes(user.role);

  useEffect(() => {
    if (status === "anonymous") {
      const next = pathname + window.location.search;
      router.replace(`/connexion?next=${encodeURIComponent(next)}`);
    } else if (status === "authenticated" && user && !roles.includes(user.role)) {
      router.replace(HOME_BY_ROLE[user.role]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user, pathname, router, roles.join()]);

  if (status === "error") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-muted-foreground">Impossible de joindre le serveur.</p>
        <Button onClick={reload}>Réessayer</Button>
      </div>
    );
  }

  if (!allowed) return <FullPageLoader />;
  return <>{children}</>;
}
