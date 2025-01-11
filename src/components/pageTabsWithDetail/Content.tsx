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

export default function Content({ selectedContent, slug, breadCrumb }: any) {
  const [isExpanded, setIsExpanded] = useState(true);
  // const isMobile = useIsMobile(1030);
  // const toggleReadMore = () => {
  //   setIsExpanded((prev) => !prev);
  // };

  return (
    <div className="w-full overflow-x-hidden md:[flex:8]">
      {selectedContent &&
        selectedContent?.sections?.length > 0 &&
        selectedContent?.sections?.map((section: any, index: any) => {
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
          const groupedVideos = groupVideosByCategory(videoGalleries);
          // ==============================================
          return (
            <div
              key={index}
              className="mt-5 w-full rounded-2xl bg-white p-5 md:min-w-[550px]"
            >
              {/* Title */}
              {section?.title && (
                <h2 className="mb-4 border-b border-zinc-500 pb-4 text-2xl font-bold capitalize">
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
                <div className="mb-8 flex items-center gap-x-2">
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
                  <div className="flex flex-col gap-2">
                    {section?.author?.data?.attributes?.name && (
                      <p className="text-3xl font-bold text-orange-500">
                        {section?.author?.data?.attributes?.name}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-zinc-500">
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
                    className={`my-2 mb-5 text-wrap border-l-4 border-orange-500 py-2 pl-5 text-justify text-lg font-medium italic text-black ${
                      isExpanded ? "" : "line-clamp-4"
                    }`}
                    dangerouslySetInnerHTML={{ __html: section?.quote }}
                  />
                </>
              )}
              {/* EditorText */}
              {section?.editorText && (
                <>
                  <div
                    className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                    dangerouslySetInnerHTML={{ __html: section?.editorText }}
                  />
                  {/* {(articleLength > 665 || isMobile) && (
                    <button
                      onClick={toggleReadMore}
                      className="relative right-0 mb-5 block w-full text-right font-medium hover:text-orange-500"
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                    </button>
                  )} */}
                </>
              )}
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
              {section?.bannerText && (
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
              {section?.accordion && <TimelineList data={section?.accordion} />}
              {/* Photo Gallery  */}
              {section?.imageGallery && (
                <>
                  {Object.keys(groupedImages).map((category, index) => (
                    <div key={index} className="mt-5">
                      <h3 className="my-3 text-xl font-semibold capitalize">
                        {category}
                      </h3>
                      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                        {groupedImages[category].map(
                          (image: any, i: number) => (
                            <Image
                              key={i}
                              src={image?.url}
                              width={800}
                              height={800}
                              alt={`${category} image`}
                              className="h-full max-h-[200px] w-full flex-wrap rounded-lg object-cover"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
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
                <ReviewsAndRatingsSection data={section?.reviewsAndRatings} />
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
    </div>
  );
}

function ReviewsAndRatingsSection({ data }: any) {
  return (
    <div className="w-full space-y-5">
      <div className="my-5 flex items-center justify-around gap-3 max-md:flex-col max-md:gap-5">
        {/* Overall Rating Section  */}
        <div className="flex-center flex-col rounded-2xl bg-orange-200 p-5">
          <h2 className="text-7xl font-semibold">{data?.overallRating}</h2>
          <div>
            <StarRating
              rating={data?.overallRating}
              className="gap-2 text-lg text-orange-500"
            />
          </div>
          <p>({data?.totalReviews} Reviews)</p>
        </div>
        {/* Rating according to number  */}
        <div className="space-y-2 max-sm:mb-3 max-sm:w-full">
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              5 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={"90"} />
            <p className="ml-2 text-xl">(90%)</p>
          </div>
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              4 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={"73"} />
            <p className="ml-2 text-xl">(73%)</p>
          </div>
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              3 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={"44"} />
            <p className="ml-2 text-xl">(44%)</p>
          </div>
          <div className="!my-3 flex items-center gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              2 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={"75"} />
            <p className="ml-2 text-xl">(75%)</p>
          </div>
          <div className="!my-3 flex items-center justify-between gap-3">
            <p className="mr-2 flex items-center gap-2 text-2xl font-semibold">
              1 <FaStar className="text-orange-500" />
            </p>
            <ProgressBar value={"30"} />
            <p className="ml-2 text-xl">(30%)</p>
          </div>
        </div>
      </div>
      <div className="my-5 flex items-stretch justify-between gap-5 overflow-x-auto text-center sm:!mt-14">
        {data?.individualReviews
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
              <p>{review?.title}</p>
              <p className="flex items-center gap-2">
                {review?.rating} <FaStar className="text-orange-500" />
              </p>
              {/* <p className="text-nowrap">based on ({review?.basedOn} )</p> */}
            </div>
          ))}
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
