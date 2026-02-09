import { CustomFieldType, ICustomFieldDefinition } from "@/utils/interfaces"
import { FC } from "react"
import CustomStringField from "./CustomStringField";
import CustomDateField from "./CustomDateField";
import CustomBooleanField from "./CustomBooleanField";
import CustomNumberField from "./CustomNumberField";

interface IProps {
  customField: ICustomFieldDefinition
}

const CustomField: FC<IProps> = ({ customField }) => {
  switch (customField.type) {
    case CustomFieldType.STRING:
      return (
        <CustomStringField />
      );
    case CustomFieldType.NUMBER:
      return (
        <CustomNumberField />
      );
    case CustomFieldType.BOOLEAN:
      return (
        <CustomBooleanField />
      );
    case CustomFieldType.DATE:
      return (
        <CustomDateField customField={customField} />
      );
  
    default:
      return null;
  }
}

export default CustomField;
