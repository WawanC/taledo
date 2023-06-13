import TodoItem from "./TodoItem";
import { useGetTodosQuery, useUpdateTodoMutation } from "../hooks/todo.tsx";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
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
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const dragEndHandler = useCallback(
    (e: DragEndEvent) => {
      if (!getTodos.data || !e.over) return;

      const activeTodo = getTodos.data.find((todo) => todo.id === e.active.id);
      const overOrder =
        getTodos.data.findIndex((todo) => todo.id === e.over?.id) + 1;

      if (!activeTodo || overOrder < 0) return;

      updateTodo.mutate({
        todoId: activeTodo.id,
        payload: {
          order: overOrder
        }
      });
    },
    [getTodos.data, updateTodo]
  );

  const sortables = useMemo(
    () => (getTodos.data ? getTodos.data.map((todo) => todo.id) : []),
    [getTodos.data]
  );

  return getTodos.isLoading ? (
    <p className="text-center text-xl">Loading...</p>
  ) : (
    <DndContext sensors={sensors} onDragEnd={dragEndHandler}>
      <ul ref={setNodeRef} className={`flex flex-col gap-4 ${props.className}`}>
        <SortableContext
          items={sortables}
          strategy={verticalListSortingStrategy}
        >
          {getTodos.data && getTodos.data.length > 0 ? (
            getTodos.data.map((todo) => <TodoItem key={todo.id} todo={todo} />)
          ) : (
            <p className="text-center italic text-xl">No todos yet.</p>
          )}
        </SortableContext>
      </ul>
    </DndContext>
  );
};

export default TodoList;
