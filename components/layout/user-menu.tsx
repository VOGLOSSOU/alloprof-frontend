"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOutIcon, UserIcon } from "lucide-react";
import { useUser, useAuth } from "@/lib/auth";
import { nomComplet } from "@/lib/format";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const user = useUser();
  const { logout } = useAuth();
  const router = useRouter();
  const initiales = `${user.prenom.charAt(0)}${user.nom.charAt(0)}`.toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-lg" className="rounded-full" aria-label="Menu du compte">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">{initiales}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="font-medium text-foreground">{nomComplet(user)}</div>
          <div className="truncate text-xs text-muted-foreground">{user.email}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/compte">
            <UserIcon />
            Mon compte
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onSelect={() => {
            logout();
            router.replace("/connexion");
          }}
        >
          <LogOutIcon />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
