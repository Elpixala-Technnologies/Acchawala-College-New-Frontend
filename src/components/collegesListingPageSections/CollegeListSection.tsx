"use client";
import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import SortButton from "@/components/SortButton";
import { MdOutlineSort } from "react-icons/md";
import Wrapper from "@/components/Wrappers";
import { Button, LoadingButton } from "@/components/Button";
import CollegeFilteredCard from "@/components/cardsAndSliders/CollegeFilteredCard";
import TopCollegesScroll from "@/components/cardsAndSliders/TopCollegesScroll";
import CollegeFilters from "./CollegeFilters";
import { useQuery } from "@apollo/client";
import { getAllColleges } from "@/graphql/collegeQuery/colleges";
import { convertToYearlyFee } from "@/utils/customText";
import { FilteredCardSkeleton } from "../cardsAndSliders/FilteredCardSkeleton";

export default function CollegeListSection({
  data,
  filterBy,
  tabsSections,
  topColleges,
}: any) {
  const [MobileFilter, setMobileFilter] = useState(false);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [SelectedFilters, setSelectedFilters] = useState({
    stream: [] as string[],
    state: [] as string[],
    city: [] as string[],
    course: [] as string[],
    programType: [] as string[],
    collegeType: [] as string[],
    affiliation: [] as string[],
    genderAccepted: "",
    ranking: "",
    examAccepted: [] as string[],
  });

  const [StreamCheckedFilters, setStreamCheckedFilters] = useState<string[]>(
    [],
  );
  const [StateCheckedFilters, setStateCheckedFilters] = useState<string[]>([]);
  const [CityCheckedFilters, setCityCheckedFilters] = useState<string[]>([]);
  const [CourseCheckedFilters, setCourseCheckedFilters] = useState<string[]>(
    [],
  );
  const [ProgramTypeCheckedFilters, setProgramTypeCheckedFilters] = useState<
    string[]
  >([]);
  const [CollegeTypeCheckedFilters, setCollegeTypeCheckedFilters] = useState<
    string[]
  >([]);
  const [AffiliationCheckedFilters, setAffiliationCheckedFilters] = useState<
    string[]
  >([]);
  const [GenderCheckedFilters, setGenderCheckedFilters] = useState<string>("");
  const [RankingCheckedFilters, setRankingCheckedFilters] =
    useState<string>("");
  const [ExamCheckedFilters, setExamCheckedFilters] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [sortingParameterName, setSortingParameterName] =
    useState("collegeSequence");

  const {
    data: collegeData,
    loading,
    error,
    refetch,
  } = useQuery(getAllColleges(""), {
    variables: {
      streams: StreamCheckedFilters.length ? StreamCheckedFilters : undefined,
      states: StateCheckedFilters.length ? StateCheckedFilters : undefined,
      cities: CityCheckedFilters.length ? CityCheckedFilters : undefined,
      collegeTypes: CollegeTypeCheckedFilters.length
        ? CollegeTypeCheckedFilters
        : undefined,
      affiliations: AffiliationCheckedFilters.length
        ? AffiliationCheckedFilters
        : undefined,
      gender: GenderCheckedFilters ? GenderCheckedFilters : undefined,
      examAccepted: ExamCheckedFilters.length ? ExamCheckedFilters : undefined,
      courses: CourseCheckedFilters.length ? CourseCheckedFilters : undefined,
      searchByCollegeName: searchValue,
      collegeSortingParameter: sortingParameterName,
      page: pageNo,
      pageSize: 10,
    },
  });

  useEffect(() => {
    if (collegeData) {
      if (pageNo === 1) {
        setFilteredData(collegeData.colleges.data);
      } else {
        setFilteredData((prevData: any) => [
          ...prevData,
          ...collegeData.colleges.data,
        ]);
      }
    }
  }, [
    collegeData,
    searchValue,
    sortingParameterName,
    pageNo,
    StreamCheckedFilters,
    StateCheckedFilters,
    CityCheckedFilters,
    CourseCheckedFilters,
    ProgramTypeCheckedFilters,
    CollegeTypeCheckedFilters,
    AffiliationCheckedFilters,
    GenderCheckedFilters,
    RankingCheckedFilters,
    ExamCheckedFilters,
  ]);
  // ==================================================== //
  useEffect(() => {
    if (!loading && !collegeData) {
      refetch();
    }
  }, [collegeData, refetch, loading]);
  // ==================================================== //
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const searchTerm = event.target.value.toLowerCase().trim();
    if (searchTerm.length >= 3) {
      setSearchValue(searchTerm);
    } else {
      setSearchValue("");
    }
  }

  const handleFilterOptionClick = (option: any) => {
    if (option === "a-z") {
      setSortingParameterName("collegeName");
    } else if (option === "reset") {
      setSortingParameterName("collegeSequence");
    }
  };

  const handleLoadMore = () => {
    setPageNo((prev) => prev + 1);
  };

  return (
    <section id="collegeList" className="my-5 w-full pb-5">
      <Wrapper
        as="div"
        className="flex flex-col justify-between gap-5 md:flex-row"
      >
        {/* Aside College Filter Section */}
        <CollegeFilters
          filterBy={filterBy}
          SelectedFilters={SelectedFilters}
          setSelectedFilters={setSelectedFilters}
          totalResults={collegeData?.colleges?.meta?.pagination?.total}
          mobileFilter={MobileFilter}
          setMobileFilter={setMobileFilter}
          // filters
          StreamCheckedFilters={StreamCheckedFilters}
          setStreamCheckedFilters={setStreamCheckedFilters}
          StateCheckedFilters={StateCheckedFilters}
          setStateCheckedFilters={setStateCheckedFilters}
          CityCheckedFilters={CityCheckedFilters}
          setCityCheckedFilters={setCityCheckedFilters}
          CourseCheckedFilters={CourseCheckedFilters}
          setCourseCheckedFilters={setCourseCheckedFilters}
          ProgramTypeCheckedFilters={ProgramTypeCheckedFilters}
          setProgramTypeCheckedFilters={setProgramTypeCheckedFilters}
          CollegeTypeCheckedFilters={CollegeTypeCheckedFilters}
          setCollegeTypeCheckedFilters={setCollegeTypeCheckedFilters}
          AffiliationCheckedFilters={AffiliationCheckedFilters}
          setAffiliationCheckedFilters={setAffiliationCheckedFilters}
          GenderCheckedFilters={GenderCheckedFilters}
          setGenderCheckedFilters={setGenderCheckedFilters}
          RankingCheckedFilters={RankingCheckedFilters}
          setRankingCheckedFilters={setRankingCheckedFilters}
          ExamCheckedFilters={ExamCheckedFilters}
          setExamCheckedFilters={setExamCheckedFilters}
        />
        {/* Main College Search and List Section */}
        <main className="flex w-full flex-col py-5 pt-0 md:min-w-[550px] md:[flex:8]">
          {/* Search and Sort Section */}
          <div className="relative mb-4 flex items-stretch gap-4 max-sm:flex-col">
            <div className="text-primary-text focus-within:border-secondary-text flex h-12 flex-1 items-center rounded-xl border border-zinc-200 bg-white px-2 shadow-md">
              <RiSearchLine className="text-orange-500" />
              <input
                className="w-full pl-5 focus:outline-none max-md:p-3"
                type="text"
                placeholder="Search Colleges Name..."
                onChange={handleSearch}
              />
            </div>
            <div className="bottom-0 left-0 right-0 flex justify-end gap-4 border-orange-300 max-md:fixed max-md:z-40 max-md:w-full max-md:justify-between max-md:border-t max-md:bg-white max-md:p-2">
              {/* Sort button */}
              <SortButton handleFilterOptionClick={handleFilterOptionClick} />
              {/* Filter Button */}
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
          {/* College List Section */}
          {!loading
            ? filteredData.map((college: any, index: number) => (
                <React.Fragment key={college?.id}>
                  <CollegeFilteredCard
                    id={college?.id}
                    slug={college?.attributes?.slug}
                    collegeLogo={
                      college?.attributes?.collegeLogo?.data?.attributes?.url
                    }
                    city={
                      college?.attributes?.location?.city?.data?.attributes
                        ?.city
                    }
                    state={
                      college?.attributes?.location?.state?.data?.attributes
                        ?.state
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
                    brochureUrl={
                      college?.attributes?.brochureFile?.data?.attributes?.url
                    }
                    collegeType={college?.attributes?.college_type?.data?.attributes?.collegeType?.slice(
                      0,
                      3,
                    )}
                    collegeName={college?.attributes?.collegeName}
                    avgPackage={college?.attributes?.avgPackage}
                    exam={Array.from(
                      new Set(
                        college?.attributes?.allCourses?.map(
                          (item: any) =>
                            item?.examName?.data?.attributes?.breadCrumb,
                        ),
                      ),
                    )
                      .filter(Boolean)
                      .join(", ")}
                    description={college?.attributes?.description}
                    tabsSections={college?.attributes?.navbars?.data?.map(
                      (value: any) => value?.attributes?.navItem,
                    )}
                  />
                  {(index + 1) % 3 === 0 &&
                    index !== filteredData?.length - 1 && (
                      <TopCollegesScroll
                        data={topColleges}
                        key={`topColleges-${index}`}
                      />
                    )}
                </React.Fragment>
              ))
            : [1, 2, 3, 4, 5].map((_, i) => <FilteredCardSkeleton key={i} />)}

          {/* Top Colleges Section */}
          {filteredData.length % 4 !== 0 && (
            <TopCollegesScroll data={topColleges} />
          )}

          {collegeData?.colleges?.meta?.pagination?.total >
            filteredData.length && (
            <LoadingButton onClick={handleLoadMore} className="mx-auto">
              Load More
            </LoadingButton>
          )}
        </main>
      </Wrapper>
    </section>
  );
}
