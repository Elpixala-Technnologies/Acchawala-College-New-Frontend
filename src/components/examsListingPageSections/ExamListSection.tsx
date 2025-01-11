"use client";
import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineSort } from "react-icons/md";

import Navbar from "./Navbar";
import Wrapper, { Wrapper1 } from "@/components/Wrappers";
import SortButton from "@/components/SortButton";
import ExamFilteredCard from "@/components/cardsAndSliders/ExamFilteredCard";
import { Button, LoadingButton } from "../Button";
import ExamFilters from "./ExamFilters";

import { useQuery } from "@apollo/client";
import { getAllExams } from "@/graphql/examQuery/exams";
import { FilteredCardSkeleton } from "../cardsAndSliders/FilteredCardSkeleton";
export default function ExamListSection({ data, filterBy, tabsSections }: any) {
  const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any>();
  const [SelectedFilters, setSelectedFilters] = useState({
    stream: [] as string[],
    mode: [] as string[],
    eligibilityLevel: [] as string[],
    examinationLevel: [] as string[],
  });
  // used for Query
  const [searchValue, setSearchValue] = useState("");
  const [StreamCheckedFilters, setStreamCheckedFilters] = useState<string[]>(
    [],
  );
  const [ModeCheckedFilters, setModeCheckedFilters] = useState<string[]>([]);
  const [EligibilityLevelCheckedFilters, setEligibilityLevelCheckedFilters] =
    useState<string[]>([]);
  const [ExaminationLevelCheckedFilters, setExaminationLevelCheckedFilters] =
    useState<string[]>([]);
  const [pageNo, SetPageNo] = useState(1);
  const [sortingParameterName, setSortingParameterName] =
    useState("examSequence");

  // Query
  const {
    data: examData,
    loading,
    error,
    refetch,
  } = useQuery(getAllExams, {
    variables: {
      searchByExamName: searchValue,
      modes: ModeCheckedFilters?.length ? ModeCheckedFilters : undefined,
      specializations: StreamCheckedFilters?.length
        ? StreamCheckedFilters
        : undefined,
      ExaminationLevels: ExaminationLevelCheckedFilters?.length
        ? ExaminationLevelCheckedFilters
        : undefined,
      eligibilityLevels: EligibilityLevelCheckedFilters?.length
        ? EligibilityLevelCheckedFilters
        : undefined,
      examSortingParameter: sortingParameterName,
      page: pageNo,
      pageSize: 10,
    },
  });

  useEffect(() => {
    // console.log(examData?.exams?.data, "examData");
    if (examData) {
      if (pageNo === 1) {
        setFilteredData(examData?.exams?.data);
      } else {
        setFilteredData((prevData: any) => [
          ...prevData,
          ...examData?.exams?.data,
        ]);
      }
    }
  }, [
    examData,
    searchValue,
    ModeCheckedFilters,
    StreamCheckedFilters,
    ExaminationLevelCheckedFilters,
    EligibilityLevelCheckedFilters,
    sortingParameterName,
    pageNo,
  ]);
  // ======================================================== //
  useEffect(() => {
    if (!loading && !examData) {
      refetch();
    }
  }, [examData, refetch, loading]);
  // ======================================================== //

  // console.log(filteredData, "filteredData");
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event?.target?.value?.toLowerCase()?.trim();
    if (searchTerm.length >= 3) {
      setSearchValue(searchTerm);
    } else {
      setSearchValue("");
    }
  }

  const handleMobileFilter = () => {
    setMobileFilter((pre) => !pre);
  };

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      setSortingParameterName("examName");
    } else if (option === "reset") {
      setSortingParameterName("examSequence");
    }
  };

  // Navbar
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelect = (index: any) => {
    setSelectedIndex(index);
  };

  const handleLoadMore = () => {
    SetPageNo((prev) => prev + 1);
  };

  return (
    <section id="collegeList" className="my-5 w-full pb-5">
      <Wrapper className="flex flex-col justify-between gap-6 md:flex-row">
        {/* Aside College Filter Section  */}
        <ExamFilters
          // filterBy={filterBy}
          SelectedFilters={SelectedFilters}
          setSelectedFilters={setSelectedFilters}
          totalResults={examData?.exams?.meta?.pagination?.total}
          mobileFilter={MobileFilter}
          setMobileFilter={setMobileFilter}
          // For query
          StreamCheckedFilters={StreamCheckedFilters}
          setStreamCheckedFilters={setStreamCheckedFilters}
          ModeCheckedFilters={ModeCheckedFilters}
          setModeCheckedFilters={setModeCheckedFilters}
          EligibilityLevelCheckedFilters={EligibilityLevelCheckedFilters}
          setEligibilityLevelCheckedFilters={setEligibilityLevelCheckedFilters}
          ExaminationLevelCheckedFilters={ExaminationLevelCheckedFilters}
          setExaminationLevelCheckedFilters={setExaminationLevelCheckedFilters}
        />
        {/* main Exam Search and List Section  */}
        <main className="flex w-full flex-col py-5 pt-0 md:min-w-[550px] md:[flex:8]">
          {/* Search and Sort Section  */}
          <div className="relative mb-4 flex items-stretch gap-4 max-md:flex-col">
            <div className="text-primary-text focus-within:border-secondary-text flex h-12 flex-1 items-center rounded-xl border border-zinc-200 bg-white px-2 shadow-md">
              <RiSearchLine className="text-orange-500" />
              <input
                className="w-full pl-5 focus:outline-none max-md:p-3"
                type="text"
                placeholder="Search Exam Name"
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
          {/* Navbar Filter  */}
          {/* <Navbar
            category={filterBy?.category}
            selectedNav={selectedIndex}
            onSelect={handleSelect}
          /> */}
          {/* College List Section  */}
          {!loading
            ? filteredData?.map((exam: any) => (
                <ExamFilteredCard
                  key={exam?.id}
                  id={exam?.id}
                  slug={exam?.attributes?.slug}
                  logo={exam?.attributes?.logo?.data?.attributes?.url}
                  examName={exam?.attributes?.examName}
                  examStartDate={exam?.attributes?.examDate?.startDate}
                  examEndDate={exam?.attributes?.examDate?.endDate}
                  applicationSubmissionStartDate={
                    exam?.attributes?.applicationSubmissionDates?.startDate
                  }
                  applicationSubmissionEndDate={
                    exam?.attributes?.applicationSubmissionDates?.endDate
                  }
                  mode={exam?.attributes?.mode?.data?.attributes?.examMode}
                  examinationLevel={
                    exam?.attributes?.ExaminationLevel?.data?.attributes
                      ?.ExaminationLevel
                  }
                  description={exam?.attributes?.description}
                  brochureFile={
                    exam?.attributes?.brochureFile?.data?.attributes?.url
                  }
                  tabsSections={exam?.attributes?.navbars?.data?.map(
                    (value: any) => value?.attributes?.navItem,
                  )}
                />
              ))
            : [1, 2, 3, 4, 5]?.map(() => (
                <FilteredCardSkeleton key={Math.random()} />
              ))}
          {examData?.exams?.meta?.pagination?.total > filteredData?.length && (
            <LoadingButton onClick={handleLoadMore} className="mx-auto">
              Load More
            </LoadingButton>
          )}
        </main>
      </Wrapper>
    </section>
  );
}
