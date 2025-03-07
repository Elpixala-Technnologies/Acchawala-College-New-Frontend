"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCaretUp, FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import TextWithLineBreak from "@/utils/TextWithLineBreak";
import Wrapper from "../Wrappers";
import { Button } from "../Button";
import useIsMobile from "../customHooks/useIsMobile";
import { useQuery } from "@apollo/client";
import { getAllNews } from "@/graphql/newsQuery/news";
import { getAllExams } from "@/graphql/examQuery/exams";
import { getAllTopCourses } from "@/graphql/courseQuery/topCourses";
import { getAllTopColleges } from "@/graphql/collegeQuery/topColleges";
import { FooterExamNews, FooterExploreColleges, FooterExploreCourses, FooterExploreExams, FooterLatestNews } from "./footerListElements";


export default function Footer({ footer }: any) {
  // const { isMobile } = useIsMobile()
  const {
    data: news,
    loading: newsLoading,
    error: newsLoadingError,
    refetch,
  } = useQuery(getAllNews, {
    variables: {
      page: 1,
      pageSize: 5,
    },
  });
  const {
    data: exams,
    loading: examsLoading,
    error: examsLoadingError,
    // refetch,
  } = useQuery(getAllExams, {
    variables: {
      page: 1,
      pageSize: 6,
    },
  });
  const {
    data: courses,
    loading: coursesLoading,
    error: coursesLoadingError,
    // refetch,
  } = useQuery(getAllTopCourses, {
    variables: {
      page: 1,
      pageSize: 10,
    },
  });
  const {
    data: colleges,
    loading: collegesLoading,
    error: collegesLoadingError,
    // refetch,
  } = useQuery(getAllTopColleges, {
    variables: {
      page: 1,
      pageSize: 10,
    },
  });
  console.log(colleges)
  // const {
  //   data: examsNews,
  //   loading: examsNewsLoading,
  //   error: examsNewsLoadingError,
  //   // refetch,
  // } = useQuery(getAllNews, {
  //   variables: {
  //     page: 1,
  //     pageSize: 5,
  //     category: "Latest"
  //   },
  // });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="bg-black md:px-16 xs:px-8 px-3">

      <div className="w-full px-auto border-t border-black/40 items-center flex  flex-col">
        <button onClick={scrollToTop} className="mx-auto px-4 mb-1 gap-[-10px] text-white font-bold flex flex-col items-center text-center justify-center hover:text-white ">
          <FaCaretUp className="relative top-[5px]" />  TOP OF PAGE
        </button>

      </div>

      {/* footer top section  */}
      <div className="flex md:flex-row flex-col justify-between items-center w-full px-5 gap-4 mt-2">
        {/* footer logo */}
        <div className="w-[400px] max-sm:flex-wrap max-w-fit">
          <Image
            src={footer?.logo}
            alt="logo"
            className="h-full w-full object-contain"
            width={600}
            height={700}
          />
        </div>

        <div className="flex items-center md:gap-5 xs:gap-3 gap-2 font-[500] md:text-lg xs:text-[16px] text-sm text-white">
          <Link href={"/courses"}>Explore Programs</Link>
          <Link href={"/featured"}>Featured News</Link>
          <Link href={"/exams"}>Latest Exams</Link>
        </div>

        {/* Socials  */}
        <div className="w-fit">
          {footer?.socials && (
            <div className="items-center text-2xl justify-center gap-10 text-white flex w-full md:mt-0 mt-4">
              {footer?.socials?.facebook && (
                <FaFacebook
                  className="social-icon cursor-pointer"
                  onClick={() => window.open(footer?.socials?.facebook, "_blank")}
                />
              )}
              {footer?.socials?.instagram && (
                <AiFillInstagram
                  className="social-icon cursor-pointer"
                  onClick={() =>
                    window.open(footer?.socials?.instagram, "_blank")
                  }
                />
              )}
              {footer?.socials?.linkedin && (
                <FaLinkedinIn
                  className="social-icon cursor-pointer"
                  onClick={() => window.open(footer?.socials?.linkedin, "_blank")}
                />
              )}
              {footer?.socials?.youtube && (
                <TbBrandYoutubeFilled
                  className="social-icon cursor-pointer"
                  onClick={() => window.open(footer?.socials?.youtube, "_blank")}
                />
              )}
              {footer?.socials?.twitter && (
                <FaXTwitter
                  className="social-icon cursor-pointer"
                  onClick={() => window.open(footer?.socials?.twitter, "_blank")}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* footer links secion  */}
      <div
        className=" md:pt-12 px-0 "
      >

        <div className="grid grid-cols-1 md:gap-x-20 gap-0 lg:grid-cols-3 px-5 border-b-[0.1px] border-gray-600">
          <FooterLatestNews title="Latest News" data={news?.news} />
          <FooterExploreColleges title="Explore Colleges" data={colleges?.colleges} />
          <FooterExploreCourses title="Explore Courses" data={courses?.courses} />
          <FooterExploreExams title="Explore Exams" data={exams?.exams} />
          <FooterExamNews title="Exams News" data={news?.news} />

          <div className="col-span-2 flex flex-col w-full max-lg:hidden lg:col-span-1 md:py-4 text-white">

            <h4 className="my-2 mb-3 text-2xl font-semibold">{footer?.newLetter?.title}</h4>
            <p>{footer?.newLetter?.description}</p>
            <form action="" className="flex flex-col w-full gap-y-4 my-5">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="w-full rounded-full border-none py-4 pl-5 text-sm outline-none text-black"
              />
              <Button variant="white" className="!rounded-full !px-8" type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        {/* Footer links section  */}


        {/* copyright  */}
        <div className="w-full overflow-hidden">

          <div className="w-full overflow-x-scroll no-scrollbar mx-3 bg-black flex md:flex-row flex-col items-center justify-between md:gap-4 py-2">

            <div className="md:w-fit w-full inline-flex items-center justify-center gap-5 py-3 text-white" >
              <p className="min-w-fit text-white">Disclaimer</p>
              <p className="min-w-fit text-white">Comment Policy</p>
              <p className="min-w-fit text-white">Privacy Policy</p>
            </div>
            <div className="flex items-center justify-center bg-black text-white ">
              <p className="text-center text-sm whitespace-nowrap">{footer?.copyrightText}</p>
            </div>

          </div>
        </div>

      </div>


    </div>

  );
}

export function OldFooter({ footer }: any) {
  return (
    <Wrapper
      as="footer"
      containerClassName="w-full  text-white"
      className="pt-5 md:px-16 md:pt-12"
      bgColor="bg-orange-500"
    >
      {/* NewsLetter Section  */}
      <div className="mb-5 flex w-full gap-3 max-sm:flex-wrap justify-between border-b border-white md:pb-8">
        <Image
          src={footer?.logo}
          alt="logo"
          className="h-[12vw] max-h-9 w-min object-contain"
        />
        <p className="text-wrap mb-4 max-sm:!w-[80vw] max-w-[400px] max-sm:mt-3">
          <TextWithLineBreak text={footer?.text} />
        </p>
      </div>
      {/* Footer links section  */}
      <div className="grid grid-cols-1 pb-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        <div className="col-span-1 flex flex-col gap-y-2">
          <h4 className="my-2 text-xl font-semibold">{footer?.list1?.title}</h4>
          <ul>
            {footer?.list1?.links?.map((d: any, i: number) => (
              <li key={i}>
                <Link
                  href={d?.href}
                  className="hover:pl-2 hover:text-zinc-900 hover:font-medium"
                >
                  {d?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 flex flex-col gap-y-2">
          <h4 className="my-2 text-xl font-semibold">{footer?.list2?.title}</h4>
          <ul>
            {footer?.list2?.links?.map((d: any, i: number) => (
              <li key={i}>
                <Link
                  href={d?.href}
                  className="hover:pl-2 hover:text-zinc-900 hover:font-medium"
                >
                  {d?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 flex flex-col gap-y-2">
          <h4 className="my-2 text-xl font-semibold">{footer?.list3?.title}</h4>
          <ul>
            {footer?.list3?.links?.map((d: any, i: number) => (
              <li key={i}>
                <Link
                  href={d?.href}
                  className="hover:pl-2 hover:text-zinc-900 hover:font-medium"
                >
                  {d?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-1 flex flex-col gap-y-2">
          <h4 className="my-2 text-xl font-semibold">{footer?.list4?.title}</h4>
          <ul>
            {footer?.list4?.links?.map((d: any, i: number) => (
              <li key={i}>
                <Link
                  href={d?.href}
                  className="hover:pl-2 hover:text-zinc-900 hover:font-medium"
                >
                  {d?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="col-span-1 flex flex-col">
          <h4 className="my-2 mb-3 text-xl font-semibold">Contact Us</h4>
          <p>
            <Link href={`tel:${footer?.contactDetails?.contactNo}`}>
              {footer?.contactDetails?.contactNo}
            </Link>
          </p>
          <p>
            <Link href={`mailto:${footer?.contactDetails?.email}`}>
              {footer?.contactDetails.email}
            </Link>
          </p>
          <h4 className="my-2 text-xl font-semibold">Location</h4>
          <p>
            <TextWithLineBreak text={footer?.contactDetails?.location} />
          </p>
        </div> */}
        <div className="col-span-2 flex flex-col max-lg:hidden lg:col-span-1">
          <h4 className="my-2 mb-3 text-xl font-semibold">{footer?.newLetter?.title}</h4>
          <p>{footer?.newLetter?.description}</p>
          <form action="" className="flex flex-col w-full gap-y-4 my-5">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full rounded-full border-none py-4 pl-5 text-sm outline-none"
            />
            <Button variant="black" className="!rounded-full !px-8" type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      {/* copyright  */}
      <div className="flex items-center justify-between border-t border-white py-5 max-md:flex-col">
        <p className="text-center text-sm">{footer?.copyrightText}</p>
        {/* Socials  */}
        {footer?.socials && (
          <div className="flex-center gap-x-2 text-3xl text-white">
            {footer?.socials?.facebook && (
              <FaFacebook
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.facebook, "_blank")}
              />
            )}
            {footer?.socials?.instagram && (
              <AiFillInstagram
                className="social-icon text-xl"
                onClick={() =>
                  window.open(footer?.socials?.instagram, "_blank")
                }
              />
            )}
            {footer?.socials?.linkedin && (
              <FaLinkedinIn
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.linkedin, "_blank")}
              />
            )}
            {footer?.socials?.youtube && (
              <TbBrandYoutubeFilled
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.youtube, "_blank")}
              />
            )}
            {footer?.socials?.twitter && (
              <FaXTwitter
                className="social-icon text-xl"
                onClick={() => window.open(footer?.socials?.twitter, "_blank")}
              />
            )}
          </div>
        )}
      </div>
    </Wrapper>
  );
}
{/* <div className="grid grid-cols-1 md:gap-x-20 gap-0 lg:grid-cols-3 px-5 border-b-[0.1px] border-gray-600">

  {footer?.list?.map((item: any, idx: number) => (
    <div key={item.title} className={` border[#a3a3a3] md:py-5 py-10  ${idx === footer?.list.length - 1 ? "border-none" : "lg:border-none border-b-[0.5px]"}`}>

      <button
        className="w-full flex justify-between items-center md:text-2xl text-lg font-bold focus:outline-none text-gray-200"
        onClick={() => toggleSection(item.title)}
      >
        {item.title} News
        <span className="transition-transform duration-300 opacity-70 text-sm text-[#a3a3a3] md:hidden">
          {openSections[item.title] ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>

      <div className="w-full">
        {openSections[item.title] && (
          <ul className="mt-2 text-white ">
            {item.links?.map((item: any) => (
              <li key={item?.id} className="md:ml-0 ml-5 md:list-none list-disc text-justify my-[15px]">
                <Link href={`${item.href}`} className="hover:underline">{item?.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  ))}


  <div className="col-span-2 flex flex-col w-full max-lg:hidden lg:col-span-1 md:py-4 text-white">

    <h4 className="my-2 mb-3 text-3xl font-semibold">{footer?.newLetter?.title}</h4>
    <p>{footer?.newLetter?.description}</p>
    <form action="" className="flex flex-col w-full gap-y-4 my-5">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your Email"
        className="w-full rounded-full border-none py-4 pl-5 text-sm outline-none text-black"
      />
      <Button variant="white" className="!rounded-full !px-8" type="submit">Subscribe</Button>
    </form>
  </div>
</div> */}