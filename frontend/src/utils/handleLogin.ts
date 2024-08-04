import { useStore } from "../store/useStore";
import { UserLoginResponse } from "../types/types";

export const handleLogin = (response: UserLoginResponse) => {
  const { tokenResponse, user } = response;
  useStore.getState().setTokenResponse(tokenResponse);
  useStore.getState().setUser(user);
};