import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Shopping Cart</h1>
      <div className="flex flex-col items-center justify-center rounded-lg border bg-card py-20">
        <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Add some products to get started
        </p>
        <Button className="mt-6" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
