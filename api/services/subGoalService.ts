import { SubGoal, SubGoalRequest, ReorderItemRequest } from "@/utils/interfaces";
import { apiClient } from "../index";

export const subGoalService = {
  async getSubGoalsByGoalId(goalId: string) {
    const { data } = await apiClient.get<SubGoal[]>(`/subgoals/goal/${goalId}`);
    return data;
  },

  async createSubGoal(payload: SubGoalRequest) {
    const { data } = await apiClient.post<SubGoal>('/subgoals', payload);
    return data;
  },

  async updateSubGoal(id: string, payload: Partial<SubGoalRequest>) {
    const { data } = await apiClient.put<SubGoal>(`/subgoals/${id}`, payload);
    return data;
  },

  async deleteSubGoal(id: string) {
    await apiClient.delete(`/subgoals/${id}`);
  },

  async reorderSubGoals(items: ReorderItemRequest[]) {
    const { data } = await apiClient.patch<SubGoal[]>('/subgoals/reorder', items);
    return data;
  }
};
