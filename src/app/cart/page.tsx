// src/app/cart/page.tsx

"use client";

import React, { useEffect } from "react";
import { Image as Iimg } from "sanity";
import { urlForImage } from "../../../sanity/lib/image";
import CartItem from "@/components/Cart";
import { useCart } from "../../context/CartContext"; // Import the context

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
  // Access cart items and fetchCartItems method from context
  const { cartItems, fetchCartItems } = useCart();

  // Fetch cart items using context on component mount
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Combine cart items with the same product ID
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

  // Calculate the total price of all cart items
  const calculateTotalAmount = (items: CartItemData[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Generate URL for images
  const getImageUrl = (image: Iimg | Iimg[]) => {
    if (Array.isArray(image)) {
      return urlForImage(image[0]);
    }
    return urlForImage(image);
  };

  // Get the combined cart items
  const combinedCartItems = combineCartItems(cartItems);

  // Calculate the total amount
  const totalAmount = calculateTotalAmount(combinedCartItems);

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {combinedCartItems.map((item) => (  // Use combinedCartItems with cartItems from context
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
      {cartItems.length > 0 && (  // Display total only if there are items in the cart
        <div className="mt-6 p-4  rounded shadow-sm">
          <h2 className="text-2xl font-semibold text-center">Total: ${totalAmount.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
