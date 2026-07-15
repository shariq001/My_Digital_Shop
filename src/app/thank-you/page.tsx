import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You | DevThemes",
  description: "Thank you for your purchase or sign-up at DevThemes.",
};

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-up text-center px-4">
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute inset-0 w-32 h-32 -translate-x-2 -translate-y-2 bg-primary/20 blur-2xl rounded-full" />
        <CheckCircle className="w-24 h-24 text-primary relative z-10" />
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
        You're all set!
      </h1>
      
      <p className="text-xl text-muted max-w-md mb-10">
        Thank you for joining the DevThemes community. Your code has been revealed, and you are ready to start building.
      </p>

      <Link 
        href="/"
        className="px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-primary-dim hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] active:scale-95"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
