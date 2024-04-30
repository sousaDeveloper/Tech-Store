"use client";

import Image from "next/image";

import computeProductTotalPrice from "@/helpers/product";
import { Prisma } from "@prisma/client";

interface OrderProductItemProps {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
}

const OrderProductItem = ({ orderProduct }: OrderProductItemProps) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);

  return (
    <div className="flex w-full gap-2 py-5">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product?.imageUrls[0]}
          alt={orderProduct.product?.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="rounded-lg bg-accent px-3">Vendido e entre por: MStore</p>
        <p>{orderProduct.product.name}</p>
        {productWithTotalPrice.discountPercentage <= 0 ? (
          <div className="flex justify-between">
            <p className="text-[1.02rem] font-bold">
              R$ {+productWithTotalPrice.basePrice},00
            </p>
            <p>Qtd: {orderProduct.quantity}</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-[1.02rem] font-bold">
                  R$
                  {+productWithTotalPrice.basePrice -
                    productWithTotalPrice.totalPrice}
                  ,00
                </p>
                <p className="text-[#676767] line-through">
                  R$ {+productWithTotalPrice.basePrice},00
                </p>
              </div>
              <p>Qtd: {orderProduct.quantity}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderProductItem;
