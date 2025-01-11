import { gql } from "@apollo/client";

export const createCollegeReviewsAndRating = gql`
  mutation createCollegeReviewsAndRating($data: CollegeReviewsAndRatingInput!) {
    createCollegeReviewsAndRating(data: $data) {
      data {
        attributes {
          CollegeReviewsAndRatings {
            overall {
              description
            }
            Academics {
              rating
              description
            }
            Faculty {
              rating
              description
            }
            Infrastructure {
              rating
              description
            }
            SocialLife {
              rating
              description
            }
            Placement {
              rating
              description
            }
            user {
              data {
                attributes {
                  username
                }
              }
            }
            college {
              data {
                attributes {
                  breadCrumb
                }
              }
            }
          }
          publishedAt
        }
      }
    }
  }
`;

export const updateCollegeReviewsAndRating = gql`
  mutation updateCollegeReviewsAndRating(
    $id: ID!
    $data: CollegeReviewsAndRatingInput!
  ) {
    updateCollegeReviewsAndRating(id: $id, data: $data) {
      data {
        attributes {
          CollegeReviewsAndRatings {
            overall {
              description
            }
            Academics {
              rating
              description
            }
            Faculty {
              rating
              description
            }
            Infrastructure {
              rating
              description
            }
            SocialLife {
              rating
              description
            }
            Placement {
              rating
              description
            }
            user {
              data {
                attributes {
                  username
                }
              }
            }
            college {
              data {
                attributes {
                  breadCrumb
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const deleteCollegeReviewsAndRating = gql`
  mutation deleteCollegeReviewsAndRating($id: ID!) {
    deleteCollegeReviewsAndRating(id: $id) {
      data {
        attributes {
          CollegeReviewsAndRatings {
            overall {
              description
            }
            Academics {
              rating
              description
            }
            Faculty {
              rating
              description
            }
            Infrastructure {
              rating
              description
            }
            SocialLife {
              rating
              description
            }
            Placement {
              rating
              description
            }
            user {
              data {
                attributes {
                  username
                }
              }
            }
            college {
              data {
                attributes {
                  breadCrumb
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getCollegeReviewsAndRatingByID = gql`
  query getCollegeReviewsAndRating($id: ID!) {
    collegeReviewsAndRating(id: $id) {
      data {
        attributes {
          CollegeReviewsAndRatings {
            overall {
              description
            }
            Academics {
              rating
              description
            }
            Faculty {
              rating
              description
            }
            Infrastructure {
              rating
              description
            }
            SocialLife {
              rating
              description
            }
            Placement {
              rating
              description
            }
            user {
              data {
                attributes {
                  username
                }
              }
            }
            college {
              data {
                attributes {
                  breadCrumb
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const getAllCollegeReviewsAndRating = gql`
  query getAllCollegeReviewsAndRating {
    collegeReviewsAndRatings {
      data {
        attributes {
          CollegeReviewsAndRatings {
            overall {
              description
            }
            Academics {
              rating
              description
            }
            Faculty {
              rating
              description
            }
            Infrastructure {
              rating
              description
            }
            SocialLife {
              rating
              description
            }
            Placement {
              rating
              description
            }
            user {
              data {
                attributes {
                  username
                }
              }
            }
            college {
              data {
                attributes {
                  breadCrumb
                }
              }
            }
          }
        }
      }
    }
  }
`;

// {
//     "data": {
//       "CollegeReviewsAndRatings": {
//         "overall": {
//           "description": "Good"
//         },
//         "Academics": {
//           "rating": "4",
//           "description": "Strong academic curriculum"
//         },
//         "Faculty": {
//           "rating": "5",
//           "description": "Highly qualified faculty"
//         },
//         "Infrastructure": {
//           "rating": "4",
//           "description": "Modern infrastructure"
//         },
//         "SocialLife": {
//           "rating": "3",
//           "description": "Active social scene"
//         },
//         "Placement": {
//           "rating": "5",
//           "description": "Excellent placement opportunities"
//         },
//         "user": 2,
//         "college": 1
//       },
//       "publishedAt": "2024-08-07T08:32:28.000Z"
//     }
//   }
