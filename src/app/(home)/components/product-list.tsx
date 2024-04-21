import computeProductTotalPrice from "@/helpers/product";
import { Product } from "@prisma/client";

import ProductItem from "@/app/_components/ProductItem/product-item";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          product={computeProductTotalPrice(product)}
          key={product.id}
        />
      ))}
    </div>
  );
}
