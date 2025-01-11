import React from "react";
import Wrapper from "../Wrappers";
import Image from "next/image";
import { FaClockRotateLeft } from "react-icons/fa6";
import { Button } from "../Button";
import { HiOutlineDownload } from "react-icons/hi";
import Link from "next/link";
import {
  MdOutlineFileDownload,
  MdOutlineLocalPhone,
  MdOutlineMoney,
} from "react-icons/md";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import formatFees from "@/utils/customText";

export default function CourseDetailBanner({
  breadCrumb,
  courseName,
  titleAddition,
  duration,
  avgFeesFrom,
  avgFeesTo,
}: any) {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-32 px-5"
      className="orangeRedDownGradient space-y-4 rounded-2xl p-8 shadow-lg"
    >
      {/* Upper Side  */}
      <p className="text-zinc-600">
        <Link href="/" className="hover:text-blue-500 hover:underline">
          {" "}
          Home
        </Link>{" "}
        &gt;{" "}
        <Link href="/" className="hover:text-blue-500 hover:underline">
          {" "}
          Courses
        </Link>{" "}
        &gt; <span className="font-bold text-orange-500">{breadCrumb}</span>
      </p>
      <h2 className="text-3xl font-bold max-md:pt-2 md:text-5xl">
        {courseName} : {titleAddition}
      </h2>
      {/* Down Side  */}
      <div className="flex flex-wrap items-center justify-between gap-5 max-md:flex-col">
        <div className="flex flex-wrap gap-5">
          <p className="flex items-center gap-2">
            <FaClockRotateLeft className="text-xl text-orange-500" />
            <span>
              Total Duration - {`${(duration / 12).toFixed(2)}`} Years
            </span>
          </p>
          <p className="flex items-center gap-2">
            <MdOutlineMoney className="text-xl text-orange-500" />
            <span>
              {" "}
              {formatFees(avgFeesFrom)} - {formatFees(avgFeesTo)} INR
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-5">
          <p className="flex cursor-pointer items-center gap-2">
            <MdOutlineFileDownload className="text-xl text-white" />
            <span>Save</span>
          </p>
          <p className="flex cursor-pointer items-center gap-2">
            <AiOutlineQuestionCircle className="text-xl text-white" />
            <span>Ask</span>
          </p>
          <p className="flex cursor-pointer items-center gap-2">
            <MdOutlineLocalPhone className="text-xl text-white" />
            <span>Request a Call</span>
          </p>
        </div>
      </div>
    </Wrapper>
  );
}
