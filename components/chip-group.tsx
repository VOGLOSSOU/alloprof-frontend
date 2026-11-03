"use client";

import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipGroupProps<T extends string | number> {
  options: { value: T; label: string }[];
  value: T[];
  onChange: (value: T[]) => void;
  /** Libellé lu par les lecteurs d'écran */
  label: string;
  invalid?: boolean;
  describedBy?: string;
}

/** Choix multiple en puces (matières, jours...). */
export function ChipGroup<T extends string | number>({
  options,
  value,
  onChange,
  label,
  invalid,
  describedBy,
}: ChipGroupProps<T>) {
  const toggle = (option: T) =>
    onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);

  return (
    <div
      role="group"
      aria-label={label}
      aria-describedby={describedBy}
      className="flex flex-wrap gap-2"
    >
      {options.map((option) => {
        const selected = value.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(option.value)}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-full border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted",
              selected && "border-primary bg-primary/10 text-primary hover:bg-primary/15",
              invalid && !selected && "border-destructive/50",
            )}
          >
            {selected && <CheckIcon className="size-4" aria-hidden="true" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
