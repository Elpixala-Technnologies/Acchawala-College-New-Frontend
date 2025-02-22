import { parseHtmlToJson6 } from "@/lib/cheerio";

export function addCommas(number: any) {
    // Convert the number to a string and use a regular expression to add commas
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatRupee(number: number) {
    // Convert number to string
    let strNumber = String(number);

    // Split the number into integer and decimal parts
    let parts = strNumber?.split('.');
    let integerPart = parts?.[0];
    let decimalPart = parts?.length > 1 ? '.' + parts?.[1] : '';

    // Add commas for thousands separator
    integerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // can be add ₹ symbol and return formatted number
    return integerPart + decimalPart;
}

export default function formatFees(amount: number) {
    if (amount >= 100000) {
        return `${(amount / 100000)?.toFixed(1)} Lac`;
    } else if (amount >= 1000) {
        return `${(amount / 1000)?.toFixed(1)} K`;
    } else {
        return `${amount}`;
    }
}

export function formatDate(dateString: string | number | Date) {
    if (!dateString) return "";
    const options: any = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString)?.toLocaleDateString("en-US", options);
};

export function getDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear(); // Returns the year (e.g., 2024)
    const month = (date.getMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return (`${day}-${month}-${year}`);
}

export function convertQueryDataToTabSections(queryData: any, newsData: any, breadCrumb: any): any {
    const tabSectionsMap: { [key: string]: any } = {};
    // Iterate over each item in queryData
    // console.log(queryData, " newsData newsData")
    queryData.forEach((item: any) => {
        const navItem = item?.navItem?.data?.attributes?.navItem;

        if (!navItem) {
            // Skip this item if it doesn't contain navItem
            return;
        }

        const { navItem: _, ...sectionData } = item;

        // Initialize the navItem in the map if it doesn't exist
        if (!tabSectionsMap[navItem]) {
            tabSectionsMap[navItem] = { navItem: navItem, sections: [] };
        }

        // add news data as a new section if it is of type news
        if (item.__typename === "ComponentCommonNewsComponent") {

            // if there are news related to the article
            if (Array.isArray(newsData?.data) && newsData.data.length > 0) {

                // assign news data to the newsSectionData
                const newsSectionData = {
                    news: newsData.data,
                    title: {
                        __typename: "ComponentCommonTitle",
                        t1: "Latest",
                        t2: breadCrumb,
                        t3: "News & Updates",
                    },
                };


                if (item.newsText != "") {
                    // Add the section data to the respective navItem's sections array
                    tabSectionsMap[navItem].sections.push(sectionData);

                }
                else {
                    // We will replace the heading of common news component
                    newsSectionData.title = sectionData.title;
                }
                // make a new section for news data

                tabSectionsMap[navItem].sections.push(newsSectionData);

            }
        }
        else if (item.__typename === "ComponentCommonTextEditor") {

            // assign news data to the newsSectionData
            let textEditorData = {
                editorText: [{}],
                title: item?.title
            };

            const newEditorText = parseHtmlToJson6(item?.editorText);

            textEditorData.editorText = newEditorText;

            tabSectionsMap[navItem].sections.push(textEditorData);
        }
        // else proceed normally
        else {

            tabSectionsMap[navItem].sections.push(sectionData);
        }
    });

    // Convert the map to an array
    return Object.values(tabSectionsMap);
}

export function convertToYearlyFee(courseFee: any, courseFeeLabel: any) {
    switch (courseFeeLabel) {
        case 'monthly':
            return courseFee * 12;
        case 'weekly':
            return courseFee * 52;
        case 'daily':
            return courseFee * 365;
        default: // yearly
            return courseFee;
    }
}