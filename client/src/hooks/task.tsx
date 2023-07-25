import { useMutation } from "react-query";
import { createTaskApi } from "../api/task";

export const useCreateTaskMutation = () => {
  return useMutation(createTaskApi);
};
