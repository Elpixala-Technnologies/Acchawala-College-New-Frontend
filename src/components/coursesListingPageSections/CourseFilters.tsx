import Filter from "@/components/filters/Filter";
import React, { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";

import { getAllModes } from "@/graphql/courseQuery/course";
import { useQuery } from "@apollo/client";

export default function CourseFilters({
  // filterBy,
  SelectedFilters,
  setSelectedFilters,
  totalResults,
  mobileFilter,
  setMobileFilter,
  ModeCheckedFilters,
  setModeCheckedFilters,
  CourseCheckedDurationFilters,
  setCourseCheckedDurationFilters,
}: any) {
  const { data: modes, loading, error } = useQuery(getAllModes);

  // console.log(modes?.courseModes?.data, "modes");
  // filtering all modes Name form query
  const modesFilteredFromQueryArray = modes?.courseModes?.data
    ? modes?.courseModes?.data?.map(
        (courseMode: any) => courseMode?.attributes?.courseMode,
      )
    : [];

  const handleModeFilter = (data: string) => {
    const updatedSelection = ModeCheckedFilters.includes(data)
      ? ModeCheckedFilters.filter((item: any) => item !== data)
      : [...ModeCheckedFilters, data];

    setModeCheckedFilters(updatedSelection);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      mode: updatedSelection,
    }));
  };

  const handleCourseDurationFilter = (data: number) => {
    setCourseCheckedDurationFilters(data);
    setSelectedFilters((prevData: any) => ({
      ...prevData,
      courseDuration: data,
    }));
  };

  const handleUnselectFilter = (filter: string) => {
    if (filter === "mode") {
      setModeCheckedFilters([]);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        mode: [],
      }));
    } else if (filter === "courseDuration") {
      setCourseCheckedDurationFilters(0);
      setSelectedFilters((prevData: any) => ({
        ...prevData,
        courseDuration: 0,
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
      <h1 className="mb-7 font-medium">Found {totalResults} Results</h1>
      <div className="w-full pb-0 max-md:bg-opacity-95">
        <div className="mb-3 flex flex-wrap items-center gap-1 max-md:text-black md:overflow-hidden md:hover:overflow-y-auto md:max-h-[10vh]">
          {Object.values(SelectedFilters).some(
            (value) =>
              value !== "" &&
              value !== 0 &&
              (!Array.isArray(value) || value.length !== 0),
          ) && <span className="text-xs font-bold">Filters Applied : </span>}
          {Object.entries(SelectedFilters).map(([key, value]: any) => {
            if (Array.isArray(value)) {
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
                    <button onClick={() => handleUnselectFilter(key)}>
                      <MdClose />
                    </button>
                  </div>
                )
              );
            }
            return (
              value !== "" &&
              (!Array.isArray(value) || value?.length !== 0) && (
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
        <div className="md:overflow-hidden md:hover:overflow-y-auto md:max-h-[76vh]">    
          <Filter
          title="MODE"
          filterList={modesFilteredFromQueryArray}
          handleFilter={handleModeFilter}
          checked={ModeCheckedFilters}
        />
        <Filter
          title="COURSE DURATION"
          filterList={[]}
          handleFilter={handleCourseDurationFilter}
          checked={CourseCheckedDurationFilters || 96}
        />
        </div>
      </div>
    </aside>
  );
}
