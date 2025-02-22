import * as cheerio from "cheerio";
import { AnyNode } from "domhandler";

// export function extractHeadings(html: string) {
//     const $ = cheerio.load(html);
//     let headings: { id: string; text: string; tag: string }[] = [];

//     $("h1, h2, h3, h4, h5").each((index, element) => {
//         const tag = $(element)[0].tagName; // Get the heading tag (h1, h2, etc.)
//         const id = $(element).attr("id") || `heading-${index + 1}`; // Use existing ID or generate one
//         const text = $(element).text().trim(); // Get the text content
//         headings.push({ id, text, tag });
//     });

//     return headings;
// }
export const extractHeadings = (html: string) => {
    const $ = cheerio.load(html);
    let headings: { id: string; text: string; tag: string }[] = [];

    $("h1, h2, h3, h4, h5").each((index, element) => {
        const tag = $(element)[0].tagName;
        const text = $(element).text().trim();
        const generatedId = `heading-${index + 1}`;

        // Assign a unique ID to each heading dynamically
        $(element).attr("id", generatedId);
        $(element).attr("style", "bg-transparent");

        headings.push({ id: generatedId, text, tag });
    });

    return { updatedHtml: $.html(), headings };
};

export function extractKeyValueULs(htmlString: string | AnyNode | AnyNode[] | Buffer<ArrayBufferLike>) {
    // Load the HTML using Cheerio
    const $ = cheerio.load(htmlString);

    let extractedLists: any[][] = [];

    // Select all <ul> elements
    $("ul").each((_, ul) => {
        let keyValuePairs: { key: string; value: string; }[] = [];
        let $ul = $(ul);

        // Find all <li> elements inside this <ul>
        $ul.find("li").each((_, li) => {
            let $li = $(li);
            let $strong = $li.find("strong");

            if ($strong.length) {
                let key = $strong.text().trim();
                let value = $li.text().replace($strong.text(), "").trim();
                keyValuePairs.push({ key, value });
            }
        });

        // If at least one key-value pair was found, store it and remove <ul>
        if (keyValuePairs.length > 0) {
            extractedLists.push(keyValuePairs);
            $ul.remove(); // Remove this <ul> from the DOM
        }
    });

    // Get the remaining HTML
    const filteredHTML = $.html().trim();

    return { filteredHTML, extractedLists };
}

export function parseHtmlToJson5(
    htmlString: string | AnyNode | AnyNode[] | Buffer<ArrayBufferLike>
) {
    const $ = cheerio.load(htmlString);

    function traverse(element: any) {
        let tagName = String(element.tagName).toLowerCase();
        let children: any[] = [];

        // Handle text nodes
        if (element.type === "text") {
            return element.data.trim() ? element.data.trim() : null;
        }

        // Handle <li> with two <span> elements inside
        if (tagName === "li") {
            let spans = $(element).find("span");

            if (spans.length >= 2) {
                let title = $(spans[0]).text().trim(); // First <span> text
                let text = $(spans[1]).text().trim(); // Second <span> text

                return { title, text };
            }
        }

        // Extract <table> as-is
        if (tagName === "table") {
            return { table: $.html(element) };
        }

        // Extract <img> as-is
        if (tagName === "img") {
            return { image: $.html(element) };
        }
        // Extract <img> as-is
        if (tagName === "a") {
            return { link: $.html(element) };
        }

        // Process child elements
        $(element)
            .contents()
            .each((_, child) => {
                let childData = traverse(child);
                if (childData) {
                    children.push(childData);
                }
            });

        // Return structured object
        return children.length > 0
            ? { [tagName]: children.length === 1 ? children[0] : children }
            : null;
    }

    // Process body content (excluding <html> and <body> tags)
    let result: any[] = [];
    $("body")
        .children()
        .each((_, elem) => {
            let parsed = traverse(elem);
            if (parsed) result.push(parsed);
        });

    return result;
}
export function parseHtmlToJson6(
    htmlString: string | AnyNode | AnyNode[] | Buffer<ArrayBufferLike>
) {
    const $ = cheerio.load(htmlString);

    function traverse(element: any) {
        let tagName = String(element.tagName).toLowerCase();
        let children: any[] = [];

        // Handle text nodes
        if (element.type === "text") {
            return element.data.trim() ? element.data.trim() : null;
        }

        // Extract <p>, <h1>, <h2>, <h3> as key-value pairs
        if (["p", "h1", "h2", "h3"].includes(tagName)) {
            return { [tagName]: $(element).html().trim() };
        }

        // Handle <li> with two <span> elements inside
        if (tagName === "li") {
            let spans = $(element).find("span");

            if (spans.length >= 2) {
                let title = $(spans[0]).text().trim(); // First <span> text
                let text = $(spans[1]).text().trim(); // Second <span> text
                return { title, text };
            }
        }

        // Extract <table> as-is
        if (tagName === "table") {
            return { table: $.html(element) };
        }

        // Extract <img> as-is
        if (tagName === "img") {
            return { image: $.html(element) };
        }

        // Extract <a> as-is
        if (tagName === "a") {
            return { link: $.html(element) };
        }

        // Process child elements
        $(element)
            .contents()
            .each((_, child) => {
                let childData = traverse(child);
                if (childData) {
                    children.push(childData);
                }
            });

        // Return structured object
        return children.length > 0
            ? { [tagName]: children.length === 1 ? children[0] : children }
            : null;
    }

    // Process body content (excluding <html> and <body> tags)
    let result: any[] = [];
    $("body")
        .children()
        .each((_, elem) => {
            let parsed = traverse(elem);
            if (parsed) result.push(parsed);
        });

    return result;
}
