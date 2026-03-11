import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const footerLinks = {
  shop: [
    { href: "/products", label: "All Products" },
    { href: "/categories", label: "Categories" },
    { href: "/products?sortBy=newest", label: "New Arrivals" },
  ],
  account: [
    { href: "/dashboard", label: "My Account" },
    { href: "/orders", label: "Order History" },
    { href: "/wishlist", label: "Wishlist" },
  ],
  info: [
    { href: "#", label: "About Us" },
    { href: "#", label: "Contact" },
    { href: "#", label: "Shipping & Returns" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <ShoppingBag className="h-5 w-5" />
              <span>E-Store</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A modern ecommerce experience by{" "}
              <span className="font-medium text-foreground">
                Md. Shadman Sakib Rahman
              </span>
              . Quality, style, and value — delivered to your door.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Account
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Information
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} E-Store. All rights reserved.</p>
          <p className="mt-1">
            Founded &amp; operated by{" "}
            <span className="font-medium text-foreground">
              Md. Shadman Sakib Rahman
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
