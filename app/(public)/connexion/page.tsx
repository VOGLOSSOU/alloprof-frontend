import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { ConnexionForm } from "./connexion-form";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <AuthCard
      title="Connexion"
      description="Accédez à votre espace AlloProf."
      footer={
        <>
          Pas encore de compte ?{" "}
          <Link href="/inscription" className="font-medium text-primary underline-offset-4 hover:underline">
            Créer un compte
          </Link>
        </>
      }
    >
      <Suspense>
        <ConnexionForm />
      </Suspense>
    </AuthCard>
  );
}
