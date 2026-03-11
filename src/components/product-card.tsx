"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: string;
    compareAtPrice: string | null;
    shortDescription: string | null;
    stock: number;
    isFeatured: boolean;
    images: { url: string; alt: string | null }[];
    category: { name: string; slug: string } | null;
    averageRating?: number;
    reviewCount?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images[0];
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
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:shadow-md">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {isOnSale && (
              <Badge className="bg-red-500 text-white hover:bg-red-500">
                -{discountPercent}%
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="secondary">Out of stock</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Details */}
        <div className="p-4">
          {product.category && (
            <p className="mb-1 text-xs text-muted-foreground">
              {product.category.name}
            </p>
          )}
          <h3 className="font-medium leading-tight line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          {product.reviewCount !== undefined && product.reviewCount > 0 && (
            <div className="mt-1.5 flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.round(product.averageRating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-semibold">
              {formatPrice(product.price)}
            </span>
            {isOnSale && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
