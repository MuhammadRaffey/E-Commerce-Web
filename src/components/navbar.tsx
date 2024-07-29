"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Theme from "./Theme";
import { usePathname } from "next/navigation";
import { IoIosMale, IoIosFemale } from "react-icons/io";
import { MdChildCare } from "react-icons/md";

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
    <nav className="items-center maxw-screen-sm h-[4rem] sticky top-0 z-50 shadow-md border-b border-primary dark:border-white/50 bg-mysecondary ">
      <div className="mx-auto max-w-screen px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex md:flex md:items-center md:gap-12">
            <Link href="/" className="flex items-center gap-2">
              <span className="sr-only">Home</span>
              <span className="text-[25pt] font-[FoundersGrotesk-Semibold] font-bold whitespace-nowrap">
                TheRaffeyStore.
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex font-semibold items-center mt-2 gap-5 text-xl">
                <li>
                  <Link
                    href="/men"
                    className="flex items-center transition py-2 hoverani px-3 rounded linkStyle"
                  >
                    <IoIosMale className="mr-2 text-accent-500" />
                    Men
                  </Link>
                </li>
                <li>
                  <Link
                    href="/women"
                    className="flex items-center hoverani  transition py-2 px-3 rounded linkStyle"
                  >
                    <IoIosFemale className="mr-2" />
                    Women
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kids"
                    className="flex items-center hoverani  py-2 px-3 rounded linkStyle"
                  >
                    <MdChildCare className="mr-2" />
                    Kids
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center space-x-2">
              <label className="input input-bordered rounded-xl dark:border-[2px] input-primary mr-3 shadow-primary h-9 flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search here."
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
              <button
                onClick={() => Router.push("/cart")}
                className="relative p-2"
              >
                <FiShoppingCart className="w-7 h-7 mt-1" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              <Theme />
            </div>
            <div className="block mb-2 md:hidden">
              <Theme /></div>
            <div className="block md:hidden">
              <button
                onClick={toggleMenu}
                className="mr-2 shadow-primary flex-col flex bg-primary rounded p-2 scale-110 text-white"
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
      {isOpen && (
        <div className="md:hidden ">
          <div className="space-y-1 text-xl bg-mysecondary font-semibold flex flex-col items-center p-2">
            <Link
              href="/men"
              className="flex items-center transition py-2 px-3 rounded linkStyle"
            >
              <IoIosMale className="mr-2 text-accent-500" />
              Men
            </Link>
            <Link
              href="/women"
              className="flex items-center    transition   py-2 px-3 rounded linkStyle"
            >
              <IoIosFemale className="mr-2" />
              Women
            </Link>
            <Link
              href="/kids"
              className="flex items-center    transition   py-2 px-3 rounded linkStyle"
            >
              <MdChildCare className="mr-2" />
              Kids
            </Link>
            <Link
              href="/"
              className="   transition   py-2 px-3 rounded linkStyle flex items-center"
            >
              <FiSearch className="mr-2" />
              Search
            </Link>
            <Link
              href="/cart"
              className="   transition   py-2 px-3 rounded linkStyle flex items-center"
            >
              <FiShoppingCart className="mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
