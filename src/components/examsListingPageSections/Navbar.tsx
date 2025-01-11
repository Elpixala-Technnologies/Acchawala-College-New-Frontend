"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";


export default function Navbar({ category, onSelect, selectedNav }: any) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    handleScroll();
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative w-full mb-5">
      <ul
        className="flex space-x-6 overflow-x-hidden pt-1"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {category.map((item:any, index: number) => (
          <li key={index}>
            <button
              className={`px-5 py-1 border  rounded-s-full rounded-e-full text-nowrap ${
                selectedNav === index
                  ? " border-orange-500 text-orange-500 bg-orange-100"
                  : "border-zinc-400 text-zinc-500 bg-zinc-100"
              }`}
              onClick={() => onSelect(index)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      {showLeftButton && (
        <button
          className="absolute left-1 top-1/2 transform -translate-y-1/2 rounded-full bg-orange-500 opacity-60 hover:opacity-100 p-1"
          onClick={handleScrollLeft}
        >
          <TiChevronLeft className="text-3xl text-white" />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-orange-500 opacity-60 hover:opacity-100 p-1"
          onClick={handleScrollRight}
        >
          <TiChevronRight className="text-3xl text-white" />
        </button>
      )}
    </nav>
  );
}
