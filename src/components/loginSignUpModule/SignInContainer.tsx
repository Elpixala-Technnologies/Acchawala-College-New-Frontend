"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { Input } from "./Input";
import { FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import useUserSignUp from "@/customHook/useSignup";
import { useAppDispatch } from "@/Redux";
import { setAuthState } from "@/Redux/authSlice";

type ID = number | null;

interface UserSubmittedData {
  number: string;
}

export function SignInContainer({
  setIsLoginModule,
  isLoginModule,
  closePopup,
}: any) {
  const router = useRouter();
  const { checkOTP, generateOTP } = useUserSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [userSubmittedData, setUserSubmittedData] = useState<UserSubmittedData>(
    { number: "" },
  );
  const [userOtp, setUserOtp] = useState("");
  const [userId, setUserId] = useState<ID>();
  const [isOtp, setIsOtp] = useState(false);
  const dispatch = useAppDispatch();

  async function sendLogInOtp(data: any) {
    setUserSubmittedData(data);
    const registerResponse = await generateOTP({
      variables: {
        phoneNumber: data?.number,
      },
    });
    // console.log(registerResponse);
    if (registerResponse?.data?.generateOTP?.status === 200) {
      setIsOtp(true);
    } else {
      setError(registerResponse?.data?.generateOTP?.message);
    }
  }

  async function handleSubmitLogIn() {
    try {
      const otpChecker = await checkOTP({
        variables: {
          phoneNumber: userSubmittedData?.number,
          otp: userOtp,
        },
      });

      if (otpChecker?.data) {
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

  const handleFormSubmit = async (data: any) => {
    isOtp ? handleSubmitLogIn() : sendLogInOtp(data);
  };

  const mobileRegex = /^[0-9]{10}$/;

  return (
    <div className="flex h-full flex-col overflow-y-auto p-6 py-10 text-black [flex:6] sm:relative md:justify-center">
      <button
        className="absolute right-[0.05rem] top-[0.05rem] w-max p-3 text-lg font-normal text-zinc-600 hover:underline"
        onClick={closePopup}
        type="button"
      >
        <ImCross />
      </button>
      <h2 className="mb-8 text-3xl font-semibold max-sm:text-center">
        Confused with the Admission process to your dream college? Register with
        us{" "}
      </h2>
      <h3 className="text-xl">Continue with mobile </h3>
      <p className="text-xs">
        You&apos;ll receive a 4 digit code to verify next
      </p>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {isOtp ? (
          <>
            <p className="mt-5 flex gap-x-2">
              <span>OTP will be sent to </span>
              <span className="text-xl font-bold text-orange-500">
                {userSubmittedData?.number || 999999999}
              </span>
              <span onClick={() => setIsOtp((prev) => !prev)}>
                <FaRegEdit className="text-orange-500" />
              </span>
            </p>
            <div className="otp mb-5">
              <OtpInput
                inputType="tel"
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
              />
            </div>
          </>
        ) : (
          <>
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
            {errors.number && typeof errors.number.message === "string" && (
              <p className="text-xs text-red-600">{errors.number.message}</p>
            )}
          </>
        )}

        <div className="mt-5 flex items-center">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              {...register("isWhatsappNo")}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-orange-300 dark:border-gray-600 dark:bg-orange-600 dark:peer-focus:ring-orange-800"></div>
          </label>
          <span className="ml-3 font-sans text-sm leading-normal text-inherit antialiased">
            Enable updated & important information on Whatsapp.
          </span>
        </div>

        <button
          className="mt-8 w-full rounded-lg bg-gradient-to-b from-[#FF772B] to-[#fd6107] px-3 py-2 text-white outline-none duration-200 hover:font-bold active:scale-95"
          type="submit"
        >
          {isOtp ? "LogIn" : "Send OTP"}
        </button>
        {isOtp && (
          <button className="text-smbg-gradient-to-b mt-5 from-[#FF772B] to-[#fd6107] hover:underline active:scale-95">
            Resend OTP
          </button>
        )}
      </form>

      <p className="mt-2 text-center font-sans text-sm font-medium leading-normal text-inherit text-zinc-600 antialiased">
        Your personal information is secured with us
      </p>
      <p className="mt-6 w-full text-left font-sans text-base font-bold leading-normal text-zinc-600 antialiased">
        New on CollegeDakhla?
        <span
          onClick={() => setIsLoginModule(!isLoginModule)}
          className="ml-1 cursor-pointer text-orange-500 hover:underline"
        >
          SignUp Now!
        </span>
      </p>
      {error && <p className="mt-5 text-center text-red-600">{error}</p>}
    </div>
  );
}
