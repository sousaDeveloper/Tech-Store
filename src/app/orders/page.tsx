import { Badge } from "@/components/ui/badge";
import { prismaClient } from "@/lib/prisma";
import { ShoppingBasket } from "lucide-react";
import { getServerSession } from "next-auth";
import OrderItem from "./components/order-item";

const ordersPage = async () => {
  const user = getServerSession();

  if (!user) {
    return <p>Access Denied!</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: true,
    },
  });

  return (
    <section className="mt-[4.5rem] p-5">
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

export default ordersPage;
