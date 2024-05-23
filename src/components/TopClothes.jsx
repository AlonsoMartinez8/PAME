import React, { useRef } from "react";
import { motion } from "framer-motion";
import ClotheCard from "./ClotheCard";

export default function TopClothes({ topClothes }) {
  const sliderRef = useRef(null);
  return (
    <>
      <h1 className="text-lg text-center py-2 px-4">
        T O P * C L O T H E S
      </h1>
      <div
        className="col-span-full w-fit md:w-full h-full md:h-fit max-w-full md:max-h-[500px] px-0 relative"
        ref={sliderRef}
      >
        <motion.ul
          drag={true}
          dragConstraints={sliderRef}
          className="flex md:flex-col items-center justify-center gap-2 w-fit md:w-full h-full md:h-fit  flex-nowrap"
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
