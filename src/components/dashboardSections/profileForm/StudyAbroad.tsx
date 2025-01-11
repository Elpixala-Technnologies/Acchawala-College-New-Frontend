"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/Button";
import { FaTrash } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import useUserData from "@/customHook/useProfile";
import useUpdateUserData from "@/customHook/useUpdateUserData";
import { Reorder } from "framer-motion";
import { RxDragHandleDots1 } from "react-icons/rx";
import { Input } from "@/components/FormInput";

export function AbroadCollege() {
  const [success, setSuccess] = useState("");
  // ================================================ //
  const {
    data: userProfileData,
    loading: userProfileLoading,
    error: userProfileError,
  } = useUserData();
  const {
    updateUserData,
    loading: updateProfileLoading,
    error: updateProfileError,
  } = useUpdateUserData();
  // =================================================== //
  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      colleges: [{ college: "", status: "applying", priority: 0 }],
    },
  });
  const [active, setActive] = useState(0);
  const { fields, append, remove, move, swap, update } = useFieldArray({
    control,
    name: "colleges",
  });
  const [error, setError] = useState("");
  // ================================================== //
  useEffect(() => {
    console.log(userProfileData);
    if (userProfileData) {
      reset({
        colleges:
          userProfileData?.attributes?.studyAbroad?.map(
            (college: any, index: number) => ({
              college:
                college?.collegeApplied?.data?.attributes?.collegeName || "",
              status: college?.status,
              priority: college?.priority,
            }),
          ) || [],
      });
    }
  }, [userProfileData, userProfileData?.attributes?.studyAbroad, reset]);
  // ================================================== //

  const handleFormSubmit = async (data: any) => {
    try {
      // Update priority based on index
      const updatedColleges = data.colleges.map(
        (college: any, index: number) => ({
          ...college,
          priority: index + 1, // Ensure priority is set based on the index
        }),
      );

      // Call the mutation to update user data
      await updateUserData({
        collegesApplying: updatedColleges.map((college: any) => ({
          collegeApplied: Number(college.college),
          status: college.status,
          priority: Number(college.priority),
        })),
      });
      // console.log(data, "form data");
      setSuccess("Your details have been saved successfully.");
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving the data.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <div>
          <h2 className="text-xl font-bold">
            Abroad Colleges You Applied/Applying To:
          </h2>
          <p>Drag to arrange colleges in order according to your priority</p>
        </div>

        <Reorder.Group
          values={fields}
          onReorder={(newOrder) => {
            newOrder.map((field: any, index: number) => {
              const activeElement = fields[active];
              if (field === activeElement) {
                move(active, index);
                setActive(index);
              }
            });
          }}
          className="space-y-4"
        >
          {fields.map((field, index) => (
            <Reorder.Item
              key={field.id}
              value={field}
              onDragStart={() => setActive(index)}
              className="flex items-center gap-2 max-md:flex-wrap"
            >
              <div className="relative flex w-full items-center gap-2">
                <h6 className="borderedText absolute left-5 top-0 select-none text-5xl font-bold">
                  {index + 1}
                </h6>
                <RxDragHandleDots1 className="text-4xl text-orange-500" />
                <div className="flex-grow space-y-2">
                  <Input
                    label="College Name"
                    type="text"
                    {...register(`colleges.${index}.college`)}
                  />
                  <Input
                    label="Status"
                    readOnly={true}
                    type="text"
                    {...register(`colleges.${index}.status`, {
                      disabled: true,
                    })}
                  />
                </div>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="orange"
                  className="!p-3 text-xl max-sm:mt-4 max-sm:w-full sm:ml-3 sm:!rounded-full"
                  onClick={() => remove(index)}
                >
                  <FaTrash />
                </Button>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="flex justify-between">
          <Button
            variant="orange"
            className="min-w-max px-6"
            onClick={() =>
              append({ college: "", status: "", priority: fields.length + 1 })
            }
            type="button"
          >
            Add more
          </Button>
          <Button
            variant="orangeMain"
            type="submit"
            disabled={updateProfileLoading}
          >
            {updateProfileLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
      {error && <p className="mt-5 text-red-600">{error}</p>}
      {success && <p className="mt-5 text-green-600">{success}</p>}
    </div>
  );
}
