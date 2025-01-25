import { gql } from "@apollo/client";

export const getCourseDetailsBanner = gql`
  query getCourseDetailsBanner($ID: ID!) {
    course(id: $ID) {
      data {
        id
        attributes {
          slug
          breadCrumb
          courseName
          titleAddition
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
        }
      }
    }
  }
`;

export const getCourseDetails = gql`
query getCourseDetails($ID: ID!) {
    course(id: $ID) {
      data {
        id
        attributes {
          slug
          breadCrumb
          courseName

          description
          updatedAt
          courseType {
            data {
              id
              attributes {
                courseType
              }
            }
          }
          course_mode {
            data {
              id
              attributes {
                courseMode
              }
            }
          }
          courseSequence
          news {
            data {
              attributes {
                excerpt
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
          courseLevel {
            data {
              id
              attributes {
                courseLevel
              }
            }
          }
          streams {
            data {
              id
              attributes {
                stream
              }
            }
          }
          PageData {
            ... on ComponentCommonTextEditor {
              id
              title {
                t1
                t2
                t3
              }

              editorText: text
              headingIcon {
                data {
                  id
                  attributes {
                    width
                    height
                    url
                  }
                }
              }
              navItem {
                data {
                  id
                  attributes {
                    navItem
                  }
                }
              }
            }
            ... on ComponentCommonFaqComponent {
              id
              title {
                t1
                t2
                t3
              }
              Questions {
                id
                question
                answer
              }
              navItem {
                data {
                  id
                  attributes {
                    navItem
                  }
                }
              }
            }
            ... on ComponentCommonBannerComponent {
              id
              bannerImage {
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
              bannerText: text
              href
              bannerTitle
              navItem {
                data {
                  id
                  attributes {
                    navItem
                  }
                }
              }
            }
            ... on ComponentCommonNewsComponent {
              id
              title {
                t1
                t2
                t3
              }
              headingIcon {
                data {
                  id
                  attributes {
                    width
                    height
                    url
                  }
                }
              }
              newsText: text
              navItem {
                data {
                  id
                  attributes {
                    navItem
                  }
                }
              }
            }
            ... on ComponentCommonAccordionComponent {
              accordion {
                title
                text
              }
              accordionText: text
              navItem {
                data {
                  attributes {
                    navItem
                  }
                }
              }
            }
          }
          bgImage {
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
          author {
            data {
              id
              attributes {
                avatar {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
                name
                designation
              }
            }
          }
        }
      }
    }
  }`;
