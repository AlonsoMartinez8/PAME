import { useState } from "react";
import CategoryItem from "@c/CategoryItem.jsx";

export default function CategorySlider({ wardrobeId, categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("All categories");

  const handleItemClick = (categoryId) => {
    setSelected(categoryId);
  };

  return (
    <nav className="py-2 grid items-center grid-cols-10 gap-2 ">
      <ul className="col-span-8 flex items-center justify-start gap-2 overflow-x-scroll no-scrollbar">
        <CategoryItem
          selected={selected === "All categories"}
          name="All categories"
          onClick={() => handleItemClick("All categories")}
        />
        {categories && categories.length > 0 ? (
          categories.map((c) => (
            <CategoryItem
              key={c.id}
              selected={selected === c.id}
              name={c.name}
              onClick={() => handleItemClick(c.id)}
            />
          ))
        ) : (
          <p className="text-nowrap">There are no categories yet</p>
        )}
      </ul>
      <aside className="col-span-2 flex justify-end items-center gap-2">
        <button className="rounded-md" onClick={() => setIsOpen(true)}>
          <i className="text-2xl ri-add-line"></i>
        </button>
        <button className="rounded-md">
          <i className="text-2xl ri-settings-2-line"></i>
        </button>
      </aside>
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
  );
}
