import React from "react";
import { client } from "@/lib/sanityClient";
import { unstable_noStore as noStore } from "next/cache";
import CardComponent from "@/components/Card";
import { Toaster } from "react-hot-toast";
import { Image as iImg } from "sanity";

interface ProductType {
  title: string;
  _id: string;
  description: string;
  image: iImg | iImg[];
  price: number;
  category: { name: string };
}

const fetchProductData = async (): Promise<ProductType[]> => {
  noStore();
  const res = await client.fetch(
    `*[_type == "product" && category->category == "men"]{
      _id,
      title,
      image,
      description,
      price,
      category->{
        category
      }
    }
    `
  );
  return res;
};
const fetchProductData1 = async (): Promise<ProductType[]> => {
  noStore();
  const res = await client.fetch(
    `*[_type == "product" && category->category == "women"]{
      _id,
      title,
      image,
      description,
      price,
      category->{
        category
      }
    }
    `
  );
  return res;
};
const fetchProductData2 = async (): Promise<ProductType[]> => {
  noStore();
  const res = await client.fetch(
    `*[_type == "product" && category->category == "children"]{
      _id,
      title,
      image,
      description,
      price,
      category->{
        category
      }
    }
    `
  );
  return res;
};

const Home = async () => {
  const men = await fetchProductData();
  const women = await fetchProductData1();
  const children = await fetchProductData2();

  return (
    <>
      <Toaster toastOptions={{ className: "bg-black text-white" }} />
      <h1 className="text-center text-4xl font-bold text-primary pt-3">Men</h1>
      <CardComponent products={men} />
      <h1 className="text-center text-4xl font-bold text-primary">Women</h1>
      <CardComponent products={women} />
      <h1 className="text-center text-4xl font-bold text-primary">Children</h1>
      <CardComponent products={children} />
    </>
  );
};

export default Home;
