import axios from 'axios';
import { useStore } from '../store/useStore';
const { tokenResponse, startLoading, stopLoading } = useStore.getState()



export const api = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials: true
});


api.interceptors.request.use(
  (config) => {
    startLoading()
    config.headers.Authorization = `Bearer ${tokenResponse?.token}`
    return config;
  },
  (error) => {
    stopLoading()
    return Promise.reject(error);
  }

);


api.interceptors.response.use(
  (response) => {
    stopLoading()
    return response;
  },
  (error) => {
    stopLoading()
    return Promise.reject(error);
  }
);