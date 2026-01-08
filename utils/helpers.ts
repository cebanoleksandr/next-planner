import { TrophyIcon } from "@heroicons/react/24/solid";
import { IGoalType, ISidebarItem } from "./interfaces";

export const getSidebarOptions = (goalTypes: IGoalType[]): ISidebarItem[] => {
  return goalTypes.map(type => ({
    id: type.id,
    title: type.title,
    icon: TrophyIcon,
    href: `/${type.id}`
  }));
}
