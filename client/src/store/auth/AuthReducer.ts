import { Reducer } from "react";
import { AuthAction, AuthActionTypes, IUser } from "./AuthActions";
import Cookies from "js-cookie";

export interface IAuthState {
  isLoggedIn: boolean;
  token: string | null;
  user: IUser | null;
}

const userFromStorage = localStorage.getItem("user");

export const initialAuthState: IAuthState = {
  isLoggedIn: false,
  token: Cookies.get("token") || null,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
};

const AuthReducer: Reducer<IAuthState, AuthAction> = (state = initialAuthState, action) => {
  switch (action.type) {
    case AuthActionTypes.LOG_IN:
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      Cookies.set("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case AuthActionTypes.LOG_OUT:
      localStorage.removeItem("user");
      Cookies.remove("token");
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
