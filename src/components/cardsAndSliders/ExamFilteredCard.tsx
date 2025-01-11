import React from "react";
import { Button } from "../Button";
import Image from "next/image";
import Link from "next/link";
import { RiTodoLine } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { formatDate } from "@/utils/customText";

export default function ExamFilteredCard({
  id,
  slug,
  logo,
  examName,
  examStartDate,
  examEndDate,
  applicationSubmissionStartDate,
  applicationSubmissionEndDate,
  mode,
  examinationLevel,
  description,
  tabsSections,
  brochureFile,
}: any) {
  return (
    <div className="relative mb-5 w-full rounded-lg bg-white shadow-lg">
      <div className="flex gap-y-2 p-5 max-lg:flex-wrap">
        <Image
          src={logo}
          alt={`${examName} banner`}
          width={220}
          height={175}
          className="h-[175px] w-[220px] rounded-md object-contain max-lg:w-full"
        />
        <div className="md:px-5">
          <Link href={id ? `/exams/${id}` : `#`}>
            <h1 className="mb-3 cursor-pointer text-wrap text-xl font-bold hover:text-orange-500">
              {examName}
            </h1>
          </Link>
          <div className="mb-3 flex flex-wrap gap-x-6">
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <RiTodoLine className="text-2xl text-orange-500" />
                <div>
                  <p className="font-medium">
                    Registration Date:{" "}
                    <span className="text-zinc-600">
                      {formatDate(applicationSubmissionStartDate)} -{" "}
                      {formatDate(applicationSubmissionEndDate)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <RiTodoLine className="text-2xl text-orange-500" />
                <div>
                  <p className="font-medium">
                    Exam Date:{" "}
                    <span className="text-zinc-600">
                      {formatDate(examStartDate)} - {formatDate(examEndDate)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-3 flex flex-wrap gap-x-6">
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <RiTodoLine className="text-2xl text-blue-500" />
                <div>
                  <p className="font-medium text-zinc-600">{mode}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-x-2">
                <FaBook className="text-2xl text-blue-500" />
                <p className="font-medium text-zinc-600">{examinationLevel}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-1 text-zinc-600">
            <p className="line-clamp-2 text-wrap text-sm [flex:11]">
              <span className="line-clamp-2 text-justify">{description}</span>
              <span className="text-orange-500 hover:underline">
                <Link href={id ? `/exams/${id}` : `#`}>Read More</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-y-2 border-t border-zinc-600 p-5">
        <ul className="flex flex-wrap items-center gap-x-4 rounded-md bg-orange-100 px-4 py-1 text-sm text-orange-600">
          {tabsSections?.slice(0, 5)?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <Link
                href={id ? `/exams/${id}?tab=${encodeURIComponent(item)}` : `#`}
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
          {tabsSections?.length > 5 && (
            <Link href={id ? `/exams/${id}` : `#`}>
              <li className="cursor-pointer capitalize hover:underline">
                more
              </li>
            </Link>
          )}
        </ul>
        <div className="flex gap-2 max-md:w-full max-md:flex-col">
          <Link href="#" className="max-md:w-full">
            <Button variant="black" className="!w-full">
              Apply Now
            </Button>
          </Link>
          <Link
            href={brochureFile || "#"}
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
