import { ICustomFieldDefinition } from "@/utils/interfaces";
import { FC } from "react";
import DatePicker from "react-datepicker";

interface IProps {
  customField: ICustomFieldDefinition
}

const CustomDateField: FC<IProps> = ({ customField }) => {
  const selectedDate = null; // todo fake value (get from customFieldAnswers)

  return (
    <div className="mb-3">
      <label htmlFor={customField.id} className="mb-1 font-semibold block">{customField.label}</label>
      <DatePicker
        id={customField.id}
        selected={selectedDate}
        // onChange={(date: Date | null) => setFieldValue(name, date)}
        // onBlur={() => setFieldTouched(name, true)}
        // placeholderText={t('select_date')}
        className="w-full p-2 border rounded"
      />
    </div>
  )
}

export default CustomDateField;
