import { Suspense } from "react";
import { DEV_THEMES } from "@/config/shop-data";
import { PromoEmailForm } from "@/components/feature/promo-email-form";
import ShopExplorer from "@/components/feature/ShopExplorer";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-16 pt-8 animate-fade-up">
      <section className="flex flex-col gap-4 text-center sm:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Muhammad Shariq's Digital <span className="text-primary">Products</span>
        </h1>
        <p className="max-w-2xl text-lg text-muted">
          Browse premium Next.js themes and components.
        </p>
      </section>

      <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted">Loading shop...</div>}>
        <ShopExplorer listings={DEV_THEMES} />
      </Suspense>

      <section className="py-12 mt-8 border-t border-white/5">
        <PromoEmailForm />
      </section>
    </div>
  );
}
