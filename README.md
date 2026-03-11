# E-Store

A modern, minimal ecommerce web application by **Md. Shadman Sakib Rahman**.

## About

E-Store is a full-featured online shopping platform built with a modern tech stack. It provides a clean, responsive shopping experience with product browsing, search, filtering, reviews, and more.

## Features

- **Product Catalog** — Browse products in a clean grid layout with sorting and filtering
- **Category Navigation** — Shop by category with nested subcategories
- **Search** — Full-text product search with instant results
- **Product Details** — Image gallery, variant selection, stock status, and trust badges
- **Reviews & Ratings** — Star ratings with written reviews and verified purchase badges
- **Wishlist** — Save products for later
- **Shopping Cart** — Add products, adjust quantities, checkout
- **User Accounts** — Registration, login, order history, saved addresses
- **Admin Dashboard** — Product management, order tracking, customer overview
- **Coupon System** — Percentage and fixed discount codes with usage limits
- **Dark Mode** — Full light/dark theme support
- **Responsive Design** — Mobile-first, works on all screen sizes

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Database:** PostgreSQL + Drizzle ORM
- **Authentication:** BetterAuth (email/password)
- **UI:** shadcn/ui + Tailwind CSS 4 + Radix UI
- **Styling:** Dark/light mode via next-themes

## Getting Started

```bash
# Install dependencies
pnpm install

# Start the database
docker compose up -d

# Run database migrations
pnpm run db:migrate

# Seed demo products
pnpm run db:seed

# Start the dev server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the store.

## Pages

| Page | Description |
|------|-------------|
| `/` | Home — hero, categories, featured products, new arrivals |
| `/products` | Product catalog with filters, sort, and pagination |
| `/products/[slug]` | Product detail with gallery, reviews, variants |
| `/categories` | Browse all categories |
| `/cart` | Shopping cart |
| `/wishlist` | Saved products |
| `/dashboard` | User account dashboard |

## Author

**Md. Shadman Sakib Rahman**

## License

All rights reserved.
