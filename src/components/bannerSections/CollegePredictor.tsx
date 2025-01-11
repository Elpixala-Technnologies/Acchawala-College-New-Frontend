import React from "react";
import Wrapper from "../Wrappers";
import TextWithLineBreak, { TextWithoutLineBreak } from "@/utils/TextWithLineBreak";
import { Button } from "../Button";
import { FaDownload } from "react-icons/fa";
import useIsMobile from "../customHooks/useIsMobile";
import Link from "next/link";

export default function CollegePredictor({data}:any) {
  const isMobile = useIsMobile(1117);
  return (
    <Wrapper
      as="section"
      containerClassName="px-5"
      className="max-w-screen-lg rounded-lg redOrangeGradient p-5 flex flex-col gap-3 items-center text-center text-zinc-800"
    >
      <h1 className="text-lg text-blue-950 font-bold">{data?.title}</h1>
      <p className="text-white">
          {isMobile ? <TextWithoutLineBreak text={data?.text} /> : <TextWithLineBreak text={data?.text} />}
        </p>
        <Link href={data?.button?.href} className="w-min">
        <Button variant="black" className="text-nowrap !py-3">
           <FaDownload className="text-lg" /> {data?.button?.text} </Button>
        </Link>
    </Wrapper>
  );
}
