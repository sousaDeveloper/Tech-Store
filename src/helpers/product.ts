import { Product } from "@prisma/client";

interface ProductWithTotalPrice extends Product {
  totalPrice: number;
}

export default function computeProductTotalPrice(
  product: Product,
): ProductWithTotalPrice {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: +product.basePrice,
    };
  }

  const totalPrice = (+product.basePrice * product.discountPercentage) / 100;

  return {
    ...product,
    totalPrice,
  };
}
