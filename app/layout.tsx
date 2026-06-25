import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PinnedJobsChecker from "@/components/PinnedJobsChecker";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "DEV — Offres d'emploi",
  description: "Les meilleures offres d'emploi tech",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={geist.variable}>
      <body className="min-h-screen bg-white font-[var(--font-geist)]">
        <nav className="bg-[#1b2a4a] text-white px-8 py-4 flex items-center justify-between">
          <span className="font-bold text-lg tracking-wide">⬡ DEV</span>
        </nav>

        <PinnedJobsChecker />

        {children}
      </body>
    </html>
  );
}