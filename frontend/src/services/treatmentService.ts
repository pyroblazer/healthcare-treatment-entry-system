import apiClient from './apiService';
import { Treatment, TreatmentFormData } from '../types/treatment';

export const treatmentService = {
  async createTreatment(data: TreatmentFormData): Promise<Treatment> {
    const response = await apiClient.post<Treatment>('/treatments', data);
    return response.data;
  },

  async listTreatments({page = 1, limit = 10, filter = ''}): Promise<{
    treatments: Treatment[];
    totalPages: number;
    currentPage: number;
  }> {
    const response = await apiClient.get<{
      treatments: Treatment[];
      totalPages: number;
      currentPage: number;
    }>('/treatments', {
      params: { page, limit, filter },
    });
    return response.data;
  },

  async getTreatmentById(id: string): Promise<Treatment> {
    const response = await apiClient.get<Treatment>(`/treatments/${id}`);
    return response.data;
  },
};
