import Image from "next/image";
import React from "react";
import Wrapper from "../Wrappers";
import { addCommas } from "@/utils/customText";

export default function CourseListingBanner({
  title,
  bgImg,
  imgArray,
  totalCoursesFound,
}: any) {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-32 max-md:mt-28 px-5"
      className="relative overflow-hidden rounded-2xl !px-0 md:!px-0"
    >
      {/* Bg Image  */}
      <Image
        src={bgImg}
        alt="banner"
        width={1200}
        height={500}
        className="h-60 w-full object-cover"
      />
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-between bg-black bg-opacity-25 p-8 px-10">
        {/* Left Side  */}
        <div className="flex flex-col justify-center text-white">
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="text-lg font-medium md:text-xl">{`Total ${addCommas(totalCoursesFound)} courses Found`}</p>
        </div>
        {/* Right Side  */}
        <div className="flex justify-end gap-4 max-md:hidden">
          <div className="w-max rounded-2xl bg-white bg-opacity-30 bg-clip-padding p-3 backdrop-blur-sm backdrop-filter">
            <Image
              src={imgArray?.[0]}
              alt="banner"
              width={1200}
              height={500}
              className="h-36 w-56 rounded-2xl object-cover"
            />
          </div>
          <div className="w-max rounded-2xl bg-white bg-opacity-30 bg-clip-padding p-3 backdrop-blur-sm backdrop-filter">
            <Image
              src={imgArray?.[1]}
              alt="banner"
              width={1200}
              height={500}
              className="h-36 w-56 rounded-2xl object-cover"
            />
          </div>
          <div className="w-max rounded-2xl bg-white bg-opacity-30 bg-clip-padding p-3 backdrop-blur-sm backdrop-filter max-lg:hidden">
            <Image
              src={imgArray?.[2]}
              alt="banner"
              width={1200}
              height={500}
              className="h-36 w-56 rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
