import { Checklist, ChecklistRequest, ChecklistItem, ChecklistItemRequest, ReorderItemRequest } from "@/utils/interfaces";
import { apiClient } from "../index";

export const checklistService = {
  async getChecklistsByOwner(ownerId: string, ownerType: string) {
    const { data } = await apiClient.get<Checklist[]>(`/checklists/owner/${ownerId}?type=${ownerType}`);
    return data;
  },

  async createChecklist(payload: ChecklistRequest) {
    const { data } = await apiClient.post<Checklist>('/checklists', payload);
    return data;
  },

  async updateChecklist(id: string, payload: Partial<ChecklistRequest>) {
    const { data } = await apiClient.put<Checklist>(`/checklists/${id}`, payload);
    return data;
  },

  async deleteChecklist(id: string) {
    await apiClient.delete(`/checklists/${id}`);
  },

  // Items
  async addItem(checklistId: string, payload: ChecklistItemRequest) {
    const { data } = await apiClient.post<ChecklistItem>(`/checklists/${checklistId}/items`, payload);
    return data;
  },

  async updateItem(itemId: string, payload: Partial<ChecklistItemRequest>) {
    const { data } = await apiClient.put<ChecklistItem>(`/checklists/items/${itemId}`, payload);
    return data;
  },

  async deleteItem(itemId: string) {
    await apiClient.delete(`/checklists/items/${itemId}`);
  },

  async reorderItems(checklistId: string, items: ReorderItemRequest[]) {
    const { data } = await apiClient.patch<ChecklistItem[]>(`/checklists/${checklistId}/items/reorder`, items);
    return data;
  }
};
