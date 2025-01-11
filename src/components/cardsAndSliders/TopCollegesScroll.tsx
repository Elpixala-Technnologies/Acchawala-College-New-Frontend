import React, { useRef, useState, useEffect } from "react";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import { CollegesCardContent } from "./CollegesSlider";
import { useQuery } from "@apollo/client";
import { getAllTopColleges } from "@/graphql/collegeQuery/topColleges";
import { convertToYearlyFee } from "@/utils/customText";

export default function TopCollegesScroll({ data }: any) {
  const [filteredData, setFilteredData] = useState<any>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

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
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 250,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 250,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      handleScroll();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (topCollegeData) {
      setFilteredData(topCollegeData?.colleges?.data);
    }
    // console.log(topCollegeData?.colleges?.data, "colleges");
  }, [topCollegeData]);

  return (
    <div className="relative my-5 max-w-max rounded-2xl bg-orange-500 px-1 py-10 shadow-lg sm:px-5">
      <h1 className="pb-6 text-3xl font-bold text-white max-sm:px-5">
        Discover Top colleges in <span className="text-black">Engineering</span>{" "}
        category
      </h1>

      <div
        className="flex w-full gap-6 overflow-x-auto md:px-5"
        // ref={scrollContainerRef}
        // onScroll={handleScroll}
      >
        {filteredData?.map((college: any, index: number) => {
          const slide = (
            <div
              key={index}
              className="min-w-96 overflow-hidden rounded-2xl border border-zinc-300 bg-white p-1 shadow-md max-sm:min-w-full"
            >
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
                  college?.attributes?.location?.city?.data?.attributes?.city
                }
                state={
                  college?.attributes?.location?.state?.data?.attributes?.state
                }
                overallRating={
                  college?.attributes?.reviewsAndRatings?.overallRating
                }
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
              />
            </div>
          );
          return <>{slide}</>;
        })}
      </div>
      {/* {showLeftButton && (
        <button
          className="absolute right-24 top-6 rounded-full bg-white p-3 max-md:opacity-60 max-md:hover:opacity-60"
          onClick={handleScrollLeft}
        >
          <TiChevronLeft className="text-3xl text-black" />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute right-5 top-6 rounded-full bg-white p-3 max-md:opacity-60 max-md:hover:opacity-60"
          onClick={handleScrollRight}
        >
          <TiChevronRight className="text-3xl text-black" />
        </button>
      )} */}
    </div>
  );
}
