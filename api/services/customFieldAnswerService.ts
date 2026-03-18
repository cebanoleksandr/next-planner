import { apiClient } from '../index';
import { ICustomFieldAnswer, ICustomFieldAnswerRequest, IPage } from '@/utils/interfaces';

export const CustomFieldAnswerService = {
  async getByGoal(goalId: string) {
    const { data } = await apiClient.get<IPage<ICustomFieldAnswer>>(`/api/goals/${goalId}/custom-field-answers`);
    return data.content;
  },

  async create(goalId: string, answer: ICustomFieldAnswerRequest) {
    const { data } = await apiClient.post<ICustomFieldAnswer>(
      `/api/goals/${goalId}/custom-field-answers`, 
      answer
    );
    return data;
  },

  async update(goalId: string, id: string, answer: ICustomFieldAnswerRequest) {
    const { data } = await apiClient.put<ICustomFieldAnswer>(
      `/api/goals/${goalId}/custom-field-answers/${id}`, 
      answer
    );
    return data;
  },

  async patch(goalId: string, id: string, answer: Partial<ICustomFieldAnswerRequest>) {
    const { data } = await apiClient.patch<ICustomFieldAnswer>(
      `/api/goals/${goalId}/custom-field-answers/${id}`, 
      answer
    );
    return data;
  },

  async delete(goalId: string, id: string) {
    await apiClient.delete(`/api/goals/${goalId}/custom-field-answers/${id}`);
  }
};
