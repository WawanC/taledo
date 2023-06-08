import TodoItem from "./TodoItem";
import { useGetTodosQuery } from "../hooks/todo.tsx";
import { DndContext, DragEndEvent, useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

interface Props {
  className?: string;
}

const TodoList: React.FC<Props> = (props) => {
  const getTodos = useGetTodosQuery();
  const { setNodeRef } = useDroppable({ id: "droppable" });

  const dragEndHandler = (e: DragEndEvent) => {
    console.log(`Active: ${e.active.id}`);
    console.log(`Over: ${e.over?.id}`);

    // const activeTodo = getTodos.data?.find((todo) => todo.id === e.active.id);
    // const overTodo = getTodos.data?.find((todo) => todo.id === e.over?.id);
  };

  const sortables = getTodos.data ? getTodos.data.map((todo) => todo.id) : [];

  return getTodos.isLoading ? (
    <p className="text-center text-xl">Loading...</p>
  ) : (
    <DndContext onDragEnd={dragEndHandler}>
      <ul ref={setNodeRef} className={`flex flex-col gap-4 ${props.className}`}>
        <SortableContext
          items={sortables}
          strategy={verticalListSortingStrategy}
        >
          {getTodos.data &&
            getTodos.data.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </SortableContext>
      </ul>
    </DndContext>
  );
};

export default TodoList;
