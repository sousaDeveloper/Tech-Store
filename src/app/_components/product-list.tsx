import computeProductTotalPrice from "@/helpers/product";
import { Product } from "@prisma/client";

import ProductItem from "@/app/_components/ProductItem/product-item";

interface ProductListProps {
  products: Product[];
  className: string;
}

export default function ProductList({ products, className }: ProductListProps) {
  return (
    <div className={className}>
      {products.map((product) => (
        <ProductItem
          product={computeProductTotalPrice(product)}
          key={product.id}
        />
      ))}
    </div>
  );
}
