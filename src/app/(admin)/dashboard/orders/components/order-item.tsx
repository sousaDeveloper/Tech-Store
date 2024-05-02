"use client";

import { useMemo } from "react";
import { format } from "date-fns";

import { Prisma } from "@prisma/client";
import computeProductTotalPrice from "@/helpers/product";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import OrderProductItem from "./order-product-item";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
  numberOrder: number;
}

const OrderItem = ({ order, numberOrder }: OrderItemProps) => {
  const subtotal = useMemo(() => {
    return order.orderProducts.reduce((accum, orderProduct) => {
      return accum + +orderProduct.product.basePrice * orderProduct.quantity;
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, product) => {
      const productTotalPrice = computeProductTotalPrice(product.product);
      if (product.discountPercentage === 0) {
        return 0;
      }
      return acc + productTotalPrice * product.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = subtotal - total;

  return (
    <Card className="w-full">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id} className="px-4">
          <AccordionTrigger className="text-primary hover:no-underline">
            <div className="flex flex-col items-start text-foreground">
              <p>NÚMERO DO PEDIDO</p>
              <p className="text-[#676767]">#00{numberOrder}</p>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="mb-3 flex justify-between">
              <div>
                <p>STATUS</p>
                {order.status === "PAYMENT_CONFIRMED" ? (
                  <p className="font-semibold text-primary">Pago</p>
                ) : (
                  <p className="font-semibold text-primary">Não Pago</p>
                )}
              </div>
              <div>
                <p>DATA</p>
                <p className="font-semibold text-[#676767]">
                  {format(order.createdAt, "d/MM/yy")}
                </p>
              </div>
              <div>
                <p>PAGAMENTO</p>
                <p className="font-semibold text-[#676767]">Cartão</p>
              </div>
            </div>
            <hr />

            {order.orderProducts.map((orderProduct) => (
              <OrderProductItem
                orderProduct={orderProduct}
                key={orderProduct.id}
              />
            ))}

            <div
              className="flex flex-col"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Subtotal</p>
                <p className="opacity-80">R$ {subtotal},00</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Entrega</p>
                <p className="opacity-80">GRÁTIS</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Descontos</p>
                <p className="opacity-80">- R$ {total},00</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">R$ {totalDiscount},00</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
