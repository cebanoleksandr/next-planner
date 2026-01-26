import { ErrorMessage, Field, type FieldProps } from "formik";
import { Fragment, type FC, type HTMLAttributes } from "react";
import TextError from "./TextError";
import { IOption } from "@/utils/interfaces";

interface IProps extends HTMLAttributes<HTMLElement> {
  label: string;
  isError: boolean;
  isTouched: boolean;
  name: string;
  options: IOption[];
}

const FormikCheckbox: FC<IProps> = ({ label, isError, isTouched, name, options, ...rest }) => {
  return (
    <div className="mb-6 relative">
      <label className={`${isError && isTouched && 'text-red-500'} font-semibold w-full mb-1 block text-white`}>{label}</label>
      <Field
        name={name}
        {...rest}
      >
        {({ field }: FieldProps<string>) => {
          return options.map(option => (
            <Fragment key={option.key}>
              <input 
                type="checkbox" 
                id={option.value} 
                {...field} 
                value={option.value} 
                checked={field.value.includes(option.value)}
                className="mr-2 ml-4"
              />
              <label htmlFor={option.value}>{option.key}</label>
            </Fragment>
          ))
        }}
      </Field>
      <ErrorMessage name={name!}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default FormikCheckbox;
