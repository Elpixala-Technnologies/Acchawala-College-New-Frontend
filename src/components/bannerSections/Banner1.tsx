import React from "react";
import Wrapper from "../Wrappers";
import Image from "next/image";
import TextWithLineBreak, {
  TextWithoutLineBreak,
} from "@/utils/TextWithLineBreak";
import { Button } from "../Button";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import useIsMobile from "../customHooks/useIsMobile";

export default function Banner1({ data }: any) {
  const isMobile = useIsMobile(1117);
  return (
    <Wrapper
      as="section"
      containerClassName="md:px-5 my-14"
      isMaxWidthChangeRequired="max-w-screen-xl"
      className="grid grid-cols-2 overflow-hidden rounded-2xl bg-orange-500 pr-0 md:pr-0"
    >
      <div className="col-span-2 flex flex-col gap-5 p-5 md:col-span-1">
        <h1 className="text-3xl font-bold text-white md:text-5xl">
          {isMobile ? (
            <TextWithoutLineBreak text={data?.title} />
          ) : (
            <TextWithLineBreak text={data?.title} />
          )}
        </h1>
        <p className="text-white">
          {isMobile ? (
            <TextWithoutLineBreak text={data?.text} />
          ) : (
            <TextWithLineBreak text={data?.text} />
          )}
        </p>
        <Link href={data?.button?.href} className="w-min">
          <Button variant="black" className="text-nowrap !py-3">
            {data?.button?.text}
            <FaArrowRightLong />
          </Button>
        </Link>
      </div>
      <div className="col-span-2 flex justify-end md:col-span-1">
        <Image
          src={data?.bg?.url}
          alt="CD"
          width={500}
          height={500}
          className="max-h-96 w-min object-contain"
        />
      </div>
    </Wrapper>
  );
}
