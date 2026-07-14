import { DEV_THEMES } from "@/config/shop-data";
import ListingCard from "./ListingCard";

/**
 * Responsive Grid component that automatically renders all available listings.
 * Displays an empty state message if no listings are configured.
 */
export default function Grid() {
  if (!DEV_THEMES || DEV_THEMES.length === 0) {
    return (
      <section className="flex min-h-[40vh] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-surface/30 p-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">No listings yet</h2>
        <p className="max-w-md text-muted">
          We are currently crafting new digital themes. Check back later or add new configurations to the data layer.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {DEV_THEMES.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}
