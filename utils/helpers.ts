import { TrophyIcon } from "@heroicons/react/24/solid";
import { IGoal, IGoalType, IOption, ISidebarItem } from "./interfaces";

export const getSidebarOptions = (goalTypes: IGoalType[]): ISidebarItem[] => {
  return goalTypes.map(type => ({
    id: type.id,
    title: type.title,
    icon: TrophyIcon,
    href: `/${type.id}`
  }));
}

export const isGoal = (obj: any): obj is IGoal => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    Array.isArray(obj.labels) &&
    Array.isArray(obj.checkList)
  );
}

export const getGoalTypeOptions = (goalTypes: IGoalType[]): IOption[] => {
  return goalTypes.map(type => ({
    key: type.title,
    value: type.id
  }));
}
