"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Home = () => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      className="w-full h-screen overflow-x-hidden flex items-center justify-center"
    >
      <div className="grid py-12 px-4 md:px-12 lg:px-24 h-screen grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="h-32 rounded-lg">
          <motion.h1
            animate={{ x: 20 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-[Outfit] ml-2 md:ml-6 shadowed font-bold tracking-tight text-[40pt] md:text-[50pt] lg:text-[70pt] text-pretty leading-none"
          >
            An Industrial Twist on Streetwear.
          </motion.h1>
        </div>
        <motion.div
          animate={{ x: -20 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          whileInView={{ opacity: 1 }}
          className="h-32 rounded-full relative flex items-center justify-center mt-16 lg:mt-0 "
        >
          <Image
            className="rounded-full hover:scale-105 transition-all duration-300 hover:shadow-primary lg:mt-60 bg-success "
            src="/img.png"
            width={300}
            height={300}
            alt="logo"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
