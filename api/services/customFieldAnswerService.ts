import { apiClient } from '../index';
import { ICustomFieldAnswer, IPage } from '@/utils/interfaces';

export const CustomFieldAnswerService = {
  async getByGoal(goalId: string) {
    const { data } = await apiClient.get<IPage<ICustomFieldAnswer[]>>(`/api/v1/custom-fields/answers/goal/${goalId}`);
    return data;
  },

  async saveAnswers(answers: ICustomFieldAnswer[]) {
    const { data } = await apiClient.post<IPage<ICustomFieldAnswer[]>>('/api/v1/custom-fields/answers', answers);
    return data;
  }
};
