import {
  FC,
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState
} from "react";
import useAppState from "../../stores/app.ts";
import { motion, Variants } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { useUpdateTaskMutation } from "../../hooks/task.tsx";

const BoardInfo: FC = () => {
  const boardInfo = useAppState((state) => state.boardInfo);
  const setBoardInfo = useAppState((state) => state.setBoardInfo);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)"
  });
  const updateTask = useUpdateTaskMutation();

  const [boardTitle, setBoardTitle] = useState(
    boardInfo ? boardInfo.title : ""
  );

  const boardVariants: Variants = {
    after: isDesktop ? { x: 0 } : { y: 0 },
    before: isDesktop ? { x: "100%" } : { y: "100%" }
  };

  const closeBoardInfo: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      setBoardInfo(null);
    },
    [setBoardInfo]
  );

  const updateTaskFormHandler: FormEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!boardInfo || boardTitle.trim().length <= 0) return;

      await updateTask.mutateAsync({
        taskId: boardInfo.id,
        payload: {
          title: boardTitle.trim()
        }
      });

      setBoardInfo(null);
    },
    [boardInfo, boardTitle, updateTask, setBoardInfo]
  );

  return (
    <>
      <div
        className={"fixed w-screen h-screen bg-black opacity-50 z-10"}
        onClick={closeBoardInfo}
      />
      <motion.section
        className={`fixed bottom-0 w-screen h-fit md:right-0 md:w-[50vw] md:h-screen 
          bg-light dark:bg-bold z-20 md:py-16 md:px-24 p-8 flex items-center`}
        variants={boardVariants}
        initial={"before"}
        animate={"after"}
        exit={"before"}
        transition={{
          bounce: 0
        }}
      >
        <form
          onSubmit={updateTaskFormHandler}
          className="text-2xl w-full flex flex-col gap-8"
        >
          <div className="flex justify-between items-center">
            <label>Title :</label>
            <input
              type="text"
              className="p-2 w-2/3 bg-transparent 
              border-b border-b-bold dark:border-b-light outline-none"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-orange-400 py-2 px-4 
            rounded shadow text-bold"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </motion.section>
    </>
  );
};

export default BoardInfo;
