"use client"
import TimelineList, { TimelineListTwo } from '@/components/TimelineList'
import React from 'react'

export default function ParsedHtmlContent({ data = [] }: { data: any }) {
    if (!Array.isArray(data)) {
        console.error("Expected an array but got:", typeof data, data);
        return <p>Invalid data format</p>;
    }

    return (
        <div className="bg-transparent w-full text-justify py-2">
            {data.map((section: any, idx) => {
                const table = section?.div?.figure?.table;

                return (
                    <div key={idx}>
                        {section?.p && (
                            <div>
                                <div
                                    className="styled-content-p bg-transparent"
                                    dangerouslySetInnerHTML={{ __html: section?.p }}
                                />
                            </div>
                        )}

                        {section?.h3 && (
                            <div className="mt-6 mb-3">
                                <div
                                    className="styled-content-h bg-transparent"
                                    dangerouslySetInnerHTML={{ __html: section?.h3 }}
                                />
                            </div>
                        )}

                        {section?.h2 && (
                            <div className="mt-6 mb-3">
                                <div
                                    className="styled-content-h bg-transparent"
                                    dangerouslySetInnerHTML={{ __html: section?.h2 }}
                                />
                            </div>
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

                        {table && (
                            <div className="text-xl font-bold mt-4 bg-black">
                                <div
                                    className="styled-content-table bg-transparent"
                                    dangerouslySetInnerHTML={{ __html: table }}
                                />
                            </div>
                        )}

                        {section?.p?.image && (
                            <div className="text-xl font-bold mt-3 mb-0 w-full">
                                <div
                                    className="styled-content-img bg-transparent w-full"
                                    dangerouslySetInnerHTML={{ __html: section?.p?.image }}
                                />
                            </div>
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
