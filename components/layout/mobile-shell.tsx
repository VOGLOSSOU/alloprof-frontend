"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { UserMenu } from "@/components/layout/user-menu";
import { isActive, type NavItem } from "@/components/layout/nav";

/** Espaces client et prof : en-tête, contenu centré, barre de navigation en bas. */
export function MobileShell({ nav, children }: { nav: NavItem[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const rootHref = nav[0].href;

  return (
    <div className="flex min-h-svh flex-col">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-2xl items-center justify-between px-4">
          <Logo href={rootHref} />
          <div className="flex items-center gap-1">
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-4 pb-24">{children}</main>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t bg-background pb-[env(safe-area-inset-bottom)]"
        aria-label="Navigation principale"
      >
        <ul className="mx-auto grid max-w-2xl grid-cols-4">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href, rootHref);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-16 flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground transition-colors",
                    active && "text-primary",
                  )}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
