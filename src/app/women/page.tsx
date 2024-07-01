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
  image: iImg[] | iImg;
  price: number;
  category: { name: string };
}

const fetchProductData = async (): Promise<ProductType[]> => {
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

const Women = async () => {
  const products = await fetchProductData();

  return (
    <>
      <Toaster toastOptions={{ className: "bg-black text-white" }} />
      <CardComponent products={products} />
    </>
  );
};

export default Women;
