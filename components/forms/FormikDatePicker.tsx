import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import type { FC, HTMLAttributes } from 'react';
import { Field, type FieldProps, ErrorMessage } from 'formik';
import TextError from './TextError';
import { useTranslations } from 'next-intl';

interface IProps extends HTMLAttributes<HTMLElement> {
  label: string;
  isError: boolean;
  isTouched: boolean;
  name: string;
}

const FormikDatePicker: FC<IProps> = ({ label, name, isError, isTouched }) => {
  const t = useTranslations('Forms');

  return (
    <div className="mb-6 relative">
      <label htmlFor={name} className={`${isError && isTouched && 'text-red-500'} font-semibold w-full mb-1 block text-white`}>
        {label}
      </label>

      <Field name={name}>
        {({ field, form }: FieldProps<Date | null>) => {
          const { setFieldValue, setFieldTouched } = form;
          const selectedDate = field.value ?? null;

          return (
            <DatePicker
              id={name}
              selected={selectedDate}
              onChange={(date: Date | null) => setFieldValue(name, date)}
              onBlur={() => setFieldTouched(name, true)}
              placeholderText={t('select_date')}
              className="w-full p-2 border rounded"
            />
          );
        }}
      </Field>

      <ErrorMessage name={name}>
        {(msg) => <TextError>{msg}</TextError>}
      </ErrorMessage>
    </div>
  );
};

export default FormikDatePicker;
