import React, { useEffect, useState } from "react";

export default function ClotheCard({
  clothe,
  config,
  endPointPrefix,
  userClickerId,
}) {

  const [likes, setLikes] = useState(0)

  useEffect(()=>{
    let dbLikes =  0 //getLikesByClothe(clothe.id);
    setLikes(dbLikes)
  },[])

  return (
    <li className="flex flex-col">
      {!config && (
        <section className="w-full px-2 flex items-center justify-end gap-4 z-20 border-t-2 rounded-xl">
          <span className="text-xl text-end">{likes}</span>
          <form action={`${endPointPrefix}api/like`}>
            <input type="hidden" name="clotheId" value={clothe.id} />
            <input type="hidden" name="userClickerId" value={userClickerId} />
            <button type="submit">
              <i className="text-xl ri-heart-3-line hover:text-red-400"></i>
            </button>
            {/**<button type="submit"><i className="text-xl text-red-400 ri-heart-3-fill"></i></button>  */}
          </form>
        </section>
      )}
      <a
        href={`${config ? `/clothe/${clothe.id}` : "#wardrobe"}`}
        key={clothe.id}
        className={`${
          !config && "pointer-events-none"
        } relative w-36 md:w-44 rounded-xl overflow-hidden cursor-pointer bg-slate-50/50 z-10`}
      >
        <img
          src={clothe.imageUrl}
          alt={clothe.name}
          className="h-64 md:h-72 w-full pointer-events-none object-cover mx-auto"
        />
      </a>
    </li>
  );
}
