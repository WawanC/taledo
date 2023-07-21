import {
  DndContext,
  DragOverEvent,
  closestCenter,
  useDroppable
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { FC, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

const BoardItem: FC<{ title: string; section: string }> = (props) => {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({
      id: props.title,
      data: { type: "item", section: props.section }
    });
  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        transition
      }
    : undefined;

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 bg-black rounded text-center shadow"
    >
      {props.title}
    </li>
  );
};

const BoardSection: FC<{
  title: string;
  items: string[];
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
        <SortableContext
          items={props.items}
          strategy={verticalListSortingStrategy}
        >
          {props.items.map((item) => (
            <BoardItem key={item} title={item} section={props.title} />
          ))}
        </SortableContext>
      </ul>
    </section>
  );
};

const BoardPage: FC = () => {
  const [items, setItems] = useState<{
    [key: string]: string[];
  }>({
    Plan: ["Learn React JS", "Learn Node JS"],
    Done: ["Learn Javascript", "Learn HTML"]
  });

  const dragOverHandler = (e: DragOverEvent) => {
    const selectedItem = e.active.id as string;
    const initialSection = e.active.data.current?.section as string;

    const targetType = e.over?.data.current?.type as string;

    if (targetType === "droppable") {
      // Drop to different empty section
      const targetSection = e.over?.id as string;
      if (!targetSection) return;

      setItems((items) => {
        const newItems = { ...items };
        newItems[initialSection] = items[initialSection].filter(
          (item) => item !== selectedItem
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
          newItems[initialSection] = items[initialSection].filter(
            (item) => item !== selectedItem
          );
          newItems[targetSection].push(selectedItem);
          const oldIndex = newItems[targetSection].indexOf(
            e.active.id as string
          );
          const newIndex = newItems[targetSection].indexOf(
            e.over?.id as string
          );
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
          const oldIndex = items[initialSection].indexOf(e.active.id as string);
          const newIndex = items[initialSection].indexOf(e.over?.id as string);
          items[initialSection] = arrayMove(
            items[initialSection],
            oldIndex,
            newIndex
          );
          return items;
        });
      }
    }
  };

  return (
    <DndContext onDragOver={dragOverHandler} collisionDetection={closestCenter}>
      <main
        className="dark:bg-semi_bold flex-1 
        flex justify-center gap-4 
        p-4 py-8"
      >
        {Object.entries(items).map(([key, value]) => (
          <BoardSection key={key} title={key} items={value} />
        ))}
      </main>
    </DndContext>
  );
};

export default BoardPage;
