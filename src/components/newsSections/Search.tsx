"use client";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import { getAllNews } from "@/graphql/newsQuery/news";
import { useQuery } from "@apollo/client";
import { SearchResult } from "./SearchResult";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [runQuery, setRunQuery] = useState(false);

  // Query
  const {
    data: newsSearchData,
    loading: newsSearchDataLoading,
    error: newsSearchDataError,
  } = useQuery(getAllNews, {
    skip: !runQuery,
    variables: {
      searchNewsByTitle: searchTerm,
      page: pageNo,
      pageSize: 10,
    },
  });

  const newsSearch = newsSearchData?.news?.data?.map((item: any) => {
    return {
      id: item?.id,
      slug: item?.attributes?.slug,
      title: item?.attributes?.title,
      text: item?.attributes?.excerpt,
      timeStamp: item?.attributes?.updatedAt,
      icon: item?.attributes?.icon?.data?.attributes?.url,
      category: item?.attributes?.category?.data?.attributes?.category,
    };
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value || "");
  }

  function handleSubmit() {
    if (searchTerm.trim() !== "") {
      setRunQuery(true);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <>
      <Wrapper
        as="div"
        bgColor="bg-transparent"
        containerClassName="px-10 py-10"
        className="!md:pr-2 text-primary-text focus-within:border-secondary-text flex h-12 items-center gap-4 rounded-xl bg-white py-2 !pr-2 shadow-md max-md:mt-5"
      >
        <input
          className="w-full pl-5 focus:outline-none max-md:p-3"
          type="text"
          placeholder="Search for colleges, courses news etc."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          min={3}
        />
        <Button variant="black" className="text-sm" onClick={handleSubmit}>
          Search
        </Button>
      </Wrapper>
      {searchTerm && newsSearch?.length > 0 && (
        <SearchResult searchTerm={searchTerm} data={newsSearch} />
      )}
    </>
  );
}
