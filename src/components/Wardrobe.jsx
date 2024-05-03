import { useState } from "react";
import CategorySlider from "./CategorySlider";

export default function Wardrobe({ wardrobeId, categories, clothes }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="w-full my-2">
      <CategorySlider wardrobeId={wardrobeId} categories={categories} />
      <nav className="py-2 items-start flex flex-col justify-start gap-2 ">
        <aside className="flex justify-end items-center gap-2">
          <button className="rounded-md" onClick={() => setIsOpen(true)}>
            <i className="text-2xl ri-add-line"></i>
          </button>
          <button className="rounded-md">
            <i className="text-2xl ri-settings-2-line"></i>
          </button>
        </aside>
        <ul className="flex items-center justify-start gap-2 overflow-x-scroll no-scrollbar">
          {clothes && clothes.length > 0 ? (
            categories.map((c) => <p>Clothe</p>)
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
      </nav>
    </main>
  );
}
