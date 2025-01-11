import React from "react";
import { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { useLazyQuery, gql } from "@apollo/client";
import { homePageSearch } from "@/graphql/homePage/homePage";
import styles from "./TypeHeadSearchBar.module.css";
import Image from "next/image";
import Link from "next/link";

export default function TypeHeadSearchBar() {
  const [query, setQuery] = useState("");
  const [getSuggestions, { loading, data }] = useLazyQuery(homePageSearch);
  const handleSearch = (query: any) => {
    setQuery(query);
    getSuggestions({ variables: { globalSearch: query } });
  };

  const options: any = [];

  if (data) {
    // Extracting results from the response
    const { colleges, courses, exams, news } = data;

    if (colleges) {
      colleges.data.forEach((college: any) => {
        options.push({
          id: college?.id,
          name: college?.attributes?.collegeName,
          logo: college?.attributes?.collegeLogo?.data?.attributes?.url,
          type: "colleges",
        });
      });
    }

    if (courses) {
      courses.data.forEach((course: any) => {
        options.push({
          id: course.id,
          name: course?.attributes?.courseName,
          logo: course?.attributes?.bgImage?.data?.attributes?.url,
          type: "courses",
        });
      });
    }

    if (exams) {
      exams.data.forEach((exam: any) => {
        options.push({
          id: exam.id,
          name: exam?.attributes?.examName,
          logo: exam?.attributes?.logo?.data?.attributes?.url,
          type: "exams",
        });
      });
    }

    if (news) {
      news.data.forEach((item: any) => {
        options.push({
          id: item.id,
          name: item?.attributes?.title,
          logo: item?.attributes?.icon?.data?.attributes?.url,
          type: "news",
        });
      });
    }
  }

  return (
    <AsyncTypeahead
      id="autosuggest"
      //   onInputChange={handleSearch}
      onSearch={handleSearch}
      options={options}
      labelKey="name"
      minLength={3}
      isLoading={loading}
      placeholder="Search for colleges, courses, exams, news etc."
      inputProps={{ className: styles.customInput }}
      renderMenuItemChildren={(option: any, props: any) => (
        <Link href={option?.id ? `/${option?.type}/${option?.id}` : `#`}>
          <div className={styles.customMenuItem}>
            <div className="h-16 w-16 rounded-lg bg-white">
              <Image
                src={option?.logo}
                alt="icon"
                width={20}
                height={20}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <p className="cursor-pointer">{option?.name}</p>
              <small className={styles.customTypeLabel}>{option?.type}</small>
            </div>
          </div>
        </Link>
      )}
    />
  );
}
