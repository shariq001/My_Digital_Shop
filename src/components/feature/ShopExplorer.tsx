"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import type { DevThemeListing } from "@/config/shop-data";
import { CATEGORIES } from "@/config/categories";
import ListingCard from "@/components/ui/ListingCard";

interface ShopExplorerProps {
  listings: DevThemeListing[];
}

export default function ShopExplorer({ listings }: ShopExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const query = searchParams.get("q") || "";

  // Update URL on category change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (activeCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", activeCategory);
    }
    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    router.replace(newUrl, { scroll: false });
  }, [activeCategory, router, searchParams]);

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchCategory = 
        activeCategory === "All" || 
        (activeCategory === "Featured" && listing.featured) || 
        listing.category === activeCategory;
      const lowerQuery = query.toLowerCase();
      const matchSearch =
        !lowerQuery ||
        listing.title.toLowerCase().includes(lowerQuery) ||
        (listing.tags && listing.tags.some(tag => tag.toLowerCase().includes(lowerQuery)));
      return matchCategory && matchSearch;
    });
  }, [listings, activeCategory, query]);

  const featuredListings = listings.filter((l) => l.featured);

  // Category counts based on ALL listings (not just filtered by search)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: listings.length };
    counts["Featured"] = listings.filter((l) => l.featured).length;
    CATEGORIES.forEach(cat => {
      counts[cat] = listings.filter(l => l.category === cat).length;
    });
    return counts;
  }, [listings]);

  return (
    <div className="flex flex-col gap-12 w-full animate-fade-up">
      {/* Featured Section */}
      {featuredListings.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">Featured</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      )}

      {/* All Products Header & Explorer */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-white">All Products</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Main Explorer Section */}
        <section className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filters Toggle */}
        <div className="lg:hidden flex items-center justify-between w-full">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-white hover:border-primary transition-colors"
          >
            <Filter className="w-4 h-4" />
            Categories ({activeCategory})
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`
          fixed inset-0 z-50 bg-base/95 backdrop-blur-md p-6 lg:p-0
          lg:static lg:bg-transparent lg:z-auto lg:w-64 lg:shrink-0 lg:block
          transition-transform duration-300
          ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-8">
            <h3 className="text-xl font-bold text-white">Filters</h3>
            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-muted hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-2">Categories</h3>
            {["All", "Featured", ...CATEGORIES].map((category) => {
              const count = categoryCounts[category] || 0;
              if (count === 0 && category !== "All") return null; // Hide empty categories

              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsMobileFiltersOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition-all cursor-pointer ${
                    isActive 
                      ? "bg-primary text-black font-bold" 
                      : "text-muted hover:text-white hover:bg-surface"
                  }`}
                >
                  <span>{category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-black/20 text-black' : 'bg-surface text-muted group-hover:text-white'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Grid Area */}
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border rounded-2xl bg-surface/30">
              <p className="text-xl text-white mb-2">No listings match your search.</p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete("q");
                  router.push(`/?${params.toString()}`);
                }}
                className="mt-4 px-4 py-2 bg-surface hover:bg-white/10 border border-border rounded-lg text-white transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        </section>
      </div>
    </div>
  );
}
