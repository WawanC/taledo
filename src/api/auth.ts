import axios from "axios";
import { RegisterUserPayload } from "../types/auth";

const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/auth`
});

export const registerUserApi = async (data: {
  payload: RegisterUserPayload;
}) => {
  const response = await authApi.post("/register", data.payload);
  console.log(response.data);
};
