"use client";

import { ProductWithTotalPrice } from "@/helpers/product";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}

interface ICartProduct {
  products: CartProduct[];
  quantity: number;
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void;
  handleDecreaseQuantity: (productId: string) => void;
  handleIncreaseQuantity: (productId: string) => void;
  removeProductFromCart: (productId: string) => void;
}

export const CartContext = createContext<ICartProduct>({
  products: [],
  cartTotalPrice: 0,
  quantity: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  handleDecreaseQuantity: () => {},
  handleIncreaseQuantity: () => {},
  removeProductFromCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: CartProduct) => {
    const productIsAlreadyOnCart = products.some(
      (item) => item.id === product.id,
    );

    if (productIsAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) =>
          cartProduct.id === product.id
            ? {
                ...cartProduct,
                quantity: cartProduct.quantity + product.quantity,
              }
            : cartProduct,
        ),
      );
      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  const handleDecreaseQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) =>
          cartProduct.id === productId
            ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
            : cartProduct,
        )
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
    return;
  };

  const handleIncreaseQuantity = (productId: string) => {
    return setProducts((prev) =>
      prev.map((cartProduct) =>
        cartProduct.id === productId
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct,
      ),
    );
  };

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId),
    );
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        removeProductFromCart,
        quantity: 0,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
