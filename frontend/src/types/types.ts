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


export type WorkshopDto = {
  title: string;
  responsibleTeacherId: number;
  dateTime: string;
  maxStudents: number;
};

export type Workshop = {
  id: number
  title: string;
  responsibleTeacher: Teacher;
  dateTime: string;
  maxStudents: number;
};

export type Teacher = {
  id: number
  username: string;
  email: string;
  area: string;
};

export type TeacherDto = {
  username: string;
  email: string;
  area: string;
};

