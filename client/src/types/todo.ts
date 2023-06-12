export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string;
  subTodos: Todo[];
  rank: string;
};

export type TodoResponse = {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string;
  subTodos: TodoResponse[];
  rank: string;
};

export type GetTodosResponse = {
  message: string;
  todos: TodoResponse[];
};

export type UpdateTodoPayload = {
  title?: string;
  isCompleted?: boolean;
  order?: number;
};

export type CreateTodoPayload = {
  title: string;
};
