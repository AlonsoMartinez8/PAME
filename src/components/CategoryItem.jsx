import React from "react";

export default function CategoryItem({ selected, name, onClick }) {
  return (
    <li
      onClick={onClick}
      className={`${
        selected ? "bg-slate-100/30" : "bg-slate-100/10"
      } cursor-pointer px-4 py-1 rounded-md text-nowrap`}
    >
      {name}
    </li>
  );
}
