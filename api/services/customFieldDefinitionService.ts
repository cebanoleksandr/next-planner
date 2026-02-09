import { apiClient } from '../index';
import { ICustomFieldDefinition, IPage } from '@/utils/interfaces';

export const CustomFieldDefinitionService = {
  async getAll() {
    const { data } = await apiClient.get<IPage<ICustomFieldDefinition>>('/api/custom-fields/definitions');
    return data;
  },

  async getByGoalType(goalTypeId: string) {
    const { data } = await apiClient.get<ICustomFieldDefinition[]>(`/api/goal-types/${goalTypeId}/custom-fields`);
    return data;
  },

  async create(definitionData: Partial<ICustomFieldDefinition>) {
    const { data } = await apiClient.post<ICustomFieldDefinition>('/api/custom-fields/definitions', definitionData);
    return data;
  }
};
