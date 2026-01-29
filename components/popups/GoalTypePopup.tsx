'use client';

import { IGoalType } from "@/utils/interfaces";
import { FC, useState } from "react";
import BasePopup from "./BasePopup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useUpdateGoalTypeMutation } from "@/react-query/mutations/goalTypesMutations/useUpdateGoalTypeMutation";
import CustomFieldForm from "../forms/CustomFieldForm";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  goalType: IGoalType;
}

const GoalTypePopup: FC<IProps> = ({ isVisible, onClose, goalType }) => {
  const { updateGoalType } = useUpdateGoalTypeMutation();

  const [title, setTitle] = useState(goalType.title);

  const onUpdate = (goalTypeData: Partial<IGoalType>) => {
    if (title.trim() === '') {
      setTitle(goalType.title);
      return;
    }
    
    updateGoalType({
      id: goalType.id,
      data: { ...goalType, ...goalTypeData },
    });
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onUpdate({ title });
    }
  };

  const onBlur = () => {
    onUpdate({ title });
  };

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col w-[90vw] md:w-180 lg:w-200">
        <div className='flex justify-between items-center'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal Type Title"
            className="w-full bg-gray-800 text-white text-2xl font-semibold border-0 focus:ring-0"
            onKeyDown={onEnterPress}
            onBlur={onBlur}
          />

          <div className='flex items-center gap-2'>
            <button className='p-2 rounded-sm hover:bg-gray-600 transition duration-300' onClick={onClose}>
              <XMarkIcon className='w-6 h-6 text-white hover:text-gray-300 transition duration-300 cursor-pointer' />
            </button>
          </div>
        </div>

        <CustomFieldForm
          customFields={goalType.customFields}
          onUpdate={onUpdate}
        />
      </div>
    </BasePopup>
  );
};

export default GoalTypePopup;
