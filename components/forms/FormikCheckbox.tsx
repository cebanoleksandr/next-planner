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
        {({ field,form }: FieldProps<string[]>) => {
          const safeValue = Array.isArray(field.value) ? field.value : [];

          return options.map(option => {
            const isChecked = safeValue.includes(option.value);

            return (
              <Fragment key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  className="mr-2 ml-4"
                  onChange={() => {
                    const nextValue = isChecked
                      ? safeValue.filter((v: string) => v !== option.value)
                      : [...safeValue, option.value];
                    form.setFieldValue(name, nextValue);
                  }}
                  onBlur={field.onBlur}
                />
                <label htmlFor={option.value} className="text-white">
                  {option.key}
                </label>
              </Fragment>
            );
          })
        }}
      </Field>
      <ErrorMessage name={name!}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  )
}

export default FormikCheckbox;
