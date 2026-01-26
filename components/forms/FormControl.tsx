import type { FC, HTMLAttributes } from "react";
import FormikInput from "./FormikInput";
import FormikCheckbox from "./FormikCheckbox";
import FormikRadioButtons from "./FormikRadioButton";
import FormikSelect from "./FormikSelect";
import FormikTextarea from "./FormikTextarea";
import { IOption } from "@/utils/interfaces";
import FormikDatePicker from "./FormikDatePicker";

interface IProps extends HTMLAttributes<HTMLElement> {
  control: 'input' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  type?: 'email' | 'text' | 'password'
  name: string;
  isError: boolean;
  isTouched: boolean;
  options?: IOption[];
}

const FormikControl: FC<IProps> = ({
  control,
  isError,
  isTouched,
  label,
  name,
  placeholder = '',
  type = 'text',
  options = [],
  ...rest
}) => {
  switch (control) {
    case 'input':
      return (
        <FormikInput
          {...rest} 
          label={label} 
          placeholder={placeholder} 
          type={type}
          name={name}
          isError={isError}
          isTouched={isTouched}
        />
      );
    case 'textarea':
      return (
        <FormikTextarea
          {...rest} 
          label={label} 
          placeholder={placeholder} 
          name={name}
          isError={isError}
          isTouched={isTouched}
        />
      );
    case 'select':
      return (
        <FormikSelect
          {...rest} 
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
          options={options}
        />
      );
    case 'radio':
      return (
        <FormikRadioButtons 
          {...rest} 
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
          options={options}
        />
      );
    case 'checkbox':
      return (
        <FormikCheckbox
          {...rest} 
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
          options={options}
        />
      );
    case 'date':
      return (
        <FormikDatePicker
          label={label}
          name={name}
          isError={isError}
          isTouched={isTouched}
        />
      );
  
    default:
      return null;
  }
}

export default FormikControl;
