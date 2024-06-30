import { useState, useEffect, useCallback } from "react";

const useCart = () => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await fetch("/api/cart", { cache: "no-cache" });
      const data = await response.json();

      console.log("🚀 ~ fetchCartItems ~ response data:", data);

      if (response.ok && data.cartItems) {
        let totalCount = 0;
        data.cartItems.forEach((item: any) => {
          totalCount += item.quantity;
        });
        setCartCount(totalCount);
        return data.cartItems;
      } else {
        console.error("Failed to fetch cart items:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return { cartCount, fetchCartItems };
};

export default useCart;
