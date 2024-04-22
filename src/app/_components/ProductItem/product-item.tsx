"use client";

import { useMemo } from "react";
import Image from "next/image";
import { ArrowDown, StarIcon } from "lucide-react";

import { ProductWithTotalPrice } from "@/helpers/product";

import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ProductItemProps {
  product: ProductWithTotalPrice;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();

  const handleRouterProcuctClick = () =>
    router.push(`/product/${product.slug}`);

  const productWithDiscount = +product.basePrice - product.totalPrice;

  const priceFormated = useMemo(
    () =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(productWithDiscount),
    [productWithDiscount],
  );

  return (
    <div
      className="flex max-w-[156px] cursor-pointer flex-col gap-2 transition-all duration-300 hover:-translate-y-1"
      onClick={handleRouterProcuctClick}
    >
      <div className="relative flex h-[170px] w-[156px] items-center justify-center rounded-xl bg-accent">
        <Image
          src={product.imageUrls[0]}
          alt={product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="relative h-[90px] w-auto object-contain"
        />
        {product.discountPercentage > 0 && (
          <Badge className="absolute left-0 top-0 m-2 flex items-center">
            <ArrowDown size={14} />
            {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-400">
          {product.name}
        </p>

        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="text-sm font-semibold">{priceFormated}</p>

              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm line-through opacity-60">
                R${+product.basePrice},00
              </p>
            </>
          ) : (
            <p className="text-sm font-semibold">R${+product.basePrice},00</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <StarIcon size={15} className="text-primary" />
          <StarIcon size={15} className="text-primary" />
          <StarIcon size={15} className="text-primary" />
          <StarIcon size={15} className="text-primary" />
          <StarIcon size={15} className="text-primary" />
          <p className="text-sm opacity-40">(25)</p>
        </div>
      </div>
    </div>
  );
}
