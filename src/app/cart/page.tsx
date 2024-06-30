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
import { toast } from "react-hot-toast";

interface CartItem {
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  const combineCartItems = (items: CartItem[]): CartItem[] => {
    const combinedItems = items.reduce((acc: CartItem[], item: CartItem) => {
      const existingItem = acc.find(
        (accItem) => accItem.product_id === item.product_id
      );
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
      return urlForImage(image[0]); // Return the URL for the first image if it's an array
    }
    return urlForImage(image); // Return the URL for a single image
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center m-7 mr-2 pl-3 sm:pl-0 gap-3">
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
                  src={getImageUrl(item.image)}
                  alt="product"
                  width={180}
                  height={180}
                  className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square filter grayscale hover:grayscale-0"
                />
                <p className="mt-4 text-center font-bold">
                  Price: ${item.price}
                </p>
                <p className="text-center font-bold">
                  Quantity: {item.quantity}
                </p>
                <p className="text-center font-bold">
                  Category: {item.category}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
