import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Wishlist</h1>
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-20">
        <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Your wishlist is empty</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Save products you love for later
        </p>
        <Button className="mt-6" asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    </div>
  );
}
