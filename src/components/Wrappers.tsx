import React from "react";

const Wrapper = ({
  containerClassName = "",
  bgColor = "bg-transparent",
  children,
  className,
  isMaxWidthChangeRequired = "max-w-screen-2xl",
  as: Component = "section",
}: any) => {
  return (
    <Component className={`w-full px-5 md:px-10 ${bgColor} ${containerClassName}`}>
      <div
        className={`mx-auto w-full ${isMaxWidthChangeRequired}  ${
          className || ""
        }`}
      >
        {children}
      </div>
    </Component>
  );
};

export default Wrapper;

export const Wrapper1 = ({
  children,
  className,
  isMaxWidthChangeRequired = "max-w-screen-2xl",
}: any) => {
  return (
    <div
      className={`mx-auto w-full ${isMaxWidthChangeRequired} px-5 md:px-10 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
