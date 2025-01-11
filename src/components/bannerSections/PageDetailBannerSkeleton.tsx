import React from "react";
import Wrapper from "../Wrappers";

export default function PageDetailBannerSkeleton() {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-32 max-md:mt-28 px-5"
      className="relative overflow-hidden rounded-2xl !px-0 text-white md:!px-0"
    >
      <div className="flex w-full items-center justify-between bg-orange-100 bg-opacity-50 p-8 px-8">
        {/* Left Side */}
        <div className="flex w-full flex-[8] gap-5 max-md:flex-col max-md:items-center">
          <div className="h-40 min-h-40 w-full max-w-40 flex-[2] animate-pulse rounded-2xl bg-orange-300"></div>
          <div className="flex w-full flex-[9] flex-col justify-between gap-2">
            <div className="h-8 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-8 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-8 w-[60%] animate-pulse rounded-md bg-orange-300"></div>
            <ul className="gap-4 max-md:space-y-2 md:flex">
              <li className="flex items-center gap-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
                <div className="h-4 w-40 animate-pulse rounded-md bg-orange-300"></div>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
                <div className="h-4 w-20 animate-pulse rounded-md bg-orange-300"></div>
              </li>
              <li className="flex items-center gap-2 capitalize">
                <div className="h-6 w-6 animate-pulse rounded-full bg-orange-300"></div>
                <div className="h-4 w-32 animate-pulse rounded-md bg-orange-300"></div>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-center flex-[2] flex-col gap-4 max-md:hidden">
          <div className="h-10 w-20 animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-8 w-48 animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-6 w-32 animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-10 w-48 animate-pulse rounded-md bg-orange-300"></div>
        </div>
      </div>
    </Wrapper>
  );
}
