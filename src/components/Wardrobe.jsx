import { useState } from "react";
import CategoryItem from "./CategoryItem.jsx";

export default function Wardrobe({ wardrobe }) {
  return (
    <main className="w-full my-2">
      <nav className="border-b-2 py-2 grid items-center grid-cols-10 gap-2 ">
        <ul className="col-span-9 flex items-center justify-start gap-2 overflow-x-scroll no-scrollbar">
          <CategoryItem selected={true} name="All categories" />
          <CategoryItem selected={false} name="Category 1" />
          <CategoryItem selected={false} name="Category 2" />
        </ul>
        <aside className="col-span-1">
          <button className="rounded-md">
            <i className="text-2xl ri-add-line"></i>
          </button>
        </aside>
      </nav>
    </main>
  );
}
