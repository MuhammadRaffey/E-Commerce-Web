"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import { toast } from "react-hot-toast";
import Link from "next/link";
import useCart from "../hooks/useCart";
import { Image as iImg } from "sanity";

interface ProductType {
  title: string;
  _id: string;
  description: string;
  image: iImg | iImg[];
  price: number;
  category: { name: string };
}

interface CardComponentProps {
  products: ProductType[];
}

const CardComponent: React.FC<CardComponentProps> = ({ products }) => {
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
        await fetchCartItems();
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
    <div className="relative">
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        onClick={() => {
          document
            .getElementById("product-list")
            ?.scrollBy({ left: -300, behavior: "smooth" });
        }}
      >
        {"<"}
      </button>
      <div id="product-list" className="flex overflow-x-auto space-x-10  p-4">
        {products.map((item) => (
          <Card
            key={item._id}
            className="flex transition-all duration-100 hover:drop-shadow-primary drop-shadow-md hover:shadow-primary justify-center flex-col  items-center m-8 px-8 pr-12 gap-3 cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="font-bold text-primary font-sans normal-case text-2xl sm:text-4xl inline-block truncate overflow-hidden whitespace-nowrap">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Array.isArray(item.image) ? (
                <Image
                  src={urlForImage(item.image[0])}
                  alt="product"
                  width={200}
                  height={200}
                  className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square filter grayscale hover:grayscale-0"
                />
              ) : (
                <Image
                  src={urlForImage(item.image)}
                  alt="product"
                  width={200}
                  height={200}
                  className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square filter grayscale hover:grayscale-0"
                />
              )}
              <p className="text-center text-pretty font-bold text-4xl -mb-6 mt-4">
                ${item.price}
              </p>
            </CardContent>
            <CardFooter>
              <p>{item.category.name}</p>
              <Link href={`/products/${item._id}`}>
                <button className="btn btn-primary text-primary transition-all duration-200 hover:scale-105 hover:btn-primary hover:font-bold btn-outline btn-md rounded-lg mr-2 ">
                  Details
                </button>
              </Link>
              <button
                className="btn btn-primary text-primary transition-all duration-200 hover:scale-105 hover:btn-primary btn-outline btn-md rounded-lg mr-2 ml-10 hover:font-bold"
                onClick={() => handleAddToCart(item._id)}
              >
                Add to Cart
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        onClick={() => {
          document
            .getElementById("product-list")
            ?.scrollBy({ left: 300, behavior: "smooth" });
        }}
      >
        {">"}
      </button>
    </div>
  );
};

export default CardComponent;
