import React from "react";
import { client } from "@/lib/sanityClient";
import { unstable_noStore as noStore } from "next/cache";
import { Toaster } from "react-hot-toast";
import { Image as iImg } from "sanity";
import Home from "../components/Home";
import NavBar from "@/components/navbar";
import Footer from "@/components/Footer";


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

const Main = async () => {
  // const men = await fetchProductData();
  // const women = await fetchProductData1();
  // const children = await fetchProductData2();

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: { backgroundColor: "black", color: "white" },
        }}
      />

      <Home />
    </>
  );
};

export default Main;
