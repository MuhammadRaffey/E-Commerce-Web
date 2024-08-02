"use client";

import React, { useState, useEffect } from "react";
import { Image as iImg } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import { ChevronLeftIcon, ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";

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
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [totalPrice, setTotalPrice] = useState<number>(product.price);

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const handleAddToCart = async (id: string) => {
    try {
      await addToCart(id, quantity);
      toast.success("Item added to cart", { icon: "✨" });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Error adding item to cart");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-100 rounded-lg shadow-lg">
      <Toaster
        toastOptions={{
          className: "bg-black text-white",
        }}
      />
      <button
        onClick={() => router.back()}
        className="flex items-center hover:text-secondary transition duration-150 ease-in-out mb-4"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-1" />
        <span className="text-lg font-medium">Back</span>
      </button>
      <h1 className="md:flex text-3xl md:text-4xl font-extrabold mb-6 justify-center">
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
        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col w-full md:w-auto">
          <p className="text-lg font-bold mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">
            Price: ${totalPrice.toFixed(2)}
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-4">
            <div className="flex space-x-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`btn btn-outline btn-md rounded-lg ${
                    selectedSize === size ? "bg-blue-400" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                className="btn btn-outline btn-md rounded-lg font-extrabold text-2xl"
              >
                -
              </button>
              <span className="text-lg font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="btn btn-outline btn-md rounded-lg font-extrabold text-2xl"
              >
                +
              </button>
            </div>
          </div>
          <button
            className="btn mt-4 transition-all duration-200 hover:scale-105 hover:btn-primary btn-outline btn-md rounded-lg"
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
