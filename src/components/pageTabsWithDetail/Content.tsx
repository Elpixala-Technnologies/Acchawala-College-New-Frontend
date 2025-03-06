"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { StarRating } from "../StarRating";
import { FaLongArrowAltRight, FaStar } from "react-icons/fa";
import { formatDate } from "@/utils/customText";
import collegeIcon from "@/assets/icons/College.png"
import { IoIosArrowDown, IoIosArrowUp, IoIosCalendar } from "react-icons/io";

import { FaRegNewspaper } from "react-icons/fa6";
import CollapsibleSection from "./CollapsibleSection";
import { TbTriangleFilled } from "react-icons/tb";

export default function Content({ selectedContent, slug, breadCrumb }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [titles, setTitles] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [noOfTitles, setNoOfTitles] = useState(6);

  console.log(selectedContent, "  selected selectedContent")
  const scrollToElementById = (id: string) => {
    if (typeof document === "undefined") return; // Prevents issues in Next.js SSR

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      console.warn(`Element with ID "${id}" not found`);
    }
  };
  function extractTitles(sections: any) {
    let titles: { title: any; }[] = []

    sections?.forEach((item: any) => {
      if (!item?.title) return
      titles.push({ title: item?.title })
    })
    return titles;
  }

  useEffect(() => {
    setTitles(extractTitles(selectedContent?.sections))
  }, [selectedContent?.sections])

  return (
    <div className="w-full overflow-x-hidden md:[flex:8]">
      <div
        className={`mt-5 w-full md:rounded-2xl sm:rounded-lg rounded-none  md:min-w-[550px] bg-white sm:p-5 p-3`}
      >
        <button
          className="flex items-center justify-between w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className={`md:text-2xl text-xl font-bold ${isOpen ? "border-b  pb-3  mb-1 " : "border-none"} border-black`} >
            Table of <span className="text-orange-500">Content</span>
          </h1>
          <div className='text-xl'>
            {isOpen ?
              <IoIosArrowDown /> :
              <IoIosArrowUp />}
          </div>
        </button>

        {isOpen &&
          <>
            {titles?.slice(0, noOfTitles).map(({ title }: any, idx: number) => {
              const titleText = title?.t1?.trim() + " " + title?.t2?.trim() + " " + title?.t3?.trim()
              if (!titleText.trim()) return

              if (title?.t1 || title?.t2 || title?.t3) {
                return (
                  <div className="bg-orange-200 px-1.5 flex items-center justify-start gap-2 mt-2">

                    <div className="h-full flex items-center justify-center">
                      <TbTriangleFilled className="text-orange-500 text-sm rotate-90" />
                    </div>
                    <div className="relative md:py-1 py-1.5 rounded-sm overflow-x-scroll no-scrollbar " onClick={() => scrollToElementById(titleText)}>
                      <h1 key={idx} className=" text-blue-700 font-[500] md:text-lg text-sm cursor-pointer hover:underline whitespace-nowrap ">
                        {title?.t1 && (
                          <span className="">{title?.t1}</span>
                        )}{" "}
                        {title?.t2 && (
                          <span className="">
                            {title?.t2}
                          </span>
                        )}{" "}
                        {title?.t3 && (
                          <span className="">{title?.t3}</span>
                        )}{" "}
                      </h1>
                    </div>
                  </div>

                )
              }
              return
            })}

            <div className="">
              {noOfTitles === titles.length ?
                <button
                  className="mt-2 pl-2 font-bold text-orange-600 hover:underline flex items-center gap-1 text-sm"
                  onClick={() => setNoOfTitles(6)}>
                  Show less  < FaLongArrowAltRight className="h-full" />
                </button>
                :
                <button
                  className="mt-2 pl-2 font-bold text-orange-600 hover:underline flex items-center gap-1 text-sm"
                  onClick={() => setNoOfTitles(titles.length)}>
                  +{titles.length - 6} Load more < FaLongArrowAltRight className="h-full" />
                </button>}
            </div>
          </>}

      </div>
      {selectedContent &&
        selectedContent?.sections?.length > 0 &&
        selectedContent?.sections?.map((section: any, index: any) => {

          const groupedImagesByCategory = (imageGalleries: any) => {
            const groupedImages: any = {};

            imageGalleries.forEach((gallery: any) => {
              const category = gallery?.category;
              const images = gallery?.images?.data?.map((imageEntity: any) => ({
                url: imageEntity?.attributes?.url,
              }));

              if (!groupedImages[category]) {
                groupedImages[category] = [];
              }
              groupedImages[category].push(...images);
            });

            return groupedImages;
          };
          const imageGalleries = section?.imageGallery || [];
          const groupedImages = groupedImagesByCategory(imageGalleries);
          // =============================================
          const groupVideosByCategory = (videoGalleries: any) => {
            const groupedVideos: any = {};

            videoGalleries.forEach((gallery: any) => {
              const category = gallery?.category;
              const videos = gallery?.video?.data.map((videoEntity: any) => ({
                videoId: videoEntity?.attributes?.videoId,
              }));

              if (!groupedVideos?.[category]) {
                groupedVideos[category] = [];
              }
              groupedVideos[category].push(...videos);
            });

            return groupedVideos;
          };
          const videoGalleries = section?.videoGallery || [];
          const groupedVideos = groupVideosByCategory(videoGalleries)

          return (
            <CollapsibleSection
              key={index}
              section={section}
              isExpanded={isExpanded}
              groupedVideos={groupedVideos}
              breadCrumb={breadCrumb}
              slug={slug}
              groupedImages={groupedImages}
            />
          );
        }
        )}
    </div >
  );
}

