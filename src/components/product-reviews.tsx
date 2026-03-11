"use client";

import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  createdAt: Date;
  user: { name: string; image: string | null };
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

export function ProductReviews({
  reviews,
  averageRating,
  reviewCount,
}: ProductReviewsProps) {
  return (
    <section className="mt-16 border-t pt-10">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Customer Reviews ({reviewCount})
        </h2>
      </div>

      {reviewCount > 0 ? (
        <div className="space-y-4">
          {/* Rating Summary */}
          <div className="mb-8 flex items-center gap-4 rounded-lg border bg-muted/30 p-6">
            <div className="text-center">
              <p className="text-4xl font-bold">{averageRating.toFixed(1)}</p>
              <div className="mt-1 flex items-center justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </p>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {review.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{review.user.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {review.title && (
                  <h4 className="mt-3 font-medium">{review.title}</h4>
                )}
                {review.comment && (
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-muted/30 py-12 text-center">
          <p className="text-muted-foreground">No reviews yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Be the first to review this product
          </p>
        </div>
      )}
    </section>
  );
}
