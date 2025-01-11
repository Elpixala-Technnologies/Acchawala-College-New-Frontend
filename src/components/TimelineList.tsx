"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
export default function TimelineList({ data }: any) {
  const [isOpen, setIsOpen] = useState(null);

  const toggle = (id: any) => {
    setIsOpen(isOpen === id ? null : id);
  };
  return (
    <div className="mb-5 flex w-full items-stretch gap-x-3 pt-5">
      <div className="mx-4 w-[2px] border-r-2 border-zinc-500"></div>
      <div className="flex w-full flex-col gap-4 pt-0">
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className={` ${
              isOpen === index || (index === 0 && isOpen === null)
                ? "chat-bubble-active shadow-lg"
                : "chat-bubble"
            } relative rounded-lg border border-zinc-500 p-5 pb-4`}
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="pb-0 font-bold text-orange-500">
                {item?.title}
              </span>
              <IoIosArrowDown
                className={`flex-center transform rounded-full bg-orange-500 p-1 text-2xl text-zinc-600 transition-transform ${
                  isOpen === index || (index === 0 && isOpen === null)
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>
            <div
              className={`mt-1 transition-all duration-300 ease-in-out ${
                isOpen === index || (index === 0 && isOpen === null)
                  ? "max-h-96"
                  : "max-h-0 overflow-hidden"
              }`}
            >
              {item?.text && (
                <div
                  className="dangerouslySetInnerHTMLStyle text-justify"
                  dangerouslySetInnerHTML={{ __html: item?.text }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
