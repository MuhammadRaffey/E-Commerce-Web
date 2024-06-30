// app/products/[id]/page.tsx
import React from "react";
import { client } from "@/lib/sanityClient";
import { Image as iImg } from "sanity";
import { urlForImage } from "../../../../sanity/lib/image";
import ProductDetail from "@/components/ProductDetail";

interface ProductType {
  title: string;
  _id: string;
  description: string;
  image: iImg[] | iImg;
  price: number;
  category: { name: string };
}

const fetchProductById = async (id: string): Promise<ProductType> => {
  const res = await client.fetch(
    `*[_type == "product" && _id == $id][0]{
      _id,
      title,
      image,
      description,
      price,
      category -> {
        category
      }
    }`,
    { id }
  );
  return res;
};

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await fetchProductById(params.id);

  return <ProductDetail product={product} />;
};

export default ProductPage;
