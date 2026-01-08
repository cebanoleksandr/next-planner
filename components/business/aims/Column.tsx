import Button from "@/components/UI/Button";
import GoalCard from "@/components/UI/GoalCard";
import { IGoal } from "@/utils/interfaces";
import { EllipsisHorizontalIcon, PlusIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { FC, HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  goalCards: IGoal[];
}

const Column: FC<IProps> = ({ title, goalCards, ...props }) => {
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
          {goalCards.map(goalCard => (
            <GoalCard key={goalCard.id} goalCard={goalCard} />
          ))}
        </div>
      </div>

      <div>
        <button 
          className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition 
          duration-300 cursor-pointer w-full mt-4 border border-gray-500 flex items-center 
          justify-center gap-2"
        >
          <PlusIcon className="size-6 text-white" />
          Add Card
        </button>
      </div>
    </div>
  );
};

export default Column;
