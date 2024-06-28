"use client";
// src/components/CardComponent.tsx
import React from "react";
import { CardFooter } from "@/components/ui/card";
import useCart from "../hooks/useCart";
import { toast } from "react-hot-toast";

interface CardComponentProps {
  item: {
    _id: string;
    category: {
      name: string;
    };
  };
}

const CardComponent: React.FC<CardComponentProps> = ({ item }) => {
  const { fetchCartItems } = useCart();

  const handleAddToCart = async (id: string) => {
    try {
      const data = {
        product_id: id,
      };
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await fetchCartItems(); // Update cart count after adding to cart
        toast.success("Item added to cart", { icon: "✨" });
      } else {
        console.error("Failed to add item to cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <CardFooter>
      <p>{item.category.name}</p>
      <button
        className="btn btn-primary transition-all duration-200 hover:scale-105 hover:btn-primary btn-outline btn-md rounded-lg"
        onClick={() => handleAddToCart(item._id)}
      >
        Add to Cart
      </button>
    </CardFooter>
  );
};

export default CardComponent;
