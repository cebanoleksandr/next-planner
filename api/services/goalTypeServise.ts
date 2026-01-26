import { apiClient } from '../index';
import { ICreateGoalType, IGoalType, IPage } from '@/utils/interfaces';

export const GoalTypeService = {
  async getAll() {
    const { data } = await apiClient.get<IPage<IGoalType>>('/api/goal-types');
    return data.content;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<IGoalType>(`/api/goal-types/${id}`);
    return data;
  },

  async create(goalTypeData: ICreateGoalType) {
    const { data } = await apiClient.post<IGoalType>('/api/goal-types', goalTypeData);
    return data;
  },

  async update(id: string, goalTypeData: Partial<IGoalType>) {
    const { data } = await apiClient.put<IGoalType>(`/api/goal-types/${id}`, goalTypeData);
    return data;
  },

  async delete(id: string) {
    await apiClient.delete(`/api/goal-types/${id}`);
  }
};
