import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import useAppState from "../../stores/app.ts";
import { MouseEventHandler, useCallback } from "react";
import TrashIcon from "../../icons/TrashIcon.tsx";
import { useDeleteTaskMutation } from "../../hooks/task.tsx";
import { Task } from "../../types/task.ts";

type Props = {
  task: Task;
};

const BoardItem: React.FC<Props> = (props) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: props.task.id,
    data: { type: "item", section: props.task.section },
  });
  const setBoardInfo = useAppState((state) => state.setBoardInfo);
  const deleteTask = useDeleteTaskMutation();

  const openBoardInfo = useCallback(() => {
    setBoardInfo(props.task);
  }, [setBoardInfo, props.task]);

  const deleteTodoHandler: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();

      deleteTask.mutate(props.task.id);
    },
    [deleteTask, props.task.id]
  );

  return (
    <motion.li
      layout="position"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-[#bac9d2] dark:bg-[#1b2636]
      relative rounded text-center shadow touch-none"
      onClick={openBoardInfo}
    >
      <span>{props.task.title}</span>
      <div
        className="absolute top-0 bottom-0 right-0 
      flex items-center px-4"
      >
        <button onClick={deleteTodoHandler} className="p-2 rounded-full">
          <TrashIcon className="w-6 h-6 z-10" />
        </button>
      </div>
    </motion.li>
  );
};

export default BoardItem;
