import { AxiosError } from "axios";

interface ServerErrorResponse {
  type: string;
  message: string;
}

export const getServerErrorMessage = (error: unknown) => {
  const err = error as AxiosError<ServerErrorResponse>;

  if (!err.response) return "System Error";

  return err.response.data.message;
};
