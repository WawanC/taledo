import { useCallback, useEffect, useMemo } from "react";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "../hooks/todo";
import DeleteIcon from "../icons/DeleteIcon";
import { Todo } from "../types/todo";
import { useSortable } from "@dnd-kit/sortable";
import { motion, useAnimationControls } from "framer-motion";

interface Props {
  todo: Todo;
}

const TodoItem: React.FC<Props> = (props) => {
  const updateTodo = useUpdateTodoMutation();
  const deleteTodo = useDeleteTodoMutation();
  const animationControls = useAnimationControls();

  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: props.todo.id
  });

  const toggleTodo = useCallback(() => {
    updateTodo.mutate({
      todoId: props.todo.id,
      payload: {
        isCompleted: !props.todo.isCompleted
      }
    });
  }, [props.todo.id, props.todo.isCompleted, updateTodo]);

  const deleteTodoHandler = useCallback(async () => {
    await animationControls.start({ y: "-50%", opacity: 0 });
    deleteTodo.mutate({ todoId: props.todo.id });
  }, [animationControls, deleteTodo, props.todo.id]);

  useEffect(() => {
    animationControls.start({ y: "0", opacity: 1 });
  }, [animationControls]);

  const deadlineTimeLeft = useMemo(() => {
    if (!props.todo.deadline) return null;
    const deadlineInSeconds = Math.floor(
      new Date(props.todo.deadline).getTime() / 1000 -
        new Date().getTime() / 1000
    );
    const deadlineInDays = Math.floor(deadlineInSeconds / 60 / 60 / 24) > 0;
    const deadlineInHours = Math.floor(deadlineInSeconds / 60 / 60);
    const deadlineInMinutes = Math.floor(deadlineInSeconds / 60);

    if (deadlineInSeconds < 0) {
      return "Expired";
    }
    if (deadlineInDays) {
      return new Date(props.todo.deadline).toLocaleDateString("en-US", {
        dateStyle: "medium"
      });
    } else if (deadlineInHours > 0) {
      const unit = deadlineInHours > 1 ? "hours" : "hour";
      return `${deadlineInHours} ${unit} left`;
    } else if (deadlineInMinutes > 0) {
      const unit = deadlineInMinutes > 1 ? "minutes" : "minute";
      return `${deadlineInMinutes} ${unit} left`;
    }

    const unit = deadlineInSeconds > 1 ? "seconds" : "second";
    return `${deadlineInSeconds} ${unit} left`;
  }, [props.todo.deadline]);

  return (
    <motion.li
      layout
      animate={{
        x: transform?.x,
        y: transform?.y,
        transition: { bounce: false, duration: 0.05, ease: "linear" }
      }}
      transition={{ duration: 0.2 }}
      ref={setNodeRef}
    >
      <motion.div
        className={`bg-bold py-4 px-4 md:px-6 text-xl
        flex items-center gap-4 md:gap-6 rounded-xl shadow`}
        variants={{
          slideOut: { y: "-50%", opacity: 1 },
          slideIn: { y: "0", opacity: 1 }
        }}
        initial={"slideOut"}
        animate={animationControls}
        transition={{ duration: 0.2 }}
      >
        <span
          className="hover:cursor-grab touch-none"
          onClick={toggleTodo}
          {...listeners}
          {...attributes}
        >
          <div className="w-4 h-4 rounded-full bg-light"></div>
        </span>
        <div
          className="flex flex-col gap-2 flex-1 hover:cursor-pointer select-none"
          onClick={toggleTodo}
        >
          <span
            className={`${props.todo.isCompleted && "line-through"}   text-2xl`}
          >
            {props.todo.title}
          </span>
          {deadlineTimeLeft && (
            <span className="text-sm italic opacity-50">
              {deadlineTimeLeft}
            </span>
          )}
        </div>

        <span className="hover:cursor-pointer" onClick={deleteTodoHandler}>
          <DeleteIcon className="w-8 h-8" />
        </span>
      </motion.div>
    </motion.li>
  );
};

export default TodoItem;
