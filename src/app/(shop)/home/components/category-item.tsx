"use client";

import { useRouter } from "next/navigation";

import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  const handleRouterClick = (path: string) => {
    setIsloading(true);
    return router.push(path);
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex w-[167px] gap-2 md:h-[50px] md:w-[200px] md:border-2"
        onClick={() => handleRouterClick(`/catalog/category/${category.slug}`)}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
        <span>{category.name}</span>
        {isLoading && <Loader className="animate-spin" size={17} />}
      </Button>
    </>
  );
}
