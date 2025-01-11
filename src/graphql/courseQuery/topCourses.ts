import { gql } from "@apollo/client";

export const getAllTopCourses = gql`
  query getAllTopCourses($page: Int, $pageSize: Int) {
    courses(
      filters: { isPopular: { eq: true } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "popularSequence:asc"
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
          breadCrumb
          isPopular
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
        }
      }
    }
  }
`;
