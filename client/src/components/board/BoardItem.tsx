import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Item } from "../../types/item";

type Props = {
  item: Item;
  section: string;
};

const BoardItem: React.FC<Props> = (props) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: props.item.id,
    data: { type: "item", section: props.section }
  });

  return (
    <motion.li
      layout="position"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-white dark:bg-black rounded text-center shadow touch-none"
    >
      {props.item.title}
    </motion.li>
  );
};

export default BoardItem;
