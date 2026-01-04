"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ISidebarIcon {
  title: string;
  icon: React.ElementType;
  href: string;
}

interface IProps {
  item: ISidebarIcon;
}

const SidebarItem: FC<IProps> = ({ item }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li className="relative mb-0.5 flex items-center justify-between rounded-xl cursor-pointer overflow-hidden">
      <Link
        href={item.href}
        className={`
          flex gap-3 items-center text-yellow-300 w-full h-full p-2 rounded-xl transition-colors duration-200 ease-in-out
          ${isActive
            ? "bg-gray-700 font-semibold" 
            : "hover:bg-gray-600"}
        `}>
      
        <item.icon className="w-5 h-5 text-yellow-500" />
        {item.title}
      </Link>
    </li>
  );
};

export default SidebarItem;
