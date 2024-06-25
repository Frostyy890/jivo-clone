import { Reducer } from "react";
import { AuthAction, AuthActionTypes, IUser } from "./AuthActions";
import Cookies from "js-cookie";

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser | null;
}

const getToken = (): string | null => Cookies.get("token") || null;
const getUser = (): IUser | null => {
  const userFromStorage = sessionStorage.getItem("user");
  return userFromStorage && JSON.parse(userFromStorage);
};

export const initialAuthState: IAuthState = {
  token: getToken(),
  user: getUser(),
  isLoggedIn: !!getToken() && !!getUser(),
};

const AuthReducer: Reducer<IAuthState, AuthAction> = (state = initialAuthState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN:
      const { user, token } = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      Cookies.set("token", action.payload.token);
      return {
        ...state,
        user,
        token,
        isLoggedIn: true,
      };
    case AuthActionTypes.LOG_OUT:
      sessionStorage.removeItem("user");
      Cookies.remove("token");
      return {
        ...state,
        user: null,
        token: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
