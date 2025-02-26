"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useIsMobile from "../customHooks/useIsMobile";
import { Button, LoadingButton } from "../Button";
import TimelineList from "../TimelineList";
import YoutubeVideo from "../youtubeVideo";
import { StarRating } from "../StarRating";
import { FaStar } from "react-icons/fa";
import Faqs, { FaqsForDetailPage } from "../Faqs";
import { formatDate } from "@/utils/customText";
import { RiSearchLine } from "react-icons/ri";
import CourseFilteredCard from "../cardsAndSliders/CourseFilteredCard";
import { getAllCourses } from "@/graphql/collegeQuery/colleges";
import { useQuery } from "@apollo/client";
import RelatedCourses from "./RelatedCourses";
import collegeIcon from "@/assets/icons/College.png"
import ImageGalleryPopup from "./ImageGallery";
import { IoIosCalendar } from "react-icons/io";
import TypeHeadSearchBar from "../TypeHeadSearchBar/TypeHeadSearchBar";
import ImageGallery from "./ImageGallery";
import { FaRegNewspaper } from "react-icons/fa6";
import { parseHtmlToJson5, parseHtmlToJson6 } from "@/lib/cheerio";
import ParsedHtmlContent from "./parsedHtmlContent";

export default function Content({ selectedContent, slug, breadCrumb }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  // const isMobile = useIsMobile(1030);
  // const toggleReadMore = () => {
  //   setIsExpanded((prev) => !prev);
  // };
  // console.log(selectedContent, "  selected selectedContent")

  return (
    <div className="w-full overflow-x-hidden md:[flex:8]">
      {selectedContent &&
        selectedContent?.sections?.length > 0 &&
        selectedContent?.sections?.map((section: any, index: any) => {
          let textEditorParsedHtml: any[] = []
          if (section?.editorText) {
            // textEditorParsedHtml = parseHtmlToJson5(section?.editorText)
          }
          // console.log(section, " textEditorParsedHtml textEditorParsedHtml textEditorParsedHtml")
          // const articleLength = section?.article?.length || 0;
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
          // console.log("each section is:", section);
          // ==============================================
          return (
            <div
              key={index}
              className={`mt-5 w-full md:rounded-2xl sm:rounded-lg rounded-none  md:min-w-[550px] ${section?.news ? "bg-transparent" : "bg-white sm:p-5 p-3"}`}
            >

              {/* Title */}
              {section?.title && (
                <h2 className={`text-2xl font-bold capitalize ${section?.news ? "mb-3" : "border-b border-zinc-500 mb-2 pb-4"}`}>
                  {section?.title?.t1 && (
                    <span className="text-black">{section?.title?.t1}</span>
                  )}{" "}
                  {section?.title?.t2 && (
                    <span className="text-orange-500">
                      {section?.title?.t2}
                    </span>
                  )}{" "}
                  {section?.title?.t3 && (
                    <span className="text-black">{section?.title?.t3}</span>
                  )}{" "}
                </h2>
              )}
              {/* Author */}
              {section?.author && section?.author?.data?.attributes?.name && (
                <div className="sm:mb-8 mb-4 flex items-center gap-x-2">
                  {section?.author?.data?.attributes?.avatar?.data?.attributes
                    ?.url && (
                      <Image
                        src={
                          section?.author?.data?.attributes?.avatar?.data
                            ?.attributes?.url
                        }
                        alt="avatar"
                        className="h-16 w-16 rounded-full"
                        width={48}
                        height={48}
                      />
                    )}
                  <div className="flex flex-col sm:gap-2 gap-1.5">
                    {section?.author?.data?.attributes?.name && (
                      <p className="md:text-3xl sm:text-xl xs:text-lg font-bold text-orange-500">
                        {section?.author?.data?.attributes?.name}
                      </p>
                    )}
                    <div className="flex items-center md:text-lg sm:text-sm xs:text-[14px] text-[12px] sm:gap-2 gap-1 text-zinc-500">
                      {section?.author?.data?.attributes?.designation && (
                        <p className="font-bold">
                          {section?.author?.data?.attributes?.designation} |
                        </p>
                      )}
                      {section?.author?.data?.attributes?.updatedAt && (
                        <p className="font-medium">
                          Last Updated:{" "}
                          {formatDate(
                            section?.author?.data?.attributes?.updatedAt,
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {/* Quote  */}
              {section?.quote && (
                <>
                  <div
                    className={`my-2 mb-5 text-wrap border-l-4 border-orange-500 py-2 pl-5 text-justify text-lg font-medium italic text-black ${isExpanded ? "" : "line-clamp-4"
                      }`}
                    dangerouslySetInnerHTML={{ __html: section?.quote }}
                  />
                </>
              )}
              {/* EditorText */}
              {section?.editorText &&
                <>

                  {/* <div
                    className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                    dangerouslySetInnerHTML={{ __html: section?.editorText }}
                  /> */}
                  <div>
                    <ParsedHtmlContent data={section?.editorText} />
                  </div>
                  {/* {(articleLength > 665 || isMobile) && (
                    <button
                      onClick={toggleReadMore}
                      className="relative right-0 mb-5 block w-full text-right font-medium hover:text-orange-500"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )} */}
                </>
              }
              {/* ReviewsText */}
              {section?.reviewsText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.reviewsText }}
                />
              )}
              {/* galleryText */}
              {section?.galleryText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.galleryText }}
                />
              )}
              {/* videoText */}
              {section?.videoText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.videoText }}
                />
              )}
              {/* accordionText */}
              {section?.accordionText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.accordionText }}
                />
              )}
              {/* bannerText */}
              {section?.bannerText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.bannerText }}
                />
              )}
              {/* facilityText */}
              {section?.facilityText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.facilityText }}
                />
              )}
              {/* newsText */}
              {section?.newsText && (
                <div
                  className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                  dangerouslySetInnerHTML={{ __html: section?.newsText }}
                />
              )}
              {/* news */}
              {section?.news
                && <NewsAndUpdatesSection data={section?.news} />}
              {/* Buttons */}
              {section?.button && (
                <div className="mb-5 flex gap-2 max-sm:flex-col">
                  {section.button.button1?.text && (
                    <Link
                      href={section.button.button1.link || "#"}
                      className="max-sm:w-full"
                    >
                      <Button
                        variant="black"
                        className="text-nowrap max-sm:!w-full"
                      >
                        {section.button.button1.text}
                      </Button>
                    </Link>
                  )}
                  {section.button.button2?.text && (
                    <Link
                      href={section.button.button2.link || "#"}
                      className="max-sm:w-full"
                    >
                      <Button
                        variant="orange"
                        className="text-nowrap max-sm:!w-full"
                      >
                        {section.button.button2.text}
                      </Button>
                    </Link>
                  )}
                </div>
              )}
              {/* Separator  */}
              {section?.separator === true && (
                <div className="my-5 h-0.5 w-full bg-zinc-300"></div>
              )}
              {/* Important Links  */}
              {section?.importantLinks && (
                <div className="my-5">
                  {section?.title && (
                    <h2 className="mb-5 text-2xl font-bold">
                      {section?.importantLinks?.title}
                    </h2>
                  )}
                  <ul className="ml-5">
                    {section?.importantLinks?.links?.map(
                      (link: any, i: number) => (
                        <li key={i} className="mb-2 flex font-bold">
                          <h6 className="text-black">{link.title}:</h6>
                          <span className="ml-1">
                            <Link
                              className="text-blue-950/70 underline hover:text-blue-500"
                              href={link?.href || "#"}
                            >
                              {link?.text}
                            </Link>
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
              {/* banner  */}
              {section?.bannerTitle && (
                <div className="relative my-5">
                  <Image
                    src={section?.bannerImage?.data?.[0]?.attributes?.url}
                    alt="banner"
                    width={1700}
                    height={480}
                    className="h-96 w-full object-cover object-center"
                  />
                  <p className="absolute bottom-0 left-0 w-full text-wrap bg-black bg-opacity-60 px-5 py-3 text-white">
                    <Link href={section?.href || "#"}>
                      {section?.bannerTitle}
                    </Link>
                  </p>
                </div>
              )}
              {/* Accordion  */}
              {section?.accordion &&
                <TimelineList data={section?.accordion} />}
              {/* Photo Gallery  */}
              {section?.imageGallery && (
                <ImageGallery groupedImages={groupedImages} selectedContent={section?.imageGallery} />
              )
              }
              {/* Video Gallery  */}
              {section?.videoGallery && (
                <>
                  {Object.keys(groupedVideos).map((category, index) => (
                    <div key={index} className="mt-5">
                      <h3 className="my-3 text-xl font-semibold capitalize">
                        {category}
                      </h3>
                      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {groupedVideos[category]?.map((video: any, i: any) => (
                          <YoutubeVideo
                            videoId={video?.videoId}
                            width={"100%"}
                            height={"200"}
                            key={i}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
              {/* Facilities */}
              {section?.facility && (
                <div className="flex flex-wrap gap-5 rounded-lg bg-orange-500 p-5">
                  {section.facility?.data?.map((d: any, i: number) => (
                    <div
                      key={i}
                      className="flex-center gap-2 rounded-e-3xl rounded-s-3xl border-2 border-zinc-300 bg-white p-3 px-5 shadow"
                    >
                      <Image
                        src={d?.attributes?.facilityIcon?.data?.attributes?.url}
                        alt="icon"
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                      <p className="font-semibold text-black">
                        {d?.attributes?.facilityName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {/* Review  */}
              {section?.reviewsText && (
                <ReviewsAndRatingsSection data={section?.reviewsText} />
              )}
              {/* Related Courses  */}
              {section?.courseText && (
                <RelatedCourses slug={slug} breadCrumb={breadCrumb} />
              )}
              {/* FAQ  */}
              {section?.Questions && (
                <FaqsForDetailPage data={section?.Questions} />
              )}
            </div>
          );
        })}
    </div >
  );
}

function NewsAndUpdatesSection({ data }: any) {
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

function ReviewsAndRatingsSection({ data }: any) {
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

function ProgressBar({ value }: any) {
  return (
    <div className="h-3 w-full min-w-40 rounded-full bg-orange-200">
      <div
        className={`h-3 rounded-full bg-orange-500`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
}
