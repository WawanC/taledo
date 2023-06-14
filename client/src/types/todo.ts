export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string;
  subTodos: Todo[];
  rank: string;
  deadline: string | null;
};

export type TodoResponse = {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string;
  subTodos: TodoResponse[];
  rank: string;
  deadline: string | null;
};

export type GetTodosResponse = {
  message: string;
  todos: TodoResponse[];
};

export type UpdateTodoPayload = {
  title?: string;
  isCompleted?: boolean;
  order?: number;
  deadline?: string;
};

export type CreateTodoPayload = {
  title: string;
  deadline?: string;
};
