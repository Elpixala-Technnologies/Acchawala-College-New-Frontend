"use client";
import Wrapper from "@/components/Wrappers";
import Banner1 from "@/components/bannerSections/Banner1";
import CollegeListingBanner from "@/components/bannerSections/CollegeListingBanner";
import { ListingBannerSkeleton } from "@/components/bannerSections/ListingBannerSkeleton";
import CollegesSlider from "@/components/cardsAndSliders/CollegesSlider";
import CollegeListSection from "@/components/collegesListingPageSections/CollegeListSection";
import { collegePage, colleges } from "@/data/collegeData";
import { banner1, tabsSections } from "@/data/globalData";
import { getCollegeListingPageBanner } from "@/graphql/collegeQuery/colleges";
import { addCommas } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

export default function Colleges() {
  // Query
  const {
    data: bannerData,
    loading,
    error,
    refetch,
  } = useQuery(getCollegeListingPageBanner);
  // useEffect(() => {
  //   console.log(bannerData?.colleges?.meta?.pagination?.total, "bannerData");
  // }, [bannerData]);
  useEffect(() => {
    if (!loading && !bannerData) {
      refetch();
    }
  }, [bannerData, refetch, loading]);
  return (
    <>
      {!loading ? (
        <CollegeListingBanner
          title={bannerData?.collegeListingPages?.data?.[0]?.attributes?.title}
          bgImg={
            bannerData?.collegeListingPages?.data?.[0]?.attributes?.bgImg?.data
              ?.attributes?.url
          }
          imgArray={bannerData?.collegeListingPages?.data?.[0]?.attributes?.photos?.data?.map(
            (img: any) => img?.attributes?.url,
          )}
          totalCollegesFound={bannerData?.colleges?.meta?.pagination?.total}
        />
      ) : (
        <ListingBannerSkeleton />
      )}
      <TopColleges
        data={colleges}
        totalCollegesFound={bannerData?.colleges?.meta?.pagination?.total}
      />

      <CollegeListSection
        data={colleges}
        filterBy={collegePage?.filterBy}
        tabsSections={tabsSections}
        topColleges={colleges}
      />
      <Banner1 data={banner1} />
    </>
  );
}

function TopColleges({ data, totalCollegesFound }: any) {
  return (
    <Wrapper as="section" containerClassName="my-10">
      <h2 className="mb-5 text-3xl font-bold">
        <span className="text-orange-500">Top Colleges</span>{" "}
        <span className="text-black">in India based on ranking</span>
      </h2>
      {/* Slider  */}
      <div className="topColleges relative">
        <CollegesSlider />
      </div>
    </Wrapper>
  );
}
