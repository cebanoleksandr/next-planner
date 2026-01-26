import { ErrorMessage, Field } from "formik";
import type { FC, HTMLAttributes } from "react";
import TextError from "./TextError";
import { IOption } from "@/utils/interfaces";

interface IProps extends HTMLAttributes<HTMLElement> {
  label: string;
  isError: boolean;
  isTouched: boolean;
  name: string;
  options: IOption[];
}

const FormikSelect: FC<IProps> = ({ label, isError, isTouched, options, name, className, ...rest }) => {
  return (
    <div className="mb-6 relative">
      <label htmlFor={name} className={`${isError && isTouched && 'text-red-500'} font-semibold text-white`}>{label}</label>
      <Field 
        as='select'
        id={name}
        name={name}
        className={`w-full p-2 outline-yellow-500 border border-gray-100 rounded-xl resize-none ${isError && isTouched ? 'bg-red-200' : 'bg-white'}`}
        {...rest}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.key}</option>
        ))}
      </Field>
      <ErrorMessage name={name!}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default FormikSelect;
