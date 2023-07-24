import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useAnimate, motion } from "framer-motion";
import { useEffect } from "react";
import { Item } from "../../types/item";
import BoardItem from "./BoardItem";

type Props = {
  title: string;
  items: Item[];
};

const BoardSection: React.FC<Props> = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.title,
    data: { type: "droppable" }
  });
  const sortedItems = props.items.sort((a, b) => {
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
  });

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      document.documentElement.style.overflow = "hidden";
      await animate(scope.current, { opacity: 0 }, { duration: 0 });
      await animate("li", { opacity: 0, y: 50 }, { duration: 0 });
      await animate(scope.current, { opacity: 1 }, { duration: 0.4 });
      await animate("li", { opacity: 1, y: 0 }, { duration: 0.25 });
      document.documentElement.style.overflow = "auto";
    }, 0);

    return () => clearTimeout(timer);
  }, [animate, scope]);

  return (
    <motion.section layout ref={scope} className="bg-bold w-1/3 rounded">
      <div ref={setNodeRef} className="flex flex-col gap-4 p-4 pb-40 h-full">
        <h1 className="text-2xl font-bold text-center">{props.title}</h1>
        <hr />
        <motion.ul className="flex flex-col gap-4">
          <SortableContext items={sortedItems}>
            {sortedItems.map((item) => (
              <BoardItem key={item.id} item={item} section={props.title} />
            ))}
          </SortableContext>
        </motion.ul>
      </div>
    </motion.section>
  );
};

export default BoardSection;
