import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://lexrocha.com.br";

export const metadata: Metadata = {
  title: {
    default: "Lex Rocha — Triagem Jurídica Inteligente",
    template: "%s | Lex Rocha",
  },
  description:
    "Triagem jurídica com IA para direito do consumidor digital. Bloqueios no WhatsApp/Meta, LGPD e falhas de serviço. Relatório gratuito na fase MVP.",
  metadataBase: new URL(appUrl),
  keywords: [
    "direito do consumidor digital",
    "bloqueio WhatsApp",
    "LGPD",
    "triagem jurídica",
    "LegalTech Brasil",
  ],
  authors: [{ name: "Tiago Aureliano da Rocha" }],
  creator: "Lex Rocha Tecnologia Jurídica",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: appUrl,
    siteName: "Lex Rocha",
    title: "Lex Rocha — Triagem Jurídica Inteligente",
    description:
      "Saiba se você tem direito após bloqueio em plataforma digital. Triagem gratuita na fase MVP.",
    images: [
      {
        url: "/images/founder/tiago-rocha.jpg",
        width: 800,
        height: 920,
        alt: "Lex Rocha — Fundador Tiago Aureliano da Rocha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lex Rocha — Triagem Jurídica Inteligente",
    description:
      "Triagem jurídica com IA para consumidor digital. Relatório gratuito na fase MVP.",
    images: ["/images/founder/tiago-rocha.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
