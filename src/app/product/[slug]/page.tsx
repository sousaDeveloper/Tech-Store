import { prismaClient } from "@/lib/prisma";
import ProductImages from "../components/product-images";
import ProductInfo from "../components/product-info";

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
  });

  if (!product) return null;

  return (
    <div>
      <div className="mt-[5rem] h-full">
        <ProductImages imageUrls={product.imageUrls} name={product.name} />
      </div>
    </div>
  );
}
