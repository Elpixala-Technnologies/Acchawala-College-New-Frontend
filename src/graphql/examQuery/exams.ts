import { gql } from "@apollo/client";

export const getAllExams = gql`
  query getAllExams(
    $searchByExamName: String
    $modes: [String]
    $eligibilityLevels: [String]
    $ExaminationLevels: [String]
    $streams: [String]
    $examSortingParameter: [String]
    $page: Int
    $pageSize: Int
  ) {
    exams(
      sort: $examSortingParameter
      filters: {
        examName: { containsi: $searchByExamName }
        streams: { stream: { in: $streams } }
        ExaminationLevel: { ExaminationLevel: { in: $ExaminationLevels } }
        eligibilityLevel: { eligibilityLevel: { in: $eligibilityLevels } }
        mode: { examMode: { in: $modes } }
      }
      pagination: { page: $page, pageSize: $pageSize }
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
          examName
          examSequence
          description
          bg {
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
          logo {
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
          examDate {
            startDate
            endDate
          }
          mode {
            data {
              id
              attributes {
                examMode
              }
            }
          }
          ExaminationLevel {
            data {
              id
              attributes {
                ExaminationLevel
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
          brochureFile {
            data {
              id
              attributes {
                url
              }
            }
          }
          applicationSubmissionDates {
            startDate
            endDate
          }
        }
      }
    }
  }
`;

export const getAllStreams = gql`
  query getAllStreams {
    streams {
      data {
        attributes {
          stream
        }
      }
    }
  }
`;

export const getAllExaminationLevels = gql`
  query getAllExaminationLevels {
    examinationLevels {
      data {
        attributes {
          ExaminationLevel
        }
      }
    }
  }
`;

export const getAllEligibilityLevels = gql`
  query getAllEligibilityLevels {
    eligibilityLevels {
      data {
        attributes {
          eligibilityLevel
        }
      }
    }
  }
`;

export const getAllExamModes = gql`
  query getAllExamModes {
    examModes {
      data {
        id
        attributes {
          examMode
        }
      }
    }
  }
`;

export const getAllExamSortingParameters = gql`
  query getAllExamSortingParameters {
    exams {
      data {
        attributes {
          breadCrumb
          examSequence
        }
      }
    }
  }
`;

export const getExamListingPageBanner = gql`
  query getExamListingPageBanner {
    exams {
      meta {
        pagination {
          total
        }
      }
    }
    examListingPages {
      data {
        attributes {
          bgImg {
            data {
              attributes {
                alternativeText
                width
                height
                url
              }
            }
          }
          title
          photos {
            data {
              attributes {
                alternativeText
                width
                height
                url
              }
            }
          }
        }
      }
    }
  }
`;
