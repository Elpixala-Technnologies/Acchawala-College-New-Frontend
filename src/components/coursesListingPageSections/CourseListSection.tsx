"use client";
import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineSort } from "react-icons/md";
import Wrapper from "@/components/Wrappers";
import SortButton from "@/components/SortButton";
import { Button, LoadingButton } from "../Button";
import CourseFilters from "./CourseFilters";
import CourseFilteredCard from "../cardsAndSliders/CourseFilteredCard";

import { getAllCourses } from "@/graphql/courseQuery/course";
import { useQuery } from "@apollo/client";
import { FilteredCardSkeleton } from "../cardsAndSliders/FilteredCardSkeleton";
export default function CourseListSection({
  data,
  // filterBy,
  tabsSections,
}: any) {
  const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any>();
  const [SelectedFilters, setSelectedFilters] = useState({
    mode: [] as string[],
    courseDuration: 0,
  });
  // used for Query
  const [searchValue, setSearchValue] = useState("");
  const [ModeCheckedFilters, setModeCheckedFilters] = useState<string[]>([]);
  const [CourseCheckedDurationFilters, setCourseCheckedDurationFilters] =
    useState<number>();
  const [pageNo, setPageNo] = useState(1);
  const [sortingParameterName, setSortingParameterName] =
    useState("courseSequence");

  // Query
  const {
    data: courseData,
    loading,
    error,
    refetch,
  } = useQuery(getAllCourses, {
    variables: {
      searchByCourseName: searchValue,
      modes: ModeCheckedFilters?.length ? ModeCheckedFilters : undefined,
      duration: CourseCheckedDurationFilters,
      sortingParameter: sortingParameterName,
      page: pageNo,
      pageSize: 10,
    },
  });
  useEffect(() => {
    if (courseData) {
      if (pageNo === 1) {
        setFilteredData(courseData?.courses?.data);
      } else {
        setFilteredData((prevData: any) => [
          ...prevData,
          ...courseData?.courses?.data,
        ]);
      }
    }
  }, [
    courseData,
    searchValue,
    ModeCheckedFilters,
    sortingParameterName,
    pageNo,
  ]);
  // ========================================================== //
  useEffect(() => {
    if (!loading && !courseData) {
      refetch();
    }
  }, [courseData, refetch, loading]);
  // ========================================================== //
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
    <section id="collegeList" className="my-5 w-full pb-5">
      <Wrapper className="flex flex-col justify-between gap-5 md:flex-row">
        {/* Aside College Filter Section  */}
        <CourseFilters
          // filterBy={filterBy}
          SelectedFilters={SelectedFilters}
          setSelectedFilters={setSelectedFilters}
          totalResults={courseData?.courses?.meta?.pagination?.total}
          mobileFilter={MobileFilter}
          setMobileFilter={setMobileFilter}
          // For query
          ModeCheckedFilters={ModeCheckedFilters}
          setModeCheckedFilters={setModeCheckedFilters}
          CourseCheckedDurationFilters={CourseCheckedDurationFilters}
          setCourseCheckedDurationFilters={setCourseCheckedDurationFilters}
        />
        {/* main Course Search and List Section  */}
        <main className="flex w-full flex-col py-5 pt-0 md:min-w-[550px] md:[flex:8]">
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
            <div className="bottom-0 left-0 right-0 flex justify-end gap-4 border-orange-300 bg-white max-md:fixed max-md:z-40 max-md:w-full max-md:justify-between max-md:border-t max-md:p-3">
              {/* Sort button  */}
              <SortButton handleFilterOptionClick={handleFilterOptionClick} />
              {/* Filter Button  */}
              <div
                className="hidden max-md:block max-md:w-full max-md:flex-[1]"
                onClick={() => setMobileFilter((prev) => !prev)}
              >
                <Button
                  variant="orange"
                  className="group flex h-12 cursor-pointer items-center gap-2 !rounded-xl !px-2 max-md:!w-full"
                >
                  <span>Filter</span>
                  <MdOutlineSort />
                </Button>
              </div>
            </div>
          </div>
          {/* College List Section  */}
          {!loading
            ? filteredData?.map((course: any) => (
                <CourseFilteredCard
                  key={course?.id}
                  id={course?.id}
                  slug={course?.attributes?.slug}
                  bgImage={course?.attributes?.bgImage?.data?.attributes?.url}
                  courseName={course?.attributes?.courseName}
                  courseType={
                    course?.attributes?.courseType?.data?.attributes?.courseType
                  }
                  totalColleges={course?.attributes?.colleges?.data?.length}
                  duration={
                    course?.attributes?.duration?.data?.attributes?.duration ||
                    "N/A"
                  }
                  description={course?.attributes?.description}
                  avgFeesFrom={course?.attributes?.avgFees?.from}
                  avgFeesTo={course?.attributes?.avgFees?.to}
                  courseLevel={course?.attributes?.courseLevel?.data?.map(
                    (value: any) => value?.attributes?.courseLevel,
                  )}
                  tabsSections={course?.attributes?.navbars?.data?.map(
                    (value: any) => value?.attributes?.navItem,
                  )}
                />
              ))
            : [1, 2, 3, 4, 5]?.map(() => (
                <FilteredCardSkeleton key={Math.random()} />
              ))}
          {courseData?.courses?.meta?.pagination?.total >
            filteredData?.length && (
            <LoadingButton onClick={handleLoadMore} className="mx-auto">
              Load More
            </LoadingButton>
          )}
        </main>
      </Wrapper>
    </section>
  );
}
