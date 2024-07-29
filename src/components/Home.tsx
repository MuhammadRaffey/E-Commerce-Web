"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "./ui/moving-border";
import Link from "next/link";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <div className="flex flex-col items-center min-h-screen overflow-x-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-6xl lg:text-8xl leading-none text-center p-8 md:p-14 tracking-normal font-thin italic font-[FoundersGrotesk-Semibold] duration-100 transition-all selection:text-secondary"
        >
          An Industrial Twist <br />on Streetwear.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid place-content-center mb-12 flex-grow w-full px-5"
        >
          <Image src="/img.jpg" width={700} height={100} alt="logo" className="max-w-full h-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link className="text-primary " href="/all-products">
            <Button className="font-bold text-2xl hoverani ">Start Shopping</Button>
          </Link>
        </motion.div>
        <hr className="w-full top-0 left-0 mt-8 z-50" />
      </div>
    </>
  );
};

export default Home;