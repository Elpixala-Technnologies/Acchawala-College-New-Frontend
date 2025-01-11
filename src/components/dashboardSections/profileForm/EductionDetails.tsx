"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/FormInput";
import { Button } from "@/components/Button";
import useUserData from "@/customHook/useProfile";
import useUpdateUserData from "@/customHook/useUpdateUserData";

export function EducationDetails({ setNextButtonState }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      graduationInstitutionName: "",
      graduationCity: "",
      graduationPassingYear: "",
      graduationCourse: "",
      graduationGradingSystem: "",
      graduationPercentageGrades: "",

      twelfthSchoolName: "",
      twelfthCity: "",
      twelfthPassingYear: "",
      twelfthStream: "",
      twelfthGradingSystem: "",
      twelfthPercentageGrades: "",

      tenthSchoolName: "",
      tenthCity: "",
      tenthPassingYear: "",
      tenthStream: "",
      tenthGradingSystem: "",
      tenthPercentageGrades: "",

      isEntranceExam: "",
      entranceExamName: "",
      entranceExamScore: "",
    },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // ============================================================ //
  const {
    data: userProfileData,
    loading: userProfileLoading,
    error: userProfileError,
    refetch: userProfileRefetch,
  } = useUserData();
  const {
    updateUserData,
    loading: updateProfileLoading,
    error: updateProfileError,
  } = useUpdateUserData();
  // ============================================================= //

  useEffect(() => {
    reset({
      graduationInstitutionName:
        userProfileData?.attributes?.GraduationEducationalDetails
          ?.institutionName || "",
      graduationCity:
        userProfileData?.attributes?.GraduationEducationalDetails?.location ||
        "",
      graduationPassingYear:
        userProfileData?.attributes?.GraduationEducationalDetails
          ?.passingYear || "",
      graduationCourse:
        userProfileData?.attributes?.GraduationEducationalDetails?.course || "",
      graduationGradingSystem:
        userProfileData?.attributes?.GraduationEducationalDetails
          ?.gradingSystem || "",
      graduationPercentageGrades:
        userProfileData?.attributes?.GraduationEducationalDetails
          ?.percentageOrGrades || "",

      twelfthSchoolName:
        userProfileData?.attributes?.twelfthEducationalDetails?.schoolName ||
        "",
      twelfthCity:
        userProfileData?.attributes?.twelfthEducationalDetails?.location || "",
      twelfthPassingYear:
        userProfileData?.attributes?.twelfthEducationalDetails?.passingYear ||
        "",
      twelfthStream:
        userProfileData?.attributes?.twelfthEducationalDetails?.stream || "",
      twelfthGradingSystem:
        userProfileData?.attributes?.twelfthEducationalDetails?.gradingSystem ||
        "",
      twelfthPercentageGrades:
        userProfileData?.attributes?.twelfthEducationalDetails
          ?.percentageOrGrades || "",

      tenthSchoolName:
        userProfileData?.attributes?.tenthEducationalDetails?.institutionName ||
        "",
      tenthCity:
        userProfileData?.attributes?.tenthEducationalDetails?.location || "",
      tenthPassingYear:
        userProfileData?.attributes?.tenthEducationalDetails?.passingYear || "",
      tenthStream:
        userProfileData?.attributes?.tenthEducationalDetails?.stream || "",
      tenthGradingSystem:
        userProfileData?.attributes?.tenthEducationalDetails?.gradingSystem ||
        "",
      tenthPercentageGrades:
        userProfileData?.attributes?.tenthEducationalDetails
          ?.percentageOrGrades || "",

      isEntranceExam: userProfileData?.attributes?.appearingEntranceExam || "",
      entranceExamName: userProfileData?.attributes?.entranceExamName || "",
      entranceExamScore: userProfileData?.attributes?.entranceExamScore || "",
    });
    console.log(userProfileData);
  }, [userProfileData, userProfileLoading, reset]);

  useEffect(() => {
    if (!userProfileLoading && !userProfileData) {
      userProfileRefetch();
    }
  }, [userProfileData, userProfileLoading]);

  // =============================================================== //
  const handleFormSubmit = async (data: any) => {
    setNextButtonState(true);
    try {
      await updateUserData({
        GraduationEducationalDetails: {
          institutionName: data.graduationInstitutionName,
          location: data.graduationCity,
          passingYear: data.graduationPassingYear,
          course: data.graduationCourse,
          gradingSystem: data.graduationGradingSystem,
          percentageOrGrades: Number(data.graduationPercentageGrades),
        },
        twelfthEducationalDetails: {
          schoolName: data.twelfthSchoolName,
          location: data.twelfthCity,
          passingYear: data.twelfthPassingYear,
          stream: data.twelfthStream,
          gradingSystem: data.twelfthGradingSystem,
          percentageOrGrades: Number(data.twelfthPercentageGrades),
        },
        tenthEducationalDetails: {
          institutionName: data.tenthSchoolName,
          location: data.tenthCity,
          passingYear: data.tenthPassingYear,
          stream: data.tenthStream,
          gradingSystem: data.tenthGradingSystem,
          percentageOrGrades: Number(data.tenthPercentageGrades),
        },
        appearingEntranceExam: data.isEntranceExam,
        entranceExamName:
          data.isEntranceExam === "yes" || data.isEntranceExam === "booked"
            ? data.entranceExamName
            : "",
        entranceExamScore:
          data.isEntranceExam === "yes" ? Number(data.entranceExamScore) : 0,
      });
      setSuccess("Your details have been saved successfully.");
    } catch (err) {
      setError("An error occurred while saving your details.");
      console.error("Form Submit Error:", err);
    } finally {
      setNextButtonState(false);
    }
  };

  const onNextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setNextButtonState(false);
      return true;
    } else {
      setNextButtonState(true);
      return false;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
        {/* Graduation Educational Details */}
        <div>
          <h2 className="text-xl font-bold">Graduation Educational Details</h2>
          <div className="space-y-2">
            <Input
              label="Institution Name"
              type="text"
              {...register("graduationInstitutionName", {
                required: "Institution Name is required",
              })}
            />
            {errors.graduationInstitutionName && (
              <p className="text-xs text-red-600">
                {errors.graduationInstitutionName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="City"
              type="text"
              {...register("graduationCity", {
                required: "Location is required",
              })}
            />
            {errors.graduationCity && (
              <p className="text-xs text-red-600">
                {errors.graduationCity.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Passing Year"
              type="date"
              {...register("graduationPassingYear", {
                required: "Passing Year is required",
              })}
            />
            {errors.graduationPassingYear && (
              <p className="text-xs text-red-600">
                {errors.graduationPassingYear.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Course Name"
              type="text"
              {...register("graduationCourse", {
                required: "Course is required",
              })}
            />
            {errors.graduationCourse && (
              <p className="text-xs text-red-600">
                {errors.graduationCourse.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <select
                className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                {...register("graduationGradingSystem", {
                  required: "Grading System is required",
                })}
              >
                <option value="">Grading System</option>
                {["CGPA", "Percentage"].map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
              {errors.graduationGradingSystem && (
                <p className="text-xs text-red-600">
                  {errors.graduationGradingSystem.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                label="Percentage/Grades"
                type="text"
                {...register("graduationPercentageGrades", {
                  required: "Percentage/Grades is required",
                })}
              />
              {errors.graduationPercentageGrades && (
                <p className="text-xs text-red-600">
                  {errors.graduationPercentageGrades.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Twelfth Educational Details */}
        <div>
          <h2 className="text-xl font-bold">12th Educational Details</h2>
          <div className="space-y-2">
            <Input
              label="School Name"
              type="text"
              {...register("twelfthSchoolName", {
                required: "School Name is required",
              })}
            />
            {errors.twelfthSchoolName && (
              <p className="text-xs text-red-600">
                {errors.twelfthSchoolName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="City"
              type="text"
              {...register("twelfthCity", {
                required: "City is required",
              })}
            />
            {errors.twelfthCity && (
              <p className="text-xs text-red-600">
                {errors.twelfthCity.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Passing Year"
              type="date"
              {...register("twelfthPassingYear", {
                required: "Passing Year is required",
              })}
            />
            {errors.twelfthPassingYear && (
              <p className="text-xs text-red-600">
                {errors.twelfthPassingYear.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Stream Name"
              type="text"
              {...register("twelfthStream", {
                required: "Stream is required",
              })}
            />
            {errors.twelfthStream && (
              <p className="text-xs text-red-600">
                {errors.twelfthStream.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <select
                className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                {...register("twelfthGradingSystem", {
                  required: "Grading System is required",
                })}
              >
                <option value="">Grading System</option>
                {["CGPA", "Percentage"].map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
              {errors.twelfthGradingSystem && (
                <p className="text-xs text-red-600">
                  {errors.twelfthGradingSystem.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                label="Percentage/Grades"
                type="text"
                {...register("twelfthPercentageGrades", {
                  required: "Percentage/Grades is required",
                })}
              />
              {errors.twelfthPercentageGrades && (
                <p className="text-xs text-red-600">
                  {errors.twelfthPercentageGrades.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tenth Educational Details */}
        <div>
          <h2 className="text-xl font-bold">10th Educational Details</h2>
          <div className="space-y-2">
            <Input
              label="School Name"
              type="text"
              {...register("tenthSchoolName", {
                required: "School Name is required",
              })}
            />
            {errors.tenthSchoolName && (
              <p className="text-xs text-red-600">
                {errors.tenthSchoolName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="City"
              type="text"
              {...register("tenthCity", {
                required: "City is required",
              })}
            />
            {errors.tenthCity && (
              <p className="text-xs text-red-600">{errors.tenthCity.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Passing Year"
              type="date"
              {...register("tenthPassingYear", {
                required: "Passing Year is required",
              })}
            />
            {errors.tenthPassingYear && (
              <p className="text-xs text-red-600">
                {errors.tenthPassingYear.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Input
              label="Stream Name"
              type="text"
              {...register("tenthStream", {
                required: "Stream is required",
              })}
            />
            {errors.tenthStream && (
              <p className="text-xs text-red-600">
                {errors.tenthStream.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="space-y-2">
              <select
                className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                {...register("tenthGradingSystem", {
                  required: "Grading System is required",
                })}
              >
                <option value="">Grading System</option>
                {["CGPA", "Percentage"].map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
              {errors.tenthGradingSystem && (
                <p className="text-xs text-red-600">
                  {errors.tenthGradingSystem.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                label="Percentage/Grades"
                type="text"
                {...register("tenthPercentageGrades", {
                  required: "Percentage/Grades is required",
                })}
              />
              {errors.tenthPercentageGrades && (
                <p className="text-xs text-red-600">
                  {errors?.tenthPercentageGrades.message}
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Have you appeared or scheduled for any entrance exams?  */}
        <div>
          <div className="space-y-2">
            <label className="block font-semibold text-gray-700">
              Have you appeared or scheduled for any entrance exams?
            </label>
            <div className="flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="yes"
                  {...register("isEntranceExam")}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="no"
                  {...register("isEntranceExam")}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="booked"
                  {...register("isEntranceExam")}
                  className="form-radio"
                />
                <span className="ml-2">Booked</span>
              </label>
            </div>
            {errors.isEntranceExam && (
              <p className="text-xs text-red-600">
                {errors.isEntranceExam.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(watch("isEntranceExam") === "yes" ||
              watch("isEntranceExam") === "booked") && (
              <div className="space-y-2">
                <Input
                  label="Entrance Exam Name"
                  type="text"
                  {...register("entranceExamName", {
                    required: "Entrance Exam Name is required",
                  })}
                />
                {errors.entranceExamName && (
                  <p className="text-xs text-red-600">
                    {errors.entranceExamName.message}
                  </p>
                )}
              </div>
            )}
            {watch("isEntranceExam") === "yes" && (
              <div className="space-y-2">
                <Input
                  label="Entrance Score"
                  type="number"
                  {...register("entranceExamScore", {
                    required: "Entrance Score is required",
                  })}
                />
                {errors.entranceExamScore && (
                  <p className="text-xs text-red-600">
                    {errors?.entranceExamScore?.message}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <Button variant="orangeMain" type="submit">
          {updateProfileLoading ? "Saving..." : "Save"}
        </Button>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
      {success && <p className="mt-5 text-green-600">{success}</p>}
    </div>
  );
}
