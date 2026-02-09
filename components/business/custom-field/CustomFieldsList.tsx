import { ICustomFieldDefinition } from "@/utils/interfaces";
import { FC } from "react";
import CustomField from "./CustomField";

interface IProps {
  customFields: ICustomFieldDefinition[]
}

const CustomFieldsList: FC<IProps> = ({ customFields }) => {
  return (
    <div className="text-white">
      {customFields.map(customField => (
        <CustomField key={customField.id} customField={customField} />
      ))}
    </div>
  )
}

export default CustomFieldsList;
