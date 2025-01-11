"use client";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/Button";
import { Input } from "@/components/FormInput";
import { FaTrash } from "react-icons/fa";
import { RxDragHandleDots1 } from "react-icons/rx";
import { Reorder } from "framer-motion";
import { useQuery } from "@apollo/client";
import { getAllCollegesByName } from "@/graphql/profileQuery/profile";
import useUpdateUserData from "@/customHook/useUpdateUserData";
import useUserData from "@/customHook/useProfile";

export function DesiredCollege({ setNextButtonState }: any) {
  const [success, setSuccess] = useState("");
  // ================================================ //
  const {
    loading: collegesLoading,
    error: collegesError,
    data: collegesData,
  } = useQuery(getAllCollegesByName);
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
  // =========================================== //
  useEffect(() => {
    console.log(userProfileData);
    if (userProfileData) {
      reset({
        colleges:
          userProfileData?.attributes?.collegesApplying?.map(
            (college: any, index: number) => ({
              priority: college?.priority,
              college: college?.collegeApplied?.data?.id || "",
              status: college?.status,
            }),
          ) || [],
      });
    }
  }, [
    collegesData,
    userProfileData,
    userProfileData?.attributes?.collegesApplying,
    reset,
  ]);

  // =========================================== //

  const handleFormSubmit = async (data: any) => {
    setNextButtonState(true);
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
    } finally {
      setNextButtonState(false);
    }
  };

  // ================================================ //
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <div>
          <h2 className="text-xl font-bold">
            Colleges You Applied/Applying To:
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
                  <select
                    className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                    {...register(`colleges.${index}.college`)}
                  >
                    <option value="" className="capitalize">
                      Select College
                    </option>
                    {collegesData?.colleges?.data.map((item: any) => (
                      <option
                        key={item?.id}
                        value={item?.id}
                        className="capitalize"
                      >
                        {item?.attributes?.collegeName}
                      </option>
                    ))}
                  </select>
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
