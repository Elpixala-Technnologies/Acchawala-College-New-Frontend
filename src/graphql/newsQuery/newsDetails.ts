import { gql } from "@apollo/client";

export const getNewsDetails = gql`
  query getNewsDetails($ID: ID!) {
    new(id: $ID) {
      data {
        id
        attributes {
          title
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
          content
          updatedAt
        }
      }
    }
  }
`;
