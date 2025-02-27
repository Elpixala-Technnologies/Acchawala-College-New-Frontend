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
            className={` ${isOpen === index || (index === 0 && isOpen === null)
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
                className={`flex-center transform rounded-full bg-orange-500 p-1 text-2xl text-zinc-600 transition-transform ${isOpen === index || (index === 0 && isOpen === null)
                  ? "rotate-180"
                  : ""
                  }`}
              />
            </button>
            <div
              className={`mt-1 transition-all duration-300 ease-in-out ${isOpen === index || (index === 0 && isOpen === null)
                ? "max-h-96"
                : "max-h-0 overflow-hidden"
                }`}
            >
              {item?.text && (
                <div
                  className="dangerouslySetInnerHTMLStyle text-justify "
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



export function TimelineListTwo({ data, title }: any) {
  // t and false
  // f and t
  if (!Array.isArray(data) && (!data?.title || !data?.text)) {
    console.error("Expected an array but got:", typeof data, data);
    return <p className="text-sm">Invalid data format</p>;
  }

  if (data?.title && data?.text) {
    const arrayData = [{ title: data?.title, text: data?.text }];
    data = arrayData;
  }

  const [isOpen, setIsOpen] = useState(null);

  console.log(data)
  const toggle = (id: any) => {
    setIsOpen(isOpen === id ? null : id);
  };
  const getOrdinal = (index: number) => {
    const ordinals = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth"];
    return ordinals[index] || `${index + 1}th`;
  };
  return (
    <div className=" flex w-full items-stretch gap-x-3">
      <p
        className="styled-content-p bg-transparent"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="mx-4 w-[2px] border-r-2 border-zinc-500"></div>

      <div className="flex w-full flex-col gap-4 pt-0">

        {Array.isArray(data) && data?.map((item: any, index: number) => {
          const text = item?.title?.replace(item?.text, "").replace(":", "").trim();
          // console.log(text)
          if (item?.text === item?.title) {
            return (
              <div
                key={index}
                className={` ${isOpen === index || (index === 0 && isOpen === null)
                  ? "chat-bubble-active shadow-lg"
                  : "chat-bubble"
                  } relative rounded-lg border border-zinc-500 p-5 flex flex-col items-start justify-center  pb-4`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between text-left sm:text-lg text-sm"
                >
                  <span className="pb-0 font-bold text-orange-500">
                    {getOrdinal(index)}
                  </span>
                  <IoIosArrowDown
                    className={`flex-center transform rounded-full bg-orange-500 p-1 text-xl text-zinc-600 transition-transform ${isOpen === index || (index === 0 && isOpen === null)
                      ? "rotate-180"
                      : ""
                      }`}
                  />
                </button>
                <div
                  className={`mt-1 transition-all duration-300 ease-in-out ${isOpen === index || (index === 0 && isOpen === null)
                    ? "max-h-96"
                    : "max-h-0 overflow-hidden"
                    }`}
                >
                  {item?.text && (
                    <p className=" text-justify sm:text-[16px] text-sm font-normal">
                      {item?.text}
                    </p>
                  )}
                </div>
              </div>
            )
          }
          return (
            <div
              key={index}
              className={` ${isOpen === index || (index === 0 && isOpen === null)
                ? "chat-bubble-active shadow-lg"
                : "chat-bubble"
                } relative rounded-lg border border-zinc-500 p-5 flex flex-col items-start justify-center  pb-4`}
            >
              <button
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between text-left sm:text-lg text-sm"
              >
                <span className="pb-0 text-orange-500">
                  {item.text}
                </span>
                <IoIosArrowDown
                  className={`flex-center transform rounded-full bg-orange-500 p-1 sm:text-xl text-lg text-zinc-600 transition-transform ${isOpen === index || (index === 0 && isOpen === null)
                    ? "rotate-180"
                    : ""
                    }`}
                />
              </button>
              <div
                className={`mt-1 transition-all duration-300 ease-in-out ${isOpen === index || (index === 0 && isOpen === null)
                  ? "max-h-96"
                  : "max-h-0 overflow-hidden"
                  }`}
              >
                {item?.text && (
                  <p className=" text-justify sm:text-[16px] text-sm font-normal">
                    {text}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
