export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type TodoResponse = {
  _id: string;
  title: string;
  isCompleted: boolean;
};

export type GetTodosResponse = {
  message: string;
  todos: TodoResponse[];
};

export type UpdateTodoPayload = {
  title?: string;
  isCompleted?: boolean;
};
