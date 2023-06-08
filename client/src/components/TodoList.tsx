import TodoItem from "./TodoItem";
import { useGetTodosQuery, useUpdateTodoMutation } from "../hooks/todo.tsx";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { useCallback, useMemo } from "react";

interface Props {
  className?: string;
}

const TodoList: React.FC<Props> = (props) => {
  const getTodos = useGetTodosQuery();
  const { setNodeRef } = useDroppable({ id: "droppable" });
  const updateTodo = useUpdateTodoMutation();

  const dragEndHandler = useCallback(
    (e: DragEndEvent) => {
      if (!getTodos.data || !e.over) return;

      const activeTodo = getTodos.data.find((todo) => todo.id === e.active.id);
      const overTodo = getTodos.data.find((todo) => todo.id === e.over?.id);

      if (!activeTodo || !overTodo) return;

      updateTodo.mutate({
        todoId: activeTodo.id,
        payload: {
          order: overTodo.order
        }
      });
    },
    [getTodos.data, updateTodo]
  );

  const todos = useMemo(
    () => getTodos.data?.sort((a, b) => a.order - b.order),
    [getTodos.data]
  );

  const sortables = useMemo(
    () => (todos ? todos.map((todo) => todo.id) : []),
    [todos]
  );

  return getTodos.isLoading ? (
    <p className="text-center text-xl">Loading...</p>
  ) : (
    <DndContext onDragEnd={dragEndHandler}>
      <ul ref={setNodeRef} className={`flex flex-col gap-4 ${props.className}`}>
        <SortableContext
          items={sortables}
          strategy={verticalListSortingStrategy}
        >
          {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </SortableContext>
      </ul>
    </DndContext>
  );
};

export default TodoList;
