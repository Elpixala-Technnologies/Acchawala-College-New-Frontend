"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/Button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Input } from "@/components/FormInput";
import { Reorder } from "framer-motion";

export function ProfessionalExp({ setNextButtonState }: any) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companies: [{ company: "", jobPosition: "", from: "", to: "" }],
    },
  });
  const [active, setActive] = useState(0);
  const { fields, append, remove, move, swap, update } = useFieldArray({
    control,
    name: "companies",
  });

  const [error, setError] = useState("");

  const handleFormSubmit = async (data: any) => {
    setNextButtonState(true);
    try {
      // console.log(data);
      setNextButtonState(false);
    } catch (err) {
      // console.log(err);
      setNextButtonState(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-1 gap-5"
      >
        <div>
          <h2 className="text-xl font-bold">Companies you have worked for:</h2>
          <p>Drag to arrange companies in order according to your priority</p>
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
            <div key={field.id} className="flex flex-wrap items-center gap-2">
              <div className="flex-grow space-y-2">
                <Input
                  label="Company Name"
                  type="text"
                  icon={<FaEdit />}
                  {...register(`companies.${index}.company`, {
                    required: "Company name is required",
                  })}
                />
                {errors.companies?.[index]?.company && (
                  <p className="text-xs text-red-600">
                    {errors.companies[index].company.message}
                  </p>
                )}
                <select
                  className="mt-5 h-11 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-zinc-500 outline-none duration-200 focus:outline-orange-500"
                  {...register(`companies.${index}.jobPosition`, {
                    required: "Job position is required",
                  })}
                >
                  <option value="">Job Position</option>
                  {[
                    "Software Engineer",
                    "Product Manager",
                    "Designer",
                    "Data Analyst",
                    "Other",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.companies?.[index]?.jobPosition && (
                  <p className="text-xs text-red-600">
                    {errors.companies[index].jobPosition.message}
                  </p>
                )}
                <div className="flex justify-between gap-5 max-sm:gap-3 max-[386px]:flex-col">
                  <Input
                    label="From"
                    type="date"
                    {...register(`companies.${index}.from`, {
                      required: "Start date is required",
                    })}
                  />
                  <Input
                    label="To"
                    type="date"
                    {...register(`companies.${index}.to`, {
                      required: "End date is required",
                    })}
                  />
                </div>
                {(errors.companies?.[index]?.from ||
                  errors.companies?.[index]?.to) && (
                  <p className="text-xs text-red-600">
                    Both dates are required
                  </p>
                )}
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
            </div>
          ))}
        </Reorder.Group>
        <div className="flex justify-between">
          <Button
            variant="orange"
            className="min-w-max px-6"
            onClick={() =>
              append({ company: "", jobPosition: "", from: "", to: "" })
            }
            type="button"
          >
            Add more
          </Button>
          <Button variant="orangeMain" type="submit">
            Save
          </Button>
        </div>
      </form>
      {error && <p className="mt-5 text-center text-red-600">{error}</p>}
    </div>
  );
}
