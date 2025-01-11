"use client";
import React, { useEffect } from "react";
import { examsListingPage, exams } from "@/data/examData";
import Banner1 from "@/components/bannerSections/Banner1";
import { banner1, tabsSections } from "@/data/globalData";
import ExamListingBanner from "@/components/bannerSections/ExamListingBanner";
import ExamListSection from "@/components/examsListingPageSections/ExamListSection";
import { getExamListingPageBanner } from "@/graphql/examQuery/exams";
import { useQuery } from "@apollo/client";
import { ListingBannerSkeleton } from "@/components/bannerSections/ListingBannerSkeleton";

export default function Exams() {
  // Query
  const {
    data: bannerData,
    loading,
    error,
    refetch,
  } = useQuery(getExamListingPageBanner);
  // ========================================= //
  useEffect(() => {
    if (!loading && !bannerData) {
      refetch();
    }
  }, [bannerData, refetch, loading]);
  return (
    <>
      {!loading ? (
        <ExamListingBanner
          data={examsListingPage?.banner}
          title={bannerData?.examListingPages?.data?.[0]?.attributes?.title}
          bgImg={
            bannerData?.examListingPages?.data?.[0]?.attributes?.bgImg?.data
              ?.attributes?.url
          }
          imgArray={bannerData?.examListingPages?.data?.[0]?.attributes?.photos?.data?.map(
            (img: any) => img?.attributes?.url,
          )}
          totalExamsFound={bannerData?.exams?.meta?.pagination?.total}
        />
      ) : (
        <ListingBannerSkeleton />
      )}
      <ExamListSection
        data={exams}
        filterBy={examsListingPage?.filterBy}
        tabsSections={tabsSections}
      />
      <Banner1 data={banner1} />
    </>
  );
}
