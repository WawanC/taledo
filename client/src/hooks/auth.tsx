import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getMeUserApi,
  loginUserApi,
  logoutUserApi,
  registerUserApi
} from "../api/auth";
import useAuthStore from "../stores/auth";

export const useRegisterUserMutation = (options?: {
  onSuccess?: () => void;
}) => {
  return useMutation(registerUserApi, {
    onSuccess: options?.onSuccess
  });
};

export const useLoginUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(loginUserApi, {
    onSuccess: () => queryClient.invalidateQueries("me")
  });
};

export const useGetMeUserQuery = (props?: { enabled?: boolean }) => {
  const setIsAuth = useAuthStore().setIsAuth;

  return useQuery("me", getMeUserApi, {
    retry: false,
    enabled: props?.enabled,
    onSuccess: () => setIsAuth(true),
    onError: () => setIsAuth(false)
  });
};

export const useLogoutUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(logoutUserApi, {
    onSettled: () => {
      queryClient.invalidateQueries(["me"]);
    }
  });
};
