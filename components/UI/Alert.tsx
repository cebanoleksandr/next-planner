'use client';

import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/storage/hooks";
import { removeAlertAC } from "@/storage/alertSlice";

const Alert = () => {
  const { text, mode } = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        dispatch(removeAlertAC());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [text, dispatch]);

  if (!text) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={cn(
          "text-white px-4 py-3 rounded shadow-lg flex items-center gap-2 transition-all duration-300", {
            "bg-green-500": mode === "success",
            "bg-red-500": mode === "error",
            "bg-blue-500": mode === "info",
            "bg-yellow-500": mode === "warning",
          })}
      >
        <span className="flex-1">{text}</span>
        <button onClick={() => dispatch(removeAlertAC())}>
          <XMarkIcon className="w-5 h-5 text-white hover:text-gray-200" />
        </button>
      </div>
    </div>
  );
};

export default Alert;
