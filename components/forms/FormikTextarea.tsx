import { ErrorMessage, Field } from "formik";
import type { FC, TextareaHTMLAttributes } from "react";
import TextError from "./TextError";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  isError: boolean;
  isTouched: boolean;
}

const FormikTextarea: FC<IProps> = ({ label, isError, isTouched, name, className, ...rest }) => {
  return (
    <div className="mb-6 relative">
      <label htmlFor={name} className={`${isError && isTouched && 'text-red-500'} font-semibold text-white`}>{label}</label>
      <Field
        as='textarea'
        id={name}
        name={name}
        className={`w-full p-2 outline-yellow-500 border border-gray-100 rounded-xl resize-none ${isError && isTouched ? 'bg-red-200' : 'bg-white'}`}
        {...rest}
      />
      <ErrorMessage name={name!}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default FormikTextarea;
