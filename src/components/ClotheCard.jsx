import React from "react";

export default function ClotheCard({ clothe }) {
  return (
    <div
      key={clothe.id}
      className={`w-36 md:w-44 rounded-xl overflow-hidden cursor-pointer bg-slate-50/50`}
    >
      <img
        src={clothe.imageUrl}
        className="h-64 md:h-72 w-full pointer-events-none object-cover mx-auto"
      />
    </div>
  );
}
