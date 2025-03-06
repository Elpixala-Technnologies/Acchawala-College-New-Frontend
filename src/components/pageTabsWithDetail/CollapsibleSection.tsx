import { formatDate } from '@/utils/customText'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../Button'
import { FaqsForDetailPage } from '../Faqs'
import TimelineList from '../TimelineList'
import YoutubeVideo from '../youtubeVideo'
import ImageGallery from './ImageGallery'
import ParsedHtmlContent from './parsedHtmlContent'
import RelatedCourses from './RelatedCourses'
import Image from 'next/image'
import { NewsAndUpdatesSection, ReviewsAndRatingsSection } from './Content'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

export default function CollapsibleSection({ section, isExpanded, groupedVideos, breadCrumb, slug, groupedImages }: any) {
    const [isOpen, setIsOpen] = useState(true)

    console.log(section?.title)
    return (
        <div
            className={`mt-5 w-full md:rounded-2xl sm:rounded-lg rounded-none  md:min-w-[550px] sm:p-5 p-3 ${section?.title ? "bg-white" : "bg-transparent hidden"}`}
        >
            {/* Title */}
            {section?.title && (section?.title?.t1 || section?.title?.t2 || section?.title?.t3) && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='w-full flex items-center justify-between'
                >
                    <h1
                        id={section?.title?.t1?.trim() + " " + section?.title?.t2?.trim() + " " + section?.title?.t3?.trim()}
                        className={`md:text-2xl text-xl text-left font-bold capitalize ${isOpen ? "border-b  pb-3  mb-1 " : "border-none"} border-black ${section?.news ? "" : "border-b border-zinc-500"}`}
                    >
                        {section?.title?.t1 && (
                            <span className="text-black">{section?.title?.t1}</span>
                        )}{" "}
                        {section?.title?.t2 && (
                            <span className="text-orange-500">
                                {section?.title?.t2}
                            </span>
                        )}{" "}
                        {section?.title?.t3 && (
                            <span className="text-black">{section?.title?.t3}</span>
                        )}{" "}
                    </h1>

                    <div className='text-xl'>
                        {isOpen && section?.title ?
                            <IoIosArrowDown /> :
                            <IoIosArrowUp />}
                    </div>
                </button>

            )}
            {isOpen && <>
                {/* Author */}
                {section?.author && section?.author?.data?.attributes?.name && (
                    <div className="sm:mb-8 mb-4 flex items-center gap-x-2">
                        {section?.author?.data?.attributes?.avatar?.data?.attributes
                            ?.url && (
                                <Image
                                    src={
                                        section?.author?.data?.attributes?.avatar?.data
                                            ?.attributes?.url
                                    }
                                    alt="avatar"
                                    className="h-16 w-16 rounded-full"
                                    width={48}
                                    height={48}
                                />
                            )}
                        <div className="flex flex-col sm:gap-2 gap-1.5">
                            {section?.author?.data?.attributes?.name && (
                                <p className="md:text-3xl sm:text-xl xs:text-lg font-bold text-orange-500">
                                    {section?.author?.data?.attributes?.name}
                                </p>
                            )}
                            <div className="flex items-center md:text-lg sm:text-sm xs:text-[14px] text-[12px] sm:gap-2 gap-1 text-zinc-500">
                                {section?.author?.data?.attributes?.designation && (
                                    <p className="font-bold">
                                        {section?.author?.data?.attributes?.designation} |
                                    </p>
                                )}
                                {section?.author?.data?.attributes?.updatedAt && (
                                    <p className="font-medium">
                                        Last Updated:{" "}
                                        {formatDate(
                                            section?.author?.data?.attributes?.updatedAt,
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* Quote  */}
                {section?.quote && (
                    <>
                        <div
                            className={`my-2 mb-5 text-wrap border-l-4 border-orange-500 py-2 pl-5 text-justify text-lg font-medium italic text-black ${isExpanded ? "" : "line-clamp-4"
                                }`}
                            dangerouslySetInnerHTML={{ __html: section?.quote }}
                        />
                    </>
                )}
                {/* EditorText */}
                {section?.editorText &&
                    <div>
                        <ParsedHtmlContent data={section?.editorText} />
                    </div>
                }
                {/* ReviewsText */}
                {section?.reviewsText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.reviewsText }}
                    />
                )}
                {/* galleryText */}
                {section?.galleryText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.galleryText }}
                    />
                )}
                {/* videoText */}
                {section?.videoText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.videoText }}
                    />
                )}
                {/* accordionText */}
                {section?.accordionText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.accordionText }}
                    />
                )}
                {/* bannerText */}
                {section?.bannerText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.bannerText }}
                    />
                )}
                {/* facilityText */}
                {section?.facilityText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.facilityText }}
                    />
                )}
                {/* newsText */}
                {section?.newsText && (
                    <div
                        className={`dangerouslySetInnerHTMLStyle mb-5 text-justify ${isExpanded ? "" : "line-clamp-4"}`}
                        dangerouslySetInnerHTML={{ __html: section?.newsText }}
                    />
                )}
                {/* news */}
                {section?.news
                    && <NewsAndUpdatesSection data={section?.news} />}
                {/* Buttons */}
                {section?.button && (
                    <div className="mb-5 flex gap-2 max-sm:flex-col">
                        {section.button.button1?.text && (
                            <Link
                                href={section.button.button1.link || "#"}
                                className="max-sm:w-full"
                            >
                                <Button
                                    variant="black"
                                    className="text-nowrap max-sm:!w-full"
                                >
                                    {section.button.button1.text}
                                </Button>
                            </Link>
                        )}
                        {section.button.button2?.text && (
                            <Link
                                href={section.button.button2.link || "#"}
                                className="max-sm:w-full"
                            >
                                <Button
                                    variant="orange"
                                    className="text-nowrap max-sm:!w-full"
                                >
                                    {section.button.button2.text}
                                </Button>
                            </Link>
                        )}
                    </div>
                )}
                {/* Separator  */}
                {section?.separator === true && (
                    <div className="my-5 h-0.5 w-full bg-zinc-300"></div>
                )}
                {/* Important Links  */}
                {section?.importantLinks && (
                    <div className="my-5">
                        {section?.title && (
                            <h2 className="mb-5 text-2xl font-bold">
                                {section?.importantLinks?.title}
                            </h2>
                        )}
                        <ul className="ml-5">
                            {section?.importantLinks?.links?.map(
                                (link: any, i: number) => (
                                    <li key={i} className="mb-2 flex font-bold">
                                        <h6 className="text-black">{link.title}:</h6>
                                        <span className="ml-1">
                                            <Link
                                                className="text-blue-950/70 underline hover:text-blue-500"
                                                href={link?.href || "#"}
                                            >
                                                {link?.text}
                                            </Link>
                                        </span>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>
                )}
                {/* banner  */}
                {section?.bannerTitle && (
                    <div className="relative my-5">
                        <Image
                            src={section?.bannerImage?.data?.[0]?.attributes?.url}
                            alt="banner"
                            width={1700}
                            height={480}
                            className="h-96 w-full object-cover object-center"
                        />
                        <p className="absolute bottom-0 left-0 w-full text-wrap bg-black bg-opacity-60 px-5 py-3 text-white">
                            <Link href={section?.href || "#"}>
                                {section?.bannerTitle}
                            </Link>
                        </p>
                    </div>
                )}
                {/* Accordion  */}
                {section?.accordion &&
                    <TimelineList data={section?.accordion} />}
                {/* Photo Gallery  */}
                {section?.imageGallery && (
                    <ImageGallery groupedImages={groupedImages} selectedContent={section?.imageGallery} />
                )
                }
                {/* Video Gallery  */}
                {section?.videoGallery && (
                    <>
                        {Object.keys(groupedVideos).map((category, index) => (
                            <div key={index} className="mt-5">
                                <h3 className="my-3 text-xl font-semibold capitalize">
                                    {category}
                                </h3>
                                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                    {groupedVideos[category]?.map((video: any, i: any) => (
                                        <YoutubeVideo
                                            videoId={video?.videoId}
                                            width={"100%"}
                                            height={"200"}
                                            key={i}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {/* Facilities */}
                {section?.facility && (
                    <div className="flex flex-wrap gap-5 rounded-lg bg-orange-500 p-5">
                        {section.facility?.data?.map((d: any, i: number) => (
                            <div
                                key={i}
                                className="flex-center gap-2 rounded-e-3xl rounded-s-3xl border-2 border-zinc-300 bg-white p-3 px-5 shadow"
                            >
                                <Image
                                    src={d?.attributes?.facilityIcon?.data?.attributes?.url}
                                    alt="icon"
                                    width={20}
                                    height={20}
                                    className="h-5 w-5"
                                />
                                <p className="font-semibold text-black">
                                    {d?.attributes?.facilityName}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                {/* Review  */}
                {section?.reviewsText && (
                    <ReviewsAndRatingsSection data={section?.reviewsText} />
                )}
                {/* Related Courses  */}
                {section?.courseText && (
                    <RelatedCourses slug={slug} breadCrumb={breadCrumb} />
                )}
                {/* FAQ  */}
                {section?.Questions && (
                    <FaqsForDetailPage data={section?.Questions} />
                )}
            </>

            }
        </div>
    )
}
