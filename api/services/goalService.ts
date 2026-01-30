import { apiClient } from '../index';
import { ICreateGoal, IGoal, IPage } from '@/utils/interfaces';

export const GoalService = {
  async getAll(page = 0, size = 20) {
    const { data } = await apiClient.get<IPage<IGoal[]>>(`/api/goals?page=${page}&size=${size}`);
    console.log('GoalService.getAll data:', typeof data);
    return data.content;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<IGoal>(`/api/goals/${id}`);
    return data;
  },

  async create(goalData: ICreateGoal) {
    const { data } = await apiClient.post<IGoal>('/api/goals', goalData);
    return data;
  },

  async update(id: string, goalData: Partial<IGoal>) {
    const { data } = await apiClient.put<IGoal>(`/api/goals/${id}`, goalData);
    return data;
  },

  async delete(id: string) {
    await apiClient.delete(`/api/goals/${id}`);
  },

  async getByUser(userId: string, page = 0, size = 20) {
    const { data } = await apiClient.get<IGoal[]>(`/api/goals/user/${userId}?page=${page}&size=${size}`);
    return data;
  }
};
