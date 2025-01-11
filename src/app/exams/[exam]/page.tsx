"use client";
import Banner1 from "@/components/bannerSections/Banner1";
import ExamDetailBanner from "@/components/bannerSections/ExamDetailBanner";
import PageDetailBannerSkeleton from "@/components/bannerSections/PageDetailBannerSkeleton";
import PageTabsWithDetail from "@/components/pageTabsWithDetail/PageTabsWithDetail";
import PageTabsWithDetailSkeleton from "@/components/pageTabsWithDetail/PageTabsWithDetailSkeleton";
import { exams } from "@/data/examData";
import { asideSection, banner1, tabsSections } from "@/data/globalData";
import { getAllTopCourses } from "@/graphql/courseQuery/topCourses";
import {
  getExamDetails,
  getExamDetailsBanner,
} from "@/graphql/examQuery/examDetails";
import { getAllNews } from "@/graphql/newsQuery/news";
import { convertQueryDataToTabSections } from "@/utils/customText";
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";

type Props = {
  params: {
    exam: String;
  };
};

export default function ExamDetailsPage({ params }: Props) {
  const [tabSelectionArray, setTabSelectionArray] = React.useState<any>([]);
  const examId = params?.exam;
  // Query
  const {
    loading: examDetailsBannerLoading,
    error: examDetailsBannerError,
    data: examDetailsBanner,
    refetch: examDetailsBannerRefetch,
  } = useQuery(getExamDetailsBanner, {
    variables: { ID: examId },
  });
  const {
    loading,
    error,
    data: examData,
    refetch,
  } = useQuery(getExamDetails, {
    variables: { ID: examId },
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
  // ================================================================================== //
  useEffect(() => {
    // console.log(
    //   "Exam Details: ",
    //   examData?.exam?.data?.attributes?.brochureFile?.data,
    // );

    if (examData?.exam?.data?.attributes?.PageData) {
      const convertedData: any = convertQueryDataToTabSections(
        examData?.exam?.data?.attributes?.PageData,
      );
      setTabSelectionArray(convertedData);
    }
  }, [examData]);

  // ======================================================================= //
  useEffect(() => {
    if (!examDetailsBannerLoading && !examDetailsBanner) {
      examDetailsBannerRefetch();
    }
  }, [examDetailsBanner, examDetailsBannerRefetch, examDetailsBannerLoading]);
  useEffect(() => {
    if (!topCourseLoading && !topCourseData) {
      topCourseRefetch();
    }
  }, [topCourseData, topCourseRefetch, topCourseLoading]);
  useEffect(() => {
    if (!loading && !examData?.exam?.data?.attributes?.PageData) {
      refetch();
    }
  }, [examData, refetch, loading]);
  useEffect(() => {
    if (!latestNewsDataLoading && !latestNewsData) {
      latestNewsDataRefetch();
    }
  }, [latestNewsData, latestNewsDataRefetch, latestNewsDataLoading]);

  // ====================================================================== //

  const asideSection = [
    {
      banner: {
        title: "Are You Interested in this Exam?",
        brochureUrl:
          examData?.exam?.data?.attributes?.brochureFile?.data?.attributes?.url,
      },
      // videoGallery: [],
      // imageGallery: [],
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

  return (
    <>
      {!examDetailsBannerLoading ? (
        <ExamDetailBanner
          breadCrumb={examDetailsBanner?.exam?.data?.attributes?.breadCrumb}
          examName={examDetailsBanner?.exam?.data?.attributes?.examName}
          titleAddition={
            examDetailsBanner?.exam?.data?.attributes?.titleAddition
          }
          examLogo={
            examDetailsBanner?.exam?.data?.attributes?.logo?.data?.attributes
              ?.url
          }
          brochureUrl={
            examDetailsBanner?.exam?.data?.attributes?.brochureFile?.data
              ?.attributes?.url
          }
          lastUpdate={examDetailsBanner?.exam?.data?.attributes?.updatedAt}
        />
      ) : (
        <PageDetailBannerSkeleton />
      )}
      {!loading && examData ? (
        <PageTabsWithDetail
          data={tabSelectionArray}
          asideData={asideSection}
          slug={examId}
          author={examData?.exam?.data?.attributes?.author?.data?.attributes}
          description={examData?.exam?.data?.attributes?.description}
          updatedAt={examData?.exam?.data?.attributes?.updatedAt}
          tabUrlValue={"exams"}
        />
      ) : (
        <PageTabsWithDetailSkeleton />
      )}
      <Banner1 data={banner1} />
    </>
  );
}
