import { gql } from "@apollo/client";

export const allCourses = gql`
  query allCourses {
    courses {
      data {
        id
        attributes {
          breadCrumb
        }
      }
    }
  }
`;
export const allStates = gql`
  query allStates {
    states {
      data {
        id
        attributes {
          state
        }
      }
    }
  }
`;
export const allCityRelatedToStateSelected = gql`
  query allCityRelatedToStateSelected($stateId: ID!) {
    cities(filters: { state: { id: { eq: $stateId } } }) {
      data {
        id
        attributes {
          city
        }
      }
    }
  }
`;

export const registerUserQuery = gql`
  mutation registerUser(
    $username: String!
    $email: String
    $phoneNumber: String!
    $dob: Date
    $course: ID
    $state: ID
    $city: ID
  ) {
    registerUser(
      input: {
        username: $username
        email: $email
        phoneNumber: $phoneNumber
        dob: $dob
        course: $course
        state: $state
        city: $city
      }
    ) {
      status
      message
    }
  }
`;

export const verifyOTPQuery = gql`
  query verifyOTP($phoneNumber: String, $otp: String) {
    verifyOTP(input: { phoneNumber: $phoneNumber, otp: $otp }) {
      __typename
      ... on UserProfileEntityResponse {
        data {
          id
          attributes {
            username
            email
            phoneNumber
            roles
            permissions
            token
          }
        }
      }
      ... on verifyOTPErrorEntity {
        status
        message
      }
    }
  }
`;

export const checkUserOTP = gql`
  query checkUserOTP($userID: ID!, $number: Long!, $userOtp: Long) {
    usersPermissionsUsers(
      filters: {
        and: [
          {
            id: { eq: $userID }
            otp: { eq: $userOtp }
            phoneNumber: { eq: $number }
          }
        ]
      }
    ) {
      data {
        id
        attributes {
          email
          phoneNumber
          username
        }
      }
    }
  }
`;

export const getUserFormId = gql`
  query getUserFormId($userID: ID!) {
    usersPermissionsUser(id: $userID) {
      data {
        attributes {
          userForm {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const generateOTPQuery = gql`
  query generateOTP($phoneNumber: String, $isResend: Boolean) {
    generateOTP(input: { phoneNumber: $phoneNumber, isResend_otp: $isResend }) {
      status
      message
    }
  }
`;

export const updateUser = gql`
  mutation updateUser($id: ID!, $otp: Long!) {
    updateUsersPermissionsUser(id: $id, data: { otp: $otp }) {
      data {
        id
        attributes {
          username
          email
        }
      }
    }
  }
`;

export const checkUser = gql`
  query UsersData($number: String, $email: String) {
    usersData(
      filters: { or: [{ number: { eq: $number } }, { email: { eq: $email } }] }
    ) {
      data {
        id
        attributes {
          name
          email
          number
        }
      }
    }
  }
`;
// {
//   "input":{
//     "phoneNumber": "8318346886",
//     "otp":"608188"
// }
// }

// {
//   "input": {
//     "name": "Simran",
//     "email": "simran@example.com",
//     "phoneNumber": "8318346886"
//   }
// }

// {
//   "data": {
//     "verifyOTP": {
//       "__typename": "UserProfileEntityResponse",
//       "data": {
//         "id": "11",
//         "attributes": {
//           "name": null,
//           "username": "simran@example.com",
//           "email": "simran@example.com",
//           "phoneNumber": "8318346886",
//           "roles": [
//             "student-default-role"
//           ],
//           "permissions": [],
//           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInJvbGUiOlsic3R1ZGVudC1kZWZhdWx0LXJvbGUiXSwicGVybWlzc2lvbiI6W10sImlhdCI6MTcyMTgwNzEyMiwiZXhwIjoxNzI0Mzk5MTIyfQ.7dpFxDR0xDeusCCN0Vo248ood5SeRvz0y6_SSiyHnls"
//         }
//       }
//     }
//   }
// }

// {
//   "data": {
//     "registerUser": {
//       "status": 200,
//       "message": "User registered successfully"
//     }
//   }
// }
