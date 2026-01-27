import AddGoalPopup from "@/components/popups/AddGoalPopup";
import AddGoalTypePopup from "@/components/popups/AddGoalTypePopup";
import GoalCard from "@/components/UI/GoalCard";
import { IGoal, IGoalType } from "@/utils/interfaces";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { FC, HTMLAttributes, useState } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  data: IGoal[] | IGoalType[];
  type: 'goal' | 'type';
}

const Column: FC<IProps> = ({ title, data, type, ...props }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={cn("w-lg bg-gray-800 rounded-xl p-4 text-white")} {...props}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{title}</h2>

        <button className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition duration-300 cursor-pointer">
          <EllipsisHorizontalIcon className="size-6 text-white" />
        </button>
      </div>

      <div className="my-3 max-h-150 overflow-auto scrollbar-md">
        <div className="px-1">
          {data.map(goalCard => (
            <GoalCard key={goalCard.id} data={goalCard} type={type} />
          ))}
        </div>
      </div>

      <div>
        <button 
          className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition 
          duration-300 cursor-pointer w-full mt-4 border border-gray-500 flex items-center 
          justify-center gap-2"
          onClick={() => setIsPopupOpen(true)}
        >
          <PlusIcon className="size-6 text-white" />
          Add {type === 'goal' ? 'Goal' : 'Goal Type'}
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
    </div>
  );
};

export default Column;
