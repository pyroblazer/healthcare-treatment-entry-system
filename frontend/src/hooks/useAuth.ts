import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../constants';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
}

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData): Promise<void> => {
      const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, data);
      if (response.data?.accessToken) {
        localStorage.setItem('jwtToken', response.data.accessToken);
      }
    },
  });

  const logout = (): void => {
    localStorage.removeItem('jwtToken');
  };

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    logout,
  };
};
