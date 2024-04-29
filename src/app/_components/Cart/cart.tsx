import { useContext, useState } from "react";
import { Loader2Icon } from "lucide-react";

import { CartContext } from "@/providers/cart";
import computeProductTotalPrice from "@/helpers/product";
import { loadStripe } from "@stripe/stripe-js";
import createCheckout from "@/actions/checkout";

import { Button } from "@/components/ui/button";
import CartItem from "./cart-item";
import createOrder from "@/actions/order";
import { useSession } from "next-auth/react";

export default function Cart() {
  const { data } = useSession();
  const {
    products,
    totalFormatted,
    subTotalFormatted,
    totalDiscountFormatted,
  } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleFinishPurchaseClick = async () => {
    setIsLoading(true);

    if (!data?.user) {
      return;
    }
    await createOrder(products, (data?.user as any).id);

    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <div
          className={`flex flex-col gap-3 overflow-x-auto ${products.length === 0 ? "h-0" : "h-[18rem]"}`}
        >
          {products.map((product) => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product as any) as any}
            />
          ))}
        </div>
        {products.length > 0 ? (
          <>
            <div
              className="flex flex-col"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Subtotal</p>
                <p className="opacity-80">{subTotalFormatted}</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Entrega</p>
                <p className="opacity-80">GRÁTIS</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Descontos</p>
                <p className="opacity-80">- {totalFormatted}</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">{totalDiscountFormatted}</p>
              </div>
              <Button
                className="flex items-center gap-1"
                onClick={handleFinishPurchaseClick}
              >
                FINALIZAR COMPRA
                {isLoading && (
                  <Loader2Icon className="animate-spin" size={18} />
                )}
              </Button>
            </div>
          </>
        ) : (
          <h1 className="text-lg font-bold">Carrinho vazio.</h1>
        )}
      </div>
    </>
  );
}
