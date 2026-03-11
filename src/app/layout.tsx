import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "E-Store by Md. Shadman Sakib Rahman",
    template: "%s | E-Store",
  },
  description:
    "Discover curated products with a modern shopping experience. Quality, style, and value — delivered to your door.",
  keywords: [
    "ecommerce",
    "online store",
    "shopping",
    "products",
    "fashion",
    "electronics",
    "home",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "E-Store",
    title: "E-Store by Md. Shadman Sakib Rahman",
    description:
      "Discover curated products with a modern shopping experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Store by Md. Shadman Sakib Rahman",
    description:
      "Discover curated products with a modern shopping experience.",
  },
  authors: [{ name: "Md. Shadman Sakib Rahman" }],
  creator: "Md. Shadman Sakib Rahman",
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "E-Store",
  description:
    "Discover curated products with a modern shopping experience.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "{NEXT_PUBLIC_APP_URL}/products?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  founder: {
    "@type": "Person",
    name: "Md. Shadman Sakib Rahman",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
