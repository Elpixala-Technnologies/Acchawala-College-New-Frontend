"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { Button } from "./Button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button
      variant="black"
      className="fixed bottom-16 right-5 z-50 !rounded-full !bg-opacity-80 !p-5 duration-300 hover:!bg-orange-500 md:bottom-5 md:right-10"
      title="Scroll to Top"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <FaArrowUp />
    </Button>
  );
};

export default ScrollToTopButton;
