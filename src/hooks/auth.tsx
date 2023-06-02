import { useMutation } from "react-query";
import { registerUserApi } from "../api/auth";

export const useRegisterUserMutation = () => {
  return useMutation(registerUserApi);
};
