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
  preload: true,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://grandma-willie-website.vercel.app";

const seo = grandmaWillieContent.seo;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: seo.title,
    template: `%s | Grandma Willie`,
  },

  description: seo.description,

  keywords: [
    "Grandma Willie",
    "Alabama homestyle cooking",
    "Southern food creator",
    "soul food TikTok",
    "Southern cooking videos",
    "Alabama food influencer",
    "homestyle recipes",
    "Southern cookbook",
    "fried chicken recipe",
    "collard greens",
    "peach cobbler",
    "cornbread",
    "book food creator",
    "TikTok food creator collaboration",
  ],

  authors: [{ name: "Grandma Willie", url: siteUrl }],

  creator: "Grandma Willie",

  publisher: "Grandma Willie",

  category: "Food & Cooking",

  classification: "Food Creator / Brand Collaboration",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Grandma Willie",
    title: seo.title,
    description: seo.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Grandma Willie — Alabama Homestyle Cooking Creator",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/opengraph-image"],
    creator: "@will46shelby",
    site: "@will46shelby",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ?? "",
  },

  // Explicit favicon declarations — overrides any Next.js defaults
  icons: {
    icon: [
      { url: "/logos/grandma-willie-mascot.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "any" },
    ],
    apple: [
      { url: "/icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/logos/grandma-willie-mascot.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Grandma Willie",
    description: seo.description,
    url: siteUrl,
    sameAs: [
      "https://www.tiktok.com/@will46shelby",
      "https://www.instagram.com/grandmawillie184",
    ],
    knowsAbout: [
      "Southern Cooking",
      "Alabama Homestyle Recipes",
      "Soul Food",
      "Fried Chicken",
      "Collard Greens",
      "Cornbread",
      "Peach Cobbler",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Food Content Creator",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "AL",
      addressCountry: "US",
    },
  };

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full bg-[var(--color-cream)] text-[var(--color-cast-iron)]">
        {children}
      </body>
    </html>
  );
}
