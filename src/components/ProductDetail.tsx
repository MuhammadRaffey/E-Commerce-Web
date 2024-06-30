"use client";

import React from "react";
import { Image as iImg } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import { ChevronLeftIcon, ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/useCart";

interface ProductType {
  title: string;
  _id: string;
  description: string;
  image: iImg[] | iImg;
  price: number;
  category: { name: string };
}

const ProductDetail = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const { fetchCartItems } = useCart(); // Destructure the addToCart function from the cart context

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
    <div className="container mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <button
        onClick={() => router.back()}
        className="flex items-center text-primary hover:text-secondary transition duration-150 ease-in-out mb-4"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-lg font-medium">Back</span>
      </button>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-primary">
        {product.title}
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
        {Array.isArray(product.image) ? (
          product.image.map((img, index) => (
            <Image
              key={index}
              src={urlForImage(img)}
              alt={`product-${index}`}
              width={400}
              height={400}
              className="rounded-lg mb-4 md:mb-0"
            />
          ))
        ) : (
          <Image
            src={urlForImage(product.image)}
            alt="product"
            width={400}
            height={400}
            className="rounded-lg mb-4 md:mb-0"
          />
        )}
        <div className="mt-4 md:mt-0 md:ml-6">
          <p className="text-lg font-bold text-primary mb-4">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-primary">${product.price}</p>
          <button
            className="btn btn-primary mt-4 transition-all duration-200 hover:scale-105 hover:btn-primary btn-outline btn-md rounded-lg"
            onClick={() => handleAddToCart(product._id)}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-1" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
