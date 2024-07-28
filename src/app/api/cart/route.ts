// src/app/api/cart/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db, cartTable } from "@/lib/drizzle";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import { eq, and } from "drizzle-orm";
import { client } from "@/lib/sanityClient";
import { groq } from "next-sanity";

export const GET = async (request: NextRequest) => {
  const req = request.nextUrl;
  const uid =
    req.searchParams.get("user_id") || cookies().get("user_id")?.value;

  if (!uid) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 }
    );
  }

  try {
    // Fetch cart items from PostgreSQL
    const cartItems = await db
      .select()
      .from(cartTable)
      .where(eq(cartTable.user_id, uid as string));

    // Fetch product details from Sanity
    const query = groq`
      *[_type == "product"]{
        _id,
        title,
        description,
        price,
        image,
        "category": category->category
      }
    `;

    const params = { uid };

    const sanityProducts = await client.fetch(query, params);

    // Combine cart items with product details
    const combinedItems = cartItems.map((cartItem) => {
      const matchingProduct = sanityProducts.find(
        (product: any) => product._id === cartItem.product_id
      );

      return {
        id: cartItem.id,
        user_id: cartItem.user_id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        ...matchingProduct, // Include product details from Sanity
      };
    });

    return NextResponse.json({ cartItems: combinedItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const req = await request.json();
    const cookieStore = cookies();
    let user_id = cookieStore.get("user_id")?.value;

    if (!user_id) {
      user_id = uuid();
      cookieStore.set("user_id", user_id);
    }

    // Check if the product is already in the cart
    const existingItems = await db
      .select()
      .from(cartTable)
      .where(
        and(
          eq(cartTable.user_id, user_id),
          eq(cartTable.product_id, req.product_id)
        )
      );

    const existingItem = existingItems[0];

    let res;
    if (existingItem) {
      // If it exists, update the quantity
      res = await db
        .update(cartTable)
        .set({ quantity: existingItem.quantity + (req.quantity || 1) })
        .where(
          and(
            eq(cartTable.user_id, user_id),
            eq(cartTable.product_id, req.product_id)
          )
        )
        .returning();
    } else {
      res = await db
        .insert(cartTable)
        .values({
          product_id: req.product_id,
          quantity: req.quantity || 1,
          user_id: user_id,
        })
        .returning();
    }

    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

// DELETE route to remove an item from the cart
export const DELETE = async (request: NextRequest) => {
  try {
    // Parse request JSON to get the product_id
    const req = await request.json();
    const cookieStore = cookies();
    const user_id = cookieStore.get("user_id")?.value;

    if (!user_id || !req.product_id) {
      return NextResponse.json(
        { message: "User ID or Product ID is missing" },
        { status: 400 }
      );
    }

    // Perform the delete operation
    const deletedItems = await db
      .delete(cartTable)
      .where(
        and(
          eq(cartTable.user_id, user_id),
          eq(cartTable.product_id, req.product_id)
        )
      )
      .returning(); // Return deleted items

    // Check if any item was actually deleted
    if (deletedItems.length === 0) {
      return NextResponse.json(
        { message: "Item not found in the cart" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Item deleted successfully",
      deletedItems, // Return the deleted item details
    });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
