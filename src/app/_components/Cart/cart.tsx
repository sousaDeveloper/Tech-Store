import { CartContext } from "@/providers/cart";
import { useContext } from "react";

export default function Cart() {
  const { products } = useContext(CartContext);

  return (
    <div className="flex flex-col gap-2 p-4">
      {products.map((product) => (
        <h1 key={product.id}>{product.name}</h1>
      ))}
    </div>
  );
}
