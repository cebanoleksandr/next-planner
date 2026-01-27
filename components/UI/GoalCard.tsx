'use client';

import { IGoal, IGoalType } from "@/utils/interfaces";
import { FC, MouseEvent, useState } from "react";
import Tag from "./Tag";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import { isGoal } from "@/utils/helpers";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import ContextMenu, { IContextMenuItem } from "./ContextMenu";
import DeleteGoalTypePopup from "../popups/DeleteGoalTypePopup";
import { useDeleteGoalTypeMutation } from "@/react-query/mutations/goalTypesMutations/useDeleteGoalTypeMutation";
import { useDeleteGoalMutation } from "@/react-query/mutations/goalsMutations/useDeleteGoalMutation";

interface IProps {
  data: IGoal | IGoalType;
  type: 'goal' | 'type';
}

const GoalCard: FC<IProps> = ({ data, type }) => {
  const { deleteGoalType } = useDeleteGoalTypeMutation();
  const { deleteGoal } = useDeleteGoalMutation();

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isDeleteGoalPopupVisible, setIsDeleteGoalPopupVisible] = useState(false);
  const [isDeleteTypePopupVisible, setIsDeleteTypePopupVisible] = useState(false);

  const contextMenuGoalOptions: IContextMenuItem[] = [
    { text: 'Delete', onSelect: () => setIsDeleteGoalPopupVisible(true), color: 'red' },
  ];

  const contextMenuTypeOptions: IContextMenuItem[] = [
    { text: 'Delete', onSelect: () => setIsDeleteTypePopupVisible(true), color: 'red' },
  ];

  const onOpenTypeOptions = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsContextMenuOpen(true);
  };

  const onDelete = () => {
    if (type === 'type') {
      deleteGoalType((data as IGoalType).id);
    } else {
      deleteGoal((data as IGoal).id);
    }
  }

  return (
    <div
      className="relative p-2 rounded-xl mb-2 bg-gray-600 border border-gray-600 hover:border-white 
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

      {type === 'goal' && (
        <div className="absolute top-2 right-2">
          <ContextMenu
            state={isContextMenuOpen}
            setState={setIsContextMenuOpen}
            items={contextMenuGoalOptions}
          >
            <button
              className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition duration-300 cursor-pointer"
            >
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </button>
          </ContextMenu>
        </div>
      )}

      {type === 'type' && (
        <div className="absolute top-2 right-2">
          <ContextMenu
            state={isContextMenuOpen}
            setState={setIsContextMenuOpen}
            items={contextMenuTypeOptions}
          >
            <button
              className="p-2 hover:bg-gray-700 active:bg-gray-600 rounded-lg transition duration-300 cursor-pointer"
              onClick={onOpenTypeOptions}
            >
              <EllipsisHorizontalIcon className="w-4 h-4" />
            </button>
          </ContextMenu>
        </div>
      )}

      {type === 'type' && (
        <DeleteGoalTypePopup
          isVisible={isDeleteTypePopupVisible}
          onClose={() => setIsDeleteTypePopupVisible(false)}
          goal={data as IGoalType}
          onDelete={onDelete}
        />
      )}
    </div>
  )
}

export default GoalCard;
