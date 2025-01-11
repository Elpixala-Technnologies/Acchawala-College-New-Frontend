import React from "react";
import Wrapper from "../Wrappers";

export default function PageTabsWithDetailSkeleton() {
  return (
    <Wrapper containerClassName="my-5" className="flex w-full flex-col pt-0">
      {/* Navbar  */}
      <nav className="w-ful relative border-b border-zinc-400 text-orange-100">
        <ul className="flex animate-pulse gap-x-8 overflow-x-hidden py-5 pt-1">
          {/* Placeholder for navigation items */}
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="flex-shrink-0">
              <div className="h-8 w-24 rounded-md bg-orange-300"></div>
            </li>
          ))}
        </ul>
      </nav>
      {/* About Author  */}
      <Wrapper
        as="section"
        containerClassName="mt-5 !px-0"
        className="w-full rounded-lg bg-white p-5"
      >
        {/* Author */}
        <div className="mb-8 flex animate-pulse items-center gap-x-2">
          <div className="h-16 w-16 rounded-full bg-orange-300"></div>
          <div className="flex flex-col gap-2">
            <div className="h-8 w-48 rounded-md bg-orange-300"></div>
            <div className="flex items-center gap-2 text-zinc-500">
              <div className="h-4 w-20 rounded-md bg-orange-300"></div>
              <div className="h-4 w-20 rounded-md bg-orange-300"></div>
            </div>
          </div>
        </div>
        {/* Description */}
        <div className="mt-5 h-24 w-full space-y-3 border-l-4 border-orange-500 py-2 pl-5 text-lg font-medium italic text-black">
          <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
          <div className="h-5 w-[60%] animate-pulse rounded-md bg-orange-300"></div>
        </div>
      </Wrapper>
      <main className="flex gap-5 md:flex-row">
        {/* Content Section  */}
        <div className="w-full space-y-5 overflow-x-hidden md:[flex:8]">
          <div className="mt-5 w-full space-y-3 rounded-2xl bg-white p-5 md:min-w-[550px]">
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-[60%] animate-pulse rounded-md bg-orange-300"></div>
          </div>
          <div className="mt-5 w-full space-y-3 rounded-2xl bg-white p-5 md:min-w-[550px]">
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-full animate-pulse rounded-md bg-orange-300"></div>
            <div className="h-5 w-[60%] animate-pulse rounded-md bg-orange-300"></div>
          </div>
        </div>
        {/* Detail Page Aside Section  */}
        <aside className="mt-5 h-max min-w-[300px] space-y-5 [flex:2] max-md:hidden max-md:bg-opacity-80 md:sticky md:top-28">
          {/* 1  */}
          <div className="flex-center w-full animate-pulse flex-col space-y-3 rounded-2xl bg-white p-5 text-center">
            <div className="h-10 w-[70%] rounded-md bg-orange-300"></div>
            <div className="h-6 w-1/2 rounded-md bg-orange-300"></div>
            <div className="h-10 w-[90%] rounded-md bg-orange-300"></div>
            <div className="h-10 w-[90%] rounded-md bg-orange-300"></div>
          </div>
          {/* 2  */}
          <div className="flex w-full animate-pulse flex-col space-y-3 rounded-2xl bg-white p-5 text-center">
            <div className="h-10 w-full rounded-md bg-orange-300"></div>
            <div className="h-6 w-[70%] rounded-md bg-orange-300"></div>
            <div className="h-6 w-1/2 rounded-md bg-orange-300"></div>
            <div className="h-6 w-[60%] rounded-md bg-orange-300"></div>
          </div>
        </aside>
      </main>
    </Wrapper>
  );
}
