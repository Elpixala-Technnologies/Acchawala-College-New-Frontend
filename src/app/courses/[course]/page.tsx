"use client";
import React, { useEffect, useState } from "react";
import Banner1 from "@/components/bannerSections/Banner1";
import CourseDetailBanner from "@/components/bannerSections/CourseDetailBanner";
import PageTabsWithDetail from "@/components/pageTabsWithDetail/PageTabsWithDetail";
import { courses } from "@/data/courseData";
import { banner1, tabsSections } from "@/data/globalData";

import { useQuery } from "@apollo/client";
import {
  getCourseDetails,
  getCourseDetailsBanner,
} from "@/graphql/courseQuery/courseDetails";
import { convertQueryDataToTabSections } from "@/utils/customText";
import { getAllTopCourses } from "@/graphql/courseQuery/topCourses";
import { getAllNews } from "@/graphql/newsQuery/news";
import PageDetailBannerSkeleton from "@/components/bannerSections/PageDetailBannerSkeleton";
import PageTabsWithDetailSkeleton from "@/components/pageTabsWithDetail/PageTabsWithDetailSkeleton";

type Props = {
  params: {
    course: String;
  };
};

export default function CourseDetailPage({ params }: Props) {
  const [tabSelectionArray, setTabSelectionArray] = React.useState<any>([]);
  const courseId = params?.course;
  // Query
  const {
    loading: CourseDetailsBannerLoading,
    error: CourseDetailsBannerError,
    data: CourseDetailsBanner,
    refetch: CourseDetailsBannerRefetch,
  } = useQuery(getCourseDetailsBanner, {
    variables: { ID: courseId },
  });

  const {
    loading: courseDataLoading,
    error: courseDataError,
    data: courseData,
    refetch,
  } = useQuery(getCourseDetails, {
    variables: { ID: courseId },
  });

  const {
    loading: topCourseLoading,
    error: topCourseError,
    data: topCourseData,
    refetch: topCourseRefetch,
  } = useQuery(getAllTopCourses, {
    variables: {
      page: 1,
      pageSize: 3,
    },
  });

  const {
    data: latestNewsData,
    loading: latestNewsDataLoading,
    error: latestNewsDataError,
    refetch: latestNewsDataRefetch,
  } = useQuery(getAllNews, {
    variables: {
      page: 1,
      pageSize: 3,
    },
  });
  // ========================================================= //
  useEffect(() => {
    // console.log(
    //   "Course Details: ",
    //   courseData?.course?.data?.attributes?.updatedAt,
    // );
    if (courseData?.course?.data?.attributes?.PageData) {
      const convertedData: any = convertQueryDataToTabSections(
        courseData?.course?.data?.attributes?.PageData,
      );
      setTabSelectionArray(convertedData);
    }
  }, [courseData]);
  // ==================================================== //
  useEffect(() => {
    if (!CourseDetailsBannerLoading && !CourseDetailsBanner) {
      CourseDetailsBannerRefetch();
    }
  }, [
    CourseDetailsBanner,
    CourseDetailsBannerRefetch,
    CourseDetailsBannerLoading,
  ]);
  useEffect(() => {
    if (!topCourseLoading && !topCourseData) {
      topCourseRefetch();
    }
  }, [topCourseData, topCourseRefetch, topCourseLoading]);
  useEffect(() => {
    if (!courseDataLoading && !courseData?.course?.data?.attributes?.PageData) {
      refetch();
    }
  }, [courseData, refetch, courseDataLoading]);
  useEffect(() => {
    if (!latestNewsDataLoading && !latestNewsData) {
      latestNewsDataRefetch();
    }
  }, [latestNewsData, latestNewsDataRefetch, latestNewsDataLoading]);
  // =========================================================== //
  const asideSection = [
    {
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
      latestNews: latestNewsData?.news?.data?.map((item: any) => {
        return {
          id: item?.id,
          slug: item?.attributes?.slug,
          title: item?.attributes?.title,
          text: item?.attributes?.excerpt,
          timeStamp: item?.attributes?.updatedAt,
          icon: item?.attributes?.icon?.data?.attributes?.url,
          category: item?.attributes?.category?.data?.attributes?.category,
        };
      }),
    },
  ];
  // =========================================================== //
  return (
    <>
      {!CourseDetailsBannerLoading ? (
        <CourseDetailBanner
          breadCrumb={CourseDetailsBanner?.course?.data?.attributes?.breadCrumb}
          courseName={CourseDetailsBanner?.course?.data?.attributes?.courseName}
          titleAddition={
            CourseDetailsBanner?.course?.data?.attributes?.titleAddition
          }
          duration={
            CourseDetailsBanner?.course?.data?.attributes?.duration?.data
              ?.attributes?.duration
          }
          avgFeesFrom={
            CourseDetailsBanner?.course?.data?.attributes?.avgFees?.from
          }
          avgFeesTo={CourseDetailsBanner?.course?.data?.attributes?.avgFees?.to}
        />
      ) : (
        <PageDetailBannerSkeleton />
      )}

      {!courseDataLoading && courseData ? (
        <PageTabsWithDetail
          data={tabSelectionArray}
          asideData={asideSection}
          author={
            courseData?.course?.data?.attributes?.author?.data?.attributes
          }
          description={courseData?.course?.data?.attributes?.description}
          updatedAt={courseData?.course?.data?.attributes?.updatedAt}
          slug={courseId}
          tabUrlValue={"courses"}
        />
      ) : (
        <PageTabsWithDetailSkeleton />
      )}
      <Banner1 data={banner1} />
    </>
  );
}
