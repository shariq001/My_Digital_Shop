import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devthemes-store.vercel.app"),
  title: "DevThemes — Developer Templates by Muhammad Shariq",
  description: "A premium collection of high-performance web templates and components tailored for developers.",
  openGraph: {
    title: "DevThemes — Developer Templates by Muhammad Shariq",
    description: "A premium collection of high-performance web templates and components tailored for developers.",
    url: "https://devthemes-store.vercel.app",
    siteName: "DevThemes",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevThemes Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import SplashIntro from "@/components/feature/SplashIntro";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col selection:bg-primary/30 relative z-0`}
      >
        <SplashIntro />
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] h-[50vw] w-[50vw] rounded-full bg-primary/20 blur-[150px] animate-blob" />
          <div className="absolute top-[20%] right-[0%] h-[60vw] w-[60vw] rounded-full bg-[#0891b2]/20 blur-[150px] animate-blob-delayed" />
          <div className="absolute -bottom-[20%] left-[20%] h-[50vw] w-[50vw] rounded-full bg-[#0ea5e9]/20 blur-[150px] animate-blob-slow" />
        </div>
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
