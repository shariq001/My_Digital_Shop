import Grid from "@/components/ui/Grid";

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

      <Grid />
    </div>
  );
}
