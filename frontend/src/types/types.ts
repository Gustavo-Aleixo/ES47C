export type Auth = {
  tokenResponse: TokenResponse | null;
  user: User | null;
  isAuthenticated: boolean;
  setTokenResponse: (tokenResponse: TokenResponse | null) => void;
  setUser: (user: User | null) => void;
  setLogout: () => void;
};

export type Loading = {
  loading: boolean,
  startLoading: () => void,
  stopLoading: () => void
};

export type User = {
  id: number;
  username: string;
  email: string;
};

export type TokenResponse = {
  token: string;
  expirationTime: number;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  username: string
  email: string;
  password: string;
};

export type UserLoginResponse = {
  tokenResponse: TokenResponse;
  user: User;
};