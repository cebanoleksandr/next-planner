import { FC, ReactNode } from "react";
import cn from "classnames";
import { HTMLMotionProps, motion } from "framer-motion";

interface IProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  mode?: 'primary' | 'ghost' | 'error' | 'success' | 'info' | 'white';
  className?: string;
}

const Button: FC<IProps> = ({ children, mode = 'primary', className, ...rest }) => {
  return (
    <motion.button
      className={cn(className, 'box-border px-3 py-2 cursor-pointer text-center rounded-sm text-sm transition duration-300', {
        "bg-yellow-500 text-white hover:bg-yellow-400 active:bg-yellow-300": mode === "primary",
        'bg-transparent text-gray-800 border border-gray-300 hover:bg-gray-200 active:bg-gray-300': mode === "ghost",
        'bg-red-500 text-white hover:bg-red-400 active:bg-red-300': mode === "error",
        'bg-green-500 text-white hover:bg-green-400 active:bg-green-300': mode === "success",
        'bg-blue-500 text-white hover:bg-blue-400 active:bg-blue-300': mode === "info",
        'bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200': mode === "white",
      })}
      {...rest}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
