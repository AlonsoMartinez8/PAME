import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ClotheCard from "./ClotheCard";
import { getTopClothes } from "@/pages/api/getTopClothes";

export default function TopClothes({}) {
  const sliderRef = useRef(null);
  const [topClothes, setTopClothes] = useState([]);
  useEffect(() => {
    const getClothes = async () => {
      try {
        const response = await fetch("api/getTopClothes");
        const data = await response.json();
        if (response.ok) {
          setTopClothes(data.data);
        } else {
          console.error(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getClothes()
  }, []);
  return (
    <>
      <h1 className="text-lg text-center py-2 px-4">T O P * C L O T H E S</h1>
      <div
        className="overflow-hidden col-span-full w-fit h-full max-w-full px-0 relative"
        ref={sliderRef}
      >
        <ul
          drag="x"
          dragConstraints={sliderRef}
          className="flex items-center justify-center gap-2 w-fit flex-wrap"
        >
          {topClothes && topClothes.length > 0 ? (
            topClothes.map((c) => (
              <ClotheCard key={c.id} clothe={c} config={false} user={c.user} />
            ))
          ) : (
            <p className="text-nowrap text-center">
              There are no clothes with likes yet
            </p>
          )}
        </ul>
      </div>
    </>
  );
}
