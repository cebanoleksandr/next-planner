import { UserProfile, UserProfileRequest } from "@/utils/interfaces";
import { apiClient } from "../index";

export const userService = {
  async getProfile() {
    const { data } = await apiClient.get<UserProfile>('/user/profile');
    return data;
  },

  async updateProfile(payload: UserProfileRequest) {
    const { data } = await apiClient.put<UserProfile>('/user/profile', payload);
    return data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiClient.post<{url: string}>('/user/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }
};
