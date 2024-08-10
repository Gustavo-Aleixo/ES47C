import { api } from './axios';
import { UserLogin, UserLoginResponse, UserRegister } from '../types/types';


const loginUser = async (login: UserLogin): Promise<UserLoginResponse> => {
  return api.post('auth/login', login)
    .then(response => response.data);
};

const registerUser = async (register: UserRegister): Promise<UserLoginResponse> => {
  return api.post('auth/register', register)
    .then(response => response.data);
};

const AuthService = {
  loginUser,
  registerUser
};

export default AuthService;