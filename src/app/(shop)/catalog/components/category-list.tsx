"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Category } from "@prisma/client";
import { useState } from "react";
import { Loader } from "lucide-react";

interface CategoryListProps {
  category: Category;
}

export default function CategoryList({ category }: CategoryListProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRouterClick = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  return (
    <div
      className="flex min-w-[140px] cursor-pointer flex-col transition-all duration-300 hover:-translate-y-1 md:w-[230px]"
      onClick={() => handleRouterClick(`/catalog/category/${category.slug}`)}
    >
      <div className="flex min-h-[140px] items-center justify-center rounded-t-xl bg-gradient-to-r from-[#5033C3] to-purple-600 md:h-[200px]">
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-[100px] md:w-[130px]"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <p className="flex items-center justify-center gap-2 rounded-b-xl bg-accent py-2 text-center font-semibold">
        {category.name}
        {isLoading && <Loader className="animate-spin" size={17} />}
      </p>
    </div>
  );
}
