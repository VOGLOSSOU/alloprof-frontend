"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import { HOME_BY_ROLE, useAuth } from "@/lib/auth";
import { applyApiErrors, emailSchema, passwordSchema, telephoneSchema } from "@/lib/forms";
import type { AuthResponse } from "@/lib/types";
import { FormField, PasswordField } from "@/components/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const schema = z.object({
  prenom: z.string().trim().min(1, "Le prénom est obligatoire").max(100),
  nom: z.string().trim().min(1, "Le nom est obligatoire").max(100),
  email: emailSchema,
  telephone: telephoneSchema,
  password: passwordSchema,
  adresse: z
    .string()
    .trim()
    .max(255)
    .transform((value) => value || undefined),
});

type Input = z.input<typeof schema>;
type Output = z.output<typeof schema>;

const FIELDS = ["prenom", "nom", "email", "telephone", "password", "adresse"] as const;

export function InscriptionForm() {
  const router = useRouter();
  const { status, user, setSession } = useAuth();
  // Vrai dès que l'inscription réussit : la redirection est alors faite par onSuccess.
  const justRegistered = useRef(false);

  // Déjà connecté en arrivant sur la page : direction l'espace du rôle.
  useEffect(() => {
    if (status === "authenticated" && user && !justRegistered.current) {
      router.replace(HOME_BY_ROLE[user.role]);
    }
  }, [status, user, router]);

  const form = useForm<Input, unknown, Output>({
    resolver: zodResolver(schema),
    defaultValues: { prenom: "", nom: "", email: "", telephone: "", password: "", adresse: "" },
  });
  const { errors } = form.formState;

  const register = useMutation({
    mutationFn: (values: Output) => api.post<AuthResponse>("/auth/register", values),
    meta: { silent: true },
    onSuccess: (session) => {
      justRegistered.current = true;
      setSession(session);
      toast.success("Bienvenue sur AlloProf !");
      // Le but de l'inscription est de faire une demande.
      router.replace("/client/demandes/nouvelle");
    },
    onError: (error) => applyApiErrors(error, form.setError, FIELDS),
  });

  // Message global uniquement si l'erreur n'a pas pu être rattachée à un champ.
  const globalError =
    register.error instanceof ApiError && register.error.fieldErrors.length === 0
      ? register.error.message
      : register.error && !(register.error instanceof ApiError)
        ? "Une erreur est survenue"
        : null;

  return (
    <form onSubmit={form.handleSubmit((values) => register.mutate(values))} className="grid gap-4" noValidate>
      {globalError && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Prénom"
          autoComplete="given-name"
          error={errors.prenom?.message}
          {...form.register("prenom")}
        />
        <FormField
          label="Nom"
          autoComplete="family-name"
          error={errors.nom?.message}
          {...form.register("nom")}
        />
      </div>

      <FormField
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        {...form.register("email")}
      />

      <FormField
        label="Téléphone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="+229 01 97 00 00 00"
        error={errors.telephone?.message}
        {...form.register("telephone")}
      />

      <PasswordField
        label="Mot de passe"
        autoComplete="new-password"
        hint="8 caractères minimum"
        error={errors.password?.message}
        {...form.register("password")}
      />

      <FormField
        label="Adresse (facultatif)"
        autoComplete="street-address"
        placeholder="Quartier, rue, repère..."
        error={errors.adresse?.message}
        {...form.register("adresse")}
      />

      <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={register.isPending}>
        {register.isPending && <Loader2Icon className="animate-spin" />}
        Créer mon compte
      </Button>
    </form>
  );
}
