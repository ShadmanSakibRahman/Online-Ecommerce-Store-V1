"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X } from "lucide-react";
import { UserProfile } from "@/components/auth/user-profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ui/mode-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:border focus:rounded-md"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" role="banner">
        <nav
          className="container mx-auto px-4"
          aria-label="Main navigation"
        >
          {/* Main row */}
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold tracking-tight transition-colors hover:text-primary"
                aria-label="Store - Go to homepage"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>E-Store</span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground",
                      pathname === link.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Center: Search (desktop) */}
            <div className="hidden max-w-md flex-1 md:block">
              <form action="/products" method="get">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Search products..."
                    className="h-9 pl-9 pr-4"
                  />
                </div>
              </form>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1" role="group" aria-label="User actions">
              {/* Mobile search toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" asChild>
                <Link href="/wishlist" aria-label="Wishlist">
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon" asChild className="relative">
                <Link href="/cart" aria-label="Cart">
                  <ShoppingBag className="h-4 w-4" />
                </Link>
              </Button>

              <UserProfile />
              <ModeToggle />

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="border-t py-3 md:hidden">
              <form action="/products" method="get">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Search products..."
                    className="pl-9"
                    autoFocus
                  />
                </div>
              </form>
            </div>
          )}

          {/* Mobile nav menu */}
          {mobileMenuOpen && (
            <div className="border-t py-4 md:hidden">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                      pathname === link.href
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
