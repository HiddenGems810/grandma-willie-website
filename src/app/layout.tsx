import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { grandmaWillieContent } from "@/content/grandma-willie";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://grandmawillie.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: grandmaWillieContent.seo.title,
    template: `%s | Grandma Willie`,
  },
  description: grandmaWillieContent.seo.description,
  keywords: [
    "Grandma Willie",
    "Alabama homestyle cooking",
    "Southern food creator",
    "soul food TikTok",
    "Southern cooking videos",
    "Alabama food influencer",
    "Black food creator",
    "homestyle recipes",
  ],
  authors: [{ name: "Grandma Willie" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Grandma Willie",
    title: grandmaWillieContent.seo.title,
    description: grandmaWillieContent.seo.description,
    images: [
      {
        url: grandmaWillieContent.seo.ogImage,
        width: 900,
        height: 900,
        alt: "Grandma Willie — Alabama Homestyle Cooking",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: grandmaWillieContent.seo.title,
    description: grandmaWillieContent.seo.description,
    images: [grandmaWillieContent.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-[var(--color-cream)] text-[var(--color-cast-iron)]">
        {children}
      </body>
    </html>
  );
}
