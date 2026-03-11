import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/queries";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse our product categories
        </p>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="group flex items-center justify-between rounded-lg border bg-card p-6 transition-all hover:shadow-md"
            >
              <div>
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                {cat.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {cat.description}
                  </p>
                )}
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-20">
          <p className="text-lg font-medium">No categories yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Run the seed script to add demo data
          </p>
        </div>
      )}
    </div>
  );
}
