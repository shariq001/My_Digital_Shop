export const CATEGORIES = [
  "Portfolio",
  "SaaS Landing",
  "E-commerce",
  "Admin Dashboard"
] as const;

export type Category = typeof CATEGORIES[number];
