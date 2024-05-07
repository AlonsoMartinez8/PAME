import { useRef, useState } from "react";
import CategoryItem from "@c/CategoryItem.jsx";
import { motion } from "framer-motion";

export default function CategorySlider({
  wardrobeId,
  categories,
  showConfig,
  onCategorySelect,
}) {
  // State of the 'New Category' modal visibility
  const [isOpen, setIsOpen] = useState(false);
  // Category selected
  const [selected, setSelected] = useState("all");
  // Ref hook for slider
  const sliderRef = useRef(null);

  // Function that handles the click event on a category item
  const handleItemClick = (categoryId) => {
    // sets the selected category hook value
    setSelected(categoryId);
    // Sends the category selected to father component
    onCategorySelect(categoryId);
  };

  return (
    <>
      <nav className="w-full py-2 grid items-center grid-cols-10 gap-2 ">
        <div
          id="categorySlider"
          className={`${
            showConfig ? "col-span-8 md:col-span-9" : "col-span-full"
          } overflow-hidden`}
          ref={sliderRef}
        >
          <motion.ul
            drag="x"
            dragConstraints={sliderRef}
            className="flex items-center justify-start gap-2 w-fit pr-[20%]"
          >
            <CategoryItem
              selected={selected === "all"}
              name="All categories"
              onClick={() => handleItemClick("all")}
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
          </motion.ul>
        </div>

        {showConfig && (
          <aside className="col-span-2 md:col-span-1 flex justify-between md:justify-end items-center gap-2">
            <button className="rounded-md" onClick={() => setIsOpen(true)}>
              <i className="text-2xl ri-add-line"></i>
            </button>
            <button className="rounded-md">
              <i className="text-2xl ri-settings-2-line"></i>
            </button>
          </aside>
        )}
      </nav>
      
      {showConfig && (
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
      )}
    </>
  );
}
