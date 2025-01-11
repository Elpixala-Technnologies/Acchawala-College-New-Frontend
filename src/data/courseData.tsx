import { c1, collegeBanner, collegeBanner1, collegeBanner2, collegeBanner3 } from "@/assets";

export const coursePage = {
  banner: {
    bgImg: [
      { url: collegeBanner },
      { url: collegeBanner1 },
      { url: collegeBanner2 },
      { url: collegeBanner3 },
    ],
    title: "List Of Courses In India",
    
  },
  filterBy: {
    courseDuration: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    courseMode: [
      "Regular",
      "Regular / Distance",
      "Regular / Distance / Part-time",
      "Part-time",
      "Distance",
    ],
  },
};

export const courses = [
  {
    id: 1,
    slug: "btech-engineering",
    totalColleges: 31,
    bgImage: { url: c1 },
    courseName: "B.Tech Engineering Technology at IIT Madras",
    breadCrumb: "B.Tech",
    titleAddition: "Program Details and Overview",
    description:
      "Located in the vibrant city of Los Angeles, UCLA (University of California, Los Angeles) is renowned for its academic excellence and innovative research programs. With a diverse student body and a wide range. Located in the vibrant city of Los Angeles, UCLA (University of California, Los Angeles) is renowned for its",
    courseType: "offline",
    duration: 4,
    avgFees: {
      from: 500000,
      to: 1000000,
    },
    ExaminationLevel: "National",
    courseMode: "Regular",
    // See in GlobalData
    faqs: [],
    new: [],
    // See in GlobalData
    tabsSections: [],
    courseSequence: 1,
    lastUpdate: "Nov 17, 2023 14:25 IST",
    isPopular: true,
    popularSequence: 1,
    featuredSequence: 1,
  },
];
