"use client"
import TimelineList, { TimelineListTwo } from '@/components/TimelineList'
import { getTextLengthByTag } from '@/lib/cheerio';
import React from 'react'

export default function ParsedHtmlContent({ data = [] }: { data: any }) {
    if (!Array.isArray(data)) {
        console.error("Expected an array but got:", typeof data, data);
        return <p>Invalid data format</p>;
    }

    function checkLessThanNineWord(section: any) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(section?.p, 'text/html');
        const pContent = doc.body.textContent?.trim();
        const pLength = pContent?.split(/\s+/).length;

        if (pLength && pLength > 1 && pLength <= 9) return true;
        return false

    }
    console.log("Expected an array but got:", typeof data, data);
    return (
        <div className="bg-transparent w-full text-justify py-2">
            {data.map((section: any, idx) => {
                const table = section?.div?.figure?.table;




                const textLength = getTextLengthByTag(section?.p, "span");
                console.log(textLength, "  text");
                // const length = section?.p?.textContent?.trim()?.split(/\s+/)?.length;
                // console.log(pLength, "  length");
                console.log(section, "  sec")

                return (
                    <div key={idx}>

                        {section?.p && (
                            (() => {
                                const parser = new DOMParser();
                                const doc = parser.parseFromString(section?.p, 'text/html');
                                const pContent = doc.body.textContent?.trim();
                                const pLength = pContent?.split(/\s+/).length;

                                if (checkLessThanNineWord(section)) {
                                    // checking next heading 
                                    // if (checkLessThanNineWord(data[(idx <= data.length - 1 && idx >= 1) ? idx - 1 : -1])) {
                                    //     const newHeading = String(data[idx - 1]?.p)?.concat(section?.p)
                                    //     idx++
                                    //     return (
                                    //         <h3
                                    //             className="styled-content-h bg-transparent mt-3"
                                    //             dangerouslySetInnerHTML={{ __html: newHeading }}
                                    //         />
                                    //     );
                                    // }
                                    // else
                                    if (checkLessThanNineWord(data[(idx <= data.length - 2) ? idx + 1 : -1])) {
                                        return (
                                            <h3
                                                className="styled-content-h0 bg-transparent mt-3"
                                                dangerouslySetInnerHTML={{ __html: section?.p }}
                                            />
                                        );
                                    }

                                    // styling heading of section .p
                                    const splitPContent: string[] = pContent?.split(" ") as string[]
                                    // if (pContent?.includes(":")) {
                                    //     const splitPContentSteps = pContent.split(":")
                                    //     return (
                                    //         <div className="styled-content-x bg-transparent mt-3">
                                    //             <h3><span className='text-orange-500'>{splitPContentSteps[0]}:</span> {splitPContentSteps[1]}</h3>
                                    //         </div>
                                    //     );
                                    // } else {
                                    return (
                                        <div className="styled-content-x bg-transparent mt-3">
                                            <h3>
                                                <span className=''>{splitPContent[0]} </span>
                                                <span className='text-orange-500'> {splitPContent.slice(1, -1).join(" ")} </span>
                                                <span className=''>{splitPContent[splitPContent.length - 1]}</span>

                                            </h3>
                                        </div>
                                    );
                                    // }
                                    // return (
                                    //     <div className="styled-content-x bg-transparent mt-3">
                                    //         <h3><span className='text-orange-500'>{splitPContent[0]}</span> {splitPContent.slice(1).join(" ")}</h3>
                                    //     </div>
                                    //     // <h3
                                    //     //     className="styled-content-h bg-transparent mt-3"
                                    //     //     dangerouslySetInnerHTML={{ __html: section?.p }}
                                    //     // />
                                    // );

                                } else if (pLength && pLength > 9) {
                                    return (
                                        <p
                                            className="styled-content-p bg-transparent mt-6 mb-3"
                                            dangerouslySetInnerHTML={{ __html: section?.p }}
                                        />
                                    );
                                }
                            })()
                        )}

                        {section?.h3 && (
                            <h3
                                className="styled-content-h bg-transparent mt-6 mb-3"
                                dangerouslySetInnerHTML={{ __html: section?.h3 }}
                            />
                        )}

                        {section?.h2 && (
                            <h3
                                className="styled-content-h bg-transparent mt-6 mb-3"
                                dangerouslySetInnerHTML={{ __html: section?.h2 }}
                            />
                        )}

                        {section?.ul && (
                            <div className="text-xl font-bold mt-3 mb-0">
                                <TimelineListTwo data={section?.ul} />
                            </div>
                        )}

                        {section?.ol && (
                            <div className="text-xl font-bold mt-3 mb-0">
                                <TimelineListTwo data={section?.ol} />
                            </div>
                        )}

                        {section?.div?.figure?.table && (
                            <div
                                className="styled-content-table bg-transparenttext-xl font-bold mt-4"
                                dangerouslySetInnerHTML={{ __html: table }}
                            />
                        )}

                        {section?.p?.image && (
                            // <div className="text-xl font-bold">
                            <div
                                className="styled-content-img bg-transparent  mt-3 mb-0 w-full text-[16px]"
                                dangerouslySetInnerHTML={{ __html: section?.p?.image }}
                            />
                            // </div>
                        )}

                        {section?.title && (
                            <h2 className={`text-2xl font-bold capitalize ${section?.news ? "mb-3" : "border-b border-zinc-500 mb-4 pb-4"}`}>
                                {section?.title?.t1 && <span className="text-black">{section?.title?.t1}</span>}{" "}
                                {section?.title?.t2 && <span className="text-orange-500">{section?.title?.t2}</span>}{" "}
                                {section?.title?.t3 && <span className="text-black">{section?.title?.t3}</span>}{" "}
                            </h2>
                        )}

                        {section?.editorText && (
                            <div>
                                <ParsedHtmlContent data={section?.editorText} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// Recursive function to render JSON data
const RenderHtmlJson = ({ data }: { data: any }) => {
    if (!data) return null;

    if (typeof data === "string") {
        return data; // Directly render text
    }

    if (Array.isArray(data)) {
        return data.map((item, index) => <RenderHtmlJson key={index} data={item} />);
    }

    // Destructure the object
    const { title, content } = data;

    return React.createElement(
        title, // Create the HTML tag dynamically (h, p, ul, li, etc.)
        { key: title }, // Add a unique key
        Array.isArray(content)
            ? content.map((item, index) => <RenderHtmlJson key={index} data={item} />) // Recursively render children
            : content // Direct text content
    );
};

// **Main Component**
const HtmlRenderer = ({ jsonData }: { jsonData: any[] }) => {
    return <div>{jsonData.map((item, index) => <RenderHtmlJson key={index} data={item} />)}</div>;
};

// export default HtmlRenderer;
