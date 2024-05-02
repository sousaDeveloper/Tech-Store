import { PackageIcon, PlusIcon } from "lucide-react";

import computeProductTotalPrice from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

import ProductTable, {
  ProductWithTotalPriceAndCategory,
} from "./components/product-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import "./button.css";

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const productWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...product,
      totalPrice: computeProductTotalPrice(product),
    }));

  return (
    <div className="flex w-full flex-col gap-10 p-8">
      {" "}
      <Badge className="flex h-fit w-fit items-center gap-1 border-2 border-primary bg-accent uppercase">
        <PackageIcon size={18} />
        Produtos
      </Badge>
      <div className="flex items-center justify-between">
        <p className="text-lg">Produtos encontrados: {products.length}</p>
        <Button className="buttonShadow flex items-center gap-2 transition-all duration-300">
          <PlusIcon size={18} />
          Adicionar produto
        </Button>
      </div>
      <ProductTable products={productWithTotalPrice} />
    </div>
  );
};

export default ProductsPage;
