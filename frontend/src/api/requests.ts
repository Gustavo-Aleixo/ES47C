import { api } from './axios';
import { UserLogin, UserLoginResponse, UserRegister } from '../types/types';


const loginUser = async (login: UserLogin): Promise<UserLoginResponse> => {
  const response = await api.post('auth/login', login);
  return response.data;
};

const registerUser = async (register: UserRegister): Promise<UserLoginResponse> => {
  const response = await api.post('auth/register', register);
  return response.data;
};

const Request = {
  loginUser,
  registerUser
};

export default Request;