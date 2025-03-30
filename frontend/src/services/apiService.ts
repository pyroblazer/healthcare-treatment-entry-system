import axios from 'axios';
import { API_URL } from '../constants';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // If the request is for an auth endpoint, skip attaching the token
    const isAuthEndpoint = config.url?.includes('/auth/');
    if (!isAuthEndpoint) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
