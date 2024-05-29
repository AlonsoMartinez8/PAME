import React, { useEffect, useRef, useState } from "react";
import ClotheCard from "./ClotheCard";

export default function LastClothes() {
  const [lastClothes, setLastClothes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Inicializa con 1 para evitar problemas

  const sliderRef = useRef(null);

  useEffect(() => {
    const getClothes = async () => {
      try {
        const response = await fetch(
          `/api/getLastClothes?page=${page}&limit=10`
        );
        const data = await response.json();
        setLastClothes((prevClothes) => [...prevClothes, ...data.clothes]);
        setTotalPages(data.totalPages); // Asegúrate de que `totalPages` se establece correctamente
      } catch (err) {
        console.error(err);
      }
    };

    getClothes();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      // Asegúrate de que `totalPages` se usa correctamente
      setPage(page + 1);
    }
  };

  return (
    <>
      <h1 className="text-lg text-center py-2 px-4">L A S T * C L O T H E S</h1>
      <div
        className="overflow-hidden col-span-full w-fit h-full max-w-full px-0 relative"
        ref={sliderRef}
      >
        <ul className="flex items-center justify-between gap-2 w-fit flex-wrap">
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
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleNextPage}
          disabled={page === totalPages} // Asegúrate de que `totalPages` se usa correctamente
          className="cursor-pointer w-full border-[1px] rounded-full"
        >
          <i className="text-2xl ri-add-line"></i>
        </button>
      </div>
    </>
  );
}
