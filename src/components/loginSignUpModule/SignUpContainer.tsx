"use client";
type ID = number | null;
import {
  allCityRelatedToStateSelected,
  allCourses,
  allStates,
} from "@/graphql/authQuery/signup";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { ImCross } from "react-icons/im";
import { useAppDispatch } from "@/Redux";
import { setAuthState } from "@/Redux/authSlice";
import { Input } from "./Input";
import useUserSignUp from "@/customHook/useSignup";

interface UserSubmittedData {
  name: string;
  email: string;
  number: string;
  dob: string;
  course: ID | string;
  state: ID | string;
  city: ID | string;
  isWhatsappNo?: boolean;
}

export function SignUpContainer({
  setIsLoginModule,
  isLoginModule,
  closePopup,
}: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserSubmittedData>();

  const [error, setError] = useState("");
  const [userSubmittedData, setUserSubmittedData] = useState<UserSubmittedData>(
    {
      name: "",
      email: "",
      number: "",
      dob: "",
      course: "",
      state: "",
      city: "",
    },
  );
  const [userOtp, setUserOtp] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const { checkOTP, registerUser } = useUserSignUp();
  const [userId, setUserId] = useState<ID>();
  const [selectedStateId, setSelectedStateId] = useState<any>();
  //  ================================================================== //
  const {
    loading: allCoursesLoading,
    error: allCoursesError,
    data: allCoursesData,
  } = useQuery(allCourses);
  const {
    loading: allStatesLoading,
    error: allStatesError,
    data: allStatesData,
  } = useQuery(allStates);
  const {
    loading: cityRelatedLoading,
    error: cityRelatedError,
    data: cityRelatedData,
  } = useQuery(allCityRelatedToStateSelected, {
    variables: { stateId: selectedStateId },
  });
  //  ================================================================== //
  const sendSignUpOtp = async (data: UserSubmittedData) => {
    // console.log(data);
    setUserSubmittedData(data);
    // console.log(userSubmittedData);
    const registerResponse = await registerUser({
      variables: {
        username: data?.name,
        email: data?.email,
        phoneNumber: data?.number,
        dob: data?.dob,
        course: data?.course ? Number(data?.course) : null,
        state: data?.state ? Number(data?.state) : null,
        city: data?.city ? Number(data?.city) : null,
      },
    });
    if (registerResponse?.data?.registerUser?.status === 200) {
      setIsOtp(true);
    } else {
      // console.log(registerResponse?.data?.registerUser?.message);
      setError(registerResponse?.data?.registerUser?.message);
    }
  };

  async function handleSubmitSignUp() {
    try {
      const otpChecker = await checkOTP({
        variables: {
          phoneNumber: userSubmittedData?.number,
          otp: userOtp, // Ensure this matches the query variable
        },
      });

      if (
        otpChecker?.data &&
        otpChecker?.data?.verifyOTP?.__typename === "UserProfileEntityResponse"
      ) {
        const userData = otpChecker?.data?.verifyOTP?.data;

        setIsLoginModule(false);
        setUserId(userData?.id);
        dispatch(
          setAuthState({
            authState: true,
            userID: userData?.id,
            userName: userData?.attributes?.username,
            email: userData?.attributes?.email,
            number: userData?.attributes?.phoneNumber,
            token: userData?.attributes?.token,
          }),
        );
        // console.log(
        //   "user signed up successfully",
        //   userData.attributes.username,
        // );
        closePopup();
        router.push("/");
      } else if (
        otpChecker?.data &&
        otpChecker?.data?.verifyOTP?.__typename === "verifyOTPErrorEntity"
      ) {
        setError(otpChecker?.data?.verifyOTP?.message);
      }
    } catch (error) {
      setError("Failed to verify OTP");
    }
  }

  const handleFormSubmit = async (data: UserSubmittedData) => {
    isOtp ? handleSubmitSignUp() : sendSignUpOtp(data);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;

  return (
    <div className="flex min-h-[90vh] flex-col overflow-y-auto rounded-b rounded-r p-8 text-black [flex:6] sm:relative md:justify-center">
      <button
        className="absolute right-[0.05rem] top-[0.05rem] w-max p-3 text-lg font-normal text-zinc-600 hover:underline"
        onClick={closePopup}
        type="button"
      >
        <ImCross />
      </button>
      <h1 className="text-2xl font-bold text-zinc-800">To Sign Up,</h1>
      <p>Please enter the following details</p>
      <p className="text-md mt-1 flex w-full font-sans font-semibold leading-normal text-inherit text-zinc-600 antialiased">
        Already have an account?
        <span
          onClick={() => setIsLoginModule(!isLoginModule)}
          className="ml-1 block cursor-pointer font-sans font-bold leading-normal text-orange-600 antialiased hover:underline"
        >
          LogIn Now!
        </span>
      </p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {isOtp ? (
          <>
            <p className="mt-5">
              <span>Enter OTP sent to </span>
              <span className="text-xl font-bold text-orange-500">
                {userSubmittedData.number}
              </span>
            </p>
            <div className="otp mb-5">
              <OtpInput
                value={userOtp}
                onChange={setUserOtp}
                numInputs={6}
                renderSeparator={<span className="mx-2">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="h-12 w-12 rounded-md border-2 border-gray-300 text-center text-xl focus:border-orange-500 focus:outline-none"
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                )}
                shouldAutoFocus
                inputType="tel"
              />
            </div>
          </>
        ) : (
          <>
            <Input
              label="Name"
              placeholder=" "
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <p className="text-xs text-red-600">{errors.name.message}</p>
            )}
            <Input
              label="Date of Birth"
              type="date"
              placeholder=" "
              {...register("dob", {
                required: "Date of Birth is required",
              })}
            />
            {errors.dob && (
              <p className="text-xs text-red-600">{errors.dob.message}</p>
            )}
            <Input
              label="Mobile Number"
              type="number"
              placeholder=" "
              {...register("number", {
                required: "Mobile number is required",
                pattern: {
                  value: mobileRegex,
                  message: "Please enter a valid 10-digit mobile number",
                },
              })}
            />
            {errors.number && (
              <p className="text-xs text-red-600">{errors.number.message}</p>
            )}
            <Input
              label="Email ID"
              type="email"
              placeholder=" "
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: emailRegex,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            )}
            <select
              className="mt-5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-zinc-300"
              {...register("course", {
                required: "Course selection is required",
              })}
            >
              <option value="">Select course you are interested in</option>
              {allCoursesData?.courses?.data?.map((course: any, index: any) => (
                <option value={course?.id} key={course?.id}>
                  {course?.attributes?.breadCrumb}
                </option>
              ))}
            </select>
            {errors?.course && (
              <p className="text-xs text-red-600">{errors.course.message}</p>
            )}
            <div className="mt-5 flex w-full gap-5 max-sm:flex-col">
              <div className="w-full flex-[1]">
                <select
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-zinc-300"
                  {...register("state", {
                    required: "Selecting state is required",
                  })}
                  onChange={(e) => {
                    const selectedState = allStatesData?.states?.data?.find(
                      (state: any) => state?.id === e.target.value,
                    );
                    setSelectedStateId(selectedState?.id);
                    setValue("state", e.target.value); // Update the form state
                  }}
                >
                  <option value="">State</option>
                  {allStatesData?.states?.data?.map(
                    (state: any, index: any) => (
                      <option value={state?.id} key={state?.id}>
                        {state?.attributes?.state}
                      </option>
                    ),
                  )}
                </select>
                {errors?.state && (
                  <p className="text-xs text-red-600">
                    {errors?.state.message}
                  </p>
                )}
              </div>
              <div className="w-full flex-[1]">
                <select
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-zinc-300"
                  {...register("city", {
                    required: "City selection is required",
                  })}
                >
                  <option value="">City</option>
                  {cityRelatedData?.cities?.data?.map(
                    (city: any, index: any) => (
                      <option value={city?.id} key={city?.id}>
                        {city?.attributes?.city}
                      </option>
                    ),
                  )}
                </select>
                {errors.city && (
                  <p className="text-xs text-red-600">
                    {errors?.city?.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
        <button
          className="mt-5 w-full rounded-lg bg-gradient-to-b from-[#FF772B] to-[#fd6107] px-3 py-2 text-white outline-none duration-200 hover:font-bold active:scale-95"
          type="submit"
        >
          {isOtp ? "Sign Up" : "Send OTP"}
        </button>
        <button
          className="mt-5 text-sm text-orange-600 hover:underline active:scale-95"
          type="button"
          onClick={() => sendSignUpOtp(userSubmittedData)}
        >
          {isOtp && "Resend OTP"}
        </button>
      </form>
      <p className="mt-2 text-center font-sans text-sm leading-normal text-inherit antialiased">
        Your personal information is secured with us
      </p>
      {error && <p className="mt-5 text-center text-red-600">{error}</p>}
    </div>
  );
}
