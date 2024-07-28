"use client";

// src/components/NavBar.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext"; // Import the CartContext
import Theme from "./Theme";
import { usePathname } from "next/navigation";


const NavBar: React.FC = () => {
  const pathname = usePathname();
  const isSanityStudio = pathname.startsWith("/studio");
  const [isOpen, setIsOpen] = useState(false);
  const Router = useRouter();
  const { cartCount, fetchCartItems } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  if (isSanityStudio) {
    return <div></div>;
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-primary
    dark:border-white/50 shadow-md text-[14pt] px-9 bg-base-100"
    >
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <div className="flex flex-row items-center">
          <FiShoppingCart className="h-10 w-10 text-accent-500 mt-1 mx-5" />
          <span className="text-[28pt] font-[FoundersGrotesk-Semibold] whitespace-nowrap mt-1">
            <Link href="/">Raffey Store</Link>
          </span>
        </div>
        <div className="flex md:order-2 items-center w-full md:w-auto">
          <div className="hidden md:block">
            <label className="input input-bordered rounded-xl dark:border-[2px] input-primary mr-5 shadow-primary h-12 flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search the store"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <div className="block md:hidden cursor-pointer">
            <FiSearch className="w-6 h-6 mt-3 mx-4" />
          </div>
          <div
            className="relative cursor-pointer"
            onClick={() => Router.push("/cart")}
          >
            <div className="flex items-center">
              <FiShoppingCart className="w-6 h-6 mt-3 mx-4" />
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
            className="inline-flex items-center p-2 w-9 h-9 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 mt-0 sm:mt-6"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 text-primary h-5 mt-2 sm:mt-0"
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
          className={`items-center justify-between ${isOpen ? "block" : "hidden"
            } w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-2 rounded-lg md:space-x-8 md:flex-row">
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
