import { gql } from "@apollo/client";

export const getHomePage1 = gql`
  query getHomePage1 {
    homePages {
      data {
        attributes {
          HeroSection {
            title {
              t1
              t2
              t3
            }
            text
          }
          text1
          text2
          text3
          text4
          text5
          metricData {
            title
            text
            students
            experts
            newUsers
            teams
          }
          eventsAndWebinars {
            image {
              data {
                attributes {
                  alternativeText
                  width
                  height
                  url
                }
              }
            }
            text
            href
          }

          faqs {
            id
            question
            answer
          }
          testimonials {
            title {
              t1
              t2
              t3
            }
            text1
            testimonialCards {
              id
              userName
              userAvatar {
                data {
                  attributes {
                    alternativeText
                    width
                    height
                    url
                  }
                }
              }
              college
              star
              comment
              storyVideoLink
            }
          }
        }
      }
    }
  }
`;

export const getHomePage2 = gql`
  query getHomePage2 {
    homePages {
      data {
        attributes {
          collegeLogos {
            college {
              data {
                id
                attributes {
                  collegeLogo {
                    data {
                      id
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
          }

          counsellingPackages {
            id
            title
            text
            counsellingPackagesCards {
              id
              PackageName
              isPopular
              price
              text
              lists {
                data {
                  attributes {
                    isInclude
                    text
                  }
                }
              }
              button {
                data {
                  id
                  attributes {
                    text
                    href
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const homePageSearch = gql`
  query homePageSearch($globalSearch: String) {
    colleges(
      filters: {
        or: [
          { collegeName: { containsi: $globalSearch } }
          { breadCrumb: { containsi: $globalSearch } }
        ]
      }
    ) {
      data {
        id
        attributes {
          collegeName
          collegeLogo {
            data {
              id
              attributes {
                url
              }
            }
          }
        }
      }
    }
    courses(
      filters: {
        or: [
          { courseName: { containsi: $globalSearch } }
          { breadCrumb: { containsi: $globalSearch } }
        ]
      }
    ) {
      data {
        id
        attributes {
          bgImage {
            data {
              id
              attributes {
                url
              }
            }
          }
          courseName
        }
      }
    }
    exams(
      filters: {
        or: [
          { examName: { containsi: $globalSearch } }
          { breadCrumb: { containsi: $globalSearch } }
        ]
      }
    ) {
      data {
        id
        attributes {
          logo {
            data {
              id
              attributes {
                url
              }
            }
          }
          examName
        }
      }
    }
    news(
      filters: {
        or: [
          { title: { containsi: $globalSearch } }
          { excerpt: { containsi: $globalSearch } }
        ]
      }
    ) {
      data {
        id
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
        }
      }
    }
  }
`;