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
  levelNumber: number;
  userId: string;
  goalCards: IGoal[];
  customFields: ICustomFieldDefinition[];
}

export type ICreateCustomFieldDefinition = Omit<ICustomFieldDefinition, 'id' | 'key'> & {
  id?: string;
  key?: string;
};

export interface ICreateGoalType {
  title: string;
  customFields: ICreateCustomFieldDefinition[];
  levelNumber?: number;      // Тепер необов'язково
  goalCards?: IGoal[]; // Тепер необов'язково
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

export interface ICreateGoal {
  title: string;
  description?: string;
  type: IGoalType;
  status: GoalStatus;
  customAnswers?: ICustomFieldAnswer[];
}

export enum GoalStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD'
}

export interface ILabel {
  id: string;
  title: string;
  color: string;
}

export type RepeatType = 'NEVER' | 'DAILY' | 'WEEKDAY' | 'WEEKLY' | 'MONTHLY';

export interface IComment { }

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

// Интерфейс для Spring Page
export interface IPage<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;         // текущая страница (0-based)
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// Параметры для запроса пагинации
export interface PageRequest {
  page?: number;      // номер страницы (0-based)
  size?: number;      // размер страницы
  sort?: string;      // например: "levelNumber,asc"
}

export interface IOption { 
  value: string;
  key: string;
}
