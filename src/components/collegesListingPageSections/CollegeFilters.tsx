"use client";
import Filter from "@/components/filters/Filter";
import {
  getAllAffiliations,
  getAllCities,
  getAllCollegeTypes,
  getAllCourses,
  getAllExamsAccepted,
  getAllGenders,
  getAllStates,
  getAllStreams,
} from "@/graphql/collegeQuery/colleges";
import { useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";

export default function CollegeFilters({
  filterBy,
  SelectedFilters,
  setSelectedFilters,
  totalResults,
  mobileFilter,
  setMobileFilter,

  StreamCheckedFilters,
  setStreamCheckedFilters,
  StateCheckedFilters,
  setStateCheckedFilters,
  CityCheckedFilters,
  setCityCheckedFilters,
  CourseCheckedFilters,
  setCourseCheckedFilters,
  CollegeTypeCheckedFilters,
  setCollegeTypeCheckedFilters,
  AffiliationCheckedFilters,
  setAffiliationCheckedFilters,
  GenderCheckedFilters,
  setGenderCheckedFilters,
  RankingCheckedFilters,
  setRankingCheckedFilters,
  ExamCheckedFilters,
  setExamCheckedFilters,
}: any) {
  // const asideRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (mobileFilter && asideRef.current) {
  //     disableBodyScroll(asideRef.current);
  //   } else if (asideRef.current) {
  //     enableBodyScroll(asideRef.current);
  //   }

  //   return () => {
  //     clearAllBodyScrollLocks();
  //   };
  // }, [mobileFilter]);

  const {
    data: streams,
    loading: streamsLoading,
    error: streamsError,
  } = useQuery(getAllStreams);
  const {
    data: states,
    loading: statesLoading,
    error: statesError,
  } = useQuery(getAllStates);
  const {
    data: cities,
    loading: citiesLoading,
    error: citiesError,
  } = useQuery(getAllCities);
  const {
    data: courses,
    loading: coursesLoading,
    error: coursesError,
  } = useQuery(getAllCourses);
  const {
    data: collegeTypes,
    loading: collegeTypesLoading,
    error: collegeTypesError,
  } = useQuery(getAllCollegeTypes);
  const {
    data: affiliations,
    loading: affiliationsLoading,
    error: affiliationsError,
  } = useQuery(getAllAffiliations);
  const {
    data: genders,
    loading: gendersLoading,
    error: gendersError,
  } = useQuery(getAllGenders);
  const {
    data: exams,
    loading: examsLoading,
    error: examsError,
  } = useQuery(getAllExamsAccepted);
  // ========================================================================== //
  // filtering all Name form query
  const streamsFilteredFromQueryArray = streams?.streams?.data
    ? streams?.streams?.data?.map((stream: any) => stream?.attributes?.stream)
    : [];

  const statesFilteredFromQueryArray = states?.states?.data
    ? states?.states?.data?.map((item: any) => item?.attributes?.state)
    : [];
  // console.log(streams?.streams?.data, "item");
  const citiesFilteredFromQueryArray = cities?.cities?.data
    ? cities?.cities?.data?.map((item: any) => item?.attributes?.city)
    : [];
  const coursesFilteredFromQueryArray = courses?.courses?.data
    ? courses?.courses?.data?.map((item: any) => item?.attributes?.breadCrumb)
    : [];
  const collegeTypesFilteredFromQueryArray = collegeTypes?.collegeTypes?.data
    ? collegeTypes?.collegeTypes?.data?.map(
        (item: any) => item?.attributes?.collegeType,
      )
    : [];
  const affiliationsFilteredFromQueryArray = affiliations?.organizations?.data
    ? affiliations?.organizations?.data?.map(
        (item: any) => item?.attributes?.organization,
      )
    : [];
  const gendersFilteredFromQueryArray = genders?.genders?.data
    ? genders?.genders?.data?.map((item: any) => item?.attributes?.gender)
    : [];
  const examsFilteredFromQueryArray = exams?.exams?.data
    ? exams?.exams?.data?.map((item: any) => item?.attributes?.breadCrumb)
    : [];
  // console.log(affiliations, "affiliations");
  // ========================================================================//
  // handleFilter functions
  const handleStreamFilter = (data: string) => {
    // Toggle the selection
    const updatedSelection = StreamCheckedFilters.includes(data)
      ? StreamCheckedFilters.filter((item: any) => item !== data)
      : [...StreamCheckedFilters, data];
    setStreamCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      stream: updatedSelection,
    }));
  };

  const handleStateFilter = (data: any) => {
    // Toggle the selection
    const updatedSelection = StateCheckedFilters.includes(data)
      ? StateCheckedFilters.filter((item: any) => item !== data)
      : [...StateCheckedFilters, data];
    setStateCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      state: updatedSelection,
    }));
  };

  const handleCityFilter = (data: any) => {
    // Toggle the selection
    const updatedSelection = CityCheckedFilters.includes(data)
      ? CityCheckedFilters.filter((item: any) => item !== data)
      : [...CityCheckedFilters, data];
    setCityCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      city: updatedSelection,
    }));
  };

  const handleCourseFilter = (data: any) => {
    // Toggle the selection
    const updatedSelection = CourseCheckedFilters.includes(data)
      ? CourseCheckedFilters.filter((item: any) => item !== data)
      : [...CourseCheckedFilters, data];
    setCourseCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      course: updatedSelection,
    }));
  };

  const handleCollegeTypeFilter = (data: any) => {
    // Toggle the selection
    const updatedSelection = CollegeTypeCheckedFilters.includes(data)
      ? CollegeTypeCheckedFilters.filter((item: any) => item !== data)
      : [...CollegeTypeCheckedFilters, data];
    setCollegeTypeCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      collegeType: updatedSelection,
    }));
  };

  const handleAffiliationFilter = (data: any) => {
    // Toggle the selection
    const updatedSelection = AffiliationCheckedFilters.includes(data)
      ? AffiliationCheckedFilters.filter((item: any) => item !== data)
      : [...AffiliationCheckedFilters, data];
    setAffiliationCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      affiliation: updatedSelection,
    }));
  };

  const handleGenderFilter = (data: any) => {
    setGenderCheckedFilters(data);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      genderAccepted: data,
    }));
  };

  const handleRankingFilter = (data: any) => {
    setRankingCheckedFilters(data);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      ranking: data,
    }));
  };

  const handleExamFilter = (data: any) => {
    // Toggle the selection
    const updatedSelection = ExamCheckedFilters.includes(data)
      ? ExamCheckedFilters.filter((item: any) => item !== data)
      : [...ExamCheckedFilters, data];
    setExamCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      examAccepted: updatedSelection,
    }));
  };

  // function to remove filters from selected filter
  const handleUnselectFilter = (filter?: string, name?: string) => {
    if (filter === "stream") {
      setStreamCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        stream: [],
      }));
      // shygttdtfgcgvb
    } else if (filter === "state") {
      setStateCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        state: [],
      }));
    } else if (filter === "city") {
      setCityCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        city: [],
      }));
    } else if (filter === "course") {
      setCourseCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        course: [],
      }));
    } else if (filter === "collegeType") {
      setCollegeTypeCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        collegeType: [],
      }));
    } else if (filter === "affiliation") {
      setAffiliationCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        affiliation: [],
      }));
    } else if (filter === "genderAccepted") {
      setGenderCheckedFilters("");
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        genderAccepted: "",
      }));
    } else if (filter === "ranking") {
      setRankingCheckedFilters("");
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        ranking: "",
      }));
    } else if (filter === "examAccepted") {
      setExamCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        examAccepted: [],
      }));
    }
  };

  return (
    <aside
      className={`min-w-[300px] [flex:2] max-md:bg-orange-50 max-md:px-5 max-md:pt-20 ${
        mobileFilter
          ? "slide-in fixed left-0 top-0 z-40 h-screen w-full overflow-y-scroll"
          : "max-md:hidden"
      }`}
    >
      <div
        // ref={asideRef}
        className={`md:sticky md:top-4`}
      >
        <button
          className="!fixed !right-5 !top-24 !z-50 text-4xl text-black hover:text-orange-500 md:hidden"
          onClick={() => setMobileFilter(false)}
        >
          <IoIosCloseCircleOutline />
        </button>
        <h1 className="mb-7 font-medium">Showing {totalResults} Colleges</h1>
        <div className="w-full pb-0 max-md:bg-opacity-95">
          {/* Selected filters display */}
          <div className="md:max-h-[6vh]md:overflow-hidden mb-3 flex flex-wrap items-center gap-1 max-md:text-black md:hover:overflow-y-auto">
            {Object.values(SelectedFilters).some(
              (value) =>
                value !== "" &&
                value !== 0 &&
                (!Array.isArray(value) || value.length !== 0),
            ) && <span className="text-xs font-bold">Filters Applied : </span>}
            {Object.entries(SelectedFilters).map(([key, value]: any) => {
              if (Array.isArray(value)) {
                // If the value is an array, join its elements with commas
                value = value.join(" , ");
              } else if (key === "courseDuration") {
                const duration: any =
                  typeof value === "string" ? parseInt(value) : value;
                return (
                  value !== "" &&
                  value !== 0 && (
                    <div
                      key={key}
                      className="flex w-max items-center gap-1 rounded-md border border-orange-500 px-2 py-1 text-xs"
                    >
                      <span>
                        {Math.floor(duration / 12)} years {duration % 12} months
                      </span>
                      <button
                        onClick={() =>
                          handleUnselectFilter(key, value as string)
                        }
                      >
                        <MdClose />
                      </button>
                    </div>
                  )
                );
              }
              return (
                value !== "" &&
                (!Array.isArray(value) || value.length !== 0) && (
                  <div
                    key={key}
                    className="flex w-max items-center gap-1 rounded-md border border-orange-500 px-2 py-1 text-xs"
                  >
                    <span className="max-w-[150px] text-wrap">{value}</span>
                    <button onClick={() => handleUnselectFilter(key, value)}>
                      <MdClose />
                    </button>
                  </div>
                )
              );
            })}
          </div>
          {/*END  shows filter by options  */}
          <div className="w-full max-md:mb-20 md:h-[86vh] md:overflow-hidden md:hover:overflow-y-auto">
            {/* Filters  */}
            <Filter
              title="SPECIALIZATION"
              filterList={streamsFilteredFromQueryArray}
              handleFilter={handleStreamFilter}
              checked={StreamCheckedFilters}
            />
            <Filter
              title="STATE"
              filterList={statesFilteredFromQueryArray}
              handleFilter={handleStateFilter}
              checked={StateCheckedFilters}
            />
            <Filter
              title="CITY"
              filterList={citiesFilteredFromQueryArray}
              handleFilter={handleCityFilter}
              checked={CityCheckedFilters}
            />
            <Filter
              title="COURSE"
              filterList={coursesFilteredFromQueryArray}
              handleFilter={handleCourseFilter}
              checked={CourseCheckedFilters}
            />
            <Filter
              title="COLLEGE TYPE"
              filterList={collegeTypesFilteredFromQueryArray}
              handleFilter={handleCollegeTypeFilter}
              checked={CollegeTypeCheckedFilters}
            />
            <Filter
              title="AFFILIATION"
              filterList={affiliationsFilteredFromQueryArray}
              handleFilter={handleAffiliationFilter}
              checked={AffiliationCheckedFilters}
            />
            <Filter
              title="GENDER ACCEPTED"
              filterList={gendersFilteredFromQueryArray}
              handleFilter={handleGenderFilter}
              checked={GenderCheckedFilters}
            />
            <Filter
              title="RANKING"
              filterList={["Top 10", "Top 20", "Top 30", "Top 40", "Top 50"]}
              handleFilter={handleRankingFilter}
              checked={RankingCheckedFilters}
            />
            <Filter
              title="EXAM ACCEPTED"
              filterList={examsFilteredFromQueryArray}
              handleFilter={handleExamFilter}
              checked={ExamCheckedFilters}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
