"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserMenu } from "@/components/layout/user-menu";
import { isActive, NAV_ADMIN } from "@/components/layout/nav";

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const rootHref = NAV_ADMIN[0].href;

  return (
    <nav aria-label="Navigation admin" className="grid gap-1 p-3">
      {NAV_ADMIN.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href, rootHref);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              active && "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Back-office : sidebar à gauche (tiroir sur petit écran), contenu large. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-svh">
      <aside className="sticky top-0 hidden h-svh w-60 shrink-0 flex-col border-r bg-sidebar lg:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Logo href="/admin" />
        </div>
        <SidebarNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background/90 px-4 backdrop-blur lg:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" aria-label="Ouvrir le menu">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-sidebar p-0">
                <SheetHeader className="h-14 justify-center border-b">
                  <SheetTitle asChild>
                    <div>
                      <Logo href="/admin" />
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <SidebarNav onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <Logo href="/admin" />
          </div>
          <span className="hidden text-sm text-muted-foreground lg:block">Back-office</span>
          <div className="flex items-center gap-1">
            <UserMenu />
          </div>
        </header>

        <main className="w-full flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
