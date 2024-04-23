"use client"

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

interface CartProduct extends Product {
  quantity: number;
}

interface ICartProduct {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
}

const CartContext = createContext<ICartProduct>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CartContext.Provider
      value={{
        products: [],
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
