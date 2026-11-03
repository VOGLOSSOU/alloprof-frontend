"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { api, ApiError } from "@/lib/api";
import { useAuth, useUser } from "@/lib/auth";
import { passwordSchema } from "@/lib/forms";
import { nomComplet } from "@/lib/format";
import type { AuthResponse } from "@/lib/types";
import { PasswordField } from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ROLE_LABEL = { CLIENT: "Client", PROFESSEUR: "Professeur", ADMIN: "Administrateur" } as const;

export function CompteInfos() {
  const user = useUser();
  const rows = [
    { label: "Nom", value: nomComplet(user) },
    { label: "Email", value: user.email },
    { label: "Téléphone", value: user.telephone },
    { label: "Type de compte", value: ROLE_LABEL[user.role] },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mes informations</CardTitle>
        <CardDescription>Pour modifier ces informations, contactez AlloProf.</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 text-sm">
          {rows.map(({ label, value }) => (
            <div key={label} className="grid gap-0.5 sm:grid-cols-[10rem_1fr]">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-medium break-all">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

const schema = z
  .object({
    currentPassword: z.string().min(1, "Saisissez votre mot de passe actuel"),
    newPassword: passwordSchema,
    confirmation: z.string(),
  })
  .refine((values) => values.confirmation === values.newPassword, {
    path: ["confirmation"],
    message: "Les deux mots de passe ne correspondent pas",
  });

type Values = z.infer<typeof schema>;

export function ChangerMotDePasse() {
  const { setSession } = useAuth();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: "", newPassword: "", confirmation: "" },
  });
  const { errors } = form.formState;

  const change = useMutation({
    mutationFn: ({ currentPassword, newPassword }: Values) =>
      api.post<AuthResponse>("/auth/password/change", { currentPassword, newPassword }),
    meta: { silent: true },
    onSuccess: (session) => {
      // L'ancien token est invalidé : on remplace la session.
      setSession(session);
      form.reset();
      toast.success("Mot de passe modifié");
    },
    onError: (error) => {
      if (error instanceof ApiError && error.message === "Mot de passe actuel incorrect") {
        form.setError("currentPassword", { message: "Mot de passe actuel incorrect" });
      } else {
        toast.error(error instanceof ApiError ? error.message : "Une erreur est survenue");
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changer mon mot de passe</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit((values) => change.mutate(values))} className="grid gap-4" noValidate>
          <PasswordField
            label="Mot de passe actuel"
            autoComplete="current-password"
            error={errors.currentPassword?.message}
            {...form.register("currentPassword")}
          />
          <PasswordField
            label="Nouveau mot de passe"
            autoComplete="new-password"
            hint="8 caractères minimum"
            error={errors.newPassword?.message}
            {...form.register("newPassword")}
          />
          <PasswordField
            label="Confirmer le nouveau mot de passe"
            autoComplete="new-password"
            error={errors.confirmation?.message}
            {...form.register("confirmation")}
          />
          <Button type="submit" className="h-11 sm:h-9 sm:justify-self-start" disabled={change.isPending}>
            {change.isPending && <Loader2Icon className="animate-spin" />}
            Enregistrer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
