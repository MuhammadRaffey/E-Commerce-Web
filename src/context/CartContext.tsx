// src/context/CartContext.tsx

"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Image as iImg } from "sanity";

// Add category to the CartItem interface
interface CartItem {
  title: string;
  id: number;
  user_id: string;
  product_id: string;
  description: string;
  image: iImg | iImg[];
  price: number;
  quantity: number;
  category: string; // New property added
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (id: string) => Promise<void>;
  fetchCartItems: () => Promise<void>;
  updateCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch("/api/cart", { cache: "no-cache" });
      const data = await response.json();

      if (response.ok && data.cartItems) {
        setCartItems(data.cartItems);
        setCartCount(data.cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0));
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, []);

  const addToCart = async (id: string) => {
    try {
      const data = { product_id: id };
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Directly update cart items to provide immediate feedback
        setCartItems((prevItems) => {
          // Check if the item already exists in the cart
          const existingItemIndex = prevItems.findIndex(item => item.product_id === id);
          if (existingItemIndex !== -1) {
            // Item exists, update its quantity
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += 1;
            return updatedItems;
          } else {
            // Item doesn't exist, add a new one
            return [...prevItems, { id: Date.now(), user_id: 'user', product_id: id, title: '', description: '', image: [], price: 0, quantity: 1, category: '' }];
          }
        });
        updateCartCount(); // Update the count immediately
        await fetchCartItems(); // Fetch updated cart items from server
      } else {
        console.error("Failed to add item to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const updateCartCount = useCallback(() => {
    const count = cartItems.reduce((acc: number, item: CartItem) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    updateCartCount();
  }, [cartItems, updateCartCount]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        fetchCartItems,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
