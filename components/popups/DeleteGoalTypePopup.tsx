import { FC } from "react";
import BasePopup from "./BasePopup";
import Button from "../UI/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { IGoalType } from "@/utils/interfaces";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onDelete: () => void;
  goal: IGoalType;
}

const DeleteGoalTypePopup: FC<IProps> = ({ isVisible, onClose, goal, onDelete }) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col">
        <div className='flex justify-end'>
          <button className='p-2 rounded-sm hover:bg-gray-600 transition duration-300' onClick={onClose}>
            <XMarkIcon className='w-6 h-6 text-white hover:text-gray-300 transition duration-300 cursor-pointer' />
          </button>
        </div>

        <h2 className='text-center text-white text-2xl font-semibold mb-4'>
          Delete {goal.title}
        </h2>

        <div className='mb-10'>
          <p className="text-gray-400 font-semibold text-center">Are you sure you want to delete this goal-type?</p>
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

export default DeleteGoalTypePopup;
