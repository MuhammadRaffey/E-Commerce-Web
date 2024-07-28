"use client";
import React from "react";
import { FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="overflow-x-hidden"
    >
      <footer className="footer mt-50 text-base-content p-10 flex justify-between ">
        <div className="ml-10">
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <h6 className="footer-title ml-1">Social</h6>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="link link-hover">
              <FiGithub />
            </a>
            <a href="#" className="link link-hover">
              <FiInstagram />
            </a>
            <a href="#" className="link link-hover">
              <FiTwitter />
            </a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Footer;
