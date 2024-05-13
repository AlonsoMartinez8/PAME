import React from "react";

export default function ClotheCard({ clothe, redi }) {
  const handleClick = () => {
    redi && (window.location.href = `/clothe/${clothe.id}`);
  };

  return (
    <div
      key={clothe.id}
      className={`w-36 md:w-44 rounded-xl overflow-hidden cursor-pointer bg-slate-50/50`}
      onClick={handleClick}
    >
      <img
        src={clothe.imageUrl}
        alt={clothe.name}
        className="h-64 md:h-72 w-full pointer-events-none object-cover mx-auto"
      />
    </div>
  );
}
