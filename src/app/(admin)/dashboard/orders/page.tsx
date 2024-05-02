import { getServerSession } from "next-auth";
import { ShoppingBasket } from "lucide-react";

import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";

import { Badge } from "@/components/ui/badge";
import OrderItem from "./components/order-item";

const OrdersPage = async () => {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Access Denied!</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <section className="w-full p-8 overflow-x-auto">
      <Badge
        className="my-4 flex w-fit items-center gap-1 border-2 border-primary px-2 py-1"
        variant="outline"
      >
        <ShoppingBasket size={18} />
        MEUS PEDIDOS
      </Badge>

      <div className="flex flex-col gap-4">
        {orders.map((order, index) => (
          <OrderItem order={order} key={order.id} numberOrder={index + 1} />
        ))}
      </div>
    </section>
  );
};

export default OrdersPage;
