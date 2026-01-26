'use client';

import { IGoal, IGoalType } from "@/utils/interfaces";
import { FC } from "react";
import Tag from "./Tag";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { isGoal } from "@/utils/helpers";

interface IProps {
  data: IGoal | IGoalType;
}

const GoalCard: FC<IProps> = ({ data }) => {
  return (
    <div 
      className="p-2 rounded-xl mb-2 bg-gray-600 border border-gray-600 hover:border-white 
      active:bg-gray-500 cursor-pointer transition duration-300"
    >
      {isGoal(data) && (
        <div className="flex items-center gap-1 mb-2">
          {data.labels.map(label => (
            <div
              key={label.id}
              className="w-10 h-2 rounded-full"
              style={{ backgroundColor: label.color }}
            ></div>
          ))}
        </div>
      )}

      <p className="font-medium my-3">{data.title}</p>

      {isGoal(data) && !!data.checkList.length && (
        <div className="mb-2">
          <Tag color="ghost" size="small" className="border-none">
            <div className="flex items-center gap-2">
              <Bars3BottomLeftIcon className="size-4" />
              <span>{data.checkList.filter(c => c.isChecked).length}/{data.checkList.length}</span>
            </div>
          </Tag>
        </div>
      )}

      {/* {!!goalCard.deadline && (
        <Tag color={getColor} size="small" className="border-none">
          <div className="flex items-center gap-2">
            <ClockIcon className="size-4" />
            <span>{format(new Date(goalCard.deadline), 'dd MMM yy')}</span>
          </div>
        </Tag>
      )} */}
    </div>
  )
}

export default GoalCard;
