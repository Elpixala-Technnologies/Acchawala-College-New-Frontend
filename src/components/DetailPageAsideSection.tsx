import React from "react";
import YoutubeVideo from "./youtubeVideo";
import Image from "next/image";
import { Button } from "./Button";
import { HiOutlineDownload } from "react-icons/hi";
import Link from "next/link";
import { formatDate, formatRupee } from "@/utils/customText";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsClipboardCheck } from "react-icons/bs";

export default function DetailPageAsideSection({ data }: any) {
  return (
    <aside className="mt-5 h-max min-w-[300px] space-y-5 pb-10 [flex:2] hover:h-[85vh] hover:overflow-y-auto max-md:hidden max-md:bg-opacity-80 md:sticky md:top-28">
      {data?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {/* Banner  */}
          {item?.banner && <Banner data={item?.banner} />}
          {/* Video Gallery  */}
          {item?.videoGallery && item?.videoGallery?.length > 0 && (
            <VideoGallery data={item?.videoGallery} />
          )}
          {/* Top Courses  */}
          {item?.topCourses && <TopCourses data={item?.topCourses} />}
          {/* Photo Gallery */}
          {item?.imageGallery && item?.imageGallery?.length > 0 && (
            <PhotoGallery data={item?.imageGallery} />
          )}
          {/* Recent News  */}
          {item?.latestNews && item?.latestNews?.length > 0 && (
            <RecentNews data={item?.latestNews} />
          )}
        </React.Fragment>
      ))}
    </aside>
  );
}

function VideoGallery({ data }: any) {
  return (
    <div className="h-max w-full rounded-2xl bg-white p-5 pb-0">
      <h2 className="mb-5 text-xl">Videos</h2>
      <div className="flex flex-col gap-4">
        {data
          ?.slice(0, 3)
          ?.map((item: any, index: number) =>
            item ? (
              <YoutubeVideo
                key={index}
                videoId={item || ""}
                width={"100%"}
                height={"200px"}
                className="rounded-xl"
              />
            ) : null,
          )}
      </div>
    </div>
  );
}

function PhotoGallery({ data }: any) {
  return (
    <div className="w-full rounded-2xl bg-white p-5 pb-0">
      <h2 className="mb-5 text-xl">Images</h2>
      <div className="flex flex-wrap gap-2">
        {data
          ?.slice(0, 3)
          ?.map((image: any, index: number) => (
            <Image
              key={index}
              src={image}
              width={800}
              height={800}
              alt={`image`}
              className="mb-5 h-full min-h-48 w-[48%] flex-[1] rounded-lg object-cover"
            />
          ))}
      </div>
    </div>
  );
}

function Banner({ data }: any) {
  return (
    <div className="flex-center w-full flex-col rounded-2xl bg-white p-5 text-center">
      <h2 className="mb-3 text-xl">{data?.title}</h2>
      <Button variant="white" className="mb-3 !w-full text-nowrap shadow-lg">
        Apply Now
      </Button>
      <Link href={data?.brochureUrl || "#"} target="_blank" className="!w-full">
        <Button variant="black" className="!w-full text-nowrap shadow-lg">
          <span>Download Brochure</span>
          <HiOutlineDownload />
        </Button>
      </Link>
    </div>
  );
}

function TopCourses({ data }: any) {
  return (
    <div className="w-full rounded-2xl bg-white p-5">
      <h2 className="border-b-2 border-orange-500 pb-5 text-xl font-bold">
        Top Courses
      </h2>
      <ul className="mb-5 flex flex-col">
        {data?.map((item: any, index: number) => (
          <li key={index} className="border-b-2 border-orange-500 py-5">
            <Link href={item?.id ? `/courses/${item?.id}` : `#`}>
              <h6 className="text-xl font-medium">{item?.breadCrumb}</h6>
            </Link>
            <p className="flex gap-2">
              <span>Course Duration :</span>
              <span className="text-orange-500">{item?.duration} months</span>
            </p>
            <p className="flex gap-2">
              <span className="text-orange-500">
                INR {formatRupee(item?.fees)}
              </span>
              <span>avg. yearly fees</span>
            </p>
          </li>
        ))}
      </ul>
      <Link href="/courses" className="!w-full">
        <Button variant="white" className="!w-full text-nowrap shadow-lg">
          View More
        </Button>
      </Link>
    </div>
  );
}

function RecentNews({ data }: any) {
  return (
    <div className="rounded-lg bg-white px-5 py-5">
      <h2 className="mb-4 border-b-2 border-orange-500 pb-3 text-xl font-bold capitalize">
        Recent News
      </h2>
      {data?.slice(0, 3)?.map((item: any) => (
        <React.Fragment key={item?.id}>
          <Card2 item={item} />
        </React.Fragment>
      ))}
      <Link href="/news" className="!w-full">
        <Button variant="white" className="!w-full text-nowrap shadow-lg">
          View More
        </Button>
      </Link>
    </div>
  );
}

function Card2({ item }: any) {
  return (
    <div className="mb-4 flex items-center gap-5 border-b-2 border-orange-500 pb-3">
      <div className="flex flex-col gap-1">
        <Link
          href={`news/${item?.id}|| #`}
          className="cursor-pointer font-bold"
        >
          <h6 className="cursor-pointer hover:text-orange-500">
            {item?.title}
          </h6>
        </Link>
        <div className="flex gap-5 text-xs capitalize text-orange-500">
          <p className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-black" />
            {formatDate(item?.timeStamp)}
          </p>
          <p className="flex items-center gap-2">
            <BsClipboardCheck className="text-black" />
            {item?.category}
          </p>
        </div>
        <p className="line-clamp-2 text-sm">{item?.text}</p>
      </div>
      <Image src={item?.icon?.url} alt="CD" width={100} height={100} />
    </div>
  );
}
