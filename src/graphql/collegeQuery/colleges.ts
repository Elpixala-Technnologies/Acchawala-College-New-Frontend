"use client";
import { gql, DocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState } from "react";

// Function to return filter ranges for top colleges
function topCollegesFilter(range: any) {
  switch (range) {
    case "Top 10":
      return { gte: 1, lt: 11 };
    case "Top 20":
      return { gte: 1, lt: 21 };
    case "Top 30":
      return { gte: 1, lt: 31 };
    case "Top 40":
      return { gte: 1, lt: 41 };
    case "Top 50":
      return { gte: 1, lt: 51 };
    default:
      return {};
  }
}

// Function to generate the GraphQL query
export function getAllColleges(range: any): DocumentNode {
  const topCollegesFilterObj = topCollegesFilter(range);
  const topCollegesFilterStr =
    Object.keys(topCollegesFilterObj).length > 0
      ? `
          topCollegeSequence: {
            gte: ${topCollegesFilterObj.gte}
            lt: ${topCollegesFilterObj.lt}
          }
      `
      : "";

  return gql`
    query getAllColleges(
  $page: Int
  $pageSize: Int
  $cities: [String]
  $states: [String]
  $collegeTypes: [String]
  $affiliations: [String]
  $gender: String
  $examAccepted: [String]
  $courses: [String]
  $streams: [String]
  $collegeSortingParameter: [String]
  $searchByCollegeName: String
) {
  colleges(
    pagination: { page: $page, pageSize: $pageSize }
    sort: $collegeSortingParameter
    filters: {
      collegeName: { containsi: $searchByCollegeName }
      college_type: { collegeType: { in: $collegeTypes } }
      location: {
        city: { city: { in: $cities } }
        state: { state: { in: $states } }
      }
      affiliation: { organization: { in: $affiliations } }
      genderAccepted: { gender: { eq: $gender } }
      allCourses: {
        examName: { breadCrumb: { in: $examAccepted } }
        courseName: { breadCrumb: { in: $courses } }
        stream: { stream: { in: $streams } }
      }
        ${topCollegesFilterStr}
    }
  ) {
    meta {
      pagination {
        total
      }
    }
    data {
      id
      attributes {
        slug
        breadCrumb
        collegeLogo  {
          data {
          id
            attributes {
              width
              height
              url
            }
          }
        }
          
        collegeName
        description
        location {
          state {
            data {
              id
              attributes {
                state
              }
            }
          }
          city {
            data {
              id
              attributes {
                city
              }
            }
          }
          country {
            data {
              id
              attributes {
                country
              }
            }
          }
        }
        college_type {
          data {
            id
            attributes {
              collegeType
            }
          }
        }
        affiliation {
          data {
            id
            attributes {
              organization
            }
          }
        }
        avgPackage
        hightestPackage
        brochureFile {
          data {
            id
            attributes {
              name
              alternativeText
              caption
              ext
              mime
              size
              url
            }
          }
        }
        navbars {
          data {
            id
            attributes {
              navItem
            }
          }
        }
        allCourses {
        courseName {
            data {
              attributes {
                breadCrumb
              }
            }
          }
          courseFee
          courseFeeLabel
          examName {
            data {
              id
              attributes {
                breadCrumb
              }
            }
          }
          stream {
            data {
              id
              attributes {
                stream
              }
            }
          }
        }
      }
    }
  }
}

  `;
}

export const getAllCollegeSortingParameters = gql`
  query getAllCollegeSortingParameters {
    colleges {
      data {
        id
        attributes {
          featuredSequence
          topCollegeSequence
          collegeSequence
        }
      }
    }
  }
`;

export const getAllCities = gql`
  query getAllCities {
    cities {
      data {
        attributes {
          city
        }
      }
    }
  }
`;

export const getAllStates = gql`
  query getAllStates {
    states {
      data {
        attributes {
          state
        }
      }
    }
  }
`;

export const getAllCollegeTypes = gql`
  query getAllCollegeTypes {
    collegeTypes {
      data {
        attributes {
          collegeType
        }
      }
    }
  }
`;
export const getAllAffiliations = gql`
  query getAllAffiliations {
    organizations {
      data {
        attributes {
          organization
        }
      }
    }
  }
`;

export const getAllGenders = gql`
  query getAllGenders {
    genders {
      data {
        attributes {
          gender
        }
      }
    }
  }
`;

export const getAllCourses = gql`
  query getAllCourses {
    courses {
      data {
        attributes {
          breadCrumb
        }
      }
    }
  }
`;

export const getAllStreams = gql`
  query getAllStreams {
    streams {
      data {
        attributes {
          stream
        }
      }
    }
  }
`;

export const getCollegeListingPageBanner = gql`
  query getCollegeListingPageBanner {
    colleges {
      meta {
        pagination {
          total
        }
      }
    }
    colleges {
      meta {
        pagination {
          total
        }
      }
    }
    collegeListingPages {
      data {
        id
        attributes {
          bgImg {
            data {
              attributes {
                url
              }
            }
          }
          title
          photos {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllExamsAccepted = gql`
  query getAllExamsAccepted {
    exams {
      data {
        attributes {
          breadCrumb
        }
      }
    }
  }
`;
