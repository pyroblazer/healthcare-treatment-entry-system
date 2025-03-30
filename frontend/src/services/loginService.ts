import apiClient from './apiService';

export const loginService = {
  async login(email: string, password: string): Promise<void> {
    const response = await apiClient.post<{ accessToken: string }>('/auth/login', { email, password });
    if (response.data?.accessToken) {
      localStorage.setItem('jwtToken', response.data.accessToken);
    }
  },

  async signup(email: string, password: string): Promise<void> {
    const response = await apiClient.post<{ accessToken: string }>('/auth/signup', { email, password });
    if (response.data?.accessToken) {
      localStorage.setItem('jwtToken', response.data.accessToken);
    }
  },

  logout(): void {
    localStorage.removeItem('jwtToken');
  },
};
