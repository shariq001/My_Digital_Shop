import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import GlobalSearch from "@/components/feature/GlobalSearch";

/**
 * Global Floating Header component for the storefront.
 * Includes a backdrop-blur effect and a return link to the main portfolio.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-sm shrink-0"
        >
          DevThemes<span className="text-primary">.</span>
        </Link>
        
        <div className="flex-1 flex justify-center">
          <Suspense fallback={<div className="h-9 w-64 bg-white/5 rounded-full animate-pulse hidden md:block" />}>
            <GlobalSearch />
          </Suspense>
        </div>

        <nav className="shrink-0">
          <a 
            href="https://muhammad---shariq.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black rounded-sm"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Portfolio
          </a>
        </nav>
      </div>
    </header>
  );
}
