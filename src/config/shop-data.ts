import { z } from "zod";
import { CATEGORIES } from "./categories";

export const DevThemeSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().max(100, "Short description must be <= 100 chars"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(CATEGORIES as [string, ...string[]]),
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
    featured: true,
    thumbnailUrl: "/ListingImages/Listing-1.png",
    etsyUrl: "https://devthemes.etsy.com/listing/4534778952/responsive-nextjs-tailwind-portfolio",
    livePreviewUrl: "https://etsy-portfolios-aiengineer.vercel.app/",
    tags: ["Next.js", "Tailwind", "AI"],
  },
  {
    id: "theme-02",
    title: "Minimalist Dev Portfolio",
    shortDescription: "Clean, fast portfolio template for software engineers.",
    description: "Clean, ultra-fast portfolio template for software engineers. Includes integrated blog and project showcase.",
    category: "Portfolio",
    featured: false,
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    etsyUrl: "https://devthemes.etsy.com",
    livePreviewUrl: "https://muhammad---shariq.vercel.app/",
    tags: ["React", "CSS", "Minimal"],
  }
];

// This validates the array at build/runtime. If data is malformed, it throws explicitly.
export const DEV_THEMES = z.array(DevThemeSchema).parse(RAW_DEV_THEMES);

