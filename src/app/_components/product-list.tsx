import computeProductTotalPrice from "@/helpers/product";
import { Product } from "@prisma/client";

import ProductItem from "@/app/_components/ProductItem/product-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductListProps {
  products: Product[];
  className: string;
  buttonShow?: string;
  basis?: string;
}

export default function ProductList({
  products,
  className,
  buttonShow,
  basis,
}: ProductListProps) {
  return (
    <>
      <div className={`${className} md:hidden md:flex-none`}>
        {products.map((product) => (
          <ProductItem
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
            key={product.id}
          />
        ))}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="hidden w-full flex-none md:flex"
      >
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem className={basis} key={index}>
              <ProductItem
                product={{
                  ...product,
                  totalPrice: computeProductTotalPrice(product),
                }}
                key={product.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={buttonShow} />
        <CarouselNext className={buttonShow} />
      </Carousel>
    </>
  );
}
