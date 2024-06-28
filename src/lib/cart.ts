import { client } from "@/lib/sanityClient";

export const fetchCartItems = async (user_id: string) => {
  try {
    const response = await fetch(`/api/cart?user_id=${user_id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.res;
  } catch (error) {
    console.error("Failed to fetch cart items:", error);
    return [];
  }
};

export const addToCart = async (product_id: string) => {
  try {
    const product = await client.fetch(
      `*[_type == "product" && _id == $product_id][0]`,
      { product_id }
    );
    if (!product) {
      throw new Error(`Product not found with ID: ${product_id}`);
    }

    const response = await fetch(`/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add item to cart. Status: ${response.status}`);
    }

    return { ok: true };
  } catch (error: any) {
    console.error("Error adding item to cart:", error);
    return { ok: false, error: error.message };
  }
};
