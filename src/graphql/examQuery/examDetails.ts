import { gql } from "@apollo/client";

export const getExamDetailsBanner = gql`
  query getExamDetailsBanner($ID: ID!) {
    exam(id: $ID) {
      data {
        id
        attributes {
          breadCrumb
          examName
          titleAddition
          brochureFile {
            data {
              attributes {
                url
              }
            }
          }
          logo {
            data {
              attributes {
                url
              }
            }
          }
          updatedAt
        }
      }
    }
  }
`;

export const getExamDetails = gql`query getExamDetails($ID: ID!) {
    exam(id: $ID) {
      data {
        id
        attributes {
          logo {
            data {
              attributes {
                url
              }
            }
          }
          bg {
            data {
              attributes {
                url
              }
            }
          }
          examName
          breadCrumb
          streams {
            data {
              attributes {
                stream
              }
            }
          }
          eligibilityLevels {
            data {
              id
              attributes {
                eligibilityLevel
              }
            }
          }
          mode {
            data {
              attributes {
                examMode
              }
            }
          }
          category {
            data {
              attributes {
                category
              }
            }
          }
          examDate {
            startDate
            endDate
          }
          applicationSubmissionDates {
            startDate
            endDate
          }
          ExaminationLevel {
            data {
              attributes {
                ExaminationLevel
              }
            }
          }
          news {
            data {
              attributes {
          icon {
            data {
              id
              attributes {
                url
              }
            }
          }
          title
          excerpt
          category {
            data {
              id
              attributes {
                category
              }
            }
          }
          bgImage {
            data {
              id
              attributes {
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
          slug
          newsSequence
          updatedAt
        }
            }
          }
          navbars {
            data {
              attributes {
                navItem
              }
            }
          }
          brochureFile {
            data {
              attributes {
                url
              }
            }
          }
          updatedAt
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
              id
              title {
                t1
                t2
                t3
              }
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
            description
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
