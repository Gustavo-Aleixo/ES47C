import { authApi } from '../libs/axios';

export const loginRequest = async (email: string, password: string) =>
  (await authApi.post('/login', { email, password })).data;

export const profileRequest = async () => (await authApi.get('/profile')).data;
