"use client";

import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productId: string;
  variantId?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  disabled,
}: AddToCartButtonProps) {
  function handleAddToCart() {
    toast.success("Added to cart!");
  }

  return (
    <Button
      size="lg"
      className="flex-1"
      disabled={disabled}
      onClick={handleAddToCart}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      {disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
