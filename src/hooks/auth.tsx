import { useMutation, useQuery } from "react-query";
import { getMeUserApi, loginUserApi, registerUserApi } from "../api/auth";

export const useRegisterUserMutation = (options?: {
  onSuccess?: () => void;
}) => {
  return useMutation(registerUserApi, {
    onSuccess: options?.onSuccess
  });
};

export const useLoginUserMutation = (options?: { onSuccess?: () => void }) => {
  return useMutation(loginUserApi, {
    onSuccess: options?.onSuccess
  });
};

export const useGetMeUserQuery = (options?: { enabled?: boolean }) => {
  return useQuery("me-user", getMeUserApi, {
    enabled: options?.enabled,
    retry: false
  });
};
