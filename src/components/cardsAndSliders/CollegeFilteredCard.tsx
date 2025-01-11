import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiHeart, CiLocationOn, CiMobile1 } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { MdOutlineOutlinedFlag } from "react-icons/md";
import { RiTodoLine } from "react-icons/ri";
import { SlBadge } from "react-icons/sl";
import { TbCoinRupee, TbTransactionRupee } from "react-icons/tb";
import { Button } from "../Button";
import formatFees from "@/utils/customText";

export default function CollegeFilteredCard({
  id,
  slug,
  collegeLogo,
  city,
  state,
  overallRating,
  totalReviews,
  avgFeePerYear,
  affiliation,
  brochureUrl,
  collegeType,
  collegeName,
  avgPackage,
  exam,
  description,
  tabsSections,
}: any) {
  return (
    <div className="relative mb-5 w-full rounded-lg bg-white shadow-xl">
      {/* Div 1 */}
      <div className="flex gap-y-2 p-5 max-lg:flex-wrap">
        <Image
          src={collegeLogo}
          alt="collage"
          width={500}
          height={500}
          className="h-[175px] w-[220px] rounded-md object-contain max-lg:w-full"
        />
        <div className="md:px-5">
          {/* Line 1  */}
          <div className="mb-3 flex flex-wrap gap-x-12 gap-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 rounded bg-emerald-300 px-1 py-0.5 text-xs text-white">
                {overallRating} <FaStar className="mb-[1px]" />
              </span>
              <span className="text-xs text-orange-500">{`(${totalReviews} reviews)`}</span>
            </div>

            <div className="flex items-center gap-x-2">
              <CiLocationOn />
              <span className="text-xs text-orange-500">
                {state && `${city}, ${state}`}
              </span>
            </div>

            <div className="flex items-center gap-x-2">
              <MdOutlineOutlinedFlag />
              <span className="text-xs text-orange-500">
                {collegeType}. College
              </span>
            </div>
          </div>
          {/* Line 2  */}
          <Link href={id ? `/colleges/${id}` : `#`}>
            <h1 className="mb-3 cursor-pointer text-wrap text-xl font-bold hover:text-orange-500">
              {collegeName}
            </h1>
          </Link>
          {/* Line 3 */}
          <div className="mb-3 flex flex-wrap gap-x-6">
            {/* item 1 */}
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <TbCoinRupee className="text-3xl text-blue-500" />
                <div>
                  <p className="font-semibold">
                    {formatFees(avgFeePerYear)}/Year
                  </p>
                  <p className="text-xs text-zinc-400">Fees</p>
                </div>
              </div>
            </div>
            {/* item 2  */}
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <SlBadge className="text-3xl text-blue-500" />
                <div>
                  <p className="font-semibold">{affiliation}</p>
                  <p className="text-xs text-zinc-400">Accreditation</p>
                </div>
              </div>
            </div>
            {/* item 3  */}
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <FaHandHoldingDollar className="text-3xl text-red-500" />
                <div>
                  <p className="font-semibold">{formatFees(avgPackage)} P.A.</p>
                  <p className="text-xs text-zinc-400">Avg Package</p>
                </div>
              </div>
            </div>
            {/* item 4  */}
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <RiTodoLine className="text-3xl text-orange-500" />
                <div>
                  <p className="font-semibold">{exam}</p>
                  <p className="text-xs text-zinc-400">Exams</p>
                </div>
              </div>
            </div>
          </div>
          {/* Line 5  */}
          <div className="flex gap-x-1 text-zinc-600">
            <p className="line-clamp-2 text-wrap text-sm [flex:11]">
              <span className="line-clamp-2 text-justify">{description}</span>
              <span className="text-orange-500 hover:underline">
                <Link href={id ? `/colleges/${id}` : `#`}>Read More</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* div 3  */}
      <div className="flex flex-wrap justify-between gap-y-2 border-t border-zinc-600 p-5">
        {/* Navbar Items  */}
        <ul className="flex flex-wrap items-center gap-x-4 rounded-md bg-orange-100 px-4 py-1 text-sm text-orange-600">
          {tabsSections?.slice(0, 4)?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <Link
                href={
                  id ? `/colleges/${id}?tab=${encodeURIComponent(item)}` : `#`
                }
              >
                <li
                  key={index}
                  className="cursor-pointer capitalize hover:underline"
                >
                  {item}
                </li>
              </Link>
              {index !== tabsSections?.length - 1 && <li>|</li>}
            </React.Fragment>
          ))}
          {tabsSections?.length > 4 && (
            <Link href={id ? `/colleges/${id}` : `#`}>
              <li className="cursor-pointer capitalize hover:underline">
                more
              </li>
            </Link>
          )}
        </ul>
        {/* buttons  */}
        <div className="flex gap-2 max-md:w-full max-md:flex-col">
          <Link href="#" className="max-md:w-full">
            <Button variant="black" className="!w-full">
              Apply Now
            </Button>
          </Link>
          <Link
            href={brochureUrl || "#"}
            target="_blank"
            className="max-md:w-full"
          >
            <Button variant="orange" className="!w-full">
              Download Brochure
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
