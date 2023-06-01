export type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string;
  subTodos: Todo[];
};

export type TodoResponse = {
  id: string;
  title: string;
  isCompleted: boolean;
  parentId: string;
  subTodos: TodoResponse[];
};

export type GetTodosResponse = {
  message: string;
  todos: TodoResponse[];
};

export type UpdateTodoPayload = {
  title?: string;
  isCompleted?: boolean;
};

export type CreateTodoPayload = {
  title: string;
};
