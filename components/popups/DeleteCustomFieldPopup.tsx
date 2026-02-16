import { ICustomFieldDefinition } from "@/utils/interfaces";
import { useTranslations } from "next-intl";
import { FC } from "react";
import BasePopup from "./BasePopup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Button from "../UI/Button";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  customField: ICustomFieldDefinition;
}

const DeleteCustomFieldPopup: FC<IProps> = ({ isVisible, onClose, onDelete, customField }) => {
  const t = useTranslations('Popups');

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(customField?.id);
    onClose();
  };

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-end'>
          <button className='p-2 rounded-sm hover:bg-gray-600 transition duration-300' onClick={handleCancel}>
            <XMarkIcon className='w-6 h-6 text-white hover:text-gray-300 transition duration-300 cursor-pointer' />
          </button>
        </div>

        <h2 className='text-center text-white text-2xl font-semibold mb-4'>
          {t('delete')} {customField?.label}
        </h2>

        <div className='mb-10'>
          <p className="text-gray-400 font-semibold text-center">{t('delete_custom_field.title')}</p>
        </div>

        <div className='flex justify-end items-center gap-2'>
          <Button onClick={onClose} mode="white">
            {t('cancel')}
          </Button>

          <Button onClick={handleDelete} mode="error">
            {t('delete')}
          </Button>
        </div>
      </div>
    </BasePopup>
  )
}

export default DeleteCustomFieldPopup;
