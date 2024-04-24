import { useContext } from "react";

import { CartContext } from "@/providers/cart";
import computeProductTotalPrice from "@/helpers/product";

import CartItem from "./cart-item";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const {
    products,
    formatedTotalPrice,
    formatedTotalPriceWithDiscount,
    formatedcalculateTotalDiscount,
  } = useContext(CartContext);

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
                <p className="opacity-80">{formatedTotalPrice}</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Entrega</p>
                <p className="opacity-80">GRÁTIS</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p>Descontos</p>
                <p className="opacity-80">- {formatedcalculateTotalDiscount}</p>
              </div>
              <hr />
              <div className="flex justify-between px-1 py-3">
                <p className="font-semibold">Total</p>
                <p className="font-semibold">
                  {formatedTotalPriceWithDiscount}
                </p>
              </div>
              <Button className="bottom-0">FINALIZAR COMPRA</Button>
            </div>
          </>
        ) : (
          <h1 className="text-lg font-bold">Carrinho vazio.</h1>
        )}
      </div>
    </>
  );
}
