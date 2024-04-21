import Image from "next/image";

import { prismaClient } from "@/lib/prisma";

import Categories from "./components/categories";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  return (
    <main className="p-5">
      <Image
        src="/banner-home-01.png"
        width={0}
        height={0}
        alt="Até 55% de desconto esse mês!"
        sizes="100vw"
        className="h-auto w-full"
      />

      <div className="mt-8">
        <Categories />
      </div>

      <div className="mt-8">
        <p className="my-2">OFERTAS</p>
        <ProductList products={deals} />
      </div>

     
    </main>
  );
}
