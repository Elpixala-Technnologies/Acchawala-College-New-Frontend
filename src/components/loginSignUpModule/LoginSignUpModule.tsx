"use client";
import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { SignInContainer } from "./SignInContainer";
import { SignUpContainer } from "./SignUpContainer";
import { headerLogo } from "@/assets";
import { FaCircleCheck } from "react-icons/fa6";
import { login_bg } from "@/assets";
// import "src\app\globals.css";

export function LoginSignUpModule({
  setIsLoginModule,
  isLoginModule,
  closePopup,
}: any) {
  const handleOverlayClick = (e: any) => {
    // Check if the click occurred on the overlay (the background)
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <section
      className="fixed -top-5 left-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-950 bg-opacity-70 max-sm:mt-20 max-sm:h-[85vh]"
      onClick={handleOverlayClick}
    >
      {/* Module  */}
      <div className="relative z-10 flex h-max w-full justify-center overflow-y-hidden rounded-3xl border-8 border-white bg-white shadow-lg max-sm:h-full max-sm:min-h-[100vh] max-sm:flex-col max-sm:items-center max-sm:rounded-none max-sm:pt-20 md:max-w-[960px]">
        {/* Left Side */}
        <Image
          src={login_bg}
          layout="fill"
          objectFit="cover"
          alt="Background"
          className="!relative !h-auto !w-1/3 rounded-s-3xl object-cover object-center max-sm:hidden"
        />
        <div className="flex-center absolute left-0 top-0 h-full w-1/3 flex-col rounded-s-3xl bg-gradient-to-t from-[#ff90299f] to-[#ac5300a1] bg-cover bg-center p-5 max-sm:hidden">
          <div className="flex-center flex-col text-center sm:mb-10">
            <Image
              src={headerLogo}
              alt="logo"
              width={100}
              className="h-16 w-full object-contain"
            />
          </div>
          <ul className="ml-5 flex list-none flex-col gap-y-2 text-sm text-white max-sm:hidden">
            <li className="flex items-center">
              <FaCircleCheck className="mr-2 rounded-full bg-white text-green-800" />
              Personal Counsellor
            </li>
            <li className="flex items-center">
              <FaCircleCheck className="mr-2 rounded-full bg-white text-green-800" />
              Admission Assistance
            </li>
            <li className="flex items-center">
              <FaCircleCheck className="mr-2 rounded-full bg-white text-green-800" />
              Lowest Package Seats
            </li>
            <li className="flex items-center">
              <FaCircleCheck className="mr-2 rounded-full bg-white text-green-800" />
              Expert Guidance
            </li>
            <li className="flex items-center">
              <FaCircleCheck className="mr-2 rounded-full bg-white text-green-800" />
              MCI/NTA Updates
            </li>
            <li className="flex items-center">
              <FaCircleCheck className="mr-2 rounded-full bg-white text-green-800" />
              Fees Negotiation
            </li>
          </ul>
        </div>
        {/* Right Side */}
        {isLoginModule ? (
          // Sign In Container
          <SignInContainer
            setIsLoginModule={setIsLoginModule}
            isLoginModule={isLoginModule}
            closePopup={closePopup}
          />
        ) : (
          // Sign Up Container
          <SignUpContainer
            setIsLoginModule={setIsLoginModule}
            isLoginModule={isLoginModule}
            closePopup={closePopup}
          />
        )}
      </div>
    </section>
  );
}
