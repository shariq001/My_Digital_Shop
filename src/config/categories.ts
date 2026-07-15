export const CATEGORIES = [
  "Portfolio",
  "Bundles",
  "SaaS Landing",
  "E-commerce",
  "Admin Dashboard",
  "FAQ",
  "404",
] as const;

export type Category = typeof CATEGORIES[number];
