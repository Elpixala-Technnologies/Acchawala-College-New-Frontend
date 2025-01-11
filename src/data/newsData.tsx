import { book1, c1, c2, c3 } from "@/assets";

export const newsPage = {
  notification: {
    list: [
      {
        id: 1,
        date: "2015-12-01",
        text: "IIT Bombay, Mumbai JEE Advanced 2024 Round 1 Cutoff Released",
        slug: "#",
      },
      {
        id: 2,
        date: "2015-12-01",
        text: "IIT Bombay is ranked #118 out of 1400 for in India in 2025 by QS World University",
        slug: "#",
      },
    ],
  },
  searchResults: [
    {
      id: 1,
      icon: { url: book1 },
      bgImage: { url: c1 },
      category: "exam",
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      slug: "#",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      timeStamp: "12 June 2024",
    },
    {
      id: 2,
      icon: { url: book1 },
      bgImage: { url: c2 },
      category: "college",
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      slug: "#",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      timeStamp: "12 June 2024",
    },
    {
      id: 3,
      icon: { url: book1 },
      bgImage: { url: c3 },
      category: "exam",
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      slug: "#",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      timeStamp: "12 June 2024",
    },
  ],
  news: [
    // use below news for schema
    {
      id: 1,
      icon: { url: book1 },
      bgImage: { url: c1 },
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      article: {
        writerAvatar: { url: book1 },
        writerName: "Nitin",
        //use k-editor for content
        content:
          "The Indian Institute of Technology Kharagpur is known both nationally and in",
      },
      category: "exam",
      slug: "#",
      timeStamp: "12 June 2024",
      newsSequence: 1,
    },
    {
      id: 2,
      icon: { url: book1 },
      bgImage: { url: c2 },
      category: "college",
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      slug: "#",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      timeStamp: "12 June 2024",
      newsSequence: 2,
    },
    {
      id: 3,
      icon: { url: book1 },
      bgImage: { url: c3 },
      category: "exam",
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      slug: "#",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      timeStamp: "12 June 2024",
      newsSequence: 3,
    },
    {
      id: 4,
      icon: { url: book1 },
      bgImage: { url: c1 },
      category: "exam",
      title: "CAT Diversity at IIM: Benefits for Non-Engineers and Female",
      href: "#",
      text: "The Indian Institute of Technology Kharagpur is known both nationally and internationally for excellence in technical education, basic and applied research, innovation, entrepreneurship and industrial consultancy.",
      timeStamp: "12 June 2024",
      newsSequence: 3,
    },
  ],
};
