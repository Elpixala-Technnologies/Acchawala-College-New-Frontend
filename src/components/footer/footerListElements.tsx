import Link from 'next/link'
import React, { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa'

export function FooterLatestNews({ data, title }: any) {
    if (!data) return
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={` border[#a3a3a3] md:py-5 py-10 lg:border-none border-b-[0.5px]`}>

            <button
                className="w-full flex justify-between items-center md:text-2xl text-lg font-bold focus:outline-none text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="transition-transform duration-300 opacity-70 text-sm text-[#a3a3a3] md:hidden">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            {data && isOpen &&
                <div className="w-full">
                    {/* {openSections[item.title] && ( */}
                    <ul className="mt-2 text-white ">
                        {data?.data?.map((item: any) => (
                            <li key={item?.id} className="md:ml-0 ml-5 md:list-none list-disc text-justify my-[15px]">
                                <Link href={`${item?.attributes?.slug}`} className="hover:underline">{item?.attributes?.title}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* )} */}
                </div>
            }
        </div>
    )
}
export function FooterExploreColleges({ data, title }: any) {
    if (!data) return

    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={` border[#a3a3a3] md:py-5 py-10 lg:border-none border-b-[0.5px]`}>

            <button
                className="w-full flex justify-between items-center md:text-2xl text-lg font-bold focus:outline-none text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="transition-transform duration-300 opacity-70 text-sm text-[#a3a3a3] md:hidden">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            {data && isOpen &&
                <div className="w-full">
                    {/* {openSections[item.title] && ( */}
                    <ul className="mt-2 text-white ">
                        {data?.data?.map((item: any) => (
                            <li key={item?.id} className="md:ml-0 ml-5 md:list-none list-disc text-justify my-[15px]">
                                <Link href={`${item?.attributes?.slug}`} className="hover:underline">{item?.attributes?.collegeName}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* )} */}
                </div>
            }
        </div>
    )
}
export function FooterExploreCourses({ data, title }: any) {
    if (!data) return
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={` border[#a3a3a3] md:py-5 py-10 lg:border-none border-b-[0.5px]`}>

            <button
                className="w-full flex justify-between items-center md:text-2xl text-lg font-bold focus:outline-none text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="transition-transform duration-300 opacity-70 text-sm text-[#a3a3a3] md:hidden">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            {data && isOpen &&
                <div className="w-full">
                    {/* {openSections[item.title] && ( */}
                    <ul className="mt-2 text-white ">
                        {data?.data?.map((item: any) => (
                            <li key={item?.id} className="md:ml-0 ml-5 md:list-none list-disc text-justify my-[15px]">
                                <Link href={`${item?.attributes?.slug}`} className="hover:underline">{item?.attributes?.courseName}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* )} */}
                </div>
            }
        </div>
    )
}
export function FooterExploreExams({ data, title }: any) {
    if (!data) return

    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={` border[#a3a3a3] md:py-5 py-10 lg:border-none border-b-[0.5px]`}>

            <button
                className="w-full flex justify-between items-center md:text-2xl text-lg font-bold focus:outline-none text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="transition-transform duration-300 opacity-70 text-sm text-[#a3a3a3] md:hidden">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            {data && isOpen &&
                <div className="w-full">
                    {/* {openSections[item.title] && ( */}
                    <ul className="mt-2 text-white ">
                        {data?.data?.map((item: any) => (
                            <li key={item?.id} className="md:ml-0 ml-5 md:list-none list-disc text-justify my-[15px]">
                                <Link href={`${item?.attributes?.slug}`} className="hover:underline">{item?.attributes?.examName}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* )} */}
                </div>
            }
        </div>
    )
}
export function FooterExamNews({ data, title }: any) {
    if (!data) return
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={` border[#a3a3a3] md:py-5 py-10 lg:border-none border-b-[0.5px]`}>

            <button
                className="w-full flex justify-between items-center md:text-2xl text-lg font-bold focus:outline-none text-gray-200"
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <span className="transition-transform duration-300 opacity-70 text-sm text-[#a3a3a3] md:hidden">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            </button>
            {data && isOpen &&
                <div className="w-full">
                    {/* {openSections[item.title] && ( */}
                    <ul className="mt-2 text-white ">
                        {data?.data?.map((item: any) => (
                            <li key={item?.id} className="md:ml-0 ml-5 md:list-none list-disc text-justify my-[15px]">
                                <Link href={`${item?.attributes?.slug}`} className="hover:underline">{item?.attributes?.title}</Link>
                            </li>
                        ))}
                    </ul>
                    {/* )} */}
                </div>
            }
        </div>
    )
}
