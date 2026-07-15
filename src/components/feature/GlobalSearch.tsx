"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

export default function GlobalSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get("q") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce the typed input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Sync debounced input to URL
  const initialMount = useRef(true);
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    const params = new URLSearchParams(searchParams?.toString() || "");
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }

    const newUrl = params.toString() ? `/?${params.toString()}` : "/";
    
    // If not on homepage, redirect to homepage with query
    if (window.location.pathname !== "/") {
      if (debouncedQuery) {
        router.push(newUrl);
      }
    } else {
      // If already on homepage, just update the URL without scrolling
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedQuery, router, searchParams]);

  // Sync state if URL changes externally (e.g. going back or clear filters)
  useEffect(() => {
    const q = searchParams?.get("q") || "";
    if (q !== debouncedQuery) {
      setQuery(q);
      setDebouncedQuery(q);
    }
  }, [searchParams]);

  return (
    <div className="relative w-full max-w-sm hidden md:block">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
      <input
        type="text"
        placeholder="Search templates..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-9 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-full text-sm text-white placeholder-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
      />
      {query && (
        <button 
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
