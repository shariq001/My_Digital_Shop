import { ExternalLink } from "lucide-react";

/**
 * Minimalist Footer component for the storefront.
 * Contains copyright text and external links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-black/20 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {currentYear} Muhammad Shariq. Built with Next.js.
        </p>
        <div className="flex items-center gap-6">
          <a 
            href="https://devthemes.etsy.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-sm"
          >
            Etsy Shop
            <ExternalLink className="h-3 w-3" />
          </a>
          <a 
            href="https://muhammad---shariq.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-sm"
          >
            Main Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
