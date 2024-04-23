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
  handleDecreaseQuantityClick: () => void;
  handleIncreaseQuantityClick: () => void;
}

export const CartContext = createContext<ICartProduct>({
  products: [],
  cartTotalPrice: 0,
  quantity: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  handleDecreaseQuantityClick: () => {},
  handleIncreaseQuantityClick: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [quantity, setQuantity] = useState(1);

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

  const handleDecreaseQuantityClick = () => {
    return setQuantity((prevState) =>
      prevState === 1 ? prevState : prevState - 1,
    );
  };

  const handleIncreaseQuantityClick = () => {
    return setQuantity((prevState) => prevState + 1);
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        handleDecreaseQuantityClick,
        handleIncreaseQuantityClick,
        quantity,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
