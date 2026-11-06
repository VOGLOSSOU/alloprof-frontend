import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AlloProf : professeurs de maison au Bénin",
    template: "%s · AlloProf",
  },
  description:
    "Décrivez votre besoin, nous trouvons le professeur de maison qu'il vous faut à Cotonou, Abomey-Calavi, Porto-Novo et Parakou.",
};

export const viewport: Viewport = {
  themeColor: "#0F5C63",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
