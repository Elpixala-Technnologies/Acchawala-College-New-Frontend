"use client";
import Wrapper from "@/components/Wrappers";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Content from "./Content";
import DetailPageAsideSection from "../DetailPageAsideSection";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { formatDate } from "@/utils/customText";

export function PageTabsWithDetailWrapperContent({
  data,
  asideData,
  slug,
  tabUrlValue,
  breadCrumb,
  author,
  description,
  updatedAt,
  // examNews,
}: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (typeof tab === "string") {
      // Check if tab is a string
      const index = data?.findIndex(
        (item: any) => item.navItem.toLowerCase() === tab.toLowerCase(),
      );
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [tab, data]);

  const handleSelect = (index: any) => {
    setSelectedIndex(index);
    // Update the URL with the selected tab
    const selectedTab = data[index].navItem.toLowerCase();
    router.push(
      `/${tabUrlValue}/${slug}?tab=${encodeURIComponent(selectedTab)}`,
    ); // Adjust the URL as necessary
  };

  return (
    <Wrapper containerClassName="my-5" className="flex w-full flex-col pt-0" padding="px-0 sm:px-1 md:px-10">
      <Navbar
        navItems={data}
        onSelect={handleSelect}
        selectedIndex={selectedIndex}
      />
      <AboutAuthor
        author={author}
        description={description}
        updatedAt={updatedAt}
      />
      <main className="flex gap-5 md:flex-row">
        <Content
          selectedContent={data?.[selectedIndex]}
          slug={slug}
          breadCrumb={breadCrumb}
        // examNews={examNews}
        />
        <DetailPageAsideSection data={asideData} />
      </main>
    </Wrapper>
  );
}

function AboutAuthor({ author, description, updatedAt }: any) {
  return (
    <Wrapper
      as="section"
      containerClassName="mt-5 !px-0"
      className="w-full rounded-lg bg-white p-5"
    >
      {/* Author */}
      {author && author?.name && (
        <div className="sm:mb-8 mb-4 flex items-center gap-x-2">
          {author?.avatar?.data?.attributes?.url && (
            <Image
              src={author?.avatar?.data?.attributes?.url}
              alt="avatar"
              className="h-16 w-16 rounded-full"
              width={48}
              height={48}
            />
          )}
          <div className="flex flex-col gap-2">
            {author?.name && (
              <p className="md:text-3xl sm:text-xl xs:text-lg font-bold text-orange-500">
                {author?.name}
              </p>
            )}
            <div className="flex items-center md:text-lg sm:text-sm xs:text-[14px] text-[12px] sm:gap-2 gap-1 text-zinc-500">
              {author?.designation && (
                <p className="font-bold">{author?.designation} |</p>
              )}
              {updatedAt && (
                <p className="font-medium">
                  Last Updated: {formatDate(updatedAt)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* description  */}
      {description && (
        <p
          className={`my-2 mb-5 text-wrap sm:text-lg text-sm border-l-4 border-orange-500 sm:pl-5 pl-3 text-justify font-medium italic text-black`}
        >
          {description}
        </p>
      )}
    </Wrapper>
  );
}

export default function PageTabsWithDetail({
  data,
  asideData,
  slug,
  tabUrlValue,
  breadCrumb,
  author,
  description,
  updatedAt,
  // examNews,
}: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageTabsWithDetailWrapperContent
        data={data}
        asideData={asideData}
        author={author}
        description={description}
        updatedAt={updatedAt}
        slug={slug}
        tabUrlValue={tabUrlValue}
        breadCrumb={breadCrumb}
      // examNews={examNews}
      />
    </Suspense>
  );
}
