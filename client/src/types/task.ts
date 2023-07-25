type Task = {
  id: string;
  title: string;
  rank: string;
  section: string;
};

export type CreateTaskPayload = {
  title: string;
  section: string;
};

export type GetTasksResponse = {
  message: string;
  tasks: {
    Plan: Task[];
    Process: Task[];
    Done: Task[];
  };
};
