import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import { CookieConsentBanner } from "@/components/organisms/cookie-consent-banner";
import { COPY_SITE } from "@/lib/constants/copy-site";

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

const { metadata: copyMeta } = COPY_SITE;

export const metadata: Metadata = {
  title: {
    default: copyMeta.defaultTitle,
    template: "%s | Lex Rocha",
  },
  description: copyMeta.description,
  metadataBase: new URL(appUrl),
  keywords: [...copyMeta.keywords],
  authors: [{ name: "Tiago Aureliano da Rocha" }],
  creator: "Lex Rocha — Pesquisa de Jurisprudência",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: appUrl,
    siteName: "Lex Rocha",
    title: copyMeta.defaultTitle,
    description: copyMeta.ogDescription,
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
    title: copyMeta.defaultTitle,
    description: copyMeta.ogDescription,
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
        <CookieConsentBanner />
      </body>
    </html>
  );
}
