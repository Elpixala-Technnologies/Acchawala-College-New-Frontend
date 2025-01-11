"use client";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "../Button";
import CourseFilteredCard from "../cardsAndSliders/CourseFilteredCard";
import { RiSearchLine } from "react-icons/ri";
import { useQuery } from "@apollo/client";
import {
  getAllCoursesOfACollege,
  totalCoursesInACollege,
} from "@/graphql/collegeQuery/collegeDetails";
import SortButton from "../SortButton";

export default function RelatedCourses({ data, breadCrumb, slug }: any) {
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [pageNo, setPageNo] = useState(1);
  const [sortingParameterName, setSortingParameterName] =
    useState("courseSequence");
  const courseId = slug;
  // Query
  const {
    data: courseData,
    loading,
    error,
  } = useQuery(getAllCoursesOfACollege, {
    variables: {
      searchByCourseName: searchValue,
      ID: courseId,
      page: pageNo,
      pageSize: 10,
      courseSortingParameter: [`courseName.${sortingParameterName}`],
    },
  });
  const {
    data: collegeCoursesData,
    loading: collegeCoursesLoading,
    error: collegeCoursesError,
  } = useQuery(totalCoursesInACollege, {
    variables: {
      ID: courseId,
    },
  });

  // useEffect(() => {
  //   console.log(
  //     collegeCoursesData?.college?.data?.attributes?.courses,
  //     "collegeCoursesData",
  //   );
  // }, [collegeCoursesData]);

  useEffect(() => {
    if (courseData) {
      if (pageNo === 1) {
        setFilteredData(courseData?.college?.data?.attributes?.courses);
      } else {
        setFilteredData((prevData: any) => [
          ...prevData,
          ...courseData?.college?.data?.attributes?.courses,
        ]);
      }
    }
  }, [courseData, searchValue, pageNo]);
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event?.target?.value?.toLowerCase()?.trim();
    if (searchTerm.length >= 3) {
      setSearchValue(searchTerm);
    } else {
      setSearchValue("");
    }
  }

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      setSortingParameterName("courseName");
    } else if (option === "reset") {
      setSortingParameterName("courseSequence");
    }
  };

  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="my-3">
        Courses Offered by{" "}
        <span className="font-bold capitalize text-orange-500">
          {breadCrumb}
        </span>{" "}
        {new Date().getFullYear()}
      </h1>
      <div className="flex w-full flex-col py-5 pt-0 md:min-w-[550px]">
        {/* Search and Sort Section  */}
        <div className="relative mb-4 flex items-stretch gap-4 max-md:flex-col">
          <div className="text-primary-text focus-within:border-secondary-text flex h-12 flex-1 items-center rounded-xl border border-zinc-200 bg-white px-2 shadow-md">
            <RiSearchLine className="text-orange-500" />
            <input
              className="w-full pl-5 focus:outline-none max-md:p-3"
              type="text"
              placeholder="Search Course Name"
              onChange={handleSearch}
            />
          </div>
          {/* Sort button  */}
          <SortButton handleFilterOptionClick={handleFilterOptionClick} />
        </div>
        {/* Total courses offered  */}
        <p className="w-min text-nowrap border-b-2 border-orange-500 text-orange-500">
          <span className="text-2xl font-bold text-black">
            {collegeCoursesData?.college?.data?.attributes?.courses?.length ||
              0}
          </span>{" "}
          <span>Total Courses</span>
        </p>
        {/* College List Section  */}
        {filteredData?.map((course: any) => (
          <CourseFilteredCard
            key={course?.courseName?.data?.id}
            id={course?.courseName?.data?.id}
            slug={course?.courseName?.data?.attributes?.slug}
            bgImage={course?.attributes?.bgImage?.data?.attributes?.url}
            courseName={course?.courseName?.data?.attributes?.courseName}
            courseType={
              course?.courseName?.data?.attributes?.courseType?.data?.attributes
                ?.collegeType
            }
            totalColleges={course?.totalColleges}
            duration={
              course?.courseName?.data?.attributes?.duration?.data?.attributes
                ?.duration || "N/A"
            }
            description={course?.courseName?.data?.attributes?.description}
            avgFeesFrom={course?.courseName?.data?.attributes?.avgFees?.from}
            avgFeesTo={course?.courseName?.data?.attributes?.avgFees?.to}
            courseLevel={course?.courseName?.data?.attributes?.courseLevel?.data?.map(
              (value: any) => value?.attributes?.courseLevel,
            )}
            tabsSections={course?.courseName?.data?.attributes?.navbars?.data?.map(
              (value: any) => value?.attributes?.navItem,
            )}
          />
        ))}
        {courseData?.college?.data?.attributes?.courses?.meta?.pagination
          ?.total > filteredData?.length && (
          <LoadingButton onClick={handleLoadMore} className="mx-auto">
            Load More
          </LoadingButton>
        )}
      </div>
    </div>
  );
}
