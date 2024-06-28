import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { Image as iImg } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardComponent from "@/components/Card";
import { Toaster } from "react-hot-toast";

interface ProductType {
  title: string;
  _id: string;
  description: string;
  image: iImg;
  price: number;
  category: { name: string };
}

const fetchProductData = async (): Promise<ProductType[]> => {
  const res = await client.fetch(`*[_type == "product"]{
    _id,
    title,
    image,
    description,
    price,
    category -> {
      category
    }
  }`);
  return res;
};

const Home = async () => {
  const data = await fetchProductData();

  return (
    <div className="flex flex-row justify-center items-center m-7 text-2xl">
      <Toaster />
      {data.map((item) => (
        <Card
          className="flex transition-all duration-100 hover:drop-shadow-primary drop-shadow-md hover:shadow-primary justify-center flex-col w-max items-center m-2 gap-3 cursor-pointer"
          key={item._id}
        >
          <CardHeader>
            <CardTitle className="font-bold text-primary font-sans normal-case text-4xl tracking-wide">
              {item.title}
            </CardTitle>
            <CardDescription className="font-mono font-bold mt-3 -mb-3 tracking-wide">
              {item.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src={urlForImage(item.image)}
              alt="product"
              width={180}
              height={180}
              className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square filter grayscale hover:grayscale-0"
            />
            <p className="text-center text-pretty font-bold text-4xl -mb-6 mt-4">
              ${item.price}
            </p>
          </CardContent>
          <CardComponent item={item} />
        </Card>
      ))}
    </div>
  );
};

export default Home;
