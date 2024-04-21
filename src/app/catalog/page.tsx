import { ShapesIcon } from "lucide-react";

import { prismaClient } from "@/lib/prisma";

import { Badge } from "@/components/ui/badge";
import CategoryList from "./components/category-list";

export default async function CatalogPage() {
  const categories = await prismaClient.category.findMany({});

  return (
    <div className="p-5">
      <Badge
        className="flex w-[7rem] gap-1 border-primary uppercase"
        variant="outline"
      >
        <ShapesIcon />
        Catálogo
      </Badge>

      <div className="mt-6 flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <CategoryList category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
}
