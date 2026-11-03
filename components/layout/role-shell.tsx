"use client";

import { useUser } from "@/lib/auth";
import { AdminShell } from "@/components/layout/admin-shell";
import { MobileShell } from "@/components/layout/mobile-shell";
import { NAV_CLIENT, NAV_PROF } from "@/components/layout/nav";

export function ClientShell({ children }: { children: React.ReactNode }) {
  return <MobileShell nav={NAV_CLIENT}>{children}</MobileShell>;
}

export function ProfShell({ children }: { children: React.ReactNode }) {
  return <MobileShell nav={NAV_PROF}>{children}</MobileShell>;
}

/** Mise en page de l'espace de l'utilisateur connecté (pages communes comme /compte). */
export function RoleShell({ children }: { children: React.ReactNode }) {
  const { role } = useUser();
  if (role === "ADMIN") return <AdminShell>{children}</AdminShell>;
  if (role === "PROFESSEUR") return <ProfShell>{children}</ProfShell>;
  return <ClientShell>{children}</ClientShell>;
}
