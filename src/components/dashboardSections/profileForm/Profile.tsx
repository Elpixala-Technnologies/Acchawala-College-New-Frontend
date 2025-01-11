"use client";
import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import Stepper from "../../stepper/Stepper";
import { Button } from "../../Button";
import { LiaUserSecretSolid } from "react-icons/lia";
import { SiGitbook } from "react-icons/si";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FaPlaneDeparture, FaUserNinja } from "react-icons/fa";
import { YourDetails } from "./YouDetails";
import { EducationDetails } from "./EductionDetails";
import { DesiredCollege } from "./DesiredCollege";
import { ProfessionalExp } from "./ProfessionalExp";
import { AbroadCollege } from "./StudyAbroad";

export default function Profile({}: any) {
  const stepItems = [
    <span key="1" role="img" aria-label="step-1">
      <LiaUserSecretSolid className="m-2 text-2xl" />
    </span>,
    <span key="2" role="img" aria-label="step-2">
      <SiGitbook className="m-2 text-2xl" />
    </span>,
    <span key="3" role="img" aria-label="step-3">
      <HiBuildingLibrary className="m-2 text-2xl" />
    </span>,
    <span key="4" role="img" aria-label="step-4">
      <FaUserNinja className="m-2 text-2xl" />
    </span>,
    <span key="5" role="img" aria-label="step-4">
      <FaPlaneDeparture className="m-2 text-2xl" />
    </span>,
  ];

  const stepItemsContent = [
    "Your Details",
    "Eduction Details",
    "Desired Colleges",
    "Professional Experience",
    "Study Abroad",
  ];
  const [nextButtonState, setNextButtonState] = useState<boolean>(false);

  return (
    <div className="w-full">
      <Stepper
        stroke={3}
        strokeColor="#9da5ae"
        fillStroke="#f97316"
        // bullet bg-color
        activeColor="#fbd5b9"
        // bullet border
        activeProgressBorder="4px double #f97316"
        submitBtn={" "}
        continueBtn={
          <Button
            variant="black"
            className="text-nowrap"
            disabled={nextButtonState}
            type="submit"
          >
            Next
          </Button>
        }
        backBtn={<Button variant="orange">Back</Button>}
        stepItem={stepItems}
        stepItemsContent={stepItemsContent}
        // onContinue={(step) => handleFormSubmit(step)}
        // onSubmit={(step) => alert(`Thank you!!! Final Step -> ${step}`)}
        nextButtonState={nextButtonState}
      >
        <div className="pt-10">
          <YourDetails setNextButtonState={setNextButtonState} />
        </div>
        <div className="pt-10">
          <EducationDetails setNextButtonState={setNextButtonState} />
        </div>
        <div className="pt-10">
          <DesiredCollege setNextButtonState={setNextButtonState} />
        </div>
        <div className="pt-10">
          <ProfessionalExp setNextButtonState={setNextButtonState} />
        </div>
        <div className="pt-10">
          <AbroadCollege />
        </div>
      </Stepper>
    </div>
  );
}
