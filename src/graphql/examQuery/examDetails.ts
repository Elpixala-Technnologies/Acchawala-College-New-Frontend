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

export const getExamDetails = gql`
  query getExamDetails($ID: ID!) {
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
          streams {
            data {
              attributes {
                stream
              }
            }
          }
          eligibilityLevel {
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
                title
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
          videoGalleryTitle {
            title {
              t1
              t2
              t3
            }
          }
          videoGallery {
            category
            video {
              data {
                attributes {
                  videoId
                }
              }
            }
          }
          imageGalleryTitle {
            title {
              t1
              t2
              t3
            }
          }
          imageGallery {
            category
            images {
              data {
                attributes {
                  url
                }
              }
            }
          }
          ExamReviewsAndRatings {
            userName
            overall {
              description
            }
            DifficultyLevel {
              rating
              description
            }
            SyllabusCoverage {
              rating
              description
            }
            ExamPattern {
              rating
              description
            }
            PreparationResources {
              rating
              description
            }
            FairnessandTransparency {
              rating
              description
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
            ... on ComponentCommonReviewsComponent {
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
              reviewsText: text
              navItem {
                data {
                  id
                  attributes {
                    navItem
                  }
                }
              }
            }
            ... on ComponentCommonGalleryComponent {
              id
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
              galleryText: text
              imageGallery {
                id
                category
                images {
                  data {
                    id
                    attributes {
                      url
                    }
                  }
                }
              }
              title {
                t1
                t2
                t3
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
            ... on ComponentCommonMainGalleryComponent {
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
              mainGalleryText: text
              navItem {
                data {
                  id
                  attributes {
                    navItem
                  }
                }
              }
            }
            ... on ComponentCommonVideoComponent {
              id
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
              videoText: text
              title {
                t1
                t2
                t3
              }
              videoGallery {
                id
                category
                video {
                  data {
                    id
                    attributes {
                      videoId
                    }
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
            ... on ComponentCommonReviewDescriptionComponent {
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
                    alternativeText
                    width
                    height
                    url
                  }
                }
              }
              reviewDescriptionText: text
              navbar {
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
