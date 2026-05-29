export type SocialStat = {
  label: string;
  value: string;
  source: "TikTok" | "Instagram";
  verifiedDate: string;
};

export type SocialDestination = {
  title: string;
  label: string;
  description: string;
  href: string;
  kind: "external" | "anchor";
  source: "TikTok" | "Instagram" | "Contact";
};

export const grandmaWillieContent = {
  brand: {
    name: "Grandma Willie",
    logoAlt: "Grandma Willie Homestyle Cooking logo",
    wordmark: "/logos/grandma-willie-wordmark.png",
    mascot: "/logos/grandma-willie-mascot.png",
  },
  hero: {
    eyebrow: "Alabama Homestyle Cooking",
    headline: "Southern cooking, Alabama soul, and the kind of kitchen love people remember.",
    body: "Grandma Willie shares homestyle meals, family-rooted recipes, and warm kitchen moments from Alabama — built for followers, food lovers, and brands who want real Southern personality.",
    primaryCta: "Book / Contact Grandma Willie",
    secondaryCta: "Watch Her Kitchen Videos",
    proofLine: "TikTok + Instagram community · Homestyle cooking · Alabama-rooted creator",
  },
  bio: {
    eyebrow: "About Grandma Willie",
    title: "Rooted in Alabama. Made with love. Shared from the heart.",
    body: "Grandma Willie brings the comfort of Southern home cooking to every video, every plate, and every story she shares. Her kitchen reflects family, resilience, laughter, and the kind of meals that bring people back to the table.",
    values: [
      {
        icon: "home" as const,
        label: "Alabama Roots",
        description: "A cooking voice shaped by home, heritage, and lived experience.",
      },
      {
        icon: "heart" as const,
        label: "Family Warmth",
        description: "Food that feels personal, familiar, and welcoming.",
      },
      {
        icon: "utensils" as const,
        label: "Homestyle Flavor",
        description: "Simple, soulful meals made with care, not performance.",
      },
    ],
    quote: "This kitchen holds everything — the love, the recipes, the memories.",
  },
  phone: {
    privateValue: "913.293.3104",
    tel: "+19132933104",
    publicDisplayApproved: false,
  },
  socialLinks: {
    tiktok: "https://www.tiktok.com/@will46shelby",
    instagram: "https://www.instagram.com/grandmawillie184",
  },
  socialStats: [
    {
      label: "TikTok followers",
      value: "301.3K",
      source: "TikTok",
      verifiedDate: "2026-05-29",
    },
    {
      label: "TikTok likes",
      value: "1.7M",
      source: "TikTok",
      verifiedDate: "2026-05-29",
    },
    {
      label: "Instagram followers",
      value: "210K",
      source: "Instagram",
      verifiedDate: "2026-05-29",
    },
  ] satisfies SocialStat[],
  social: {
    eyebrow: "Watch Grandma Willie",
    headline: "Follow the kitchen that feels like home.",
    body: "Watch Grandma Willie cook, laugh, share stories, and bring people into the warmth of her kitchen across TikTok and Instagram.",
    categories: ["Comfort meals", "Kitchen moments", "Family warmth", "Southern recipes"],
  },
  follow: {
    eyebrow: "Follow Grandma Willie",
    headline: "Real channels. Real ways to follow along.",
    body: "Use the official public profiles below to watch the latest videos, follow the kitchen, or send a message.",
  },
  contact: {
    eyebrow: "Contact",
    headline: "Bring Grandma Willie to the conversation.",
    body: "For brand collaborations, cooking content features, community events, catering-related inquiries, or general messages — use the form below and the team will follow up.",
    leftPanel: {
      title: "Booking, collaborations & kitchen features",
      body: "Use this form for brand partnerships, interviews, food features, local events, catering-related inquiries, or general messages for Grandma Willie.",
      useCases: [
        "Brand collaborations",
        "Cooking content features",
        "Event or community appearances",
        "General questions",
      ],
      responseNote: "The team typically responds within 2–3 business days.",
    },
  },
  socialDestinations: [
    {
      title: "TikTok",
      label: "Watch on TikTok",
      description:
        "Watch daily kitchen videos, recipes, and personality-driven food moments from Grandma Willie.",
      href: "https://www.tiktok.com/@will46shelby",
      kind: "external",
      source: "TikTok",
    },
    {
      title: "Instagram",
      label: "Follow on Instagram",
      description:
        "Follow for photos, reels, updates, and behind-the-scenes kitchen moments.",
      href: "https://www.instagram.com/grandmawillie184",
      kind: "external",
      source: "Instagram",
    },
    {
      title: "Booking & Messages",
      label: "Send Inquiry",
      description:
        "For collaborations, cooking features, interviews, and bookings — reach out directly.",
      href: "#contact",
      kind: "anchor",
      source: "Contact",
    },
  ] satisfies SocialDestination[],
  contactOptions: [
    "Brand collaboration",
    "Cooking content feature",
    "Event or community appearance",
    "Catering inquiry",
    "Booking request",
    "General message",
  ],
  seo: {
    title: "Grandma Willie | Alabama Homestyle Cooking Creator",
    description:
      "Grandma Willie brings Alabama roots, family warmth, and homestyle cooking made with love to TikTok, Instagram, and beyond. Book, collaborate, or follow along.",
    ogImage: "/logos/grandma-willie-mascot.png",
  },
} as const;

export const navItems = [
  { label: "Story", href: "#about" },
  { label: "Videos", href: "#videos" },
  { label: "Follow", href: "#follow" },
  { label: "Contact", href: "#contact" },
];
