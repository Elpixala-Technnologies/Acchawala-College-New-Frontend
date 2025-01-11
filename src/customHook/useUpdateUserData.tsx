import { useMutation, ApolloError } from "@apollo/client";
import { DocumentNode } from "graphql";
import { useAppSelector } from "@/Redux";
import { updateUserProfileData } from "@/graphql/profileQuery/profile";

type UserDataInput = {
  username?: string;
  gender?: string;
  dob?: string;
  course?: any;
  state?: any;
  city?: any;
  GraduationEducationalDetails?: any;
  twelfthEducationalDetails?: any;
  tenthEducationalDetails?: any;
  appearingEntranceExam?: string;
  entranceExamName?: string;
  entranceExamScore?: number;
  collegesApplying?: any[];
  workExperience?: any[];
  studyAbroad?: any[];
};

const useUpdateUserData = () => {
  const userId = useAppSelector((state) => state.auth.userID);
  const jwt = useAppSelector((state) => state.auth.token);

  const [updateUser, { loading, error, data }] = useMutation<DocumentNode>(
    updateUserProfileData,
    {
      context: {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
      onCompleted: (data) => {
        // Handle success
        console.log("Update Success:", data);
      },
      onError: (error: ApolloError) => {
        // Handle error
        console.error("Update Error:", error);
      },
    },
  );

  const updateUserData = async (userData: UserDataInput) => {
    try {
      await updateUser({
        variables: {
          id: userId,
          ...userData,
        },
      });
    } catch (err) {
      console.error("Update Failed:", err);
      if (err instanceof ApolloError) {
        console.error("Update Error:", err.message);
        console.error("GraphQL Errors:", err.graphQLErrors);
        console.error("Network Error:", err.networkError);
      }
    }
  };

  return { updateUserData, loading, error, data };
};

export default useUpdateUserData;
