"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/Button";
import { FaTrash } from "react-icons/fa";

export function PendingCollege({ }: any) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      colleges: [{ college: "Achcha waala college", status: "Incompelete" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "colleges",
  });

  const [error, setError] = useState("");

  const handleFormSubmit = async (data: any) => {
    // setNextButtonState(true);
    try {
      // console.log(data);
    //   setNextButtonState(false);
    } catch (err) {
      // console.log(err);
    //   setNextButtonState(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 gap-5 "
      >
        <h2 className="text-xl font-bold">Your Pending colleges</h2>

        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2 flex-wrap">
            <div className="flex-grow space-y-2">
              <select
                className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                {...register(`colleges.${index}.college`)}
              >
                {/* <option value="" className="capitalize">
                  Select College
                </option> */}
                {[
                  "medium Achcha waala college",
                  "Achcha waala college",
                  "thoda achcha waala college",
                  "Sabse achcha wala college",
                  "other",
                ].map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
              <select
                className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500" 
                {...register(`colleges.${index}.status`)}
              >
                {/* <option value="" className="capitalize">
                  Status
                </option> */}
                {[ "Incompelete","Compelete", "Other"].map((item) => (
                  <option key={item} value={item} className="capitalize">
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {fields.length > 1 && (
              <Button
                type="button"
                variant="orange"
                className="sm:ml-3 max-sm:mt-4 text-xl sm:!rounded-full !p-3 max-sm:w-full"
                onClick={() => remove(index)}
              >
                <FaTrash />
              </Button>
            )}
          </div>
        ))}

        <div className="flex flex-col items-end">
          <Button
            variant="orange"
            className="px-6 min-w-max"
            onClick={() => append({ college: "", status: "" })}
            type="button"
          >
            Add more
          </Button>
          <Button variant="orangeMain" type="submit" className="max-w-[400px] !w-full mt-8">
            Save
          </Button>
        </div>
      </form>
      {error && <p className="mt-5 text-center text-red-600">{error}</p>}
    </div>
  );
}
