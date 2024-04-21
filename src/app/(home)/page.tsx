import { prismaClient } from "@/lib/prisma";

import Categories from "./components/categories";
import ProductList from "./components/product-list";
import BannerHome from "./components/banner-home";

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

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <>
      <main className="p-5">
        <BannerHome
          src="/banner-home-01.png"
          alt="Até 55% de desconto só esse mês!"
        />

        <div className="mt-8">
          <Categories />
        </div>
      </main>

      <div className="p-5 pt-2">
        <p className="mb-1">OFERTAS</p>
        <ProductList products={deals} />
      </div>

      <BannerHome
        src="/banner-home-02.png"
        alt="Até 55% de desconto em Mouses!"
      />

      <div className="mt-3 p-5">
        <p className="mb-1">TECLADOS</p>
        <ProductList products={keyboards} />
      </div>

      <BannerHome
        src="/banner-home-03.png"
        alt="Até 20% de desconto em Fones!"
      />

      <div className="mt-3 p-5">
        <p className="mb-1">MOUSES</p>
        <ProductList products={mouses} />
      </div>
    </>
  );
}
