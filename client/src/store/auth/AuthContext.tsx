import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthActionTypes, IAuthPayload } from "./AuthActions";
import AuthReducer, { IAuthState, initialAuthState } from "./AuthReducer";

type Props = {
  children: React.ReactNode;
};

export interface IAuthContext {
  authState: IAuthState;
  dispatchLogIn: (props: IAuthPayload) => void;
  dispatchLogOut: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({
  authState: initialAuthState,
  dispatchLogIn: () => {},
  dispatchLogOut: () => {},
});

export const AuthContextProvider = ({ children }: Props) => {
  const [authState, authDispatch] = React.useReducer(AuthReducer, initialAuthState);
  const navigate = useNavigate();
  React.useEffect(() => {
    const { token, user } = authState;
    if (user && token) authDispatch({ type: AuthActionTypes.LOG_IN, payload: { token, user } });
  }, []);
  const dispatchLogIn = React.useCallback(
    (props: IAuthPayload) => {
      authDispatch({ type: AuthActionTypes.LOG_IN, payload: props });
      navigate("/");
    },
    [navigate]
  );
  const dispatchLogOut = React.useCallback(() => {
    authDispatch({ type: AuthActionTypes.LOG_OUT, payload: null });
    navigate("/auth/sign-in");
  }, [navigate]);

  const value = {
    authState,
    dispatchLogIn,
    dispatchLogOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
