import React from "react";
import Wrapper from "../Wrappers";

export function ListingBannerSkeleton() {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-32 max-md:mt-28 px-5"
      className="relative overflow-hidden rounded-2xl !px-0 md:!px-0"
    >
      {/* Bg Image Placeholder */}
      <div className="h-60 w-full animate-pulse bg-orange-300"></div>
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between bg-orange-100 bg-opacity-25 p-8 px-10">
        {/* Left Side Placeholder */}
        <div className="flex w-full flex-col justify-center text-white">
          <div className="mb-4 h-8 w-3/4 animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-6 w-1/2 animate-pulse rounded-md bg-orange-300"></div>
        </div>
        {/* Right Side Placeholders */}
        <div className="flex justify-end gap-4 max-md:hidden">
          <div className="w-max animate-pulse rounded-2xl bg-white bg-opacity-30 bg-clip-padding p-3 backdrop-blur-sm backdrop-filter">
            <div className="h-36 w-56 rounded-2xl bg-orange-300"></div>
          </div>
          <div className="w-max animate-pulse rounded-2xl bg-white bg-opacity-30 bg-clip-padding p-3 backdrop-blur-sm backdrop-filter">
            <div className="h-36 w-56 rounded-2xl bg-orange-300"></div>
          </div>
          <div className="w-max animate-pulse rounded-2xl bg-white bg-opacity-30 bg-clip-padding p-3 backdrop-blur-sm backdrop-filter max-lg:hidden">
            <div className="h-36 w-56 rounded-2xl bg-orange-300"></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
