import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDroppable
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { FC, useState } from "react";

type Item = {
  id: string;
  title: string;
  rank: string;
};

const BoardItem: FC<{ item: Item; section: string }> = (props) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: props.item.id,
    data: { type: "item", section: props.section }
  });

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="p-4 bg-black rounded text-center shadow"
    >
      {props.item.title}
    </li>
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
  return (
    <section
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-bold w-1/3 p-4 rounded"
    >
      <h1 className="text-2xl font-bold text-center">{props.title}</h1>
      <hr />
      <ul className="flex flex-col gap-4">
        <SortableContext items={props.items}>
          {props.items.map((item) => (
            <BoardItem key={item.id} item={item} section={props.title} />
          ))}
        </SortableContext>
      </ul>
    </section>
  );
};

const BoardPage: FC = () => {
  const [items, setItems] = useState<{
    [key: string]: Item[];
  }>({
    Plan: [
      { id: Math.random().toString(), title: "Learn React JS", rank: "aaa" },
      { id: Math.random().toString(), title: "Learn Node JS", rank: "bbb" }
    ],
    Done: [
      { id: Math.random().toString(), title: "Learn Javascript", rank: "ccc" },
      { id: Math.random().toString(), title: "Learn Node JS", rank: "ddd" }
    ]
  });
  const [activeItem, setActiveItem] = useState<Item | null>(null);

  const dragEndHandler = (e: DragEndEvent) => {
    const selectedItemId = e.active.id as string;
    const initialSection = e.active.data.current?.section as string;

    const targetType = e.over?.data.current?.type as string;

    if (targetType === "droppable") {
      // Drop to different empty section
      const targetSection = e.over?.id as string;
      if (!targetSection) return;

      setItems((items) => {
        const newItems = { ...items };
        const selectedItem = newItems[initialSection].find(
          (item) => item.id === selectedItemId
        );
        if (!selectedItem) return newItems;

        newItems[initialSection] = items[initialSection].filter(
          (item) => item.id !== selectedItemId
        );
        newItems[targetSection].push(selectedItem);
        return newItems;
      });
    } else if (targetType === "item") {
      // Drop to different item in different section
      const targetSection = e.over?.data.current?.section as string;
      if (!targetSection) return;

      if (initialSection !== targetSection) {
        setItems((items) => {
          const newItems = { ...items };
          const selectedItem = newItems[initialSection].find(
            (item) => item.id === selectedItemId
          );
          if (!selectedItem) return newItems;

          newItems[initialSection] = items[initialSection].filter(
            (item) => item.id !== selectedItemId
          );
          newItems[targetSection].push(selectedItem);

          const oldIndex = newItems[targetSection].findIndex(
            (item) => item.id === (e.active.id as string)
          );
          const newIndex = newItems[targetSection].findIndex(
            (item) => item.id === (e.over?.id as string)
          );
          if (oldIndex < 0 || newIndex < 0) return newItems;
          newItems[targetSection] = arrayMove(
            newItems[targetSection],
            oldIndex,
            newIndex
          );
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
          if (oldIndex < 0 || newIndex < 0) return newItems;

          newItems[initialSection] = arrayMove(
            newItems[initialSection],
            oldIndex,
            newIndex
          );
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
    setActiveItem(item || null);
  };

  return (
    <DndContext onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
      <main
        className="dark:bg-semi_bold flex-1 
        flex justify-center gap-4 
        p-4 py-8"
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
