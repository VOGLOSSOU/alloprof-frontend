import type { LucideIcon } from "lucide-react";
import {
  BanknoteIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ClipboardListIcon,
  HandshakeIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  SunIcon,
  UsersIcon,
} from "lucide-react";
import type { Role } from "@/lib/types";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

// Barre du bas : 4 entrées max (client et prof).
export const NAV_CLIENT: NavItem[] = [
  { href: "/client", label: "Accueil", icon: HomeIcon },
  { href: "/client/demandes", label: "Demandes", icon: ClipboardListIcon },
  { href: "/client/calendrier", label: "Calendrier", icon: CalendarDaysIcon },
  { href: "/client/paiements", label: "Paiements", icon: BanknoteIcon },
];

export const NAV_PROF: NavItem[] = [
  { href: "/prof", label: "Aujourd'hui", icon: SunIcon },
  { href: "/prof/calendrier", label: "Calendrier", icon: CalendarDaysIcon },
  { href: "/prof/missions", label: "Missions", icon: BriefcaseIcon },
  { href: "/prof/paiements", label: "Paiements", icon: BanknoteIcon },
];

export const NAV_ADMIN: NavItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboardIcon },
  { href: "/admin/demandes", label: "Demandes", icon: ClipboardListIcon },
  { href: "/admin/assignations", label: "Assignations", icon: HandshakeIcon },
  { href: "/admin/professeurs", label: "Professeurs", icon: BookOpenIcon },
  { href: "/admin/clients", label: "Clients", icon: UsersIcon },
  { href: "/admin/paiements", label: "Paiements", icon: BanknoteIcon },
  { href: "/admin/referentiels", label: "Référentiels", icon: SettingsIcon },
];

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  CLIENT: NAV_CLIENT,
  PROFESSEUR: NAV_PROF,
  ADMIN: NAV_ADMIN,
};

/** Une entrée racine (/client) n'est active que sur sa page ; les autres aussi sur leurs sous-pages. */
export function isActive(pathname: string, href: string, rootHref: string) {
  if (href === rootHref) return pathname === href;
  return pathname === href || pathname.startsWith(href + "/");
}
