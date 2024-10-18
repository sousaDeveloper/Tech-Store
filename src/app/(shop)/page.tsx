import { prismaClient } from "@/lib/prisma";

import Categories from "./home/components/categories";
import ProductList from "../_components/product-list";
import BannerHome from "./home/components/banner-home";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
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

  const speakers = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "speakers",
      },
    },
  });

  return (
    <>
      <main className="mt-[5.75rem] p-5 md:p-0">
        <BannerHome
          src="/banner-home-01.webp"
          alt="Até 55% de desconto só esse mês!"
          data-aos="fade-up"
          className="md:hidden md:flex-none"
          sizes="100vw"
        />
        <BannerHome
          src="/banner-desktop-01.webp"
          alt="Até 55% de desconto só esse mês!"
          sizes="100vw"
          data-aos="fade-up"
          className="hidden flex-none md:grid"
        />

        <div className="mt-8">
          <Categories />
        </div>
      </main>

      <div className="p-5 pt-2 md:mt-14 md:px-24">
        <p
          className="mb-1 md:text-xl"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          OFERTAS
        </p>
        <ProductList
          products={deals}
          className="flex w-full gap-4 overflow-y-auto md:mt-3 md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
          basis="md:basis-[25%] xl:basis-[18%]"
        />
      </div>

      <BannerHome
        src="/banner-home-02.webp"
        alt="Até 55% de desconto em Mouses!"
        className="md:hidden md:flex-none"
        sizes="100vw"
      />

      <div className="mt-5 hidden flex-none md:grid md:grid-cols-2 md:place-items-start md:gap-4 md:px-24">
        <BannerHome
          src="/banner-desktop-04.webp"
          alt="Até 55% de desconto em Mouses!"
          sizes="100vw"
        />
        <BannerHome
          src="/banner-desktop-03.webp"
          alt="Até 55% de desconto em Mouses!"
          sizes="100vw"
        />
      </div>

      <div className="mt-5 p-5 md:px-24">
        <p
          className="mb-1 md:text-xl"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          MOUSES
        </p>
        <ProductList
          products={mouses}
          className="flex min-w-full gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden "
          buttonShow="flex-none hidden md:flex"
          basis="md:basis-[25%] xl:basis-[22%]"
        />
      </div>

      <BannerHome
        src="/banner-home-03.webp"
        alt="Até 20% de desconto em Fones!"
        className="md:hidden md:flex-none"
        sizes="100vw"
      />
      <BannerHome
        src="/banner-desktop-02.webp"
        alt="Até 55% de desconto só esse mês!"
        sizes="100vw"
        data-aos="fade-up"
        className="hidden flex-none md:grid md:px-24"
      />

      <div className="mt-5 p-5 md:px-24">
        <p
          className="mb-1 md:text-xl"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          SPEAKERS
        </p>
        <ProductList
          products={speakers}
          className="flex w-full gap-4 overflow-y-auto [&::-webkit-scrollbar]:hidden"
          buttonShow="flex-none hidden md:flex"
          basis="md:basis-[25%] xl:basis-[22%]"
        />
      </div>
    </>
  );
}
