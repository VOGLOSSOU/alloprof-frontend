import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { z } from "zod";
import { ApiError } from "@/lib/api";

/**
 * Reporte les erreurs de champ de l'API (details[].champ) sur le formulaire.
 * Renvoie true si au moins un champ a été marqué.
 */
export function applyApiErrors<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fields: readonly Path<T>[],
): boolean {
  if (!(error instanceof ApiError)) return false;
  let applied = false;
  for (const { champ, message } of error.fieldErrors) {
    if ((fields as readonly string[]).includes(champ)) {
      setError(champ as Path<T>, { type: "server", message });
      applied = true;
    }
  }
  return applied;
}

// Règles alignées sur les validateurs du backend.

/** Retire espaces, points et tirets, puis 8 à 15 chiffres avec + optionnel. */
export const telephoneSchema = z
  .string()
  .trim()
  .min(1, "Le téléphone est obligatoire")
  .transform((value) => value.replace(/[\s.-]/g, ""))
  .refine((value) => /^\+?\d{8,15}$/.test(value), "Numéro de téléphone invalide");

export const passwordSchema = z
  .string()
  .min(8, "8 caractères minimum")
  .max(72, "72 caractères maximum");

export const emailSchema = z
  .string()
  .trim()
  .min(1, "L'email est obligatoire")
  .pipe(z.email("Adresse email invalide"))
  .transform((value) => value.toLowerCase());
