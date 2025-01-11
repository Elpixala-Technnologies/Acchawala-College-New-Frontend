import { footerLogo, headerLogo } from "@/assets";

export const header = {
  logo: headerLogo,
  href: "/",
  navItems: [
    {
      id: 1,
      label: "Explore colleges",
      href: "/colleges",
      subNav: [
        // {
        //   id: 21,
        //   label: "courses1",
        //   href: "#",
        // },
      ],
    },
    {
      id: 2,
      label: "Exams",
      href: "/exams",
      subNav: [],
    },
    {
      id: 3,
      label: "Programs",
      href: "/courses",
      subNav: [],
    },

    {
      id: 4,
      label: "Latest News",
      href: "/news",
      subNav: [],
    },
  ],
};
export const footer = {
  logo: footerLogo,
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, \\n sed do eiusmod tempor incididunt",
  contactDetails: {
    contactNo: "+1 (999) 888-77-66",
    email: "info@collegedakhla.com",
    location:
      "#1701, B Tower, World \\nTrade Tower, Sector - 16, \\nNoida, U.P - 201301",
  },
  socials: {
    facebook: "https://www.facebook.com/collegedakhla",
    twitter: "https://twitter.com/collegedakhla",
    instagram: "https://www.instagram.com/collegedakhla/",
    linkedin: "https://www.linkedin.com/school/collegedakhla/",
    youtube: "https://www.youtube.com/c/collegedakhla",
  },
  copyrightText: "Copyrights © 2024 collegedakhla. All rights reserved.",
  list1: {
    title: "Products",
    links: [
      {
        id: 1,
        label: "Feature",
        href: "/",
      },
      {
        id: 2,
        label: "Pricing",
        href: "/pricing",
      },
      {
        id: 3,
        label: "Case Studies",
        href: "/case-studies",
      },
      {
        id: 4,
        label: "Reviews",
        href: "/reviews",
      },
      {
        id: 5,
        label: "Updates",
        href: "/updates",
      },
    ],
  },
  list2: {
    title: "Company",
    links: [
      {
        id: 1,
        label: "About",
        href: "/about",
      },
      {
        id: 2,
        label: "Contact us",
        href: "/contact-us",
      },
      {
        id: 3,
        label: "Careers",
        href: "/careers",
      },

      {
        id: 4,
        label: "Culture",
        href: "/culture",
      },
      {
        id: 5,
        label: "Blog",
        href: "/blog",
      },
    ],
  },
  list3: {
    title: "Support",
    links: [
      {
        id: 1,
        label: "Getting started",
        href: "/getting-started",
      },
      {
        id: 2,
        label: "Help center",
        href: "/help-center",
      },
      {
        id: 3,
        label: "Server status",
        href: "/server-status",
      },
      {
        id: 4,
        label: "Report a bug",
        href: "/report-a-bug",
      },
      {
        id: 5,
        label: "Chat support",
        href: "/chat-support",
      },
    ],
  },
  list4: {
    title: "Downloads",
    links: [
      {
        id: 1,
        label: "iOS",
        href: "/",
      },
      {
        id: 2,
        label: "Android",
        href: "/",
      },
      {
        id: 3,
        label: "Mac",
        href: "/",
      },
      {
        id: 4,
        label: "Window",
        href: "/",
      },
      {
        id: 5,
        label: "Chrome",
        href: "/",
      },
    ],
  },
  newLetter: {
    title: "Subscribe to our newsletter",
    description: "Subscribe to our newsletter to get latest news and updates.",
  },
};
