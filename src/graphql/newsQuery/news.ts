import { gql } from "@apollo/client";

export const getAllNews = gql`
  query getAllNews($searchNewsByTitle: String, $page: Int, $pageSize: Int) {
    news(
      pagination: { page: $page, pageSize: $pageSize }
      filters: { title: { containsi: $searchNewsByTitle } }
      sort: "updatedAt:desc"
    ) {
      meta {
        pagination {
          total
        }
      }
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
  }
`;

export const getAllNewsNotifications = gql`
  query getAllNewsNotifications {
    news(filters: { isNotificationDisplay: { eq: true } }) {
      meta {
        pagination {
          total
        }
      }
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
          bgImage {
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
          notificationDisplaySequence
          updatedAt
        }
      }
    }
  }
`;