"use client";

import React, { useEffect, useState } from "react";
import { Image as Iimg } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import CartItem from "@/components/Cart";

interface CartItemData {
  id: number;
  user_id: string;
  product_id: string;
  title: string;
  description: string;
  image: Iimg | Iimg[];
  price: number;
  category: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/cart", { cache: "no-cache" });
        const data = await response.json();

        if (response.ok && data.cartItems) {
          const uniqueCartItems = combineCartItems(data.cartItems);
          setCartItems(uniqueCartItems);
        } else {
          console.error("Failed to fetch cart items:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const combineCartItems = (items: CartItemData[]): CartItemData[] => {
    const combinedItems = items.reduce((acc: CartItemData[], item: CartItemData) => {
      const existingItem = acc.find((accItem) => accItem.product_id === item.product_id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    return combinedItems;
  };

  const getImageUrl = (image: Iimg | Iimg[]) => {
    if (Array.isArray(image)) {
      return urlForImage(image[0]);
    }
    return urlForImage(image);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              user_id={item.user_id}
              product_id={item.product_id}
              title={item.title}
              description={item.description}
              image={getImageUrl(item.image)}
              price={item.price}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
