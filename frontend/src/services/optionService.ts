import apiClient from './apiService';

export const optionService = {
  async getTreatmentOptions() {
    const response = await apiClient.get('/treatment-option');
    return response.data;
  },
  async getMedicationOptions() {
    const response = await apiClient.get('/medication-option');
    return response.data;
  },
};
