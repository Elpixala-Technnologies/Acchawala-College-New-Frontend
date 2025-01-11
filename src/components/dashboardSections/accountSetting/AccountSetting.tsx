"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { MdOutlineAttachEmail } from "react-icons/md";
import { CiMobile4 } from "react-icons/ci";
import { Input } from "@/components/FormInput";

export function AccountSetting({ }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      number: "",
    },
  });

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[0-9]{10}$/;
  const [error, setError] = useState("");
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const handleFormSubmit = async (data: any) => {
    try {
      // Include activation states in the submitted data
      const submissionData = {
        ...data,
        emailCommunicationEnabled: emailEnabled,
        smsCommunicationEnabled: smsEnabled,
      };
      console.log("Submitted data:", submissionData);
      // Here you would typically send this data to your backend
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("An error occurred while submitting the form.");
    }
  };

  // Custom Toggle Button component
  const ToggleButton = ({ enabled, setEnabled }:any) => (
    <button
      type="button"
      className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 focus:outline-none ${
        enabled ? 'bg-green-500' : 'bg-gray-300'
      }`}
      onClick={() => setEnabled(!enabled)}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 gap-5 "
      >
        <h2 className="text-xl font-bold">Account Settings</h2>

        {/* Email */}
        <div className="space-y-2 relative">
          <Input
            label="Email Communication"
            type="email"
            icon={<MdOutlineAttachEmail />}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email address",
              },
            })}
          />
          <div className="absolute right-2 top-[55%] transform -translate-y-1/2">
            <ToggleButton enabled={emailEnabled} setEnabled={setEmailEnabled} />
          </div>
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile No. */}
        <div className="space-y-2 relative">
          <Input
            label="SMS Communication"
            type="number"
            icon={<CiMobile4 />}
            {...register("number", {
              required: "Mobile No. is required",
              pattern: {
                value: mobileRegex,
                message: "Please enter a valid 10-digit mobile number",
              },
            })}
          />
          <div className="absolute right-2 top-[55%] transform -translate-y-1/2">
            <ToggleButton enabled={smsEnabled} setEnabled={setSmsEnabled} />
          </div>
          {errors.number && (
            <p className="text-xs text-red-600">{errors?.number?.message}</p>
          )}
        </div>

        <div className="flex flex-col items-end">
          <Button variant="orangeMain" type="submit" className="max-w-[400px] !w-full mt-8">
            Deactivate Account
          </Button>
        </div>
      </form>
      {error && <p className="mt-5 text-center text-red-600">{error}</p>}
    </div>
  );
}