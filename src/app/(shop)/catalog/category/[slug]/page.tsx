import { CATEGORY_ICON } from "@/constants/category-icon";
import computeProductTotalPrice from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

import ButtonBack from "../../components/button-back";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/app/_components/ProductItem/product-item";

export default async function CategoryProducts({ params }: any) {
  const products = await prismaClient.product.findMany({
    where: {
      category: {
        slug: params.slug,
      },
    },
  });

  return (
    <div className="mt-20 p-5">
      <div className="flex justify-between">
        <ButtonBack />

        <Badge
          className="flex w-fit gap-1 border-primary py-1"
          variant="outline"
        >
          {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
          <p className="uppercase">{params.slug}</p>
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap justify-center gap-8">
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
    </div>
  );
}
