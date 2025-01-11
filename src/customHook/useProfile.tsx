import { getUserData } from "@/graphql/profileQuery/profile";
import { useAppSelector } from "@/Redux";
import { useQuery } from "@apollo/client";

// Custom hook to fetch user data
const useUserData = () => {
  // Get user ID and JWT from Redux store
  const userId = useAppSelector((state) => state.auth.userID);
  const jwt = useAppSelector((state) => state.auth.token);

  // Use Apollo's useQuery hook
  const { data, loading, error, refetch } = useQuery(getUserData, {
    variables: { ID: userId },
    context: {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    },
    skip: !userId, // Skip query if userId is not available
  });

  return {
    data: data?.usersPermissionsUser?.data,
    loading,
    error,
    refetch,
  };
};

export default useUserData;
