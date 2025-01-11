import React, { useState } from "react";
import { IoFilterOutline } from "react-icons/io5";

export default function SortButton({ handleFilterOptionClick }: any) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="group relative max-md:!w-full max-md:flex-[1]">
      <div
        className={`flex-center group h-12 cursor-pointer gap-2 rounded-xl border-2 border-black bg-black px-2 text-white max-md:!w-full`}
        onClick={toggleDropdown} // Show dropdown on hover
      >
        <span>Sort</span> <IoFilterOutline className="text-white" />
      </div>
      {/* Conditional rendering based on dropdown state */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 z-20 w-max rounded-md border border-gray-200 bg-white py-1 max-md:bottom-12 md:top-12"
          onClick={toggleDropdown}
        >
          <div
            className="cursor-pointer px-3 py-1 hover:bg-gray-100"
            onClick={() => {
              handleFilterOptionClick("a-z");
              toggleDropdown();
            }}
          >
            A-Z
          </div>
          <div
            className="cursor-pointer px-3 py-1 hover:bg-gray-100"
            onClick={() => {
              handleFilterOptionClick("reset");
              toggleDropdown();
            }}
          >
            Reset
          </div>
        </div>
      )}
    </div>
  );
}
