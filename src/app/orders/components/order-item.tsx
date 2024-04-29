import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: true;
    };
  }>;
  numberOrder: number;
}

const OrderItem = ({ order, numberOrder }: OrderItemProps) => {
  return (
    <Card>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
