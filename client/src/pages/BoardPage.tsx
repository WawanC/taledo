import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { FC, useEffect, useState } from "react";
import { genNewRank, transferRank, moveRank } from "../utils/lexorank";
import { motion, useAnimate } from "framer-motion";

type Item = {
  id: string;
  title: string;
  rank: string;
};

const BoardItem: FC<{
  item: Item;
  section: string;
}> = (props) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: props.item.id,
    data: { type: "item", section: props.section }
  });

  return (
    <motion.li
      layout
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-black rounded text-center shadow"
    >
      {props.item.title}
    </motion.li>
  );
};

const BoardSection: FC<{
  title: string;
  items: Item[];
}> = (props) => {
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

const BoardPage: FC = () => {
  const [items, setItems] = useState<{
    [key: string]: Item[];
  }>({
    Plan: [],
    Done: []
  });
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  useEffect(() => {
    setItems((items) => {
      const newItems = { ...items };

      const planItems = [
        "Learn React JS",
        "Learn Node JS",
        "Learn MongoDB",
        "Learn PostgreSQL"
      ];
      const doneItems = ["Learn Javascript", "Learn HTML", "Learn CSS"];

      for (const item of planItems) {
        const id = Math.random().toString();
        const title = item;
        const rank = genNewRank(newItems["Plan"]);
        newItems["Plan"].push({ id, title, rank });
      }

      for (const item of doneItems) {
        const id = Math.random().toString();
        const title = item;
        const rank = genNewRank(newItems["Done"]);
        newItems["Done"].push({ id, title, rank });
      }

      return newItems;
    });
  }, []);

  const dragEndHandler = (e: DragEndEvent) => {
    const initialSection = e.active.data.current?.section as string;

    const targetType = e.over?.data.current?.type as string;

    const selectedItem = activeItem;
    if (!selectedItem) return;

    if (targetType === "droppable") {
      // Drop to different empty section
      const targetSection = e.over?.id as string;
      if (!targetSection) return;

      setItems((items) => {
        const newItems = { ...items };

        const newRank =
          items[targetSection].length > 0
            ? moveRank(
                newItems[targetSection],
                selectedItem.rank,
                newItems[targetSection].length - 1
              )
            : genNewRank(items[targetSection]);
        selectedItem.rank = newRank;

        newItems[targetSection].push(selectedItem);
        return newItems;
      });
    } else if (targetType === "item") {
      const targetSection = e.over?.data.current?.section as string;
      if (!targetSection) return;

      if (initialSection !== targetSection) {
        // Drop to different item in different section
        setItems((items) => {
          const newItems = { ...items };

          const newIndex = newItems[targetSection].findIndex(
            (item) => item.id === (e.over?.id as string)
          );

          if (newIndex < 0) return newItems;

          const newRank = transferRank(newItems[targetSection], newIndex);

          selectedItem.rank = newRank;
          newItems[targetSection].push(selectedItem);

          return newItems;
        });
      } else {
        // Drop to different item on same section
        setItems((items) => {
          const newItems = { ...items };
          const oldIndex = newItems[targetSection].findIndex(
            (item) => item.id === (e.active.id as string)
          );
          const newIndex = newItems[targetSection].findIndex(
            (item) => item.id === (e.over?.id as string)
          );
          if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex)
            return newItems;

          const newRank = moveRank(
            newItems[initialSection],
            newItems[initialSection][oldIndex].rank,
            newIndex
          );
          newItems[initialSection][oldIndex].rank = newRank;

          return newItems;
        });
      }
    }
    setActiveItem(null);
  };

  const dragStartHandler = (e: DragStartEvent) => {
    const item = items[e.active.data.current?.section].find(
      (item) => item.id === e.active.id
    );
    setItems((items) => {
      items[e.active.data.current?.section] = items[
        e.active.data.current?.section
      ].filter((item) => item.id !== e.active.id);
      return items;
    });
    setActiveItem(item || null);
  };

  return (
    <DndContext onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
      <main
        className="dark:bg-semi_bold flex-1 
        flex justify-center gap-4 
        p-4 py-8 "
      >
        {Object.entries(items).map(([key, value]) => (
          <BoardSection key={key} title={key} items={value} />
        ))}
      </main>
      <DragOverlay>
        {activeItem && (
          <div className="p-4 bg-black rounded text-center shadow cursor-grab">
            {activeItem.title}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardPage;
