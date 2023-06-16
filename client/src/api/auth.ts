import axios from "axios";
import {
  GetMePayload,
  LoginUserPayload,
  RegisterUserPayload,
  SuccessLoginPayload
} from "../types/auth";

const authApi = axios.create({
  baseURL: `/api/auth`
});

export const registerUserApi = async (data: {
  payload: RegisterUserPayload;
}) => {
  await authApi.post("/register", data.payload);
};

export const loginUserApi = async (data: { payload: LoginUserPayload }) => {
  const response = await authApi.post<SuccessLoginPayload>(
    "/login",
    data.payload,
    { withCredentials: true }
  );
  return response.data;
};

export const getMeUserApi = async () => {
  const response = await authApi.get<GetMePayload>("/me", {
    withCredentials: true
  });
  console.log(response.data);
  return response.data;
};

export const logoutUserApi = async () => {
  await authApi.post("/logout", null, {
    withCredentials: true
  });
};
