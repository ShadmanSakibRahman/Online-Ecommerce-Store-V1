import Link from "next/link";
import { ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getNewArrivals, getCategories } from "@/lib/queries";

export default async function Home() {
  const [featuredProducts, newArrivals, categories] = await Promise.all([
    getFeaturedProducts(8),
    getNewArrivals(4),
    getCategories(),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              New Season Collection
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Curated for
              <span className="block">modern living</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover thoughtfully designed products that blend quality,
              style, and everyday functionality.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 py-8 md:grid-cols-4">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
              { icon: Shield, title: "Secure Payment", desc: "100% protected" },
              { icon: Headphones, title: "24/7 Support", desc: "Dedicated help" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Find exactly what you&apos;re looking for
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/categories">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative flex h-32 items-end overflow-hidden rounded-lg border bg-muted/50 p-4 transition-colors hover:bg-muted"
              >
                <div>
                  <h3 className="font-semibold">{cat.name}</h3>
                  {cat.description && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                      {cat.description}
                    </p>
                  )}
                </div>
                <ArrowRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="border-t bg-muted/20">
          <div className="container mx-auto px-4 py-16">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Hand-picked favorites just for you
                </p>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/products?featured=true">
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">New Arrivals</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                The latest additions to our collection
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products?sortBy=newest">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state when no products */}
      {featuredProducts.length === 0 && newArrivals.length === 0 && (
        <section className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold">Welcome to your store</h2>
          <p className="mt-2 text-muted-foreground">
            Products will appear here once they&apos;re added. Run the seed
            script to populate with demo data:
          </p>
          <code className="mt-4 inline-block rounded-md bg-muted px-4 py-2 text-sm">
            pnpm run db:seed
          </code>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Stay in the loop</h2>
          <p className="mt-2 text-muted-foreground">
            Subscribe for new arrivals, exclusive deals, and more.
          </p>
          <form className="mx-auto mt-6 flex max-w-sm gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="button">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
