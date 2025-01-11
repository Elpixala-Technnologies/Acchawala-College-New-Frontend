import React from "react";
import Wrapper from "../Wrappers";
import Image from "next/image";
import { addCommas } from "@/utils/customText";
import { LuBadgeCheck } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { Button } from "../Button";
import { HiOutlineDownload } from "react-icons/hi";
import { StarRating } from "../StarRating";
import Link from "next/link";

export default function CollegeDetailBanner({
  bgImage,
  city,
  state,
  overallRating,
  totalReviews,
  affiliation,
  brochureUrl,
  collegeName,
  estYear,
  collegeLogo,
  collegeCategory,
}: any) {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-32 max-md:mt-28 px-5"
      className="relative overflow-hidden rounded-2xl !px-0 text-white md:!px-0"
    >
      {/* Bg Image  */}
      <Image
        src={bgImage}
        alt="banner"
        width={1200}
        height={500}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="z-10 flex h-full w-full flex-wrap items-center justify-between bg-black bg-opacity-50 p-5 max-md:flex-col max-md:space-y-5 md:p-8">
        {/* Left Side  */}
        <div className="flex flex-[8] gap-5 max-md:flex-col">
          <div className="w-min rounded-2xl bg-white p-2 max-md:mx-auto">
            <Image
              src={collegeLogo}
              alt="banner"
              width={500}
              height={500}
              className="min-h-40 min-w-40 rounded-lg object-contain"
            />
          </div>
          <div className="flex flex-col justify-between gap-3">
            <h2 className="text-3xl font-bold md:text-4xl">
              {collegeName}
              <span className="text-sm">
                {city}
                {state && ", " + state}
              </span>
            </h2>
            <p className="text-xl">
              Admission {`${new Date().getFullYear()}`}, Cutoff, Courses, Fees,
              Placement, Ranking
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              <li className="flex items-center gap-2">
                <LuBadgeCheck className="text-2xl text-orange-500" />
                <span>
                  Approved by{" "}
                  {affiliation?.map?.((a: any, index: number) => (
                    <React.Fragment key={a}>
                      {a}
                      {affiliation?.length > index + 1 && ", "}
                    </React.Fragment>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaClockRotateLeft className="text-2xl text-orange-500" />
                <span>Estd {estYear}</span>
              </li>
              <li className="flex items-center gap-2 capitalize">
                <FaUniversity className="text-2xl text-orange-500" />
                <span>{collegeCategory} university</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side  */}
        <div className="md:flex-center flex flex-[2] flex-wrap justify-center gap-2 md:flex-col md:gap-4">
          <h2 className="text-4xl font-bold">{overallRating}</h2>
          <StarRating
            className="gap-x-2 text-3xl font-bold text-white"
            rating={overallRating}
          />
          <p className="text-xl">({totalReviews} reviews)</p>
          <Link href={brochureUrl || "#"} target="_blank">
            <Button variant="white" className="text-nowrap">
              <span>Download Brochure</span>
              <HiOutlineDownload />
            </Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}
