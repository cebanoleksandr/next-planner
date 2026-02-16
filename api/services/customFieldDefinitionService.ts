import { apiClient } from '../index';
import { CreateCustomFieldDTO, DeleteCustomFieldDTO, ICustomFieldDefinition, IPage, UpdateCustomFieldDTO } from '@/utils/interfaces';

export const CustomFieldDefinitionService = {
  async getAll() {
    const { data } = await apiClient.get<IPage<ICustomFieldDefinition>>('/api/custom-fields/definitions');
    return data;
  },

  async getByGoalType(goalTypeId: string) {
    const { data } = await apiClient.get<ICustomFieldDefinition[]>(`/api/goal-types/${goalTypeId}/custom-fields`);
    return data;
  },

  async create(definitionDto: CreateCustomFieldDTO) {
    const { data } = await apiClient.post<ICustomFieldDefinition>(`/api/goal-types/${definitionDto.goalTypeId}/custom-fields`, definitionDto.customFieldDefinition);
    return data;
  },

  async update(definitionDto: UpdateCustomFieldDTO) {
    const { data } = await apiClient.put<ICustomFieldDefinition>(`/api/goal-types/${definitionDto.goalTypeId}/custom-fields/${definitionDto.customFieldDefinition.id}`, definitionDto.customFieldDefinition);
    return data;
  },

  async delete(definitionDto: DeleteCustomFieldDTO) {
    return await apiClient.delete<ICustomFieldDefinition>(`/api/goal-types/${definitionDto.goalTypeId}/custom-fields/${definitionDto.id}`);
  },
};
