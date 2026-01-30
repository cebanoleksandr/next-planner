'use client';

import { FC } from "react";
import BasePopup from "./BasePopup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useCreateGoalMutation } from "@/react-query/mutations/goalsMutations/useCreateGoalMutation";
import { ICreateGoal } from "@/utils/interfaces";
import CreateGoalForm from "../forms/CreateGoalForm";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddGoalPopup: FC<IProps> = ({ isVisible, onClose }) => {
  const { createGoal } = useCreateGoalMutation();

  const onCreate = (goalData: ICreateGoal) => {
    createGoal(goalData);
    onClose();
  }

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col">
        <div className='flex justify-end'>
          <button className='p-2 rounded-sm hover:bg-gray-600 transition duration-300' onClick={onClose}>
            <XMarkIcon className='w-6 h-6 text-white hover:text-gray-300 transition duration-300 cursor-pointer' />
          </button>
        </div>

        <h2 className='text-center text-white text-2xl font-semibold mb-4'>
          Add Goal
        </h2>

        <CreateGoalForm onClose={onClose} onCreate={onCreate} />
      </div>
    </BasePopup>
  );
};

export default AddGoalPopup;
