import { ShapesIcon } from "lucide-react";

import { prismaClient } from "@/lib/prisma";

import { Badge } from "@/components/ui/badge";
import CategoryList from "./components/category-list";
import ButtonBack from "./components/button-back";

export default async function CatalogPage() {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="mt-20 p-5">
      <div className="flex justify-between">
        <ButtonBack />
        <Badge
          className="flex w-[7rem] gap-1 border-primary uppercase"
          variant="outline"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <ShapesIcon />
          Catálogo
        </Badge>
      </div>

      <div
        className="mt-6 flex flex-wrap justify-center gap-8 md:grid md:grid-cols-3 md:place-items-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {categories.map((category) => (
          <CategoryList category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}
