import { FC } from "react";
import BasePopup from "./BasePopup";
import Button from "../UI/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
}

const DeleteGoalTypePopup: FC<IProps> = ({ isVisible, onClose, title, onDelete }) => {
  const t = useTranslations('Popups');

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Зупиняємо клік, щоб не відкрилася картка
    onDelete();
    onClose();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation(); // Зупиняємо клік тут теж
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
          {t('delete')} {title}
        </h2>

        <div className='mb-10'>
          <p className="text-gray-400 font-semibold text-center">{t('delete_goal_type.title')}</p>
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
  );
};

export default DeleteGoalTypePopup;
