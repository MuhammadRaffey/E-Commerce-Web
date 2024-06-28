// src/hooks/useCart.tsx
import { useState, useEffect, useCallback } from "react";

const useCart = () => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch("/api/cart", { cache: "no-cache" });
      const data = await response.json();

      if (response.ok && data.cartItems) {
        let totalCount = 0;
        data.cartItems.forEach((item: any) => {
          totalCount += item.quantity;
        });
        setCartCount(totalCount);
      } else {
        console.error("Failed to fetch cart items:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return { cartCount, fetchCartItems };
};

export default useCart;
