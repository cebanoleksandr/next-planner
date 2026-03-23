import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

// --- ENUMS ---
export enum ProgressStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
  ARCHIVED = 'ARCHIVED'
}

export enum OwnerType {
  GOAL = 'GOAL',
  SUB_GOAL = 'SUB_GOAL'
}

export enum CustomFieldType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE'
}

// --- COMMON ---
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ReorderItemRequest {
  id: string;
  newPosition: number;
}

// --- LABELS ---
export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface LabelRequest {
  name: string;
  color: string;
}

// --- LIFE ASPECTS (FORMER GOAL TYPES) ---
export interface LifeAspect {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface LifeAspectRequest {
  name: string;
  icon: string;
  description: string;
  color: string;
}

// --- CHECKLISTS ---
export interface ChecklistItem {
  id: string;
  content: string;
  completed: boolean;
  position: number;
}

export interface ChecklistItemRequest {
  content: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  ownerId: string;
  ownerType: OwnerType;
  items: ChecklistItem[];
}

export interface ChecklistRequest {
  title: string;
  ownerId: string;
  ownerType: OwnerType;
}

// --- CUSTOM FIELDS ---
export interface CustomFieldDefinition {
  id: string;
  name: string;
  type: CustomFieldType;
  lifeAspectId: string;
  required: boolean;
}

export interface CustomFieldAnswer {
  id: string;
  fieldDefinitionId: string;
  goalId: string;
  value: string;
}

// --- GOALS ---
export interface Goal {
  id: string;
  title: string;
  description: string;
  parentGoalId?: string;
  lifeAspectId: string;
  status: ProgressStatus;
  priority: number;
  progress: number;
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
  labels: Label[];
  checklists: Checklist[];
  customFields: CustomFieldAnswer[];
}

export interface GoalRequest {
  title: string;
  description?: string;
  parentGoalId?: string;
  lifeAspectId: string;
  status: ProgressStatus;
  priority: number;
  startDate?: string;
  targetDate?: string;
}

// --- SUBGOALS ---
export interface SubGoal {
  id: string;
  goalId: string;
  title: string;
  description: string;
  status: ProgressStatus;
  position: number;
  targetDate?: string;
  completedDate?: string;
}

export interface SubGoalRequest {
  goalId: string;
  title: string;
  description?: string;
  status: ProgressStatus;
  targetDate?: string;
}

// --- USER ---
export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  avatarUrl: string;
  location: string;
}

export interface UserProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
}

export interface IOption { 
  value: string;
  key: string;
}

export interface IPage<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
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

export interface ICustomFieldDefinition {
  id: string;
  required: boolean;
  placeholder: string | null;
  label: string;
  type: CustomFieldType;
}

export interface CreateCustomFieldDTO {
  goalTypeId: string;
  customFieldDefinition: {
    label: string;
    type: CustomFieldType;
  }
}

export interface UpdateCustomFieldDTO {
  goalTypeId: string;
  customFieldDefinition: {
    id: string;
    required: boolean;
    placeholder: string | null;
    label: string;
    type: CustomFieldType;
  }
}

export interface DeleteCustomFieldDTO {
  goalTypeId: string;
  id: string
}

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
