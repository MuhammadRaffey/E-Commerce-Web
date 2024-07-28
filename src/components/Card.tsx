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
import { useCart } from "../context/CartContext";
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
  const { addToCart } = useCart();

  const handleAddToCart = async (id: string) => {
    try {
      await addToCart(id);
      toast.success("Item added to cart", { icon: "✨" });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 px-7 lg:px-56 py-16">
      {products.map((item) => (
        <Card
          key={item._id}
          className="flex border-zinc-50/60 border-2 transition-all duration-100 hover:drop-shadow-primary drop-shadow-md hover:shadow-primary justify-center flex-col items-center   gap-3 cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="font-bold font-sans normal-case text-2xl sm:text-4xl inline-block truncate overflow-hidden whitespace-nowrap">
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
                className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square"
              />
            ) : (
              <Image
                src={urlForImage(item.image)}
                alt="product"
                width={200}
                height={200}
                className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square"
              />
            )}
            <p className="text-center text-pretty font-bold text-4xl -mb-6 mt-4">
              ${item.price}
            </p>
          </CardContent>
          <CardFooter>
            <p>{item.category.name}</p>
            <Link href={`/products/${item._id}`}>
              <button className="btn transition-all duration-200 hover:scale-105 hover: font-bold btn-outline btn-md rounded-lg mr-2">
                Details
              </button>
            </Link>
            <button
              className="btn transition-all duration-200 hover:scale-105 hover: btn-outline btn-md rounded-lg mr-2 ml-10 hover:font-bold"
              onClick={() => handleAddToCart(item._id)}
            >
              Add to Cart
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardComponent;
