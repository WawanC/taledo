import axios from "axios";
import {
  LoginUserPayload,
  RegisterUserPayload,
  SuccessLoginPayload
} from "../types/auth";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`
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
