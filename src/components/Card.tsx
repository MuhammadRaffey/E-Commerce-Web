"use client";
import React from "react";
import { CardFooter } from "@/components/ui/card";

interface CardComponentProps {
  item: {
    _id: string;
    category: {
      name: string;
    };
  };
}

const CardComponent: React.FC<CardComponentProps> = ({ item }) => {
  const handleAddToCart = async (id: string) => {
    try {
      const data = {
        product_id: id,
      };
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Cart updated:", result);
      } else {
        console.error("Failed to add to cart:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      // toast("Items Added To Cart", { icon: "✨" });
    }
  };

  return (
    <CardFooter>
      {/* <Toaster position="bottom-right" /> */}
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
