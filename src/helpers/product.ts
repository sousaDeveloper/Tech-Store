import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export default function computeProductTotalPrice(
  product: Pick<Product, "discountPercentage" | "basePrice">,
): number {
  if (product.discountPercentage === 0) {
    return +product.basePrice;
  }

  const totalDiscount =
    (Number(product.basePrice) * product.discountPercentage) / 100;

  return +product.basePrice - totalDiscount;
}
