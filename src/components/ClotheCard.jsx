import { useEffect, useState } from "react";

export default function ClotheCard({ clothe, config, user }) {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    async function fetchLikes() {
      try {
        const response = await fetch(`/api/getLikesByClothe?id=${clothe.id}`);
        const data = await response.json();
        if (response.ok) {
          setLikes(data.likes);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    }

    if (clothe.id) {
      fetchLikes();
    }
  }, [clothe.id]);

  return (
    <li className="flex flex-col">
      {!config && (
        <section className="w-full px-2 flex items-center justify-between gap-4 z-20 border-t-2 rounded-xl">
          <a
            href={`/profile/${user.id}`}
            className="w-5 h-5 rounded-full overflow-hidden object-fill bg-slate-50/30"
          >
            <img src={user.imageUrl} alt={user.name} />
          </a>
          <span className="text-xl text-center">{likes}</span>
          <form action="/api/like" method="POST">
            <input type="hidden" name="userTo" value={user.id} />
            <input type="hidden" name="clotheTo" value={clothe.id} />
            <button type="submit">
              <i className="text-xl ri-heart-3-line hover:text-red-400"></i>
            </button>
            {/**<button type="submit"><i className="text-xl text-red-400 ri-heart-3-fill"></i></button> */}
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
        {config && (
          <footer className="absolute top-0 right-0 text-center p-2">
            <a href={`/clothe/${clothe.id}`}>
              <i className="text-3xl text-white/50 hover:text-blue-300 transition-colors ri-edit-circle-fill"></i>
            </a>
          </footer>
        )}
      </div>
    </li>
  );
}
