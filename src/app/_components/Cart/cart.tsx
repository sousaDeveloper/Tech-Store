import { useContext } from "react";

import { CartContext } from "@/providers/cart";
import computeProductTotalPrice from "@/helpers/product";

import CartItem from "./cart-item";

export default function Cart() {
  const { products } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-2 p-4">
      {products.map((product) => (
        <CartItem
          key={product.id}
          product={computeProductTotalPrice(product as any) as any}
        />
      ))}
    </div>
  );
}
