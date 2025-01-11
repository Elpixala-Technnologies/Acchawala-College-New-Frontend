"use client";
import React, { useEffect, useState } from "react";
import Banner1 from "@/components/bannerSections/Banner1";
import CollegeDetailBanner from "@/components/bannerSections/CollegeDetailBanner";
import PageTabsWithDetail from "@/components/pageTabsWithDetail/PageTabsWithDetail";
import { banner1 } from "@/data/globalData";
import { useQuery } from "@apollo/client";
import {
  getCollegeDetails,
  getCollegeDetailsBanner,
} from "@/graphql/collegeQuery/collegeDetails";
import { convertQueryDataToTabSections } from "@/utils/customText";
import { getAllTopCourses } from "@/graphql/courseQuery/topCourses";
import PageDetailBannerSkeleton from "@/components/bannerSections/PageDetailBannerSkeleton";
import PageTabsWithDetailSkeleton from "@/components/pageTabsWithDetail/PageTabsWithDetailSkeleton";

type Props = {
  params: {
    college: string;
  };
};

export default function CollegeDetailPage({ params }: Props) {
  const [tabSelectionArray, setTabSelectionArray] = useState<any>([]);
  const collegeId = params?.college;

  // Query
  const {
    loading: collegeDetailsBannerLoading,
    data: collegeDetailsBanner,
    refetch: collegeDetailsBannerRefetch,
  } = useQuery(getCollegeDetailsBanner, {
    variables: { ID: collegeId },
  });

  const {
    loading: collegeLoading,
    data: collegeData,
    refetch,
  } = useQuery(getCollegeDetails, {
    variables: { ID: collegeId },
    skip: !collegeId,
  });

  const {
    data: topCourseData,
    loading: topCourseLoading,
    refetch: topCourseRefetch,
    error,
  } = useQuery(getAllTopCourses, { variables: { page: 1, pageSize: 3 } });
  // ========================================================== //
  useEffect(() => {
    if (collegeData?.college?.data?.attributes?.PageData) {
      const convertedData = convertQueryDataToTabSections(
        collegeData?.college?.data?.attributes?.PageData,
      );
      setTabSelectionArray(convertedData);
    }
  }, [collegeData]);
  // ========================================================= //
  useEffect(() => {
    if (!collegeDetailsBannerLoading && !collegeDetailsBanner) {
      collegeDetailsBannerRefetch();
    }
  }, [
    collegeDetailsBanner,
    collegeDetailsBannerRefetch,
    collegeDetailsBannerLoading,
  ]);
  useEffect(() => {
    if (!collegeLoading && !collegeData?.college?.data?.attributes?.PageData) {
      refetch();
    }
  }, [collegeData, refetch, collegeLoading]);
  useEffect(() => {
    if (!topCourseLoading && !topCourseData) {
      topCourseRefetch();
    }
  }, [topCourseData, topCourseRefetch, topCourseLoading]);
  // =========================================== //

  const asideSection = [
    {
      banner: {
        title: "Are You Interested in this College?",
        brochureUrl:
          collegeData?.college?.data?.attributes?.brochureFile?.data?.attributes
            ?.url,
      },
      videoGallery:
        collegeData?.college?.data?.attributes?.videoGallery?.flatMap(
          (gallery: any) =>
            gallery?.video?.data?.map(
              (video: any) => video?.attributes?.videoId,
            ),
        ),
      imageGallery:
        collegeData?.college?.data?.attributes?.imageGallery?.flatMap(
          (gallery: any) =>
            gallery?.images?.data?.map((image: any) => image?.attributes?.url),
        ),
      topCourses: topCourseData?.courses?.data?.map((item: any) => {
        return {
          id: item?.id,
          breadCrumb: item?.attributes?.courseName,
          duration: item?.attributes?.duration?.data?.attributes?.duration,
          fees:
            (item?.attributes?.avgFees?.from + item?.attributes?.avgFees?.to) /
            2,
        };
      }),
    },
  ];

  return (
    <>
      {!collegeDetailsBannerLoading ? (
        <CollegeDetailBanner
          collegeLogo={
            collegeDetailsBanner?.college?.data?.attributes?.collegeLogo?.data
              ?.attributes?.url
          }
          bgImage={
            collegeDetailsBanner?.college?.data?.attributes?.bgImage?.data
              ?.attributes?.url
          }
          city={
            collegeDetailsBanner?.college?.data?.attributes?.location?.city
              ?.data?.attributes?.city
          }
          state={
            collegeDetailsBanner?.college?.data?.attributes?.location?.state
              ?.data?.attributes?.state
          }
          overallRating={3.5}
          totalReviews={100}
          affiliation={collegeDetailsBanner?.college?.data?.attributes?.affiliation?.data?.map(
            (value: any) => value?.attributes?.organization,
          )}
          brochureUrl={
            collegeDetailsBanner?.college?.data?.attributes?.brochureFile?.data
              ?.attributes?.url
          }
          collegeName={
            collegeDetailsBanner?.college?.data?.attributes?.collegeName
          }
          estYear={collegeDetailsBanner?.college?.data?.attributes?.estYear}
          collegeCategory={
            collegeDetailsBanner?.college?.data?.attributes?.college_type?.data
              ?.attributes?.collegeType
          }
        />
      ) : (
        <PageDetailBannerSkeleton />
      )}
      {collegeLoading && !collegeData ? (
        <PageTabsWithDetailSkeleton />
      ) : (
        <PageTabsWithDetail
          data={tabSelectionArray}
          asideData={asideSection}
          slug={collegeId}
          author={
            collegeData?.college?.data?.attributes?.author?.data?.attributes
          }
          description={collegeData?.college?.data?.attributes?.description}
          updatedAt={collegeData?.college?.data?.attributes?.updatedAt}
          tabUrlValue="colleges"
          breadCrumb={collegeData?.college?.data?.attributes?.breadCrumb}
        />
      )}

      <Banner1 data={banner1} />
    </>
  );
}
