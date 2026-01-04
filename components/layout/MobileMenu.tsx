"use client";

import { FC, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  XMarkIcon,
} from "@heroicons/react/24/solid";
import SidebarItem from "./SidebarItem";
import { ISidebarItem } from "@/utils/interfaces";
import { Variants, motion } from "framer-motion";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  sidebarItems: ISidebarItem[];
}

const MobileMenu: FC<IProps> = ({ isOpen, onClose, sidebarItems }) => {
  const pathname = usePathname();
  const savedPathname = useRef(pathname);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    visible: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (savedPathname.current !== pathname) {
      onClose();
      savedPathname.current = pathname;
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (isOpen) {
      savedPathname.current = pathname;
    }
  }, [isOpen, pathname]);

  return (
    <motion.div
      className="fixed top-0 left-0 bottom-0 right-0 bg-gray-800 overflow-hidden z-50"
      variants={variants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      exit="hidden"
    >
      <div className="flex justify-end mb-5">
        <XMarkIcon
          className="size-14 text-yellow-600 hover:text-yellow-500 transition duration-300 cursor-pointer p-3"
          onClick={onClose}
        />
      </div>

      <ul className="mx-4 space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </ul>
    </motion.div>
  );
};

export default MobileMenu;
