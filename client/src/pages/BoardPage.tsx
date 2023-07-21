import { DndContext } from "@dnd-kit/core";
import { FC, useState } from "react";

const BoardItem: FC<{ title: string }> = (props) => {
  return (
    <li className="p-4 bg-black rounded text-center shadow">{props.title}</li>
  );
};

const BoardSection: FC<{
  title: string;
  items: string[];
}> = (props) => {
  return (
    <section className="flex flex-col gap-4 bg-bold w-1/3 p-4 rounded">
      <h1 className="text-2xl font-bold text-center">{props.title}</h1>
      <hr />
      <ul className="flex flex-col gap-4">
        {props.items.map((item) => (
          <BoardItem key={item} title={item} />
        ))}
      </ul>
    </section>
  );
};

const BoardPage: FC = () => {
  const [items] = useState({
    Plan: ["Learn React JS", "Learn Node JS"],
    Done: ["Learn Javascript"]
  });
  return (
    <DndContext>
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
