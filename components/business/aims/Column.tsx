'use client';

import AddGoalPopup from "@/components/popups/AddGoalPopup";
import DeleteGoalTypePopup from "@/components/popups/DeleteGoalTypePopup";
import AspectCard from "@/components/UI/AspectCard";
import ContextMenu, { IContextMenuItem } from "@/components/UI/ContextMenu";
import GoalCard from "@/components/UI/GoalCard";
import SubgoalCard from "@/components/UI/SubgoalCard";
import { Goal, LifeAspect, SubGoal } from "@/utils/interfaces";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC, HTMLAttributes, useState } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: Goal[] | LifeAspect[] | SubGoal[];
  type: 'goal' | 'aspect' | 'subgoal';
  onDelete?: () => void;
}

const Column: FC<IProps> = ({ title, data, type, onDelete = () => {}, ...props }) => {
  const t = useTranslations('Column');

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isDeleteTypePopupVisible, setIsDeleteTypePopupVisible] = useState(false);

  const handleDelete = () => {
    onDelete();
  };

  const contextMenuTypeOptions: IContextMenuItem[] = [
    { text: t('button_goal'), onSelect: () => setIsPopupOpen(true), },
    { text: t('delete'), onSelect: () => setIsDeleteTypePopupVisible(true), color: 'red' },
  ];

  return (
    <div className={cn("w-lg bg-gray-800 rounded-xl p-4 text-white")} {...props}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>

        <ContextMenu
          state={isContextMenuOpen}
          setState={setIsContextMenuOpen}
          items={contextMenuTypeOptions}
        >
          <button 
            className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition duration-300 cursor-pointer"
            onClick={() => setIsContextMenuOpen(true)}
          >
            <EllipsisHorizontalIcon className="size-6 text-white" />
          </button>
        </ContextMenu>
      </div>

      <div className="my-3 max-h-150 overflow-auto scrollbar-md">
        <div className="px-1">
          {data.map(item => (
            <>
              {type === 'goal' && <GoalCard key={item.id} data={item as Goal} />}
              {type === 'aspect' && <AspectCard key={item.id} data={item as LifeAspect} />}
              {type === 'subgoal' && <SubgoalCard key={item.id} data={item as SubGoal} />}
            </>
          ))}
        </div>
      </div>

      {!data.length && (
        <div className="my-3">
          <p className="text-center text-gray-400 text-xl font-semibold">
            {t('empty_goal')}
          </p>
        </div>
      )}

      <div>
        <button 
          className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition 
          duration-300 cursor-pointer w-full mt-4 border border-gray-500 flex items-center 
          justify-center gap-2"
          onClick={() => setIsPopupOpen(true)}
        >
          <PlusIcon className="size-6 text-white" />
          {t('button_goal')}
        </button>
      </div>

      <AddGoalPopup
        isVisible={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <DeleteGoalTypePopup
        isVisible={isDeleteTypePopupVisible}
        onClose={() => setIsDeleteTypePopupVisible(false)}
        title={title}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Column;
