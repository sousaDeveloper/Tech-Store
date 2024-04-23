"use client";

import {
  ArrowDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  TruckIcon,
} from "lucide-react";
import { useContext, useMemo, useState } from "react";

import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";

import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductInfoProps {
  product: ProductWithTotalPrice;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const { addProductToCart } = useContext(CartContext);

  const addProductToCartClick = () => {
    toast("Produto adicionado ao carrinho", {});
    return addProductToCart({ ...product, quantity });
  };

  const handleDecreaseQuantityClick = () => {
    return setQuantity((prevState) =>
      prevState === 1 ? prevState : prevState - 1,
    );
  };

  const handleIncreaseQuantityClick = () => {
    return setQuantity((prevState) => prevState + 1);
  };

  const calculateDiscount = +product.basePrice - product.totalPrice;

  const priceFormated = useMemo(
    () =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(calculateDiscount),
    [calculateDiscount],
  );

  return (
    <div className="p-5 pb-1">
      <p className="text-sm text-gray-400">Novo | 100 vendidos</p>
      <p className="text-lg">{product.name}</p>
      <p className="text-primary">Disponível em estoque</p>

      <div className="flex items-center gap-1">
        <StarIcon size={15} className="text-primary" />
        <StarIcon size={15} className="text-primary" />
        <StarIcon size={15} className="text-primary" />
        <StarIcon size={15} className="text-primary" />
        <StarIcon size={15} className="text-primary" />
        <p className="mt-[0.1rem] text-sm opacity-40">(25 avaliações)</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {product.discountPercentage > 0 ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold">{priceFormated}</p>
              <Badge className="h-fit w-fit">
                <ArrowDown size={14} />
                {product.discountPercentage}%
              </Badge>
            </div>
            <p className="opacity-40">
              De:{" "}
              <span className="text-sm line-through">
                R$ {+product.basePrice},00
              </span>
            </p>
          </div>
        ) : (
          <h1 className="text-lg font-semibold">R$ {+product.basePrice},00</h1>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button onClick={handleDecreaseQuantityClick}>
          <ChevronLeftIcon
            size={30}
            className="rounded border border-secondary"
          />
        </button>
        <p className="text-lg">{quantity}</p>
        <button onClick={handleIncreaseQuantityClick}>
          <ChevronRightIcon
            size={30}
            className="rounded border border-secondary"
          />
        </button>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Descrição</h2>
        <p className="h-[6.8rem] overflow-x-auto opacity-65 [&::-webkit-scrollbar]:hidden">
          {product.description}
        </p>
      </div>

      <div className="mt-8 flex flex-col">
        <Button className="w-full" onClick={addProductToCartClick}>
          ADICIONAR AO CARRINHO
        </Button>
        <div className="mt-4 flex items-center justify-between rounded-lg bg-accent px-4 py-2">
          <div className="flex items-center gap-2">
            <TruckIcon size={25} />
            <div className="flex flex-col">
              <p className="text-sm">
                Entrega via <span className="font-semibold">FSPacket®</span>
              </p>
              <p className="text-xs text-primary">
                Envio para <span className="font-semibold">todo o Brasil.</span>
              </p>
            </div>
          </div>
          <p className="text-xs font-semibold">Frete Grátis</p>
        </div>
      </div>
      <div className="mt-10">
        <p className="font-semibold uppercase">Recomendados</p>
      </div>
    </div>
  );
}
