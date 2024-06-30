"use client";
import React from "react";
import { CardFooter } from "@/components/ui/card";
import useCart from "../hooks/useCart";
import { toast } from "react-hot-toast";
import Link from "next/link"; // Import Link from next/link

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
        const cartItems = await fetchCartItems();
        console.log("🚀 ~ handleAddToCart ~ cartItems:", cartItems);

        toast.success("Item added to cart", { icon: "✨" });
      } else {
        console.error("Failed to add item to cart:", response.statusText);
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };

  return (
    <CardFooter>
      <p>{item.category.name}</p>
      <button
        className="btn btn-primary transition-all duration-200 hover:scale-105 hover:btn-primary btn-outline btn-md rounded-lg mr-2"
        onClick={() => handleAddToCart(item._id)}
      >
        Add to Cart
      </button>
      {/* Use Link properly */}
      <Link href={`/products/${item._id}`}>
        <button className="btn btn-secondary transition-all duration-200 hover:scale-105 hover:btn-secondary btn-outline btn-md rounded-lg">
          Details
        </button>
      </Link>
    </CardFooter>
  );
};

export default CardComponent;
