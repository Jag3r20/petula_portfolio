import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://petulatravnickova.vercel.app"),
  title: {
    default: "Petula Trávníčková — fotografka",
    template: "%s — Petula Trávníčková",
  },
  description:
    "Portfolio fotografky Petuly Trávníčkové — reportáž, portréty, firemní fotografie a volná tvorba.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Petula Trávníčková — fotografka",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="cs"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
