import { useState } from "react";

export default function ClotheSlider({ wardrobeId, categoryId, clothes }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="py-2 items-start flex flex-col justify-start gap-2 ">
      <aside className="flex justify-end items-center gap-2">
        <button className="rounded-md">
          <i className="text-2xl ri-dashboard-horizontal-fill"></i>
        </button>
        <button className="rounded-md">
          <i class="text-2xl ri-carousel-view"></i>
        </button>
        <button className="rounded-md" onClick={() => setIsOpen(true)}>
          <i className="text-2xl ri-add-line"></i>
        </button>
      </aside>
      <ul className="flex items-center justify-center gap-2 w-full h-[200px]">
        {clothes && clothes.length > 0 ? (
          clothes.map((c) => <p>Clothe</p>)
        ) : (
          <p className="text-nowrap">There is no clothes yet</p>
        )}
      </ul>
      <dialog
        className={`w-screen h-screen top-0 left-0 ${
          isOpen ? "flex" : "hidden"
        } items-center z-50 backdrop-blur-md bg-slate-800/50`}
      >
        <div className="m-auto w-[90%] md:max-w-[500px] bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
          <header className="flex items-center justify-between gap-4 pb-4">
            <h1 className="text-2xl">New Clothe</h1>
            <button onClick={() => setIsOpen(false)}>
              <i className="text-2xl ri-close-line"></i>
            </button>
          </header>
          <main>
            <form
              className="flex flex-col items-start justify-start gap-4"
              action="api/newClothe"
              method="POST"
            >
              <input type="hidden" name="wardrobeId" value={wardrobeId} />
              <p>image</p>
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="name"
                placeholder="Name"
                required
              />
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="description"
                placeholder="Description"
              />
              <p>category</p>
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="url"
                name="link"
                placeholder="Link"
              />
              <p>public</p>
              <button className="px-4 py-2 rounded-xl border-2 mx-auto">
                Add clothe
              </button>
            </form>
          </main>
        </div>
      </dialog>
    </nav>
  );
}
