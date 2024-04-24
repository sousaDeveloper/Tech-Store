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
      <div className="mt-[5rem] h-full">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
        <ProductInfo product={computeProductTotalPrice(product)} />
        <div className="px-5">
          <ProductList
            products={product.category.products}
            className="flex gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          />
        </div>
      </div>
    </div>
  );
}
