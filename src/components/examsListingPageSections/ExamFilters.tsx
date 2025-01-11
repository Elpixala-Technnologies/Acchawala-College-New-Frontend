"use client";
import Filter from "@/components/filters/Filter";
import React, { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";

import { useQuery } from "@apollo/client";
import {
  getAllEligibilityLevels,
  getAllExaminationLevels,
  getAllExamModes,
  getAllStreams,
} from "@/graphql/examQuery/exams";
export default function ExamFilters({
  // filterBy,
  SelectedFilters,
  setSelectedFilters,
  totalResults,
  mobileFilter,
  setMobileFilter,

  StreamCheckedFilters,
  setStreamCheckedFilters,
  ModeCheckedFilters,
  setModeCheckedFilters,
  EligibilityLevelCheckedFilters,
  setEligibilityLevelCheckedFilters,
  ExaminationLevelCheckedFilters,
  setExaminationLevelCheckedFilters,
}: any) {
  const {
    data: streams,
    loading: streamsLoading,
    error: streamsError,
  } = useQuery(getAllStreams);
  const {
    data: examinationLevels,
    loading: examinationLevelsLoading,
    error: examinationLevelsError,
  } = useQuery(getAllExaminationLevels);
  const {
    data: eligibilityLevels,
    loading: eligibilityLevelsLoading,
    error: eligibilityLevelsError,
  } = useQuery(getAllEligibilityLevels);
  const {
    data: examModes,
    loading: examModesLoading,
    error: examModesError,
  } = useQuery(getAllExamModes);

  // ========================================================================== //
  // filtering all Name form query
  const streamsFilteredFromQueryArray = streams?.streams?.data
    ? streams?.streams?.data?.map((stream: any) => stream?.attributes?.stream)
    : [];
  const examinationLevelsFilteredFromQueryArray = examinationLevels
    ?.examinationLevels?.data
    ? examinationLevels?.examinationLevels?.data?.map(
        (examinationLevel: any) =>
          examinationLevel?.attributes?.ExaminationLevel,
      )
    : [];
  const eligibilityLevelsFilteredFromQueryArray = eligibilityLevels
    ?.eligibilityLevels?.data
    ? eligibilityLevels?.eligibilityLevels?.data?.map(
        (eligibilityLevel: any) =>
          eligibilityLevel?.attributes?.eligibilityLevel,
      )
    : [];
  const examModesFilteredFromQueryArray = examModes?.examModes?.data
    ? examModes?.examModes?.data?.map(
        (examMode: any) => examMode?.attributes?.examMode,
      )
    : [];

  //=====================================================================================//
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

  const handleModeFilter = (data: string) => {
    // Toggle the selection
    const updatedSelection = ModeCheckedFilters.includes(data)
      ? ModeCheckedFilters.filter((item: any) => item !== data)
      : [...ModeCheckedFilters, data];

    setModeCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      mode: updatedSelection,
    }));
  };

  const handleEligibilityLevelFilter = (data: string) => {
    // Toggle the selection
    const updatedSelection = EligibilityLevelCheckedFilters.includes(data)
      ? EligibilityLevelCheckedFilters.filter((item: any) => item !== data)
      : [...EligibilityLevelCheckedFilters, data];

    setEligibilityLevelCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      level: updatedSelection,
    }));
  };

  const handleExaminationLevelFilter = (data: string) => {
    // Toggle the selection
    const updatedSelection = ExaminationLevelCheckedFilters.includes(data)
      ? ExaminationLevelCheckedFilters.filter((item: any) => item !== data)
      : [...ExaminationLevelCheckedFilters, data];

    setExaminationLevelCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      level: updatedSelection,
    }));
  };
  // ==========================================================================//
  // function to remove filters from all selected filters
  const handleUnselectFilter = (filter?: string) => {
    if (filter === "stream") {
      setStreamCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({ ...prevData, stream: [] }));
    } else if (filter === "mode") {
      setModeCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        mode: [],
      }));
    } else if (filter === "eligibilityLevel") {
      setEligibilityLevelCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        category: [],
      }));
    } else if (filter === "examinationLevel") {
      setExaminationLevelCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        category: [],
      }));
    }
  };

  return (
    <aside
      className={`min-w-[300px] [flex:2] max-md:bg-orange-50 max-md:px-5 max-md:pt-20 md:sticky md:top-2 md:h-screen ${mobileFilter ? "slide-in fixed left-0 top-0 z-40 h-screen w-full overflow-y-scroll" : "max-md:hidden"}`}
    >
      <button
        className="!fixed !right-5 !top-24 !z-50 text-4xl text-black hover:text-orange-500 md:hidden"
        onClick={() => setMobileFilter(false)}
      >
        <IoIosCloseCircleOutline />
      </button>
      <h1 className="mb-7 font-medium">Showing {totalResults} Results</h1>
      <div className="w-full max-md:bg-opacity-95">
        {/* Selected filters display */}
        <div className="mb-3 flex flex-wrap items-center gap-1 max-md:text-black md:max-h-[9vh] md:overflow-hidden md:hover:overflow-y-auto">
          {Object.values(SelectedFilters).some(
            (value) =>
              value !== "" && (!Array.isArray(value) || value.length !== 0),
          ) && <span className="text-xs font-bold">Filters Applied : </span>}
          {Object.entries(SelectedFilters).map(([key, value]: any) => {
            if (Array.isArray(value)) {
              // If the value is an array, join its elements with commas
              value = value.join(" , ");
            }
            return (
              value !== "" &&
              (!Array.isArray(value) || value.length !== 0) && (
                <div
                  key={key}
                  className="flex w-max items-center gap-1 rounded-md border border-orange-500 px-2 py-1 text-xs"
                >
                  <span className="max-w-[150px] text-wrap">{value}</span>
                  <button onClick={() => handleUnselectFilter(key)}>
                    <MdClose />
                  </button>
                </div>
              )
            );
          })}
        </div>
        {/* END shows filter by options */}

        {/* Filters  */}
        <div className="max-md:mb-20 md:max-h-[77vh] md:overflow-hidden md:hover:overflow-y-auto">
          <Filter
            title="SPECIALIZATION"
            filterList={streamsFilteredFromQueryArray}
            handleFilter={handleStreamFilter}
            checked={StreamCheckedFilters}
          />
          <Filter
            title="MODE"
            filterList={examModesFilteredFromQueryArray}
            handleFilter={handleModeFilter}
            checked={ModeCheckedFilters}
          />
          <Filter
            title="ELIGIBILITY LEVEL"
            filterList={eligibilityLevelsFilteredFromQueryArray}
            handleFilter={handleEligibilityLevelFilter}
            checked={EligibilityLevelCheckedFilters}
          />
          <Filter
            title="EXAMINATION LEVEL"
            filterList={examinationLevelsFilteredFromQueryArray}
            handleFilter={handleExaminationLevelFilter}
            checked={ExaminationLevelCheckedFilters}
          />
        </div>
      </div>
    </aside>
  );
}
