import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useAnimate, motion } from "framer-motion";
import {
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState
} from "react";
import { Item } from "../../types/item";
import BoardItem from "./BoardItem";
import { Tasks } from "../../types/task";

type Props = {
  title: string;
  items: Item[];
  activeCreateSection: string | null;
  setActiveCreateSection: Dispatch<SetStateAction<string | null>>;
  createNewItem: (sectionName: keyof Tasks, title: string) => void;
};

const BoardSection: React.FC<Props> = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.title,
    data: { type: "droppable" }
  });
  const [scope, animate] = useAnimate();
  const [enteredNewItemTitle, setEnteredNewItemTitle] = useState("");

  const createNewItem: FormEventHandler = (e) => {
    e.preventDefault();
    const enteredTitle = enteredNewItemTitle.trim();
    if (enteredTitle.length <= 0) {
      setEnteredNewItemTitle("");
      props.setActiveCreateSection(null);
      return;
    }
    props.createNewItem(props.title as keyof Tasks, enteredTitle);
    setEnteredNewItemTitle("");
    props.setActiveCreateSection(null);
  };

  const sortedItems = props.items.sort((a, b) => {
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      await animate(scope.current, { opacity: 0 }, { duration: 0 });
      await animate("li", { opacity: 0, y: 50 }, { duration: 0 });
      await animate("button", { opacity: 0, y: 50 }, { duration: 0 });
      await animate(scope.current, { opacity: 1 }, { duration: 0.4 });
      animate("li", { opacity: 1, y: 0 }, { duration: 0.25 });
      await animate("button", { opacity: 1, y: 0 }, { duration: 0.25 });

      document.documentElement.style.overflow = "auto";
    }, 0);

    return () => clearTimeout(timer);
  }, [animate, scope]);

  return (
    <motion.section
      ref={scope}
      className="bg-semi_light dark:bg-bold rounded
      md:w-1/4 w-[90vw] flex-shrink-0"
    >
      <div ref={setNodeRef} className="flex flex-col gap-4 p-4 pb-32 h-full">
        <h1 className="text-2xl font-bold text-center">{props.title}</h1>
        <hr className="border-bold dark:border-light" />
        <ul className="flex flex-col gap-4">
          <SortableContext items={sortedItems}>
            {sortedItems.map((item) => (
              <BoardItem key={item.id} item={item} section={props.title} />
            ))}
          </SortableContext>
          <div className="relative">
            {props.activeCreateSection === props.title && (
              <form onSubmit={createNewItem} className="absolute inset-0">
                <div
                  className="fixed inset-0 bg-black opacity-0 z-10"
                  onClick={() => {
                    setEnteredNewItemTitle("");
                    props.setActiveCreateSection(null);
                  }}
                />
                <input
                  type="text"
                  autoFocus
                  className="w-full p-4 bg-light rounded text-bold 
                relative z-20 outline-none"
                  value={enteredNewItemTitle}
                  onChange={(e) => setEnteredNewItemTitle(e.target.value)}
                />
              </form>
            )}
            {/* {props.activeCreateSection !== props.title && ( */}
            <motion.button
              layout="position"
              disabled={props.activeCreateSection === props.title}
              className="bg-green-800 w-full p-4 rounded shadow text-light"
              onClick={() => props.setActiveCreateSection(props.title)}
            >
              Create New
            </motion.button>
            {/* )} */}
          </div>
        </ul>
      </div>
    </motion.section>
  );
};

export default BoardSection;
