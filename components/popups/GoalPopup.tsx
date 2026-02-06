import { IGoal } from "@/utils/interfaces";
import { FC, useState } from "react";
import BasePopup from "./BasePopup";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { UpdateGoalParams, useUpdateGoalMutation } from "@/react-query/mutations/goalsMutations/useUpdateGoalMutation";
import { useTranslations } from "next-intl";
import { useGetCustomFieldDefinitionsByGoalTypeId } from "@/react-query/queries/customFieldDefinitionsQueries/useGetCustomFieldDefinitionsByGoalTypeIdQuery";

interface IProps {
  isVisible: boolean;
  onClose: () => void;
  goal: IGoal;
}

const GoalPopup: FC<IProps> = ({ goal, onClose, isVisible }) => {
  const t = useTranslations('Popups');
  const { updateGoal } = useUpdateGoalMutation();
  const { customFieldDefinitions } = useGetCustomFieldDefinitionsByGoalTypeId(goal.typeId);

  const [title, setTitle] = useState(goal.title);

  const onUpdate = (goalData: UpdateGoalParams) => {
    if (title.trim() === '') {
      setTitle(goal.title);
      return;
    }

    updateGoal({
      id: goal.id,
      data: { ...goal, ...goalData.data },
    });
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onUpdate({ id: goal.id, data: { title } });
    }
  };

  const onBlur = () => {
    onUpdate({ id: goal.id, data: { title } });
  };

  return (
    <BasePopup isVisible={isVisible} onClose={onClose}>
      <div className="flex flex-col w-[90vw] md:w-180 lg:w-200">
        <div className='flex justify-between items-center'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('add_goal.title')}
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

        <div>CUSTOM FIELDS BLOCK</div>
        <div>DESCRIPTION BLOCK</div>
        <div>CHECK LIST BLOCK</div>
      </div>
    </BasePopup>
  )
}

export default GoalPopup;
