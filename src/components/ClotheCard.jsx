import { useEffect } from "react";

export default function ClotheCard({ clothe, config, user }) {
  return (
    <li className="flex flex-col">
      {!config && (
        <section className="w-full px-2 flex items-center justify-between gap-4 z-20 border-t-2 rounded-xl">
          <a
            href={`/profile/${user.id}`}
            className="w-5 h-5 rounded-full object-fill bg-slate-50/30"
          >
            <img src={user.imageUrl} />
          </a>
          <span className="text-xl text-center">0</span>
          <form action="api/like">
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
