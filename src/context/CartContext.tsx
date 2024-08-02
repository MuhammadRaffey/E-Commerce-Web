"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Image as iImg } from "sanity";

interface CartItem {
  title: string;
  id: number;
  user_id: string;
  product_id: string;
  description: string;
  image: iImg | iImg[];
  price: number;
  quantity: number;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (id: string, quantity?: number) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  fetchCartItems: () => Promise<void>;
  updateCartCount: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch("/api/cart", { cache: "no-cache" });
      const data = await response.json();

      if (response.ok && data.cartItems) {
        setCartItems(data.cartItems);
        setCartCount(
          data.cartItems.reduce(
            (count: number, item: CartItem) => count + item.quantity,
            0
          )
        );
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, []);

  const addToCart = async (id: string, quantity: number = 1) => {
    try {
      const data = { product_id: id, quantity };
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCartItems((prevItems) => {
          const existingItemIndex = prevItems.findIndex(
            (item) => item.product_id === id
          );
          if (existingItemIndex !== -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += quantity;
            return updatedItems;
          } else {
            return [
              ...prevItems,
              {
                id: Date.now(),
                user_id: "user",
                product_id: id,
                title: "",
                description: "",
                image: [],
                price: 0,
                quantity,
                category: "",
              },
            ];
          }
        });
        updateCartCount();
        await fetchCartItems();
      } else {
        console.error("Failed to add item to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const data = { product_id: id };
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setCartItems((prevItems) => {
          return prevItems.filter((item) => item.product_id !== id);
        });
        updateCartCount();
        console.log("Item removed from cart successfully.");
      } else {
        console.error("Failed to remove item from cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateCartCount = useCallback(() => {
    const count = cartItems.reduce(
      (acc: number, item: CartItem) => acc + item.quantity,
      0
    );
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
        removeFromCart,
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
