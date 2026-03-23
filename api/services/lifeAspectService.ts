import { LifeAspect, LifeAspectRequest } from "@/utils/interfaces";
import { apiClient } from "../index";

export const lifeAspectService = {
  async getAll() {
    const { data } = await apiClient.get<LifeAspect[]>('/life-aspects');
    return data;
  },

  async getById(id: string) {
    const { data } = await apiClient.get<LifeAspect>(`/life-aspects/${id}`);
    return data;
  },

  async create(payload: LifeAspectRequest) {
    const { data } = await apiClient.post<LifeAspect>('/life-aspects', payload);
    return data;
  },

  async update(id: string, payload: LifeAspectRequest) {
    const { data } = await apiClient.put<LifeAspect>(`/life-aspects/${id}`, payload);
    return data;
  },

  async delete(id: string) {
    await apiClient.delete(`/life-aspects/${id}`);
  }
};
