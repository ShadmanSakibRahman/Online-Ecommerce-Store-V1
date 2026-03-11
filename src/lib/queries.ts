import { eq, desc, sql, and, gte, lte, ilike, asc, count } from "drizzle-orm";
import { db } from "./db";
import { product, productImage, category, review } from "./schema";

export async function getFeaturedProducts(limit = 8) {
  const products = await db.query.product.findMany({
    where: and(eq(product.isPublished, true), eq(product.isFeatured, true)),
    with: {
      images: {
        orderBy: [asc(productImage.sortOrder)],
        limit: 1,
      },
      category: true,
    },
    orderBy: [desc(product.createdAt)],
    limit,
  });

  return addReviewStats(products);
}

export async function getNewArrivals(limit = 8) {
  const products = await db.query.product.findMany({
    where: eq(product.isPublished, true),
    with: {
      images: {
        orderBy: [asc(productImage.sortOrder)],
        limit: 1,
      },
      category: true,
    },
    orderBy: [desc(product.createdAt)],
    limit,
  });

  return addReviewStats(products);
}

export async function getProducts(options?: {
  categorySlug?: string | undefined;
  search?: string | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  sortBy?: string | undefined;
  page?: number | undefined;
  limit?: number | undefined;
}) {
  const {
    categorySlug,
    search,
    minPrice,
    maxPrice,
    sortBy = "newest",
    page = 1,
    limit = 12,
  } = options || {};

  const conditions = [eq(product.isPublished, true)];

  if (search) {
    conditions.push(ilike(product.name, `%${search}%`));
  }

  if (minPrice !== undefined) {
    conditions.push(gte(product.price, String(minPrice)));
  }

  if (maxPrice !== undefined) {
    conditions.push(lte(product.price, String(maxPrice)));
  }

  let categoryFilter;
  if (categorySlug) {
    const cat = await db.query.category.findFirst({
      where: eq(category.slug, categorySlug),
    });
    if (cat) {
      categoryFilter = eq(product.categoryId, cat.id);
      conditions.push(categoryFilter);
    }
  }

  const orderByMap: Record<string, ReturnType<typeof desc>> = {
    newest: desc(product.createdAt),
    "price-asc": asc(product.price),
    "price-desc": desc(product.price),
    name: asc(product.name),
  };

  const [products, totalResult] = await Promise.all([
    db.query.product.findMany({
      where: and(...conditions),
      with: {
        images: {
          orderBy: [asc(productImage.sortOrder)],
          limit: 1,
        },
        category: true,
      },
      orderBy: [orderByMap[sortBy] || desc(product.createdAt)],
      limit,
      offset: (page - 1) * limit,
    }),
    db
      .select({ count: count() })
      .from(product)
      .where(and(...conditions)),
  ]);

  const total = totalResult[0]?.count || 0;

  return {
    products: await addReviewStats(products),
    total,
    totalPages: Math.ceil(total / limit),
    page,
  };
}

export async function getProductBySlug(slug: string) {
  const result = await db.query.product.findFirst({
    where: eq(product.slug, slug),
    with: {
      images: {
        orderBy: [asc(productImage.sortOrder)],
      },
      category: true,
      variants: true,
      reviews: {
        with: {
          user: true,
        },
        orderBy: [desc(review.createdAt)],
      },
    },
  });

  if (!result) return null;

  const stats = await db
    .select({
      avg: sql<number>`COALESCE(AVG(${review.rating}), 0)`,
      count: count(),
    })
    .from(review)
    .where(eq(review.productId, result.id));

  return {
    ...result,
    averageRating: Number(stats[0]?.avg || 0),
    reviewCount: stats[0]?.count || 0,
  };
}

export async function getCategories() {
  return db.query.category.findMany({
    orderBy: [asc(category.sortOrder), asc(category.name)],
  });
}

export async function getCategoryBySlug(slug: string) {
  return db.query.category.findFirst({
    where: eq(category.slug, slug),
  });
}

// Helper: attach average rating + review count to products
async function addReviewStats<
  T extends { id: string }[],
>(products: T): Promise<(T[number] & { averageRating: number; reviewCount: number })[]> {
  if (products.length === 0) return [];

  const stats = await db
    .select({
      productId: review.productId,
      avg: sql<number>`COALESCE(AVG(${review.rating}), 0)`,
      count: count(),
    })
    .from(review)
    .where(
      sql`${review.productId} IN (${sql.join(
        products.map((p) => sql`${p.id}`),
        sql`, `
      )})`
    )
    .groupBy(review.productId);

  const statsMap = new Map(
    stats.map((s) => [s.productId, { avg: Number(s.avg), count: s.count }])
  );

  return products.map((p) => ({
    ...p,
    averageRating: statsMap.get(p.id)?.avg || 0,
    reviewCount: statsMap.get(p.id)?.count || 0,
  }));
}
