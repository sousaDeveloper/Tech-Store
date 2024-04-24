"use client";

import { useRouter } from "next/navigation";

import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const router = useRouter();

  const handleRouterClick = (path: string) => router.push(path);

  return (
    <>
      <Button
        variant="outline"
        className="flex w-[167px] gap-2"
        onClick={() => handleRouterClick(`/catalog/category/${category.slug}`)}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span>{category.name}</span>
      </Button>
    </>
  );
}
