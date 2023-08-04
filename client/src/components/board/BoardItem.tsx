import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Item } from "../../types/item";
import useAppState from "../../stores/app.ts";
import { useCallback } from "react";

type Props = {
  item: Item;
  section: string;
};

const BoardItem: React.FC<Props> = (props) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: props.item.id,
    data: { type: "item", section: props.section },
  });
  const setBoardInfoOpen = useAppState((state) => state.setBoardInfoOpen);

  const openBoardInfo = useCallback(() => {
    setBoardInfoOpen(true);
  }, [setBoardInfoOpen]);

  return (
    <motion.li
      layout="position"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-white dark:bg-black rounded text-center shadow touch-none"
      onClick={openBoardInfo}
    >
      {props.item.title}
    </motion.li>
  );
};

export default BoardItem;
