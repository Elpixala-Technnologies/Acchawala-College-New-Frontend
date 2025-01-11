"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { addCommas, convertToYearlyFee } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import { getAllColleges } from "@/graphql/collegeQuery/colleges";
import { getAllTopColleges } from "@/graphql/collegeQuery/topColleges";

export default function CollegesSlider() {
  const uniqueId = "college123";
  // Query
  const {
    data: topCollegeData,
    loading,
    error,
    refetch,
  } = useQuery(getAllTopColleges, {
    variables: {
      page: 1,
      pageSize: 10,
    },
  });
  // =========================================== //
  useEffect(() => {
    if (!loading && !topCollegeData) {
      refetch();
    }
  }, [topCollegeData, refetch, loading]);
  // =========================================== //

  const swiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      clickable: true,
      // dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    loop: true,
    navigation: {
      nextEl: `.${uniqueId}-next`,
      prevEl: `.${uniqueId}-prev`,
    },
    modules: [Autoplay, Pagination, Navigation],
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
      1260: {
        slidesPerView: 4,
      },
    },
  };

  return (
    <>
      {topCollegeData?.colleges?.data && (
        <Swiper
          {...swiperOptions}
          className={`mySwiper w-full max-w-fit px-5 ${uniqueId}`}
        >
          {topCollegeData?.colleges?.data?.map(
            (college: any, index: number) => {
              const slide = (
                <SwiperSlide
                  key={index}
                  className="mb-12 w-full overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-lg"
                >
                  {" "}
                  <CollegesCardContent
                    key={college?.id}
                    id={college?.id}
                    slug={college?.attributes?.slug}
                    bgImage={
                      college?.attributes?.imageGallery?.[0]?.images?.data?.[0]
                        ?.attributes?.url
                    }
                    collegeLogo={
                      college?.attributes?.collegeLogo?.data?.attributes?.url
                    }
                    breadCrumb={college?.attributes?.breadCrumb}
                    city={
                      college?.attributes?.location?.city?.data?.attributes
                        ?.city
                    }
                    state={
                      college?.attributes?.location?.state?.data?.attributes
                        ?.state
                    }
                    overallRating={4}
                    totalReviews={345}
                    avgFeePerYear={
                      college?.attributes?.allCourses
                        .map((course: any) =>
                          convertToYearlyFee(
                            course?.courseFee,
                            course?.courseFeeLabel,
                          ),
                        )
                        .reduce(
                          (total: any, fee: any, _: any, { length }: any) =>
                            total + fee / length,
                          0,
                        ) || 0
                    }
                    affiliation={college?.attributes?.affiliation?.data?.map(
                      (value: any) => value?.attributes?.organization,
                    )}
                    hightestPackage={college?.attributes?.hightestPackage}
                    brochureUrl={college?.attributes?.brochureFile}
                  />{" "}
                </SwiperSlide>
              );
              return <>{slide}</>;
            },
          )}
        </Swiper>
      )}
      {/* Add navigation buttons */}
      {topCollegeData?.colleges?.data && (
        <div className={`${uniqueId}-next swiper-button-next !top-[34%]`}></div>
      )}
      {topCollegeData?.colleges?.data && (
        <div className={`${uniqueId}-prev swiper-button-prev !top-[34%]`}></div>
      )}
    </>
  );
}

export const CollegesCardContent = function CollegesCard({
  id,
  slug,
  bgImage,
  collegeLogo,
  breadCrumb,
  city,
  state,
  overallRating,
  totalReviews,
  avgFeePerYear,
  affiliation,
  hightestPackage,
  brochureUrl,
}: any) {
  return (
    <React.Fragment>
      <div className="relative w-full">
        <Image
          src={bgImage}
          alt={breadCrumb}
          width={800}
          height={800}
          className="h-[200px] w-full rounded-t-2xl object-cover"
        />
        <div className="absolute left-2 top-2 rounded-lg bg-white p-1">
          {collegeLogo && (
            <Image
              src={collegeLogo}
              alt={breadCrumb}
              width={800}
              height={800}
              className="h-12 w-12 rounded-lg object-contain"
            />
          )}
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-col gap-4">
          {/* College Name & Location  */}
          <div className="flex items-center justify-between">
            <Link href={id ? `/colleges/${id}` : `#`}>
              <h4 className="cursor-pointer text-2xl font-bold hover:text-orange-500">
                {breadCrumb}
              </h4>
            </Link>
            <p className="capitalize">{state}</p>
          </div>
          {/* Rating & Reviews  */}
          <p className="flex items-center gap-2">
            <FaStar className="text-orange-400" />
            <span>{overallRating}/5</span>
            <span>({totalReviews} reviews)</span>
          </p>
          {/* Fees  */}
          <p className="text-2xl font-bold text-orange-500">
            <span>INR {`${addCommas(avgFeePerYear)}`}</span>{" "}
            <span className="text-sm text-black">(Avg. year fees)</span>{" "}
          </p>
          {/* Affiliations  */}
          <p>
            {affiliation?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                {item}
                {index < affiliation.length - 1 ? ", " : ""}
              </React.Fragment>
            ))}
          </p>
          {/* Package  */}
          <p className="text-xl font-bold text-orange-500">
            <span>INR {`${addCommas(hightestPackage)}`}</span>{" "}
            <span className="text-sm text-black">Highest Package</span>
          </p>
        </div>
        {/* Buttons  */}
        <div className="mt-5 flex justify-between gap-2 border-t border-orange-500 pt-5 max-md:flex-col">
          <Link href={id ? `/colleges/${id}` : `#`} className="w-full">
            <Button variant="black" className="!w-full text-nowrap !px-2">
              See More
            </Button>
          </Link>
          <Link href={brochureUrl || "#"} target="_blank" className="w-full">
            <Button variant="orange" className="!w-full text-nowrap !px-2">
              Download Brochure
            </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};
