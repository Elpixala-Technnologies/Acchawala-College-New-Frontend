import { gql } from "@apollo/client";

export const getAllTopColleges = gql`
  query getAllTopColleges($page: Int, $pageSize: Int) {
    colleges(
      filters: { isTopCollege: { eq: true } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "topCollegeSequence:asc"
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
          imageGallery {
            images {
              data {
                attributes {
                  url
                }
              }
            }
          }
          collegeLogo {
            data {
              id
              attributes {
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
                  examName
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
