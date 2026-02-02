'use client';

import { FC } from 'react';
import BasePopup from './BasePopup';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Button from '../UI/Button';
import { useTranslations } from 'next-intl';

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutPopup: FC<IProps> = ({ isVisible, onClose, onLogout }) => {
  const t = useTranslations('Popups');

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col">
        <div className='flex justify-end'>
          <button className='p-2 rounded-sm hover:bg-gray-600 transition duration-300' onClick={onClose}>
            <XMarkIcon className='w-6 h-6 text-white hover:text-gray-300 transition duration-300 cursor-pointer' />
          </button>
        </div>

        <h2 className='text-center text-white text-2xl font-semibold mb-4'>
          {t('logout.logout')}
        </h2>

        <div className='mb-10'>
          <p className="text-gray-400 font-semibold text-center">{t('logout.title')}</p>
        </div>

        <div className='flex justify-end items-center gap-2'>
          <Button onClick={onClose} mode="white">
            {t('cancel')}
          </Button>

          <Button onClick={onLogout} mode="primary">
            {t('logout.confirm_button')}
          </Button>
        </div>
      </div>
    </BasePopup>
  );
};

export default LogoutPopup;
