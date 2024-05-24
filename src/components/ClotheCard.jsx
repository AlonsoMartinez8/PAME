import { useEffect } from "react";

export default function ClotheCard({ clothe, config, user }) {
  return (
    <li className="flex flex-col">
      {!config && (
        <section className="w-full px-2 flex items-center justify-between gap-4 z-20 border-t-2 rounded-xl">
          <a
            href={`/profile/${user.id}`}
            className="w-5 h-5 rounded-full overflow-hidden object-fill bg-slate-50/30"
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
      <div
        
        key={clothe.id}
        className="relative w-36 md:w-44 rounded-xl overflow-hidden bg-slate-50/50 z-10"
      >
        <img
          src={clothe.imageUrl}
          alt={clothe.name}
          className="h-64 md:h-72 w-full pointer-events-none object-cover mx-auto"
        />
        {config&&<footer className="absolute top-0 right-0 text-center p-2"><a href={`/clothe/${clothe.id}`}><i class="text-3xl text-white/50 hover:text-blue-300 transition-colors ri-edit-circle-fill"></i></a></footer>}
      </div>
    </li>
  );
}
