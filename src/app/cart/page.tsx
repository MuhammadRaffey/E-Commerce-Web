"use client";

import React, { useEffect, useState } from "react";
import { Image as Iimg } from "sanity";
import Image from "next/image";
import { urlForImage } from "../../../sanity/lib/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";

interface CartItem {
  id: number;
  user_id: string;
  product_id: string;
  title: string;
  description: string;
  image: Iimg;
  price: number;
  category: string;
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("/api/cart");
        const data = await response.json();
        // console.log("API Response:", data); // Debugging line

        if (response.ok && data.cartItems) {
          // Combine items with the same product_id into a single entry with summed quantity
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

  // Function to combine cart items with the same product_id into a single entry with summed quantity
  const combineCartItems = (items: CartItem[]): CartItem[] => {
    const combinedItems = items.reduce((acc: CartItem[], item: CartItem) => {
      const existingItem = acc.find(
        (accItem) => accItem.product_id === item.product_id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        acc.push({ ...item }); // Make a copy of the item to avoid mutating state directly
      }
      return acc;
    }, []);

    return combinedItems;
  };
  const lemmePrint = (items: any) => {
    console.log(cartItems);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-2  gap-6">
          {cartItems.map((item) => (
            <Card
              key={item.id}
              className="flex transition-all duration-100 hover:drop-shadow-primary drop-shadow-md hover:shadow-primary justify-center flex-col items-center p-4 gap-3 text-2xl "
            >
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="font-bold text-primary font-sans normal-case text-3xl tracking-wide text-center">
                  {item.title}
                </CardTitle>
                <CardDescription className="mt-2 text-center">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Image
                  src={urlForImage(item.image)}
                  alt="product"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
                <p className="mt-4 text-center font-bold">
                  Price: ${item.price}
                </p>
                <p className="text-center font-bold">
                  Quantity: {item.quantity}
                </p>
                <p className="text-center font-bold">
                  Catgeory: {item.category}
                </p>
                {/* <button
                  type="button"
                  onClick={() => lemmePrint(item)}
                  className="text-primary font-bold bg"
                >
                  Print
                </button> */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
