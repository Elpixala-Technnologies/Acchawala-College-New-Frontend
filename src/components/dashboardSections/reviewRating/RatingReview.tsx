"use client";

import { StarRating } from "@/components/StarRating";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaRegEdit } from "react-icons/fa";

interface ReviewData {
  id: number;
  heading: string;
  details: string;
  rating: number;
}

interface Review {
  id: number;
  title: string;
  quote: string;
  date: string;
  reviewdata: ReviewData[];
}

export function RatingReview({ tab }: any) {
  const reviews: Review[] = [
    {
      id: 1,
      title: "When will JEE Main B.Planning 2024 be conducted?",
      quote: "Asked by Akshat",
      date: "Mar 25, 2024 11:52:05",
      reviewdata: [
        {
          id: 1,
          heading: "Overall",
          details:
            "It is one of the top IT colleges in India. It is a place where you can compete with a lot of competitors like you. It provides a great academic environment.",
          rating: 5,
        },
        {
          id: 2,
          heading: "Placement",
          details:
            "It is one of the top IT colleges in India. It is a place where you can compete with a lot of competitors like you. It provides a great academic environment.",
          rating: 4,
        },
      ],
    },
    {
      id: 2,
      title: "When will JEE Main B.Planning 2024 be conducted?",
      quote: "Asked by Akshat",
      date: "Mar 25, 2024 11:52:05",
      reviewdata: [
        {
          id: 1,
          heading: "Overall",
          details:
            "It is one of the top IT colleges in India. It is a place where you can compete with a lot of competitors like you. It provides a great academic environment.",
          rating: 5,
        },
        {
          id: 2,
          heading: "Placement",
          details:
            "It is one of the top IT colleges in India. It is a place where you can compete with a lot of competitors like you. It provides a great academic environment.",
          rating: 4,
        },
      ],
    },
  ];

  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});

  const toggleReview = (id: number) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="w-full">
      <h2 className="mb-3 text-xl font-bold">
        Your Reviews{" "}
        <span className="float-right text-2xl text-zinc-600">
          <FaRegEdit />
        </span>
      </h2>
      <div className="grid grid-cols-1 gap-5">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="space-y-2 rounded-xl border-2 p-7 max-sm:p-6"
          >
            <div
              className="flex cursor-pointer flex-nowrap items-start justify-between"
              onClick={() => toggleReview(review.id)}
            >
              <h3 className="mr-4 text-4xl font-extrabold text-orange-300 sm:text-5xl">
                {index + 1}
              </h3>
              <div className="w-full">
                <div className="flex w-full flex-nowrap justify-between">
                  <div>
                    <h4 className="text-2xl font-medium sm:text-3xl">
                      {review.title}

                      {/* {expandedReviews[review.id] ? <FaChevronUp className="text-xl ml-4" /> : <FaChevronDown className="text-xl ml-4" />} */}
                    </h4>
                    <p className="text-sm">
                      {review.quote} | {review.date}
                    </p>
                  </div>{" "}
                  <FaRegEdit className="min-w-[20px] !text-[20px]" />
                </div>
                {expandedReviews[review.id] && (
                  <div className="mt-5 w-full">
                    {review.reviewdata.map((data) => (
                      <div key={data.id} className="mb-4">
                        <div className="w-full lg:flex lg:flex-nowrap lg:items-center lg:justify-between">
                          <p className="my-5 font-bold text-black">
                            {" "}
                            {data.heading}:
                            <span className="ml-2 text-lg font-normal text-zinc-800">
                              {data.details}
                              <StarRating
                                rating={data.rating}
                                totalStars={5}
                                className="float-right mb-2 ml-4 max-w-min text-lg text-orange-500 lg:hidden"
                              />
                            </span>
                          </p>
                          <StarRating
                            rating={data.rating}
                            totalStars={5}
                            className="ml-4 text-lg text-orange-500 max-lg:hidden"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
