import Link from "next/link";
import React from "react";
import Wrapper from "../Wrappers";
import { useQuery } from "@apollo/client";
import { getAllNewsNotifications } from "@/graphql/newsQuery/news";
import { formatDate } from "@/utils/customText";

export default function Notification({ data }: any) {
  // query
  const {
    data: NotificationsData,
    loading: NotificationsDataLoading,
    error: NotificationsDataError,
  } = useQuery(getAllNewsNotifications);

  // console.log(NotificationsData, "NotificationsData");

  return (
    NotificationsData?.news?.data?.length > 0 && (
      <Wrapper
        as="section"
        bgColor="bg-transparent"
        containerClassName="px-10"
        className="redOrangeGradient max-w-screen-lg rounded-xl p-5 text-center leading-loose text-white"
      >
        <h2 className="text-lg font-semibold uppercase text-blue-900">
          Notification:
        </h2>
        <ul>
          {NotificationsData?.news?.data?.map((data: any) => (
            <li key={data?.id} className="flex w-full justify-center">
              <Link
                href={data?.id ? `/news/${data?.id}` : `#`}
                target="_blank"
                className="flex w-max justify-center gap-1 capitalize underline"
              >
                <span className="font-semibold text-blue-900 underline">
                  {formatDate(data?.attributes?.updatedAt)}:
                </span>
                <span className="underline hover:text-blue-500">
                  {data?.attributes?.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Wrapper>
    )
  );
}
