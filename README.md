"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import CryptoJS from "crypto-js";
import axios from "axios";
// import { useAppDispatch } from "@/store/store";
// import { setAuthState } from "@/store/slices/authSlice";
import { Input } from "./Input";
import { ImCross } from "react-icons/im";
import { ID } from "@/types/global";
import { useAppDispatch } from "@/Redux";
import { setAuthState } from "@/Redux/authSlice";

interface UserSubmittedData {
  name: string;
  email: string;
  number: string;
  dob: string;
  stream: string;
  courseLevel: string;
  city: string;
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
  } = useForm<UserSubmittedData>();

  const [error, setError] = useState("");
  const [userSubmittedData, setUserSubmittedData] = useState<UserSubmittedData>(
    {
      name: "",
      email: "",
      number: "",
      dob: "",
      stream: "",
      courseLevel: "",
      city: "",
      isWhatsappNo: false,
    },
  );

  const [userOtp, setUserOtp] = useState("");
  const [encryptedOtp, setEncryptedOtp] = useState("");
  const [isOtp, setIsOtp] = useState(false);

  const secretKey = "PankajIsTheBest";

  function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async function sendSignUpOtp(data: UserSubmittedData) {
    const otp = generateOtp();
    const encrypted = CryptoJS.AES.encrypt(otp, secretKey).toString();
    setEncryptedOtp(encrypted);

    try {
      const response = await axios.post(
        "https://www.fast2sms.com/dev/bulkV2",
        {
          message: `Your OTP code is ${otp}`,
          language: "english",
          route: "q",
          numbers: data.number,
          flash: 0,
        },
        {
          headers: {
            authorization: "YOUR_FAST2SMS_API_KEY",
          },
        },
      );

      setUserSubmittedData(data);
      setIsOtp(true);
    } catch (error) {
      setError("Failed to send OTP");
    }
  }

  function verifyOtp(inputOtp: string) {
    const bytes = CryptoJS.AES.decrypt(encryptedOtp, secretKey);
    const originalOtp = bytes.toString(CryptoJS.enc.Utf8);
    return inputOtp === originalOtp;
  }

  async function handleSubmitSignup() {
    if (verifyOtp(userOtp)) {
      try {
        dispatch(
          setAuthState({
            authState: true,
            userID: 12345, // Replace with actual user ID
            userName: userSubmittedData.name,
            email: userSubmittedData.email,
            number: userSubmittedData.number,
            gender: "", // Add logic to capture gender if needed
            city: userSubmittedData.city,
            interestedCourse: userSubmittedData.courseLevel,
            token: "auth-token", // Replace with actual token
          }),
        );

        closePopup();
        router.push("/");
      } catch (error) {
        setError("Failed to verify OTP");
      }
    } else {
      setError("Invalid OTP");
    }
  }

  const handleFormSubmit = async (data: UserSubmittedData) => {
    isOtp ? handleSubmitSignup() : sendSignUpOtp(data);
  };

  // Regular expressions for validation
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
                renderSeparator={<span className="mx-2"></span>}
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
              {...register("stream", {
                required: "Stream selection is required",
              })}
            >
              <option disabled={true} value="">
                Select Stream
              </option>
              {/* Map through streams data and render options here */}
              {/* {streamsData?.streams?.data?.map((stream: any, index: any) => (
                <option value={stream.id} key={index}>
                  {stream.attributes.streamName}
                </option>
              ))} */}
            </select>
            {errors.stream && (
              <p className="text-xs text-red-600">{errors.stream.message}</p>
            )}

            <select
              className="mt-5 w-[48%] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-zinc-300"
              {...register("courseLevel", {
                required: "Course level selection is required",
              })}
            >
              <option disabled={true} value="">
                Select Course Level
              </option>
              {/* Map through course level data and render options here */}
              {/* {courseLevelData?.courseLevels?.data?.map((courseLevel: any, index: any) => (
                <option value={courseLevel.id} key={index}>
                  {courseLevel.attributes.levelName}
                </option>
              ))} */}
            </select>
            {errors.courseLevel && (
              <p className="text-xs text-red-600">
                {errors.courseLevel.message}
              </p>
            )}

            <select
              className="ml-[4%] mt-5 w-[48%] rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-zinc-300"
              {...register("city", {
                required: "City selection is required",
              })}
            >
              <option disabled={true} value="">
                Select City
              </option>
              {/* Map through city data and render options here */}
              {/* {cityData?.map((city: any, index: any) => (
                <option value={city.id} key={index}>
                  {city.name}
                </option>
              ))} */}
            </select>
            {errors.courseLevel && (
              <p className="text-xs text-red-600">
                {errors.courseLevel.message}
              </p>
            )}

            <div className="mt-5 flex items-center">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  {...register("isWhatsappNo")}
                />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-blue-700 dark:peer-focus:ring-blue-800"></div>
              </label>
              <span className="ml-3 font-sans text-sm leading-normal text-inherit antialiased">
                Whatsapp number is the same as provided above
              </span>
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
