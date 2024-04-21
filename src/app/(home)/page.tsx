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

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <>
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
      </main>

      <div className="p-5">
        <p className="mb-1">OFERTAS</p>
        <ProductList products={deals} />
      </div>

      <Image
        src="/banner-home-02.png"
        width={0}
        height={0}
        alt="Até 55% de desconto em mouses!"
        sizes="100vw"
        className="mt-5 h-auto w-full"
      />

      <div className="mt-3 p-5">
        <p className="mb-1">TECLADOS</p>
        <ProductList products={keyboards} />
      </div>
    </>
  );
}
