import { gql } from "@apollo/client";

export const getAllFeaturedColleges = gql`
  query ($page: Int, $pageSize: Int) {
    colleges(
      filters: { isFeatured: { eq: true } }
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          slug
          breadCrumb
          isFeatured
          collegeLogo {
            data {
              id
              attributes {
                alternativeText
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
          navbars {
            data {
              id
              attributes {
                navItem
              }
            }
          }
          allCourses {
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
          }
          estYear
          avgPackage
          hightestPackage
          topCollegeSequence
        }
      }
    }
  }
`;