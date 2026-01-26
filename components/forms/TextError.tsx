import type { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const TextError: FC<IProps> = ({ children }) => {
  return (
    <div className="text-red-500 text-sm absolute -bottom-5.5 left-0">{children}</div>
  )
}

export default TextError;
