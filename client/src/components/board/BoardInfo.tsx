import { FC, MouseEventHandler, useCallback } from "react";
import useAppState from "../../stores/app.ts";
import { motion, Variants } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const BoardInfo: FC = () => {
  const setBoardInfoOpen = useAppState((state) => state.setBoardInfoOpen);
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)"
  });

  const boardVariants: Variants = {
    after: isDesktop ? { x: 0 } : { y: 0 },
    before: isDesktop ? { x: "100%" } : { y: "100%" }
  };

  const closeBoardInfo: MouseEventHandler = useCallback(
    (e) => {
      e.stopPropagation();
      setBoardInfoOpen(false);
    },
    [setBoardInfoOpen]
  );

  return (
    <>
      <div
        className={"fixed w-screen h-screen bg-black opacity-50 z-10"}
        onClick={closeBoardInfo}
      />
      <motion.section
        className={`fixed bottom-0 w-screen h-[50vh] md:right-0 md:w-[50vw] md:h-screen 
          bg-bold z-20 p-16 text-xl flex flex-col`}
        variants={boardVariants}
        initial={"before"}
        animate={"after"}
        exit={"before"}
        transition={{
          bounce: 0
        }}
      >
        <h1 className={"font-bold text-4xl text-center"}>Task Title</h1>
      </motion.section>
    </>
  );
};

export default BoardInfo;
