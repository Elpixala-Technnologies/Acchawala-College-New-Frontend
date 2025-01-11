"use client";
import React, { useEffect, useRef, useState } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";

export default function Navbar({ navItems, onSelect, selectedIndex }: any) {
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
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
    <nav className="relative w-full border-b border-zinc-400 text-black">
      <ul
        className="no-scrollbar flex gap-x-8 overflow-x-auto pt-1"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {navItems.map((item: any, index: number) => (
          <>
            <li key={index}>
              <button
                className={`text-nowrap py-5 capitalize ${
                  selectedIndex === index
                    ? "border-b-4 border-black text-lg text-orange-500 duration-100"
                    : ""
                }`}
                onClick={() => onSelect(index)}
              >
                {item.navItem}
              </button>
            </li>
          </>
        ))}
      </ul>
      {showLeftButton && (
        <button
          className="absolute left-1 top-1/2 -translate-y-1/2 transform rounded-full bg-orange-500 p-1 opacity-60 hover:opacity-100"
          onClick={handleScrollLeft}
        >
          <TiChevronLeft className="text-3xl text-white" />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute right-1 top-1/2 -translate-y-1/2 transform rounded-full bg-orange-500 p-1 opacity-60 hover:opacity-100"
          onClick={handleScrollRight}
        >
          <TiChevronRight className="text-3xl text-white" />
        </button>
      )}
    </nav>
  );
}