export function NewsAndUpdatesSection({ data }: any) {
  // console.log(data, "  data")
  const [searchValue, setSearchValue] = useState("")
  const [newsData, setNewsData] = useState(data)

  function filter(data: any, value: any) {
    return data.filter((news: any) =>
      news.attributes.title.toLowerCase().includes(value.toLowerCase())
    )
  }
  useEffect(() => {
    const handler = setTimeout(() => {

      setNewsData(filter(data, searchValue))
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  return (
    <div className="bg-transparent flex flex-col gap-5">
      <div className="w-full bg-white px-2 rounded-lg">

        <div className="w-full flex gap-3 items-center py-2">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-orange-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>

          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search for news"
            className="w-full px-2 py-1 outline-none"
          />
        </div>

      </div>

      <div className="gap-5 flex flex-col">
        {newsData.map((news: any, idx: number) => {
          const date = formatDate(news.attributes.updatedAt)
          return (
            <div className="w-full py-8 flex bg-white items-center justify-between gap-4  rounded-lg shadow-[1.490781307220459px_1.490781307220459px_2.981562614440918px_0px_rgba(0,0,0,0.25)] ">
              <div className="bg-cover p-2 flex justify-center items-center ml-2 ">
                <img className="min-w-[56.65px] h-[56.65px]" src={news.attributes.icon.data.attributes.url} alt="" />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-[#202020] text-lg font-semibold">{news.attributes.title}</h1>

                <div>
                  <div className="flex items-center gap-4 justify-start">
                    <div className="h-[14.16px] justify-start items-start gap-1.5 inline-flex">
                      <IoIosCalendar className="w-[13.42px] h-[14.16px]" />
                      <div className="text-[#ff8f28] text-[10.44px] ">{date}</div>
                    </div>
                    <div className="h-[14.16px] justify-start items-start gap-1.5 inline-flex">
                      <FaRegNewspaper className="w-[13.42px] h-[14.16px]" />
                      <div className="text-[#ff8f28] text-[10.44px] ">{news.attributes.category.data.attributes.category}</div>
                    </div>
                  </div>
                  <div className="">
                    <p className="text-black text-sm font-light">
                      {news.attributes.excerpt.slice(0, 250)}...
                      <Link href={"#"} className="text-[#ff8f28] text-sm font-semibold underline cursor-pointer">Read more</Link>
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export function ReviewsAndRatingsSection({ data }: any) {
  // console.log(data, "  reviews data")
  const [averageRatings, setAverageRatings] = useState<any>({
    DifficultyLevel: 0,
    ExamPattern: 0,
    FairnessandTransparency: 0,
    PreparationResources: 0,
    SyllabusCoverage: 0
  })

  function categoryAverageRating(data: any, averageRatings: any) {
    // averageRatings.forEach((keys: any) => {
    data.forEach((review: any) => {
      for (const key in review) {
        if (key in averageRatings) {
          const sumPlus = averageRatings[key] + review[key]?.rating ? Number(review[key]?.rating) : 0
          setAverageRatings({ ...averageRatings, key: sumPlus })
          // console.log(averageRatings[key], key)
        } else {
          continue;
        }
      }
    })
    for (const key in averageRatings) {
      const average = averageRatings[key] / data.length
      // setAverageRatings(preState => ({ ...preState, key:   }))
      // setAverageRatings({ ...averageRatings, key: average })
    }
  }

  // console.log(categoryAverageRating(data, averageRatings))

  useEffect(() => {
    categoryAverageRating(data, averageRatings)
    // console.log(averageRatings)
  }, [data])

  function calculateOverAllRating(data: any) {
    let totalNumberRating = 0
    let sumOfRating = 0
    data?.forEach((review: any) => {
      for (const key in review) {
        if (review[key]?.rating) {
          // console.log(review[key])
          sumOfRating += Number(review[key]?.rating) ? Number(review[key]?.rating) : 0
          totalNumberRating++
        }
      }
    })
    return sumOfRating / totalNumberRating
  }

  function percentageOfRating(data: any, stars: number) {
    let totalNumberRating = 0
    let count = 0
    data?.forEach((review: any) => {
      for (const key in review) {
        (review[key]?.rating) && totalNumberRating++

        if (Number(review[key]?.rating) === stars) {
          count++
        }
      }
    })
    return ((count / totalNumberRating) * 100).toFixed(0)
  }

  const overallRating = calculateOverAllRating(data)
  return (
    <div className="w-full space-y-5">
      <div className="my-5 flex items-center justify-around gap-3 max-md:flex-col max-md:gap-5">
        {/* Overall Rating Section  */}
        <div className="flex-center flex-col rounded-2xl bg-orange-200 p-5">
          <h2 className="text-7xl font-semibold">{overallRating}</h2>
          <div>
            <StarRating
              rating={overallRating}
              className="gap-2 text-lg text-orange-500"
            />
          </div>
          <p>({data?.length} Reviews)</p>
        </div>
        {/* Rating according to number  */}
        <div className="space-y-2 max-sm:mb-3 max-sm:w-full">
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              5 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={percentageOfRating(data, 5)} />
            <p className="ml-2 text-xl">({percentageOfRating(data, 5)}%)</p>
          </div>
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              4 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={percentageOfRating(data, 4)} />
            <p className="ml-2 text-xl">({percentageOfRating(data, 4)}%)</p>
          </div>
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              3 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={percentageOfRating(data, 3)} />
            <p className="ml-2 text-xl">({percentageOfRating(data, 3)}%)</p>
          </div>
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              2 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={percentageOfRating(data, 2)} />
            <p className="ml-2 text-xl">({percentageOfRating(data, 2)}%)</p>
          </div>
          <div className="!my-3 flex items-center justify-between gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              1 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={percentageOfRating(data, 1)} />
            <p className="ml-2 text-xl">({percentageOfRating(data, 1)}%)</p>
          </div>
        </div>
      </div>
      <div className="my-5 flex items-stretch justify-between gap-5 overflow-x-auto text-center sm:!mt-14">
        {/* {data?.individualReviews
          ?.slice(0, 5)
          .map((review: any, index: number) => (
            <div key={index} className="flex-center min-w-28 flex-col">
              <div className="flex-center rounded-lg bg-orange-300 p-2">
                <Image
                  src={review?.icon?.url}
                  alt="icon"
                  width={50}
                  height={50}
                />
              </div>
              <p>{review[index]}</p>
              <p className="flex items-center gap-2">
                {review[index]?.rating} <FaStar className="text-orange-500" />
              </p>
              <p className="text-nowrap">based on ({review?.basedOn} )</p>
            </div>
          ))} */}
        {Object.keys(averageRatings)?.slice(0, 5).map((item: any, index: number) => {
          return (
            <div key={index} className="flex-center min-w-28 flex-col">
              <div className="flex-center rounded-lg bg-orange-300 p-2">
                <Image
                  src={collegeIcon}
                  alt="icon"
                  width={50}
                  height={50}
                />
              </div>
              <p>{item}</p>
              <p className="flex items-center gap-2">
                {averageRatings[item]} <FaStar className="text-orange-500" />
              </p>
              {/* <p className="text-nowrap">based on ({item} )</p> */}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export function ProgressBar({ value }: any) {
  return (
    <div className="h-3 w-full min-w-40 rounded-full bg-orange-200">
      <div
        className={`h-3 rounded-full bg-orange-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
