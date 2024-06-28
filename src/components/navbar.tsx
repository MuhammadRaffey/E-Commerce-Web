"use client";
// src/components/NavBar.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiImage, FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Theme from "./Theme";
import Cookies from "js-cookie";
import { fetchCartItems, addToCart } from "@/lib/cart"; // Assuming addToCart function exists

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const Router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-full transition-all duration-300 border-b hover:shadow-sm  hover:shadow-primary hover:border-primary border-b-slate-600 text-[16pt]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto ">
        <div className="flex flex-row items-center">
          <FiShoppingCart className="w-12 text-primary h-12 mt-3 mx-5 gap-2" />
          <span className="text-3xl font-bold whitespace-nowrap mt-3">
            E-ComStore
          </span>
        </div>
        <div className="flex md:order-2 items-center flex-shrink-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 mt-3 rounded-lg bg-gray-300 text-black"
          />
          <div
            className="relative cursor-pointer"
            onClick={() => Router.push("/cart")}
          >
            <div className="flex items-center">
              <FiShoppingCart className="w-6 h-6 mt-3 mx-4 gap-3" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          <Theme />
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 mt-0 sm:mt-4"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 text-primary h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-2 rounded-lg md:space-x-8 md:flex-row">
            <li>
              <Link
                href="/"
                className="flex items-center  py-2 hover:underline underline-offset-4 px-3 rounded"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/men"
                className="flex items-center hover:underline underline-offset-4 py-2 px-3 rounded linkStyle"
              >
                Men
              </Link>
            </li>
            <li>
              <Link
                href="/women"
                className="flex items-center hover:underline underline-offset-4 py-2 px-3 rounded linkStyle"
              >
                Women
              </Link>
            </li>
            <li>
              <Link
                href="/children"
                className="flex items-center hover:underline underline-offset-4 py-2 px-3 rounded linkStyle"
              >
                Children
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
