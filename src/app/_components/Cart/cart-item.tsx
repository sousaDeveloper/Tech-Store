import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useMemo } from "react";

import { CartContext, CartProduct } from "@/providers/cart";

import { Button } from "@/components/ui/button";

interface CartItemProps {
  product: CartProduct;
}

export default function CartItem({ product }: CartItemProps) {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () => {
    return decreaseProductQuantity(product.id);
  };

  const handleIncreaseQuantityClick = () => {
    return increaseProductQuantity(product.id);
  };

  const removeProductFromCartClick = () => {
    return removeProductFromCart(product.id);
  };

  const discountPrice = +product.basePrice - product.totalPrice;

  const priceFormated = useMemo(
    () =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(discountPrice),
    [discountPrice],
  );

  const basePrice = +product.basePrice;

  const basePriceFormatted = useMemo(
    () =>
      Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(basePrice),
    [basePrice],
  );

  return (
    <div
      key={product.id}
      className="flex items-center justify-between"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="flex gap-2">
        <div className="h-24 rounded-lg bg-accent p-4">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-16"
          />
        </div>
        <div className="flex flex-col">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
            {product.name}
          </p>
          <div className="flex items-center">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-bold">{priceFormated}</p>
                <p className="pl-1 text-sm line-through opacity-65">
                  R${+product.basePrice},00
                </p>
              </>
            ) : (
              <p className="font-semibold">{basePriceFormatted}</p>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <button onClick={handleDecreaseQuantityClick}>
              <ChevronLeftIcon
                size={30}
                className="rounded border border-secondary"
              />
            </button>
            <p className="text-lg">{product.quantity}</p>
            <button onClick={handleIncreaseQuantityClick}>
              <ChevronRightIcon
                size={30}
                className="rounded border border-secondary"
              />
            </button>
          </div>
        </div>
      </div>
      <div>
        <Button
          variant="outline"
          onClick={removeProductFromCartClick}
          className="w-fit"
        >
          <TrashIcon size="18" />
        </Button>
      </div>
    </div>
  );
}
