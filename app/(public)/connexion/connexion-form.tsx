"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { AlertCircleIcon, Loader2Icon } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { redirectPathFor, useAuth } from "@/lib/auth";
import type { AuthResponse } from "@/lib/types";
import { FormField, PasswordField } from "@/components/form-field";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const schema = z.object({
  identifiant: z.string().trim().min(1, "Saisissez votre email ou votre téléphone"),
  password: z.string().min(1, "Saisissez votre mot de passe"),
});

type Values = z.infer<typeof schema>;

export function ConnexionForm() {
  const router = useRouter();
  const next = useSearchParams().get("next");
  const { status, user, setSession } = useAuth();

  // Déjà connecté : direction l'espace du rôle.
  useEffect(() => {
    if (status === "authenticated" && user) router.replace(redirectPathFor(user.role, next));
  }, [status, user, next, router]);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { identifiant: "", password: "" },
  });

  const login = useMutation({
    mutationFn: (values: Values) => api.post<AuthResponse>("/auth/login", values),
    meta: { silent: true },
    onSuccess: (session) => {
      setSession(session);
      router.replace(redirectPathFor(session.user.role, next));
    },
  });

  const errorMessage =
    login.error instanceof ApiError
      ? login.error.status === 401
        ? "Email/téléphone ou mot de passe incorrect"
        : login.error.message
      : login.error
        ? "Une erreur est survenue"
        : null;

  return (
    <form onSubmit={form.handleSubmit((values) => login.mutate(values))} className="grid gap-4" noValidate>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <FormField
        label="Email ou téléphone"
        autoComplete="username"
        autoFocus
        error={form.formState.errors.identifiant?.message}
        {...form.register("identifiant")}
      />

      <div className="grid gap-1.5">
        <PasswordField
          label="Mot de passe"
          autoComplete="current-password"
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        {/* Réinitialisation par email en attente (docs/03, « Mot de passe oublié »). */}
        <p className="justify-self-end text-sm text-muted-foreground">
          Mot de passe oublié ? Contactez AlloProf.
        </p>
      </div>

      <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={login.isPending}>
        {login.isPending && <Loader2Icon className="animate-spin" />}
        Se connecter
      </Button>
    </form>
  );
}
