import { gql } from "@apollo/client";

export const getAllCourses = gql`
  query getAllCourses(
    $sortingParameter: [String]
    $modes: [String]
    $duration: Long
    $searchByCourseName: String
    $page: Int
    $pageSize: Int
  ) {
    courses(
      sort: $sortingParameter
      filters: {
        courseName: { containsi: $searchByCourseName }
        course_mode: { courseMode: { in: $modes } }
        duration: { duration: { lte: $duration } }
      }
      pagination: { page: $page, pageSize: $pageSize }
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
          courseName
          courseSequence
          bgImage {
            data {
              id
              attributes {
                url
              }
            }
          }
          courseType {
            data {
              id
              attributes {
                courseType
              }
            }
          }

          description
          duration {
            data {
              id
              attributes {
                duration
              }
            }
          }
          avgFees {
            from
            to
          }
          courseLevel {
            data {
              id
              attributes {
                courseLevel
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
          colleges {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const getAllModes = gql`
  query getAllModes {
    courseModes {
      data {
        id
        attributes {
          courseMode
        }
      }
    }
  }
`;

export const getAllDurations = gql`
  query getAllDurations {
    durations {
      data {
        id
        attributes {
          duration
        }
      }
    }
  }
`;

export const getAllCourseSortingParameters = gql`
  query getAllCourseSortingParameters {
    courses {
      data {
        attributes {
          courseSequence
          breadCrumb
          popularSequence
        }
      }
    }
  }
`;

export const getCourseListingPageBanner = gql`
  query getCourseListingPageBanner {
    courses {
      meta {
        pagination {
          total
        }
      }
    }
    courseListingPages {
      data {
        id
        attributes {
          bgImg {
            data {
              attributes {
                alternativeText
                width
                height
                url
              }
            }
          }
          title
          photos {
            data {
              attributes {
                alternativeText
                width
                height
                url
              }
            }
          }
        }
      }
    }
  }
`;
