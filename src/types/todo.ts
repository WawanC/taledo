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

export type getTodosResponse = {
  message: string;
  todos: TodoResponse[];
};
