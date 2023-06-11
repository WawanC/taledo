import { useCallback, useEffect } from "react";
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

  return (
    <motion.li
      layout
      animate={{
        x: transform?.x,
        y: transform?.y,
        scaleX: transform?.scaleX,
        scaleY: transform?.scaleY,
        transition: { bounce: false, duration: 0.05, ease: "linear" }
      }}
      transition={{ duration: 0.2 }}
      ref={setNodeRef}
    >
      <motion.div
        className={`bg-bold py-4 px-4 text-xl
      flex items-center gap-4 rounded-xl shadow`}
        variants={{
          slideOut: { y: "-50%", opacity: 1 },
          slideIn: { y: "0", opacity: 1 }
        }}
        initial={"slideOut"}
        animate={animationControls}
        transition={{ duration: 0.2 }}
      >
        <span
          className="hover:cursor-grab"
          onClick={toggleTodo}
          {...listeners}
          {...attributes}
        >
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-light"></div>
        </span>
        <label
          className={`flex-1 ${
            props.todo.isCompleted && "line-through"
          } hover:cursor-pointer`}
          onClick={toggleTodo}
        >
          {props.todo.title}
        </label>

        <span className="hover:cursor-pointer" onClick={deleteTodoHandler}>
          <DeleteIcon className="w-6 h-6 md:w-8 md:h-8" />
        </span>
      </motion.div>
    </motion.li>
  );
};

export default TodoItem;
