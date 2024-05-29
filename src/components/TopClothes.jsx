import React, { useEffect, useRef, useState } from "react";
import ClotheCard from "./ClotheCard";
import { motion } from "framer-motion";

export default function TopClothes() {
  const sliderRef = useRef(null);
  const [topClothes, setTopClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getClothes = async () => {
      try {
        const response = await fetch("/api/getTopClothes");
        if (!response.ok) {
          throw new Error("Failed to fetch top clothes");
        }
        const data = await response.json();
        setTopClothes(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getClothes();
  }, []);

  if (loading) {
    return <p className="text-center h-64 md:h-72">Loading...</p>;
  }

  if (error) {
    return <p className="text-center h-64 md:h-72">Error: {error}</p>;
  }

  return (
    <>
      <h1 className="text-lg text-center py-2 px-4">T O P * C L O T H E S</h1>
      <div
        className="overflow-hidden col-span-full w-fit h-full max-w-full px-0 relative"
        ref={sliderRef}
      >
        <motion.ul
          drag="x"
          dragConstraints={sliderRef}
          className="flex items-center justify-center gap-2 w-fit flex-nowrap"
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
        </motion.ul>
      </div>
    </>
  );
}
