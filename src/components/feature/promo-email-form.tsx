"use client";

import { useState } from "react";
import { subscribeEmailAction } from "@/app/api/actions/email-subscribe";
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * PromoEmailForm Component
 * 
 * A standalone, client-side form component that captures user emails in exchange for a promo code.
 * It handles the loading, error, and success states and uses a Next.js server action
 * to securely validate the email via Abstract API and log it to Google Sheets.
 * 
 * @returns React node representing the email submission form or the success state.
 */
export function PromoEmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Client-side format check (Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a syntactically valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    // 2. Server-side validation
    const response = await subscribeEmailAction(email, "homepage");

    if (response.success && response.promoCode) {
      setStatus("success");
      setPromoCode(response.promoCode);
    } else {
      setStatus("error");
      setMessage(response.message || "An error occurred.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
      // Fallback: the text is already selectable in the UI
    });
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-surface rounded-xl border border-border animate-in fade-in zoom-in duration-300">
        <CheckCircle2 className="w-12 h-12 text-primary mb-3" />
        <h3 className="text-xl font-bold text-white mb-2">You&apos;re in!</h3>
        <p className="text-muted text-center mb-4">
          Use the promo code below at checkout:
        </p>
        <div className="bg-base px-6 py-3 rounded-lg border-2 border-primary border-dashed text-2xl font-mono font-bold text-primary tracking-wider mb-4 select-all">
          {promoCode}
        </div>
        <button
          onClick={handleCopy}
          className="text-sm font-medium px-4 py-2 bg-primary text-black rounded hover:bg-primary-dim transition-colors"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-surface rounded-xl shadow-lg border border-border transition-all">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Get 10% Off</h3>
        <p className="text-muted text-sm">
          Subscribe to our newsletter and receive an instant discount code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-muted" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            placeholder="Enter your email address"
            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors text-white
              ${status === "error" 
                ? "border-red-500 focus:ring-red-500/50 bg-red-950/20" 
                : "border-border focus:ring-primary focus:border-primary bg-base hover:bg-surface"
              }
            `}
            required
          />
        </div>

        {status === "error" && (
          <div className="flex items-center text-red-400 text-sm mt-2 animate-in slide-in-from-top-1 fade-in">
            <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-black font-semibold bg-primary hover:bg-primary-dim active:scale-[0.98] focus:ring-4 focus:ring-primary/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {status === "submitting" ? (
            <span className="flex items-center text-black">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Validating...
            </span>
          ) : (
            <span className="flex items-center text-black">
              Reveal Promo Code
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
