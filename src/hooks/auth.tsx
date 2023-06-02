import { useMutation } from "react-query";
import { loginUserApi, registerUserApi } from "../api/auth";

export const useRegisterUserMutation = () => {
  return useMutation(registerUserApi);
};

export const useLoginUserMutation = () => {
  return useMutation(loginUserApi);
};
