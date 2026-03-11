import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  Shield,
  ChevronRight,
} from "lucide-react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductReviews } from "@/components/product-reviews";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isOnSale =
    product.compareAtPrice &&
    parseFloat(product.compareAtPrice) > parseFloat(product.price);
  const discountPercent = isOnSale
    ? Math.round(
        ((parseFloat(product.compareAtPrice!) - parseFloat(product.price)) /
          parseFloat(product.compareAtPrice!)) *
          100
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-foreground transition-colors">
          Products
        </Link>
        {product.category && (
          <>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/products?category=${product.category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image Gallery */}
        <ProductImageGallery images={product.images} productName={product.name} />

        {/* Product Info */}
        <div className="flex flex-col">
          {/* Category */}
          {product.category && (
            <Link
              href={`/products?category=${product.category.slug}`}
              className="mb-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {product.category.name}
            </Link>
          )}

          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

          {/* Rating Summary */}
          {product.reviewCount > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.averageRating.toFixed(1)} ({product.reviewCount}{" "}
                {product.reviewCount === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
            {isOnSale && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
                <Badge className="bg-red-500 text-white hover:bg-red-500">
                  -{discountPercent}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Short Description */}
          {product.shortDescription && (
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
          )}

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="mt-6 space-y-4">
              <h3 className="text-sm font-medium">Options</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className="rounded-md border px-4 py-2 text-sm transition-colors hover:border-foreground"
                  >
                    {variant.name}
                    {variant.price && (
                      <span className="ml-1 text-muted-foreground">
                        ({formatPrice(variant.price)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="mt-6">
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 dark:text-green-400">
                In stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-red-500">Out of stock</p>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <AddToCartButton
              productId={product.id}
              disabled={product.stock === 0}
            />
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="mt-8 space-y-3 rounded-lg border bg-muted/30 p-4">
            {[
              { icon: Truck, text: "Free shipping on orders over $50" },
              { icon: RotateCcw, text: "30-day easy returns" },
              { icon: Shield, text: "Secure checkout guaranteed" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* SKU & Tags */}
          <div className="mt-6 space-y-1 text-xs text-muted-foreground">
            {product.sku && <p>SKU: {product.sku}</p>}
            {product.tags && (product.tags as string[]).length > 0 && (
              <div className="flex items-center gap-2">
                <span>Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {(product.tags as string[]).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Description */}
      {product.description && (
        <section className="mt-16 border-t pt-10">
          <h2 className="mb-4 text-xl font-bold">Description</h2>
          <div className="prose max-w-none text-muted-foreground dark:prose-invert">
            {product.description.split("\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <ProductReviews
        productId={product.id}
        reviews={product.reviews}
        averageRating={product.averageRating}
        reviewCount={product.reviewCount}
      />
    </div>
  );
}
