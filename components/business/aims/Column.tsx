import AddGoalPopup from "@/components/popups/AddGoalPopup";
import AddGoalTypePopup from "@/components/popups/AddGoalTypePopup";
import DeleteGoalTypePopup from "@/components/popups/DeleteGoalTypePopup";
import ContextMenu, { IContextMenuItem } from "@/components/UI/ContextMenu";
import GoalCard from "@/components/UI/GoalCard";
import { IGoal, IGoalType } from "@/utils/interfaces";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { useTranslations } from "next-intl";
import { FC, HTMLAttributes, useMemo, useState } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: IGoal[] | IGoalType[];
  type: 'goal' | 'type';
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

  const contextMenuTypeOptions: IContextMenuItem[] = useMemo(() => [
    { text: `${type === 'goal' ? t('button_goal') : t('button_type')}`, onSelect: () => setIsPopupOpen(true), },
    type === 'goal' ? { text: t('delete'), onSelect: () => setIsDeleteTypePopupVisible(true), color: 'red' } : null,
  ].filter(Boolean) as IContextMenuItem[], [type]);

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
          {data.map(goalCard => (
            <GoalCard key={goalCard.id} data={goalCard} type={type} />
          ))}
        </div>
      </div>

      {!data.length && (
        <div className="my-3">
          <p className="text-center text-gray-400 text-xl font-semibold">
            {type === 'goal' ? t('empty_goal') : t('empty_type')}
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
          {type === 'goal' ? t('button_goal') : t('button_type')}
        </button>
      </div>

      {type === 'type' && (
        <AddGoalTypePopup
          isVisible={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {type === 'goal' && (
        <AddGoalPopup
          isVisible={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

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
