import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { category, product, productImage } from "../src/lib/schema";

const connectionString = process.env.POSTGRES_URL as string;
if (!connectionString) {
  throw new Error("POSTGRES_URL is required");
}

const client = postgres(connectionString);
const db = drizzle(client);

const CATEGORIES = [
  {
    name: "Electronics",
    slug: "electronics",
    description: "Gadgets, devices, and tech accessories",
    sortOrder: 1,
  },
  {
    name: "Clothing",
    slug: "clothing",
    description: "Apparel for every occasion",
    sortOrder: 2,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    description: "Furniture, decor, and essentials for your space",
    sortOrder: 3,
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Bags, watches, jewelry, and more",
    sortOrder: 4,
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    description: "Gear for an active lifestyle",
    sortOrder: 5,
  },
  {
    name: "Books",
    slug: "books",
    description: "Bestsellers, classics, and new releases",
    sortOrder: 6,
  },
];

// Using picsum.photos for placeholder images
function img(id: number): string {
  return `https://picsum.photos/seed/product${id}/600/600`;
}

async function seed() {
  console.log("Seeding database...\n");

  // Insert categories
  console.log("Creating categories...");
  const insertedCategories = await db
    .insert(category)
    .values(CATEGORIES)
    .returning();

  const catMap = new Map(insertedCategories.map((c) => [c.slug, c.id]));
  console.log(`  Created ${insertedCategories.length} categories\n`);

  // Products data
  const PRODUCTS = [
    // Electronics
    {
      name: "Wireless Noise-Cancelling Headphones",
      slug: "wireless-noise-cancelling-headphones",
      description:
        "Premium over-ear headphones with active noise cancellation. Up to 30 hours of battery life, plush memory foam ear cushions, and crystal-clear audio quality make these perfect for commuting, travel, or working from home.",
      shortDescription:
        "Premium ANC headphones with 30hr battery life.",
      price: "149.99",
      compareAtPrice: "199.99",
      sku: "ELEC-001",
      stock: 45,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("electronics")!,
      tags: ["wireless", "noise-cancelling", "bluetooth"],
      imgSeed: 10,
    },
    {
      name: "Portable Bluetooth Speaker",
      slug: "portable-bluetooth-speaker",
      description:
        "Compact, waterproof speaker with 360-degree sound. Take your music anywhere — the beach, the trail, or the backyard. IPX7 waterproof rating, 12-hour battery, and a built-in microphone for hands-free calls.",
      shortDescription: "Waterproof speaker with 360-degree sound.",
      price: "59.99",
      sku: "ELEC-002",
      stock: 120,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("electronics")!,
      tags: ["bluetooth", "waterproof", "portable"],
      imgSeed: 20,
    },
    {
      name: "Smart Fitness Watch",
      slug: "smart-fitness-watch",
      description:
        "Track your health and fitness with precision. Heart rate monitoring, GPS, sleep tracking, and 50+ workout modes — all on a vibrant AMOLED display. Water-resistant up to 50 meters.",
      shortDescription: "AMOLED fitness watch with GPS and heart rate.",
      price: "129.00",
      compareAtPrice: "169.00",
      sku: "ELEC-003",
      stock: 78,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("electronics")!,
      tags: ["fitness", "smartwatch", "GPS"],
      imgSeed: 30,
    },
    {
      name: "USB-C Hub Adapter 7-in-1",
      slug: "usb-c-hub-adapter",
      description:
        "Expand your laptop's connectivity with this sleek aluminum hub. Includes HDMI 4K, USB 3.0 ports, SD/TF card readers, USB-C PD charging, and Ethernet. Plug and play, no drivers needed.",
      shortDescription: "Aluminum 7-in-1 USB-C hub with 4K HDMI.",
      price: "34.99",
      sku: "ELEC-004",
      stock: 200,
      isPublished: true,
      isFeatured: false,
      categoryId: catMap.get("electronics")!,
      tags: ["USB-C", "adapter", "laptop"],
      imgSeed: 40,
    },

    // Clothing
    {
      name: "Classic Fit Cotton T-Shirt",
      slug: "classic-fit-cotton-tshirt",
      description:
        "A wardrobe essential. Made from 100% organic cotton with a relaxed fit that's comfortable all day. Pre-shrunk fabric holds its shape wash after wash. Available in multiple colors.",
      shortDescription: "100% organic cotton tee, relaxed fit.",
      price: "24.99",
      sku: "CLO-001",
      stock: 300,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("clothing")!,
      tags: ["cotton", "basic", "organic"],
      imgSeed: 50,
    },
    {
      name: "Slim Fit Chino Pants",
      slug: "slim-fit-chino-pants",
      description:
        "Versatile chinos that go from office to weekend effortlessly. Stretch cotton blend for comfort, with a modern slim fit. Features reinforced stitching and deep pockets.",
      shortDescription: "Stretch cotton chinos with a modern slim fit.",
      price: "49.99",
      compareAtPrice: "65.00",
      sku: "CLO-002",
      stock: 150,
      isPublished: true,
      isFeatured: false,
      categoryId: catMap.get("clothing")!,
      tags: ["chinos", "slim-fit", "stretch"],
      imgSeed: 60,
    },
    {
      name: "Lightweight Zip Hoodie",
      slug: "lightweight-zip-hoodie",
      description:
        "A go-to layering piece for any season. French terry fabric is soft and breathable. Features a full-length zip, kangaroo pockets, and a drawstring hood.",
      shortDescription: "Soft French terry hoodie for easy layering.",
      price: "39.99",
      sku: "CLO-003",
      stock: 85,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("clothing")!,
      tags: ["hoodie", "casual", "layering"],
      imgSeed: 70,
    },

    // Home & Living
    {
      name: "Ceramic Pour-Over Coffee Dripper",
      slug: "ceramic-pour-over-coffee-dripper",
      description:
        "Brew the perfect cup with this handmade ceramic dripper. The micro-perforated design ensures optimal extraction and a clean, full-bodied flavor. Fits standard mugs and carafes.",
      shortDescription: "Handmade ceramic dripper for perfect coffee.",
      price: "28.00",
      sku: "HOME-001",
      stock: 60,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("home-living")!,
      tags: ["coffee", "ceramic", "handmade"],
      imgSeed: 80,
    },
    {
      name: "Minimalist Desk Lamp",
      slug: "minimalist-desk-lamp",
      description:
        "Clean lines and warm light. This adjustable LED desk lamp features 3 brightness levels and a color temperature range from warm white to daylight. The weighted base keeps it stable on any surface.",
      shortDescription: "Adjustable LED desk lamp with 3 brightness levels.",
      price: "45.00",
      compareAtPrice: "60.00",
      sku: "HOME-002",
      stock: 40,
      isPublished: true,
      isFeatured: false,
      categoryId: catMap.get("home-living")!,
      tags: ["lamp", "LED", "minimalist"],
      imgSeed: 90,
    },
    {
      name: "Linen Throw Blanket",
      slug: "linen-throw-blanket",
      description:
        "Lightweight and breathable, this pure linen throw adds texture and comfort to any room. Garment-washed for a soft, lived-in feel. Perfect draped over a sofa or at the foot of a bed.",
      shortDescription: "Pure linen throw, garment-washed softness.",
      price: "68.00",
      sku: "HOME-003",
      stock: 35,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("home-living")!,
      tags: ["linen", "blanket", "decor"],
      imgSeed: 100,
    },

    // Accessories
    {
      name: "Leather Crossbody Bag",
      slug: "leather-crossbody-bag",
      description:
        "Full-grain leather bag with adjustable strap. Features multiple compartments, magnetic closure, and a timeless design that pairs with anything. Ages beautifully with use.",
      shortDescription: "Full-grain leather bag with adjustable strap.",
      price: "89.00",
      compareAtPrice: "120.00",
      sku: "ACC-001",
      stock: 25,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("accessories")!,
      tags: ["leather", "bag", "crossbody"],
      imgSeed: 110,
    },
    {
      name: "Polarized Sunglasses",
      slug: "polarized-sunglasses",
      description:
        "UV400 polarized lenses in a classic acetate frame. Reduces glare and provides crisp, true-color vision. Includes a hard case and microfiber cleaning cloth.",
      shortDescription: "UV400 polarized lenses in acetate frames.",
      price: "42.00",
      sku: "ACC-002",
      stock: 90,
      isPublished: true,
      isFeatured: false,
      categoryId: catMap.get("accessories")!,
      tags: ["sunglasses", "polarized", "UV protection"],
      imgSeed: 120,
    },

    // Sports & Outdoors
    {
      name: "Yoga Mat Premium 6mm",
      slug: "yoga-mat-premium",
      description:
        "Non-slip, eco-friendly yoga mat with alignment guides. The 6mm cushioning protects joints during practice. Made from natural rubber with a closed-cell surface that resists moisture and bacteria.",
      shortDescription: "Non-slip eco-friendly mat with alignment guides.",
      price: "38.00",
      sku: "SPORT-001",
      stock: 70,
      isPublished: true,
      isFeatured: false,
      categoryId: catMap.get("sports-outdoors")!,
      tags: ["yoga", "fitness", "eco-friendly"],
      imgSeed: 130,
    },
    {
      name: "Insulated Water Bottle 750ml",
      slug: "insulated-water-bottle",
      description:
        "Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof cap, and a powder-coated finish that won't sweat.",
      shortDescription: "Stainless steel bottle — cold 24h, hot 12h.",
      price: "29.99",
      compareAtPrice: "39.99",
      sku: "SPORT-002",
      stock: 160,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("sports-outdoors")!,
      tags: ["water bottle", "insulated", "stainless steel"],
      imgSeed: 140,
    },

    // Books
    {
      name: "The Design of Everyday Things",
      slug: "design-of-everyday-things",
      description:
        "Don Norman's classic guide to human-centered design. A must-read for anyone interested in design thinking, product development, or understanding why some products frustrate and others delight.",
      shortDescription: "Classic guide to human-centered design.",
      price: "16.99",
      sku: "BOOK-001",
      stock: 50,
      isPublished: true,
      isFeatured: false,
      categoryId: catMap.get("books")!,
      tags: ["design", "non-fiction", "bestseller"],
      imgSeed: 150,
    },
    {
      name: "Atomic Habits",
      slug: "atomic-habits",
      description:
        "James Clear's practical guide to building good habits and breaking bad ones. Backed by scientific research, this book offers a framework for improving every day through small, incremental changes.",
      shortDescription: "Practical guide to building better habits.",
      price: "14.99",
      sku: "BOOK-002",
      stock: 80,
      isPublished: true,
      isFeatured: true,
      categoryId: catMap.get("books")!,
      tags: ["self-help", "habits", "bestseller"],
      imgSeed: 160,
    },
  ];

  // Insert products
  console.log("Creating products...");
  for (const p of PRODUCTS) {
    const { imgSeed, ...productData } = p;
    const result = await db
      .insert(product)
      .values(productData)
      .returning();

    const inserted = result[0];
    if (!inserted) continue;

    // Add 3 images per product
    await db.insert(productImage).values(
      [0, 1, 2].map((i) => ({
        productId: inserted.id,
        url: img(imgSeed + i),
        alt: `${inserted.name} - Image ${i + 1}`,
        sortOrder: i,
      }))
    );

    console.log(`  Created: ${inserted.name}`);
  }

  console.log(`\nDone! Created ${PRODUCTS.length} products across ${CATEGORIES.length} categories.`);

  await client.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
