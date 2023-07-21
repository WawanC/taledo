import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable
} from "@dnd-kit/core";
import { FC, useState } from "react";
// import { CSS } from "@dnd-kit/utilities";

const BoardItem: FC<{ title: string; section: string }> = (props) => {
  const { setNodeRef, attributes, listeners, transform } = useDraggable({
    id: props.title,
    data: { section: props.section }
  });
  // const style = { transform: CSS.Transform.toString(transform) };
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
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
    id: props.title
  });
  return (
    <section
      ref={setNodeRef}
      className="flex flex-col gap-4 bg-bold w-1/3 p-4 rounded"
    >
      <h1 className="text-2xl font-bold text-center">{props.title}</h1>
      <hr />
      <ul className="flex flex-col gap-4">
        {props.items.map((item) => (
          <BoardItem key={item} title={item} section={props.title} />
        ))}
      </ul>
    </section>
  );
};

const BoardPage: FC = () => {
  const [items, setItems] = useState({
    Plan: ["Learn React JS", "Learn Node JS"],
    Done: ["Learn Javascript"]
  });

  const dragEndHandler = (e: DragEndEvent) => {
    // console.log("active:", e.active.data.current);
    // console.log("over:", e.over?.id);

    const selectedItem = e.active.id as string;
    const initialSection = e.active.data.current?.section as keyof typeof items;
    const targetSection = e.over?.id as keyof typeof items;

    if (initialSection !== targetSection) {
      const newItems = { ...items };
      newItems[initialSection] = items[initialSection].filter(
        (item) => item !== selectedItem
      );
      newItems[targetSection].push(selectedItem);
      setItems(newItems);
    }
  };

  return (
    <DndContext onDragEnd={dragEndHandler}>
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
