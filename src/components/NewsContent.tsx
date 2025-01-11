"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import useIsMobile from "./customHooks/useIsMobile";

export default function NewsContent({ data }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile(1030); // breakpoint

  const toggleReadMore = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      {data &&
        data?.sections?.length > 0 &&
        data?.sections?.map((section: any, index: any) => {
          const articleLength = section.article?.length || 0;
          return (
            <div
              key={index}
              className="mt-5 w-full border-b border-zinc-300 pb-5"
            >
              {/* Title */}
              {section?.title && (
                <h1 className="title1 mb-8">
                  {section.title.t1 && (
                    <span className="text-blue-950/70">{section.title.t1}</span>
                  )}{" "}
                  {section.title.t2 && (
                    <span className="text-blue-950">{section.title.t2}</span>
                  )}{" "}
                  {section.title.t3 && (
                    <span className="text-sky-500">{section.title.t3}</span>
                  )}{" "}
                </h1>
              )}
              {/* Author */}
              {section?.author && (
                <div className="mb-8 flex items-center gap-x-2">
                  {section.author.avatar && (
                    <Image
                      src={section.author.avatar}
                      alt="avatar"
                      className="h-12 w-12 rounded-full"
                      width={48}
                      height={48}
                    />
                  )}
                  <div>
                    {section.author.name && (
                      <p className="font-bold">{section.author.name}</p>
                    )}
                    {section.author.lastUpdated && (
                      <p className="font-medium">
                        Last Updated: {section.author.lastUpdated}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {/* Article */}
              {section?.article && (
                <>
                  <div
                    className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${
                      isExpanded ? "" : "line-clamp-4"
                    }`}
                    dangerouslySetInnerHTML={{ __html: section.article }}
                  />
                  {(articleLength > 665 || isMobile) && (
                    <button
                      onClick={toggleReadMore}
                      className="relative right-0 mb-5 block w-full text-right font-medium hover:text-blue-500"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )}
                </>
              )}
              {/* Buttons */}
              {section?.button && (
                <div className="flex gap-x-4 md:max-w-xl">
                  {section.button.button1?.text && (
                    <Link
                      className="button6 flex-[1]"
                      href={section.button.button1.link || "#"}
                    >
                      {section.button.button1.text}
                    </Link>
                  )}
                  {section.button.button2?.text && (
                    <Link
                      className="button7 flex-[1]"
                      href={section.button.button2.link || "#"}
                    >
                      {section.button.button2.text}
                    </Link>
                  )}
                </div>
              )}
              {/* Table  */}
              {section?.table && (
                <div
                  className="dangerouslySetInnerHTMLStyle mb-8 w-full overflow-x-auto text-justify"
                  dangerouslySetInnerHTML={{ __html: section?.table }}
                />
              )}
            </div>
          );
        })}
    </>
  );
}
