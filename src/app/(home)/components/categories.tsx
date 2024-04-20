import CategoryItem from "./category-item";

import { prismaClient } from "@/lib/prisma";

export default async function Categories() {
  const categories = await prismaClient.category.findMany({});

  return (
    <section className="grid grid-cols-2 place-items-center gap-x-4 gap-y-2">
      {categories.map((category) => (
        <CategoryItem category={category} key={category.id} />
      ))}
    </section>
  );
}
