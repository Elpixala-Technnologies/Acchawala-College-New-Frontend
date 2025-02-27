import * as cheerio from "cheerio";
import { AnyNode } from "domhandler";


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



export function parseHtmlToJson6(htmlString: string | AnyNode | AnyNode[]): any[] {
    if (!htmlString) {
        // console.error("parseHtmlToJson6: Invalid input", htmlString);
        return [];
    }

    const $ = cheerio.load(htmlString.toString());

    function traverse(element: any) {
        let tagName = element.tagName ? String(element.tagName).toLowerCase() : "";
        let children: any[] = [];

        if (element.type === "text") {
            return element.data.trim() ? element.data.trim() : null;
        }

        if (["h1", "h2", "h3"].includes(tagName)) {
            const htmlContent = $(element).html();
            return htmlContent ? { ["h3"]: htmlContent.trim() } : null;
        }
        if (tagName?.match("p")) {
            const htmlContent = $(element).html();
            // const pContent = htmlContent?.trim();
            // const pLength = pContent?.split(/\s+/).length;
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent as string, 'text/html');
            const pContent = doc.body.textContent?.trim();
            const pLength = pContent?.split(/\s+/).length;


            if (htmlContent?.match("<br>")) {
                const splitHtml = htmlContent.split("<br>")
                const firstPart = splitHtml[0]

                let newObject: any = {
                    p: null,
                    ul: []
                }
                if ($(firstPart).text().trim().match(":")) {
                    newObject = {
                        p: firstPart,
                        ul: []
                    }
                    for (let i = 1; i < splitHtml.length - 1; i++) {
                        newObject?.ul?.push({ title: $(splitHtml[i]).text().trim(), text: $(splitHtml[i]).text().trim() })
                    }
                    return newObject
                } else {
                    newObject = {
                        p: null,
                        ul: []
                    }
                    for (let i = 0; i < splitHtml.length - 1; i++) {
                        newObject?.ul?.push({ title: $(splitHtml[i]).text().trim(), text: $(splitHtml[i]).text().trim() })
                    }
                    return newObject
                }
                // return htmlContent ? { ["p"]: htmlContent.trim() } : null;
            }

            if (pContent?.match("Tip") || pContent?.match("Note")) return htmlContent ? { ["p"]: htmlContent.trim() } : null;

            if (pLength && pLength > 1 && pLength < 12) return htmlContent ? { ["h3"]: htmlContent?.trim() } : null;

            else if (pLength && pLength > 1) return htmlContent ? { ["p"]: htmlContent.trim() } : null;

            return;
        }

        if (tagName === "li") {
            let spans = $(element).find("span");
            if (spans.length >= 1) {

                const title = $(spans[0]).text().trim();
                const text = $(spans[1]).text().trim()

                if (!title || !text) {
                    return
                }
                return { title, text };
            }
            return;
        }

        if (tagName === "table") return { table: $.html(element) };
        if (tagName === "img") return { image: $.html(element) };
        // if (tagName === "a") return { link: $.html(element) };

        $(element).contents().each((_, child) => {
            let childData = traverse(child);
            if (childData) children.push(childData);
        });

        return children.length ? { [tagName]: children.length === 1 ? children[0] : children } : null;
    }

    let result: any[] = [];
    $("body").children().each((_, elem) => {
        let parsed = traverse(elem);
        if (parsed) result.push(parsed);
    });
    console.log(result)

    return processHeadings(result, result.length - 1, 0);
    // return result
}


export function processHeadings(parsedJson: any[], idx: number, flag: number) {

    if (!parsedJson[idx]?.h3 || flag === 0) {

        if (idx === 0) {
            return parsedJson;
        }

        if (parsedJson[idx]?.h3) {
            flag = 1;
        } else {
            flag = 0;
        }
        return processHeadings(parsedJson, idx - 1, flag)
    } else {

        if (idx === 0) {
            return parsedJson;
        }

        if (parsedJson[idx]?.h3 && parsedJson[idx - 1]?.h3) {
            let jsonItem = {
                h3: parsedJson[idx - 1]?.h3?.concat(": ".concat(parsedJson[idx]?.h3))
            }

            parsedJson[idx - 1] = jsonItem;

            parsedJson?.splice(idx, 1);

            return processHeadings(parsedJson, idx - 1, flag);

        }
        return processHeadings(parsedJson, idx - 1, flag);
    }

}



export function getTextLengthByTag(htmlString: string, tag: string): number {
    if (!htmlString || !tag) return 0; // Handle empty input

    const $ = cheerio.load(htmlString);
    let textContent = $(tag).text().replace(/\s+/g, " ").trim(); // Extract and clean text
    return textContent.length;
}

export function checkLessThanElevenWord(sectionText: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sectionText, 'text/html');
    const pContent = doc.body.textContent?.trim();
    const pLength = pContent?.split(/\s+/).length;

    if (pLength && pLength > 1 && pLength <= 11) return true;
    return false

}