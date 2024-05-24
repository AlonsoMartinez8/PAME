import React, { useRef } from "react";
import { motion } from "framer-motion";
import ClotheCard from "./ClotheCard";

export default function LastClothes({ lastClothes }) {
  const sliderRef = useRef(null);
  return (
    <>
      <h1 className="text-lg text-center py-2 px-4">
        L A S T * C L O T H E S
      </h1>
      <div
        className="overflow-hidden col-span-full w-fit h-full max-w-full px-0 relative"
        ref={sliderRef}
      >
        <motion.ul
          drag="x"
          dragConstraints={sliderRef}
          className="flex items-center justify-center gap-2 w-fit flex-nowrap"
        >
          {lastClothes && lastClothes.length > 0 ? (
            lastClothes.map((c) => (
              <ClotheCard key={c.id} clothe={c} config={false} user={c.user}/>
            ))
          ) : (
            <p className="text-nowrap text-center">
              There are no clothes yet
            </p>
          )}
        </motion.ul>
      </div>
    </>
  );
}

