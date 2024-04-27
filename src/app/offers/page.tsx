import { prismaClient } from "@/lib/prisma";

import { Badge } from "@/components/ui/badge";
import ProductList from "../_components/product-list";
import ButtonBack from "../catalog/components/button-back";

export default async function OffersPage() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <div className="mt-24 px-5">
      <div className="flex justify-between">
        <ButtonBack />

        <Badge className="w-fit border-primary py-1" variant="outline">
          <p className="uppercase">OFERTAS</p>
        </Badge>
      </div>

      <div className="mt-5 flex items-center px-24">
        <ProductList
          products={deals}
          basis="xl:basis-[20%] md:basis-[25%]"
          className="flex flex-wrap justify-center gap-8"
        />
      </div>
    </div>
  );
}
