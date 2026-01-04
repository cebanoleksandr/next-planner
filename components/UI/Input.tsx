import { forwardRef, InputHTMLAttributes } from "react";
import cn from "classnames";

interface IProps extends InputHTMLAttributes<HTMLInputElement> { }

const Input = forwardRef<HTMLInputElement, IProps>(({ className, ...rest }, ref) => {
  return (
    <div className={cn(className, 'relative')}>
      <input
        ref={ref}
        { ...rest }
        className={cn('px-4 py-2 text-white outline-yellow-500 bg-gray-600 shadow-xs rounded-xl w-full')}
      />

      {/* <span className="absolute -bottom-5 left-0 text-red-500">
        {!!error && error.message}
      </span> */}
    </div>
  )
})

export default Input;
