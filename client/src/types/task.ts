export type Task = {
  id: string;
  title: string;
  rank: string;
  section: string;
};

export type Tasks = {
  Plan: Task[];
  Process: Task[];
  Done: Task[];
};

export type CreateTaskPayload = {
  title: string;
  section: string;
};

export type GetTasksResponse = {
  message: string;
  tasks: Tasks;
};

export type UpdateTaskPayload = {
  title?: string;
  rank?: string;
  section?: string;
};
