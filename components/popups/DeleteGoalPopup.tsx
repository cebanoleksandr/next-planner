import { FC } from "react";
import BasePopup from "./BasePopup";
import Button from "../UI/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  title: string;
}

const DeleteGoalPopup: FC<IProps> = ({ isVisible, onClose, title, onDelete }) => {
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation(); // Зупиняємо клік тут теж
    onClose();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Зупиняємо клік, щоб не відкрилася картка
    onDelete();
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
          Delete {title}
        </h2>

        <div className='mb-10'>
          <p className="text-gray-400 font-semibold text-center">Are you sure you want to delete this goal?</p>
        </div>

        <div className='flex justify-end items-center gap-2'>
          <Button onClick={onClose} mode="white">
            Cancel
          </Button>

          <Button onClick={handleDelete} mode="error">
            Delete
          </Button>
        </div>
      </div>
    </BasePopup>
  );
};

export default DeleteGoalPopup;
