import { z } from "zod";

export const DevThemeSchema = z.object({
  id: z.string().min(1, "ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
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
    title: "Next.js AI Agent Template",
    description: "A high-performance web template tailored for Agentic AI workflows with seamless tool integrations.",
    thumbnailUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    etsyUrl: "https://devthemes.etsy.com",
    livePreviewUrl: "https://muhammad---shariq.vercel.app/",
    tags: ["Next.js", "Tailwind", "AI"],
  },
  {
    id: "theme-02",
    title: "Minimalist Dev Portfolio",
    description: "Clean, ultra-fast portfolio template for software engineers. Includes integrated blog and project showcase.",
    thumbnailUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
    etsyUrl: "https://devthemes.etsy.com",
    livePreviewUrl: "https://muhammad---shariq.vercel.app/",
    tags: ["React", "CSS", "Minimal"],
  }
];

// This validates the array at build/runtime. If data is malformed, it throws explicitly.
export const DEV_THEMES = z.array(DevThemeSchema).parse(RAW_DEV_THEMES);
