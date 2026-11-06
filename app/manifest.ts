import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AlloProf",
    short_name: "AlloProf",
    description: "Des professeurs de maison au Bénin, et un suivi de chaque cours.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F3",
    theme_color: "#0F5C63",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
