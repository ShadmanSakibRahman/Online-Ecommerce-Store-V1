import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProducts, getCategories } from "@/lib/queries";
import { cn } from "@/lib/utils";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  const [{ products, total, totalPages, page }, categories] = await Promise.all(
    [
      getProducts({
        search: params.search || undefined,
        categorySlug: params.category || undefined,
        minPrice: params.minPrice ? Number(params.minPrice) : undefined,
        maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
        sortBy: params.sortBy || undefined,
        page: currentPage,
        limit: 12,
      }),
      getCategories(),
    ]
  );

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "name", label: "Name" },
  ];

  function buildUrl(overrides: Record<string, string | undefined>) {
    const p = { ...params, ...overrides };
    const searchParams = new URLSearchParams();
    Object.entries(p).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
    return `/products?${searchParams.toString()}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {params.search
            ? `Results for "${params.search}"`
            : params.category
              ? categories.find((c) => c.slug === params.category)?.name ||
                "Products"
              : "All Products"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} {total === 1 ? "product" : "products"}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters (desktop) */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
                Categories
              </h3>
              <div className="space-y-1">
                <Link
                  href={buildUrl({ category: undefined, page: undefined })}
                  className={cn(
                    "block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                    !params.category
                      ? "bg-accent font-medium text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  All
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={buildUrl({ category: cat.slug, page: undefined })}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                      params.category === cat.slug
                        ? "bg-accent font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider">
                Price Range
              </h3>
              <div className="space-y-1">
                {[
                  { label: "All Prices", min: undefined, max: undefined },
                  { label: "Under $25", min: undefined, max: "25" },
                  { label: "$25 - $50", min: "25", max: "50" },
                  { label: "$50 - $100", min: "50", max: "100" },
                  { label: "$100 - $200", min: "100", max: "200" },
                  { label: "Over $200", min: "200", max: undefined },
                ].map((range) => {
                  const isActive =
                    params.minPrice === range.min &&
                    params.maxPrice === range.max;
                  return (
                    <Link
                      key={range.label}
                      href={buildUrl({
                        minPrice: range.min,
                        maxPrice: range.max,
                        page: undefined,
                      })}
                      className={cn(
                        "block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                        isActive
                          ? "bg-accent font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {range.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Bar */}
          <div className="mb-6 flex items-center justify-between rounded-lg border bg-card px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Sort by:</span>
            </div>
            <div className="flex gap-1">
              {sortOptions.map((opt) => (
                <Link
                  key={opt.value}
                  href={buildUrl({ sortBy: opt.value, page: undefined })}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm transition-colors",
                    (params.sortBy || "newest") === opt.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-20">
              <p className="text-lg font-medium">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/products">Clear Filters</Link>
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {page > 1 && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={buildUrl({ page: String(page - 1) })}>
                    Previous
                  </Link>
                </Button>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - page) <= 2
                )
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const showEllipsis = prev !== undefined && p - prev > 1;
                  return (
                    <span key={p} className="flex items-center gap-2">
                      {showEllipsis && (
                        <span className="text-muted-foreground">...</span>
                      )}
                      <Link
                        href={buildUrl({ page: String(p) })}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
                          p === page
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent"
                        )}
                      >
                        {p}
                      </Link>
                    </span>
                  );
                })}
              {page < totalPages && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={buildUrl({ page: String(page + 1) })}>
                    Next
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
