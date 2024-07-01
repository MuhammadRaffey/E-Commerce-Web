import React from "react";
import Image from "next/image";
import { client } from "@/lib/sanityClient";
import { Image as iImg } from "sanity";
import { urlForImage } from "../../sanity/lib/image";
import { unstable_noStore as noStore } from "next/cache";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CardComponent from "@/components/Card";
import { Toaster } from "react-hot-toast";

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
    `*[_type == "product"]{
      _id,
      title,
      image,
      description,
      price,
      category -> {
        name
      }
    }`
  );
  return res;
};

const Home: React.FC = async () => {
  const products = await fetchProductData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center m-7 mr-2 pl-5 sm:pl-0">
      <Toaster
        toastOptions={{
          className: "bg-black text-white",
        }}
      />
      {products.map((item) => (
        <Card
          key={item._id}
          className="flex transition-all duration-100 hover:drop-shadow-primary drop-shadow-md hover:shadow-primary justify-center flex-col w-max items-center m-2 gap-3 cursor-pointer"
        >
          <CardHeader>
            <CardTitle className="font-bold text-primary font-sans normal-case text-2xl sm:text-4xl tracking-wide">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(item.image) ? (
              item.image.map((img, index) => (
                <Image
                  key={index}
                  src={urlForImage(img)}
                  alt={`product-${index}`}
                  width={180}
                  height={200}
                  className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square filter grayscale hover:grayscale-0"
                />
              ))
            ) : (
              <Image
                src={urlForImage(item.image)}
                alt="product"
                width={180}
                height={200}
                className="rounded-lg hover:scale-[1.02] hover:shadow-lg duration-300 transition-all hover:shadow-primary aspect-square filter grayscale hover:grayscale-0"
              />
            )}
            <p className="text-center text-pretty font-bold text-4xl -mb-6 mt-4">
              ${item.price}
            </p>
          </CardContent>
          <div className="mt-auto">
            <CardComponent item={item} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Home;
