import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import { genNewRank, moveRank } from "../utils/lexorank";
import BoardSection from "../components/board/BoardSection";
import {
  useCreateTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../hooks/task";
import Loader from "../components/Loader";
import { Task, Tasks } from "../types/task";
import { useQueryClient } from "react-query";
import useAppState from "../stores/app.ts";
import BoardInfo from "../components/board/BoardInfo.tsx";
import { AnimatePresence } from "framer-motion";

const BoardPage: React.FC = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeCreateSection, setActiveCreateSection] = useState<string | null>(
    null
  );
  const getTasks = useGetTasksQuery();
  const createTask = useCreateTaskMutation();
  const updateTask = useUpdateTaskMutation();
  const queryClient = useQueryClient();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const isInfoOpen = useAppState((state) => state.isBoardInfoOpen);

  const createNewItem = (sectionName: keyof Tasks, title: string) => {
    if (!getTasks.data) return;

    createTask.mutate({
      payload: { title: title.trim(), section: sectionName.trim() },
    });
  };

  const dragEndHandler = (e: DragEndEvent) => {
    const targetType = e.over?.data.current?.type as string;

    const selectedItem = Object.assign({}, activeTask);
    if (!selectedItem) return;

    const items = getTasks.data;

    if (!items) return;

    if (targetType === "droppable") {
      // Drop to different empty section (droppables)
      const targetSection = e.over?.id as string;
      if (!targetSection) return;

      selectedItem.rank = genNewRank(items[targetSection as keyof Tasks]);

      items[targetSection as keyof Tasks].push(selectedItem);
      queryClient.setQueryData<Tasks>("tasks", () => items);

      updateTask.mutate({
        taskId: selectedItem.id,
        payload: {
          rank: selectedItem.rank,
          section: targetSection,
        },
      });
    } else if (targetType === "item") {
      // Drop to item
      const targetSection: string =
        e.over?.data.current?.section || selectedItem.section;
      if (!targetSection) return;

      const newIndex = items[targetSection as keyof Tasks].findIndex(
        (task) => task.id === (e.over?.id as string)
      );

      selectedItem.rank = moveRank(
        items[targetSection as keyof Tasks],
        newIndex
      );

      items[targetSection as keyof Tasks].push(selectedItem);
      queryClient.setQueryData<Tasks>("tasks", () => items);

      updateTask.mutate({
        taskId: selectedItem.id,
        payload: {
          rank: selectedItem.rank,
          section: targetSection,
        },
      });
    }

    setActiveTask(null);
  };

  const dragStartHandler = (e: DragStartEvent) => {
    if (!getTasks.data) return;
    const section = e.active.data.current?.section as keyof Tasks;
    if (!section) return;
    const task = getTasks.data[section].find((task) => task.id === e.active.id);

    queryClient.setQueryData<Tasks>("tasks", (prev) => {
      const temp = Object.assign({}, prev);
      temp[section as keyof Tasks] = temp[section as keyof Tasks].filter(
        (task) => task.id !== e.active.id
      );
      return temp;
    });
    setActiveTask(task || null);
  };

  return (
    <DndContext
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      collisionDetection={closestCenter}
      sensors={sensors}
    >
      <AnimatePresence>{isInfoOpen && <BoardInfo />}</AnimatePresence>
      <main
        className="bg-light dark:bg-semi_bold
        flex gap-4 flex-1 md:justify-center
        p-4 py-8 overflow-x-auto"
      >
        {getTasks.isLoading ? (
          <Loader />
        ) : (
          getTasks.data &&
          Object.entries(getTasks.data).map(([key, value]) => (
            <BoardSection
              key={key}
              title={key}
              items={value}
              activeCreateSection={activeCreateSection}
              setActiveCreateSection={setActiveCreateSection}
              createNewItem={createNewItem}
            />
          ))
        )}
      </main>
      <DragOverlay>
        {activeTask && (
          <div className="p-4 bg-white dark:bg-black rounded text-center shadow cursor-grab">
            {activeTask.title}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default BoardPage;
