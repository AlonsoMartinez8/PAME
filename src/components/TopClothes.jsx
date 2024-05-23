import React, { useRef } from "react";
import { motion } from "framer-motion";

export default function TopClothes({ topClothes }) {
  const sliderRef = useRef(null);
  return (
    <>
      <h1 className="text-xl text-center py-2 px-4">
        T O P * C L O T H E S
      </h1>
      <div
        className="overflow-hidden col-span-full w-full h-fit max-h-[500px] px-0 relative"
        ref={sliderRef}
      >
        <motion.ul
          drag="y"
          dragConstraints={sliderRef}
          className="flex flex-col items-center justify-center gap-2 w-full h-fit  flex-nowrap"
        >
          {topClothes && topClothes.length > 0 ? (
            topClothes.map((c) => (
              <ClotheCard key={c.id} clothe={c} config={false} />
            ))
          ) : (
            <p className="text-nowrap text-center">
              There are no clothes with likes yet
            </p>
          )}
        </motion.ul>
      </div>
    </>
  );
}
