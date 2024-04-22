import ButtonBack from "@/app/catalog/components/button-back";
import { prismaClient } from "@/lib/prisma";
import Image from "next/image";

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
    <div className="bg-accent">
      <div className="mt-[5.1rem] h-full bg-accent">
        <div className="p-5">
          <ButtonBack />
        </div>
        <Image
          src={product.imageUrls[0]}
          alt={slug}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
