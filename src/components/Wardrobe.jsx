import { useState } from "react";
import CategoryItem from "./CategoryItem.jsx";

export default function Wardrobe({ wardrobeId, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <main className="w-full my-2">
        <nav className="border-b-2 py-2 grid items-center grid-cols-10 gap-2 ">
          <ul className="col-span-9 flex items-center justify-start gap-2 overflow-x-scroll no-scrollbar">
            <CategoryItem selected={true} name="All categories" />
            {categories && categories.length > 0 ? (
              categories.map((c) => (
                <CategoryItem selected={false} name={c.name} key={c.id} />
              ))
            ) : (
              <p>There is no categories yet</p>
            )}
          </ul>
          <aside className="col-span-1 flex justify-end items-center">
            <button className="rounded-md" onClick={() => setIsOpen(true)}>
              <i className="text-2xl ri-add-line"></i>
            </button>
          </aside>
        </nav>
      </main>
      <dialog
        className={`w-screen h-screen top-0 left-0 ${
          isOpen ? "flex" : "hidden"
        } items-center z-50 backdrop-blur-md bg-slate-800/50`}
      >
        <div className="m-auto w-[90%] md:max-w-[500px] bg-gradient-to-r from-slate-600 to-pink-600 back p-4 rounded-xl">
          <header className="flex items-center justify-between gap-4 pb-4">
            <h1 className="text-2xl">New Category</h1>
            <button onClick={() => setIsOpen(false)}>
              <i className="text-2xl ri-close-line"></i>
            </button>
          </header>
          <main>
            <form
              className="flex flex-col items-start justify-start gap-4"
              action="api/newCategory"
              method="POST"
            >
              <input type="hidden" name="wardrobeId" value={wardrobeId} />
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="name"
                placeholder="Name of the category"
                required
              />
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="description"
                placeholder="Description"
              />
              <button className="px-4 py-2 rounded-xl border-2 mx-auto">
                Add category
              </button>
            </form>
          </main>
        </div>
      </dialog>
    </>
  );
}
