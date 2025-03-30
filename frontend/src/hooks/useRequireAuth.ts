import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const useRequireAuth = (): void => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
};
