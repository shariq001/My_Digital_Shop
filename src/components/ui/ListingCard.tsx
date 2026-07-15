import Image from "next/image";
import { ExternalLink, Eye } from "lucide-react";
import type { DevThemeListing } from "@/config/shop-data";

interface ListingCardProps {
  listing: DevThemeListing;
}

/**
 * Renders a single theme listing with thumbnail, details, tags, and CTAs.
 */
export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-black/20 p-[1px] transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.15)] focus-within:ring-2 focus-within:ring-primary focus-within:outline-none">
      <div className="absolute top-1/2 left-1/2 aspect-square w-[250%] -translate-x-1/2 -translate-y-1/2 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_300deg,var(--color-primary)_360deg)] opacity-30 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 flex h-full w-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/5">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40 border-b border-white/20">
        <Image
          src={listing.thumbnailUrl}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 flex-1 text-lg font-medium text-white group-hover:text-primary transition-colors">
          {listing.title}
        </h3>
        
        <p className="mt-2 text-sm text-muted line-clamp-2">
          {listing.shortDescription}
        </p>

        {listing.tags && listing.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-white/70 border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={listing.etsyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-bold text-black whitespace-nowrap transition-all hover:brightness-110 hover:text-black hover:scale-105 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
          >
            Get on Etsy
            <ExternalLink className="h-4 w-4" />
          </a>
          
          <a
            href={listing.livePreviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm font-semibold text-white whitespace-nowrap transition-all hover:border-primary/50 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
          >
            <Eye className="h-4 w-4" />
            Live Preview
          </a>
        </div>
      </div>
      </div>
    </article>
  );
}
