"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { type Cart } from "@/api/types";
import { getCarts } from "@/helpers/gql.request";

const useCartState = (initialCart: Cart) => useState<Cart>(initialCart);

export const CartContext = createContext<ReturnType<
  typeof useCartState
> | null>(null);

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return cart;
};

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { products, loading } = getCarts();
  const [cart, setCart] = useCartState({ products: [] });

  useEffect(() => {
    if (!loading) setCart({ products });
  }, [products]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
