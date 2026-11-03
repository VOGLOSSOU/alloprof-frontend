import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { InscriptionForm } from "./inscription-form";

export const metadata: Metadata = { title: "Inscription" };

export default function InscriptionPage() {
  return (
    <AuthCard
      title="Créer un compte"
      description="Inscrivez-vous, puis décrivez votre besoin : nous trouvons le professeur pour vous."
      footer={
        <>
          Déjà inscrit ?{" "}
          <Link href="/connexion" className="font-medium text-primary underline-offset-4 hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <InscriptionForm />
    </AuthCard>
  );
}
