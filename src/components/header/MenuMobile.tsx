// MenuMobile.tsx
import React, { useState } from "react";
import Link from "next/link";
import { BsChevronDown } from "react-icons/bs";
import Image from "next/image";

interface NavItem {
  id: number | string;
  label: string;
  href: string;
  subNav?: NavItem[];
  iconImage?: string;
}

interface MenuMobileProps {
  navItemsArray: NavItem[];
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItemId: string | null;
  onItemClick: (itemId: string, href: string) => void;  // Update this line
}

const MenuMobile: React.FC<MenuMobileProps> = ({ 
  navItemsArray, 
  setIsMobileMenuOpen, 
  activeItemId, 
  onItemClick 
}) => {
  return (
    <ul className="w-full flex flex-col bg-white">
      {navItemsArray.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className={`block px-4 py-2 ${activeItemId === item.id.toString() ? 'text-orange-500' : ''}`}
            onClick={() => onItemClick(item.id.toString(), item.href)}
          >
            {item.label}
          </Link>
          {/* Render subnav items if any */}
        </li>
      ))}
    </ul>
  );
};

interface SingleNavItemProps {
  item: NavItem;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeItemId: string | null;
  onItemClick: (itemId: string, href: string) => void;  // Update this line
}

const SingleNavItem: React.FC<SingleNavItemProps> = ({ 
  item, 
  setIsMobileMenuOpen, 
  activeItemId, 
  onItemClick 
}) => {
  const [isItemOpen, setItemOpen] = useState(false);

  const toggleItem = () => {
    setItemOpen(!isItemOpen);
    onItemClick(item.id.toString(), item.href);  // Update this line
  };

  // ... rest of the component remains the same

  

  return (
    <>
      <Link
        onClick={toggleItem}
        href={item.href ?? "#"}
        className={`relative px-5 py-3 transition-all border-b border-zinc-200 hover:bg-orange-500 hover:text-white ${activeItemId === item.id.toString() ? 'text-orange-500' : 'text-black'}`}
      >
        {/* ... */}
      </Link>

      {isItemOpen && item.subNav && item.subNav.length !== 0 && (
        <div className="z-10 w-auto flex-col gap-1 rounded-lg bg-white py-3 transition-all flex">
          {item.subNav.map((ch, i) => (
            <Link
              key={i}
              href={ch.href ?? "#"}
              className={`flex cursor-pointer items-center py-1 pl-6 pr-8 hover:bg-orange-500 hover:text-white ${activeItemId === ch.id.toString() ? 'text-orange-500' : 'text-blue-950'}`}
              onClick={() => onItemClick(ch.id.toString(), ch.href)}  // Update this line
            >
              {/* ... */}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default MenuMobile;