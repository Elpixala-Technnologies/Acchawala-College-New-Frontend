"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { headerLogo } from "@/assets";

const loaderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Loader({ isLoading }: any) {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    // When isLoading changes, update the visibility of the loader
    if (isLoading) {
      setIsVisible(true);
    } else {
      // Delay hiding the loader to complete the animation
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // Match this duration with the transition duration

      // Clear the timer if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <motion.div
      className="flex-center fixed inset-0 z-[999999999] h-screen w-full items-center justify-center overscroll-none bg-white"
      variants={loaderVariants}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      exit="hidden"
      transition={{
        duration: 0.5, // Duration of the visible state
        // delay: 0.3, // Delay before the exit animation starts
      }}
    >
      <div className="backgroundGradient flex-center h-full w-full px-10">
        <Image
          src={headerLogo}
          alt="loader"
          width={500}
          height={500}
          className="h-20 w-full animate-bounce object-contain"
        />
      </div>
    </motion.div>
  );
}
