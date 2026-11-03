import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Les espaces connectés sont rendus côté client (session en localStorage, choix du brief) :
    // rien à prérendre avant la lecture de la session. On ne valide donc l'« instant navigation »
    // que sur les segments qui exportent explicitement `instant`.
    instantInsights: { validationLevel: "manual-warning" },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
