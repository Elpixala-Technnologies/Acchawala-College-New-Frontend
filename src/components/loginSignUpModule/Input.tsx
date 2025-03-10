import React, { useId, useState } from "react";

export const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props }: any,
  ref,
) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mt-5  w-full min-w-[200px]">
      <input
        type={type}
        className={`peer h-full w-full rounded-md border border-gray-300 bg-transparent px-3 py-3.5 text-sm text-gray-900 outline-none focus:border-2 focus:border-orange-500 focus:ring-0 ${className}
        ${!isFocused ? "custom-date-style" : ""}`}
        ref={ref}
        {...props}
        id={id}
        placeholder={type === "date" && !isFocused ? " " : ""}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        style={{
          appearance: type === "date" ? "none" : "auto", // Remove default browser styles for date input
          // display: (type === "date") ? "none" : "auto"
        }}
      />
      {label && (
        <label
          className={`absolute left-3 transition-all text-gray-500 text-sm ${isFocused || props.value
            ? "-top-2 bg-white px-1 text-xs text-orange-500"
            : "top-1/2 -translate-y-1/2"
            }`}
        >
          {label}
        </label>
      )}
    </div>
  );
});