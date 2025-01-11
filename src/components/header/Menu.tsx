import React from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";

const Menu = ({ navItemsArray, activeItemId, onItemClick }: any) => {
  return (
    <ul className="hidden items-center gap-x-5 font-medium text-black md:flex">
      {navItemsArray?.map((item: any) => (
        <li key={item?.id} className="group relative transition-all">
          <Link
            href={item?.href || "#"}
            className="flex cursor-pointer items-center"
            onClick={() => onItemClick(item.id, item.href)}
          >
            <span className={`font px-1 py-4 transition-all hover:scale-105 duration-300 hover:text-orange-500 ${activeItemId === item.id.toString() ? 'text-orange-500' : ''}`}>
              {item?.label}
            </span>
            {item?.subNav && item.subNav?.length !== 0 && (
              <IoIosArrowDown className="rotate-180 transition-all group-hover:rotate-0" />
            )}
          </Link>
          {/* dropdown */}
          {item.subNav && (
            <div className="absolute left-0 top-[100%] z-30 hidden w-auto flex-col gap-1 rounded bg-white py-3 shadow-md transition-all group-hover:flex">
              {item.subNav.map((nav: any) => (
                <Link
                  key={nav.id}
                  href={nav.href || "#"}
                  className={`hover:bg-blue-500 flex cursor-pointer items-center py-1 pl-2 pr-8 hover:text-white ${activeItemId === nav.id.toString() ? 'text-orange-500' : ''}`}
                  onClick={() => onItemClick(nav.id, nav.href)}
                >
                  <span className="whitespace-nowrap pl-3 ">{nav.label}</span>
                </Link>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Menu;