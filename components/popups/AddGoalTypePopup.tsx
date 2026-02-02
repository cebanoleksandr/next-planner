'use client';

import { FC } from 'react';
import BasePopup from './BasePopup';
import { XMarkIcon } from '@heroicons/react/24/solid';
import CreateGoalTypeForm from '../forms/CreateGoalTypeForm';
import { ICreateGoalType } from '@/utils/interfaces';
import { useCreateGoalTypeMutation } from '@/react-query/mutations/goalTypesMutations/useCreateGoalTypeMutation';
import { useTranslations } from 'next-intl';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddGoalTypePopup: FC<IProps> = ({ isVisible, onClose }) => {
  const t = useTranslations('Popups');
  const { createGoalType } = useCreateGoalTypeMutation();

  const onCreate = (goalTypeData: ICreateGoalType) => {
    createGoalType(goalTypeData);
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
          {t('add_goal_type.title')}
        </h2>

        <CreateGoalTypeForm onClose={onClose} onCreate={onCreate} />
      </div>
    </BasePopup>
  );
};

export default AddGoalTypePopup;
