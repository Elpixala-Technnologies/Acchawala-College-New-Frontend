import { ID } from "@/types/global";
import {
  getUserFormId,
  checkUserOTP,
  registerUserQuery,
  verifyOTPQuery,
  generateOTPQuery,
} from "@/graphql/authQuery/signup";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";

const UserCheck = (number: string, email: string) => {
  const { loading, error, data } = useQuery<any>(checkUserOTP, {
    variables: {
      number,
      email,
    },
    skip: number.length !== 10,
  });

  return {
    error,
    loading,
    userData: data?.usersData,
  };
};

const GetUserDataMetaId = (userID: any) => {
  const { loading, error, data } = useQuery<any>(getUserFormId, {
    variables: { userID },
  });

  const userMetaDataId: ID = Number(
    data?.userData?.data?.attributes?.users_meta_data?.data?.id,
  );

  return userMetaDataId;
};

const useUserSignUp = () => {
  const [
    registerUser,
    { loading: registerLoading, error: registerError, data: registerData },
  ] = useMutation<any>(registerUserQuery);
  const [
    generateOTP,
    { loading: sendOtpLoading, error: sendOtpError, data: sendOtpData },
  ] = useLazyQuery<any>(generateOTPQuery);
  const [
    checkOTP,
    { loading: verifyOtpLoading, error: verifyOtpError, data: verifyOtpData },
  ] = useLazyQuery<any>(verifyOTPQuery);

  return { UserCheck, GetUserDataMetaId, checkOTP, registerUser, generateOTP };
};

export default useUserSignUp;
