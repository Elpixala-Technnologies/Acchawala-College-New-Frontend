import React from "react";
import Wrapper from "../Wrappers";
import Image from "next/image";
import { addCommas, formatDate } from "@/utils/customText";
import { LuBadgeCheck } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaUniversity } from "react-icons/fa";
import { Button } from "../Button";
import { HiOutlineDownload } from "react-icons/hi";
import { StarRating } from "../StarRating";
import Link from "next/link";
import { MdOutlineFileDownload } from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
export default function ExamDetailBanner({
  breadCrumb,
  examName,
  titleAddition,
  examLogo,
  brochureUrl,
  lastUpdate,
}: any) {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-32 max-md:mt-28 px-5"
      className="orangeRedDownGradient space-y-4 rounded-2xl p-8 shadow-lg"
    >
      {/* Upper Side  */}
      <p className="text-zinc-600">
        <Link className="hover:text-blue-500 hover:underline" href={"/"}>
          Home
        </Link>{" "}
        &gt;{" "}
        <Link className="hover:text-blue-500 hover:underline" href={"/exams"}>
          Exams
        </Link>{" "}
        &gt; <span className="text-bold text-orange-500">{breadCrumb}</span>
      </p>
      <div className="flex gap-5 max-md:flex-col max-md:flex-col-reverse">
        {/* Left Side  */}
        <div className="flex flex-[8] gap-5">
          <h2 className="text-3xl font-bold max-sm:text-center md:pt-2 md:text-4xl">
            {examName} : {titleAddition}
          </h2>
        </div>
        {/* Right Side  */}
        <div className="flex h-auto w-full flex-[2] items-center justify-center md:justify-end">
          <div className="w-max min-w-40 rounded-2xl bg-white p-2">
            <Image
              src={examLogo}
              alt="banner"
              width={500}
              height={500}
              className="h-40 w-40 rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
      {/* Down Side  */}
      <div className="flex flex-wrap items-center justify-between">
        <p className="flex items-center gap-2">
          <FaClockRotateLeft className="text-xl" />
          <span>Updated on {formatDate(lastUpdate)}</span>
        </p>
        <div className="flex flex-wrap gap-5 max-md:w-full">
          <p className="flex items-center gap-2">
            <MdOutlineFileDownload className="text-xl" />
            <span>Save</span>
          </p>
          <p className="flex items-center gap-2">
            <AiOutlineQuestionCircle className="text-xl" />
            <span>Ask</span>
          </p>
          <div className="flex flex-wrap gap-5 max-md:!w-full">
            <Link
              href={brochureUrl || "#"}
              target="_blank"
              className="max-md:w-[48%] max-sm:!w-full"
            >
              <Button
                variant="white"
                className="text-nowrap shadow-lg max-md:w-[100%] max-sm:!w-full"
              >
                <span>Download Brochure</span>
                <HiOutlineDownload />
              </Button>
            </Link>
            <Button
              variant="black"
              className="text-nowrap shadow-lg max-md:w-[48%] max-sm:!w-full"
            >
              <span>Register</span>
            </Button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
