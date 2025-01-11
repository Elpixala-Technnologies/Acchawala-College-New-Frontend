import Image from "next/image";
import Link from "next/link";
import { BsClipboardCheck } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";

export function Card1({ item }: any) {
  return (
    <div className="flex items-center gap-5 rounded-lg bg-white p-5 shadow-xl max-md:flex-col">
      <Image
        src={item?.icon}
        alt="CD"
        width={100}
        height={100}
        className="h-32 min-w-32 rounded-lg object-contain"
      />
      <div className="flex flex-col gap-3">
        <Link
          href={item?.id ? `/news/${item?.id}` : `#`}
          className="cursor-pointer text-xl font-bold"
        >
          <h6 className="cursor-pointer hover:text-orange-500">
            {item?.title}
          </h6>
        </Link>
        <div className="flex gap-5 text-xs capitalize text-orange-500">
          <p className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-black" />
            {item?.timeStamp}
          </p>
          <p className="flex items-center gap-2">
            <BsClipboardCheck className="text-black" />
            {item?.category}
          </p>
        </div>
        <p className="line-clamp-3">
          {item?.text}{" "}
          <span className="relative right-0 text-orange-500 underline">
            <Link href={item?.id ? `/news/${item?.id}` : `#`}>Read More</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
