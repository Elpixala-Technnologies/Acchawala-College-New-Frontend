"use strict";
import React, { useState, useEffect } from "react";
import "./stepper.css";
import { StepperProps } from "./Stepper.types";

const Stepper = (props: StepperProps) => {
  const {
    children = [],
    showProgressBar = true,
    defaultActiveStep = 1,
    backBtn,
    continueBtn,
    submitBtn,
    onContinue = () => {},
    onPrev = () => {},
    onSubmit = () => {},
    btnPos = "space-between",
    barWidth = "",
    strokeColor = "#cdd3d8",
    fillStroke = "#fbd5b9",
    stroke = 2,
    activeColor = "#3A4047",
    activeProgressBorder = "2px double #3A4047",
    progressBarClassName = "",
    contentBoxClassName = "",
    allowClickControl = true,
    stepItem = [],
    stepItemsContent = [],
    // active = 0,
    // setActive = () => {},
    nextButtonState = false,
  } = props;

  const [active, setActive] = useState<number>(0);
  useEffect(() => {
    if (
      defaultActiveStep <= (children as React.ReactElement[]).length &&
      defaultActiveStep > 0
    ) {
      progress(defaultActiveStep - 1);
      setActive(defaultActiveStep);
    } else {
      progress(0);
      setActive(1);
    }
  }, []);

  useEffect(() => {
    if ((children as React.ReactElement[]).length > 1 && showProgressBar) {
      //Bullet(Progress) Circle Border & Background Color
      (children as React.ReactElement[]).map((_child, ind) => {
        const element = document.getElementById(
          `input_${ind}`,
        ) as HTMLInputElement;
        if (element.classList.length > 1) {
          element.style.background = activeColor;
          element.style.border = activeProgressBorder;
        } else {
          element.style.background = "#ffffff";
          element.style.border = "2px double rgb(255 73 73)";
        }
      });
    }
  }, [active]);

  const previousStep = () => {
    if (!active || active <= 1) {
      return;
    }
    progress(active - 2);
    const newActive = active - 1;
    setActive(newActive);
    onPrev(newActive);
  };

  const nextStep = () => {
    if (nextButtonState === true) return;
    if (!active || active >= (children as React.ReactElement[]).length) {
      return;
    }
    onContinue(active);
    progress(active);
    const newActive = active + 1;
    setActive(newActive);
  };

  const progressClick = (ind: number) => {
    if (!allowClickControl) return;
    setActive(ind + 1);
    progress(ind);
  };

  const progress = (stepNum: number) => {
    if ((children as React.ReactElement[])?.length > 1 && showProgressBar) {
      let p =
        (stepNum / ((children as React.ReactElement[])?.length - 1)) * 100;
      (
        document.getElementsByClassName("percent")[0] as HTMLElement
      ).style.width = `${p}%`;
    }

    if ((children as React.ReactElement[])?.length > 1 && showProgressBar) {
      for (
        let index = 0;
        index < (children as React.ReactElement[]).length;
        index++
      ) {
        const e = document.getElementById(`input_${index}`)!;
        const eInd = parseInt(e?.id?.split("_")[1]);
        if (eInd === stepNum) {
          e.classList.add("selected");
          e.classList.remove("completed");
        }
        if (eInd <= stepNum) {
          e.classList.add("completed");
        }
        if (eInd > stepNum) {
          e.classList.remove("selected", "completed");
        }
      }
    }
  };

  return (
    <div className={"stepperDiv"}>
      {(children as React.ReactElement[]).length > 1 && showProgressBar && (
        <div className={`${"progressBarDiv"} ${progressBarClassName}`}>
          <div className={"progressBarContainer"} style={{ width: barWidth }}>
            <div
              className={"progress"}
              style={{ borderBottom: `${stroke}px double ${strokeColor}` }}
            >
              <div
                className={"percent"}
                style={{ borderBottom: `${stroke}px double ${fillStroke}` }}
              ></div>
            </div>
            <div className={"steps"}>
              {(children as React.ReactElement[]).map((_child, ind) => {
                return (
                  // Individual Step
                  <div key={ind} className="flex flex-col items-center">
                    <div
                      className={"step"}
                      // Id for Bullet(Progress) Circle Border & Background Color
                      id={`input_${ind}`}
                      onClick={() => progressClick(ind)}
                    >
                      {/* stepItem */}
                      {stepItem?.[ind]}
                    </div>
                    <p className="mt-2.5 text-sm font-semibold text-orange-500 max-sm:hidden sm:text-xs">
                      {stepItemsContent?.[ind]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT  */}
      <div className={contentBoxClassName}>
        {(children as React.ReactElement[]).length > 1
          ? (children as React.ReactElement[]).map((child, index) => {
              return active === index + 1 && child;
            })
          : children}
        {/* BUTTONS  */}
        <div
          style={{
            display: "flex",
            justifyContent: btnPos,
            marginTop: "20px",
          }}
        >
          {active > 1 ? (
            backBtn ? (
              <span onClick={previousStep} style={{ marginRight: "20px" }}>
                {backBtn}
              </span>
            ) : (
              <button
                className={"defaultBtn"}
                onClick={previousStep}
                style={{ marginRight: "20px" }}
              >
                Go Back
              </button>
            )
          ) : (
            <span></span>
          )}
          {active < (children as React.ReactElement[]).length ? (
            continueBtn ? (
              <span onClick={() => nextStep()}>{continueBtn}</span>
            ) : (
              <button className={"defaultBtn"} onClick={() => nextStep()}>
                Continue
              </button>
            )
          ) : submitBtn ? (
            <span onClick={() => onSubmit(active)}>{submitBtn}</span>
          ) : (
            <button className={"defaultBtn"} onClick={() => onSubmit(active)}>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
