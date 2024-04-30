import computeProductTotalPrice from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

import ProductImages from "../components/product-images";
import ProductInfo from "../components/product-info";
import ProductList from "@/app/_components/product-list";

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductDetailsPage({
  params: { slug },
}: ProductDetailsPageProps) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div>
      <div className="mt-[5rem] h-full md:mt-[7rem] md:px-24">
        <div className="hidden flex-none md:grid md:grid-cols-2 md:gap-4">
          <ProductImages imageUrls={product.imageUrls} name={product.name} />
          <ProductInfo product={computeProductTotalPrice(product)} />
        </div>

        <div className="md:hidden md:flex-none">
          <ProductImages imageUrls={product.imageUrls} name={product.name} />
          <ProductInfo product={computeProductTotalPrice(product)} />
        </div>

        <div className="px-5 md:px-0">
          <p className="mt-10 text-lg uppercase">Recomendados</p>
          <ProductList
            products={product.category.products}
            basis="md:basis-[25%]"
            buttonShow="flex-none hidden"
            className="flex gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          />
        </div>
      </div>
    </div>
  );
}
