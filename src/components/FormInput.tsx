import { Span } from "next/dist/trace";
import React, { useId } from "react";

export const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", icon, ...props }: any,
  ref,
) {
  const id = useId();
  return (
    <div className="relative mt-5 h-11 w-full">
      <input
        type={type}
        className={`border-blue-gray-200 text-blue-gray-700 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 peer h-full w-full rounded-md border bg-transparent bg-white px-3 py-3 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-orange-500 focus:border-t-transparent focus:outline-0 ${className}`}
        ref={ref}
        {...props}
        id={id}
        placeholder=" "
      />
      {label && (
        <>
          <label
            className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[12px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all focus:border-t-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-orange-500 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-orange-500"
            // htmlFor={id}
          >
            {label}
          </label>
        </>
      )}
    </div>
  );
});
