import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ClotheCard from "./ClotheCard";

export default function LastClothes() {
  const [lastClothes, setLastClothes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getClothes = async () => {
      try {
        const response = await fetch(
          `/api/getLastClothes?page=${page}&limit=10`
        );
        const data = await response.json();
        setLastClothes(data.clothes);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
      }
    };

    getClothes();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <h1 className="text-lg text-center py-2 px-4">L A S T * C L O T H E S</h1>
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
              <ClotheCard
                key={c.clothe.id}
                clothe={c.clothe}
                config={false}
                user={c.user}
              />
            ))
          ) : (
            <p className="text-nowrap text-center">There are no clothes yet</p>
          )}
        </motion.ul>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded-l"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-r"
        >
          Next
        </button>
      </div>
    </>
  );
}
