import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = { title: "Mot de passe oublié" };

// Provisoire : le formulaire arrive à l'étape 5.
export default function Page() {
  return (
    <AuthCard
      title="Mot de passe oublié"
      description="Cette fonctionnalité arrive bientôt. En attendant, contactez AlloProf."
    >
      <Link href="/connexion" className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Retour à la connexion
      </Link>
    </AuthCard>
  );
}
