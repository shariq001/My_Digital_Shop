import { z } from "zod";
import { CATEGORIES } from "./categories";

export const DevThemeSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().max(100, "Short description must be <= 100 chars"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(CATEGORIES as unknown as [string, ...string[]]),
  featured: z.boolean().optional(),
  thumbnailUrl: z.string().min(1, "Thumbnail URL is required"),
  etsyUrl: z.string().url("Etsy URL must be a valid URL"),
  livePreviewUrl: z.string().url("Live Preview URL must be a valid URL"),
  tags: z.array(z.string()).optional(),
});

export type DevThemeListing = z.infer<typeof DevThemeSchema>;

// Raw data array
const RAW_DEV_THEMES = [
  {
    id: "theme-01",
    title: "Portfolio Template",
    shortDescription: "A conversion-focused landing page template for SaaS founders.",
    description: "A clean, modern, and fully responsive portfolio template built with Next.js and Tailwind CSS. ",
    category: "Portfolio",
    featured: false,
    thumbnailUrl: "/ListingImages/Listing-1.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4534778952/responsive-nextjs-tailwind-portfolio",
    livePreviewUrl: "https://etsy-portfolios-aiengineer.vercel.app/",
    tags: ["Next.js", "Tailwind", "AI", "Portfolio"],
  },
  {
    id: "theme-02",
    title: "FAQ Template",
    shortDescription: "Next.js FAQ Accordion Template – Responsive Website Component (Digital Download)",
    description: "A clean, responsive FAQ template with a modern design. Perfect for businesses looking to provide clear and concise information to their customers.",
    category: "FAQ",
    featured: false,
    thumbnailUrl: "/ListingImages/Listing-2.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4535318188/nextjs-faq-accordion-template-responsive",
    livePreviewUrl: "https://etsy-faqs-1.vercel.app/",
    tags: ["Next.Js", "Tailwind CSS", "FAQ"],
  },
  {
    id: "theme-03",
    title: "404 Page Template",
    shortDescription: "Next.js 404 Page Template – Responsive Website Component (Digital Download)",
    description: "A clean, responsive 404 page template with a modern design. Perfect for businesses looking to provide clear and concise information to their customers.",
    category: "404",
    featured: false,
    thumbnailUrl: "/ListingImages/Listing-3.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4535890104/nextjs-404-error-page-template-defi",
    livePreviewUrl: "https://etsy-404-temp1.vercel.app/",
    tags: ["Next.Js", "Tailwind CSS", "404"],
  },
  {
    id: "theme-04",
    title: "UGC Portfolio Template",
    shortDescription: "Fitness UGC Creator Portfolio Template | Next.js Website for Brand Deals",
    description: "Fitness UGC Creator Portfolio Template | Next.js Website for Brand Deals",
    category: "Portfolio",
    featured: true,
    thumbnailUrl: "/ListingImages/Listing-4.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4536232934/fitness-ugc-creator-portfolio-template",
    livePreviewUrl: "https://etsy-ugc-temp1-nu.vercel.app/",
    tags: ["Next.Js", "Tailwind CSS", "UGC", "Portfolio"],
  },
  {
    id: "theme-05",
    title: "Personal Linktree",
    shortDescription: "Developer Portfolio Link-in-Bio Template | Next.js, Tailwind CSS, TypeScript",
    description: "eveloper Portfolio Link-in-Bio Template | Next.js, Tailwind CSS, TypeScript",
    category: "Portfolio",
    featured: false,
    thumbnailUrl: "/ListingImages/Listing-5.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4536872851/developer-portfolio-link-in-bio-template",
    livePreviewUrl: "https://link-in-bio-hub-rho.vercel.app",
    tags: ["Next.Js", "Tailwind CSS", "Link-In-Bio", "Portfolio"],
  },
  {
    id: "theme-06",
    title: "Digital Resume",
    shortDescription: "Next.js Resume Template – Interactive CV Website & Developer Portfolio, ATS-Friendly Executive Design, Digital Download",
    description: "Next.js Resume Template – Interactive CV Website & Developer Portfolio, ATS-Friendly Executive Design, Digital Download",
    category: "Portfolio",
    featured: true,
    thumbnailUrl: "/ListingImages/Listing-6.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4537335792/nextjs-resume-template-interactive-cv",
    livePreviewUrl: "https://digital-resume-template-seven.vercel.app",
    tags: ["Next.Js", "Tailwind CSS", "Resume", "Portfolio"],
  },
  {
    id: "theme-07",
    title: "Custom Digital Resume",
    shortDescription: "Custom Digital Resume Website | ATS Friendly Online Portfolio (Made to Order)",
    description: "Custom Digital Resume Website | ATS Friendly Online Portfolio (Made to Order)",
    category: "Portfolio",
    featured: true,
    thumbnailUrl: "/ListingImages/Listing-7.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4537594069/custom-digital-resume-website-ats",
    livePreviewUrl: "https://digital-resume-template-seven.vercel.app",
    tags: ["Next.Js", "Tailwind CSS", "Resume", "Portfolio"],
  },
  {
    id: "theme-08",
    title: "Developer Bundle",
    shortDescription: "Minimal Developer Portfolio & Link in Bio Template Bundle | Personal Website and Linktree Alternative",
    description: "Minimal Developer Portfolio & Link in Bio Template Bundle | Personal Website and Linktree Alternative",
    category: "Bundles",
    featured: true,
    thumbnailUrl: "/ListingImages/Listing-8.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4538185513/minimal-developer-portfolio-link-in-bio",
    tags: ["Next.Js", "Tailwind CSS", "Bundle", "Portfolio", "Link-In-Bio"],
  }
];

// This validates the array at build/runtime. If data is malformed, it throws explicitly.
export const DEV_THEMES = z.array(DevThemeSchema).parse(RAW_DEV_THEMES);

