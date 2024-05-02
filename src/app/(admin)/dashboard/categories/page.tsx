import { ListOrderedIcon, PlusIcon } from "lucide-react";

import { prismaClient } from "@/lib/prisma";

import { Badge } from "@/components/ui/badge";
import CategoryTable from "./components/category-table";
import ButtonAdd from "../components/button-add";

const CategoriesPage = async () => {
  const categories = await prismaClient.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-8">
      {" "}
      <Badge className="flex h-fit w-fit items-center gap-1 border-2 border-primary bg-accent uppercase">
        <ListOrderedIcon size={18} />
        Categorias
      </Badge>
      <div className="flex items-center justify-between">
        <p className="text-lg">Categorias encontradas: {categories.length}</p>
        <ButtonAdd>
          <PlusIcon size={18} />
          Adicionar Categoria
        </ButtonAdd>
      </div>
      <CategoryTable category={categories} />
    </div>
  );
};

export default CategoriesPage;
