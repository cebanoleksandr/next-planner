import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

export type ISidebarItem = {
  id: string;
  title: string;
  icon: React.ElementType;
  href: string;
} | {
  id: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string;
    titleId?: string;
  } & RefAttributes<any>>;
  href: string;
}

export interface IGoalType {
  id: string;
  title: string;
  level: number;
  userId: string;
  goalCards: IGoal[];
  customFields: ICustomFieldDefinition[];
}

export interface ICustomFieldDefinition {
  id: string;
  key: string;
  label: string;
  type: CustomFieldType;
}

export enum CustomFieldType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
}

export interface IGoal {
  id: string;
  goalTypeId: string;
  title: string;
  description: string;
  labels: ILabel[];
  checkList: ICheckList[];
  customFieldAnswers?: ICustomFieldAnswer[];
}

export interface ILabel {
  id: string;
  title: string;
  color: string;
}

export type RepeatType = 'NEVER' | 'DAILY' | 'WEEKDAY' | 'WEEKLY' | 'MONTHLY';

export interface IComment {}

export interface ICheckList {
  id: string;
  title: string;
  isChecked: boolean;
}

export interface ICustomFieldAnswer {
  id: string;
  value: string;
  customFieldId: string;
  goalCardId: string;
}
