"use server";

import Stripe from "stripe";

import { CartProduct } from "@/providers/cart";

export default async function createCheckout(products: CartProduct[]) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10",
  });

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000",
    cancel_url: "http://localhost:3000",
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: "brl",
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: product.totalPrice * 100 - +product.basePrice,
        },
        quantity: product.quantity,
      };
    }),
  });

  return checkout;
}
