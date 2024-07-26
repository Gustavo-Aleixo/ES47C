import axios from 'axios';
import { useStore } from '../store/useStore';

export const authApi = axios.create({ baseURL: 'http://localhost:3000', withCredentials: true });

authApi.interceptors.request.use(config => {
  const { token } = useStore.getState();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
