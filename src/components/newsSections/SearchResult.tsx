"use client";
import { useState } from "react";
import Wrapper from "../Wrappers";
import { Card1 } from "./Card1";

export function SearchResult({ data, searchTerm }: any) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", "exam", "college", "course"];

  const filteredData =
    selectedCategory === "all"
      ? data
      : data?.filter((item: any) => item?.category === selectedCategory);

  return (
    <Wrapper as="div" className="mb-16">
      <h2 className="my-5 text-2xl font-bold">
        Search Results for{" "}
        <span className="text-orange-500">&quot;{searchTerm}&quot;</span>
      </h2>
      <div className="mb-5 flex gap-6">
        {categories.map((category) => (
          <button
            key={category}
            className={`rounded-full px-5 py-2 capitalize ${
              selectedCategory === category ? "bg-orange-500" : "bg-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {filteredData?.map((item: any) => (
          <li key={item?.id}>
            <Card1 item={item} />
          </li>
        ))}
      </ul>
    </Wrapper>
  );
}
