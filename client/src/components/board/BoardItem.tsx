import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Item } from "../../types/item";
import useAppState from "../../stores/app.ts";
import { MouseEventHandler, useCallback } from "react";
import TrashIcon from "../../icons/TrashIcon.tsx";
import { useDeleteTaskMutation } from "../../hooks/task.tsx";

type Props = {
  item: Item;
  section: string;
};

const BoardItem: React.FC<Props> = (props) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: props.item.id,
    data: { type: "item", section: props.section }
  });
  const setBoardInfoOpen = useAppState((state) => state.setBoardInfoOpen);
  const deleteTask = useDeleteTaskMutation();

  const openBoardInfo = useCallback(() => {
    setBoardInfoOpen(true);
  }, [setBoardInfoOpen]);

  const deleteTodoHandler: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();

      deleteTask.mutate(props.item.id);
    },
    [deleteTask, props.item.id]
  );

  return (
    <motion.li
      layout="position"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-white dark:bg-black 
      relative rounded text-center shadow touch-none"
      onClick={openBoardInfo}
    >
      <span>{props.item.title}</span>
      <div
        className="absolute top-0 bottom-0 right-0 
      flex items-center px-4"
      >
        <button onClick={deleteTodoHandler}>
          <TrashIcon className="w-6 h-6 z-10" />
        </button>
      </div>
    </motion.li>
  );
};

export default BoardItem;
