import { Goal, GoalRequest, PageResponse, ReorderItemRequest } from "@/utils/interfaces";
import { apiClient } from "../index";

export const goalService = {
  async getGoals(page = 1, size = 10, lifeAspectId?: string, status?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    if (lifeAspectId) params.append('lifeAspectId', lifeAspectId);
    if (status) params.append('status', status);

    const { data } = await apiClient.get<PageResponse<Goal>>(`/goals?${params.toString()}`);
    return data;
  },

  async getGoalById(id: string) {
    const { data } = await apiClient.get<Goal>(`/goals/${id}`);
    return data;
  },

  async createGoal(payload: GoalRequest) {
    const { data } = await apiClient.post<Goal>('/goals', payload);
    return data;
  },

  async updateGoal(id: string, payload: GoalRequest) {
    const { data } = await apiClient.put<Goal>(`/goals/${id}`, payload);
    return data;
  },

  async deleteGoal(id: string) {
    await apiClient.delete(`/goals/${id}`);
  },

  async reorderGoals(items: ReorderItemRequest[]) {
    const { data } = await apiClient.patch<Goal[]>('/goals/reorder', items);
    return data;
  }
};
