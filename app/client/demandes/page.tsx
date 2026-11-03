import type { Metadata } from "next";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { DemandesList } from "./demandes-list";

export const metadata: Metadata = { title: "Mes demandes" };

export default function DemandesPage() {
  return (
    <>
      <PageHeader
        title="Mes demandes"
        actions={
          <Button asChild>
            <Link href="/client/demandes/nouvelle">
              <PlusIcon />
              Nouvelle
            </Link>
          </Button>
        }
      />
      <DemandesList />
    </>
  );
}
