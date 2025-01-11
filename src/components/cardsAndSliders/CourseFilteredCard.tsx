import React from "react";
import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";
import { RiBookletLine, RiTodoLine } from "react-icons/ri";
import formatFees, { formatDate } from "@/utils/customText";
import { FaBuildingColumns } from "react-icons/fa6";

export default function CourseFilteredCard({
  id,
  slug,
  bgImage,
  courseName,
  courseType,
  duration,
  totalColleges,
  description,
  avgFeesFrom,
  avgFeesTo,
  courseLevel,
  tabsSections,
}: any) {
  return (
    <div className="relative mb-5 w-full rounded-lg bg-white shadow-lg">
      {/* Div 1 */}
      <div className="flex gap-y-2 p-5 max-lg:flex-wrap">
        <Image
          src={bgImage}
          width={500}
          height={500}
          alt="collage"
          className="h-[175px] w-[220px] rounded-md object-contain max-lg:w-full"
        />
        <div className="md:px-5">
          {/* Line 1  */}
          <Link href={id ? `/courses/${id}` : `#`}>
            <h1 className="mb-3 cursor-pointer text-wrap text-xl font-bold hover:text-orange-500">
              {courseName}
            </h1>
          </Link>
          {/* Line 2 */}
          <div className="mb-3 flex flex-wrap gap-x-6">
            {/* item 1 */}
            <div className="flex gap-x-10 gap-y-5">
              <div>
                <p className="text-xs text-zinc-400">Average Duration</p>
                <p className="font-semibold">
                  {Math.floor(duration / 12)} Years
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-400">Average Fees</p>
                <p className="font-semibold">
                  {formatFees(avgFeesFrom)} - {formatFees(avgFeesTo)} INR
                </p>
              </div>
            </div>
          </div>
          {/* Line 3 */}
          <div className="mb-3 flex flex-wrap gap-x-6 capitalize">
            {/* item 1 */}
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <RiTodoLine className="text-3xl text-blue-500" />
                <p className="font-semibold">{courseType}</p>
              </div>
            </div>
            {/* item 3  */}
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <RiBookletLine className="text-3xl text-blue-500" />
                <p className="font-semibold">
                  {courseLevel?.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                      {index > 0 && ", "}
                      {item} Level
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
            {/* item 3  */}
            <div className="flex flex-col">
              <div className="flex items-center gap-x-2">
                <FaBuildingColumns className="text-3xl text-red-500" />
                <p className="font-semibold">{totalColleges} Accepting</p>
              </div>
            </div>
          </div>
          {/* Line 5  */}
          <div className="flex gap-x-1 text-zinc-600">
            <p className="line-clamp-2 text-wrap text-sm [flex:11]">
              <span className="line-clamp-2 text-justify">{description}</span>
              <span className="text-orange-500 hover:underline">
                <Link href={`/courses/${id} || #`}>Read More</Link>
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
                  id ? `/courses/${id}?tab=${encodeURIComponent(item)}` : `#`
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
            <Link href={id ? `/courses/${id}` : `#`}>
              <li className="cursor-pointer capitalize hover:underline">
                more
              </li>
            </Link>
          )}
        </ul>
        {/* buttons  */}
        <div className="flex gap-2 max-md:w-full max-md:flex-col">
          <Link href={id ? `/courses/${id}` : `#`}>
            <Button variant="black" className="!w-full text-nowrap shadow-lg">
              View Details
            </Button>
          </Link>
          <Button variant="white" className="!w-full text-nowrap shadow-lg">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
