import React from "react";

export default function ProfileCard({ profile }) {
  return (
    <>
      <a
        href={`/profile/${profile.id}`}
        className="flex flex-col items-center justify-center"
      >
        <div className="overflow-hidden w-16 bg-slate-400/30 rounded-full aspect-square object-fill">
          <img
            className="pointer-events-none"
            src={profile.imageUrl}
            alt={`User ${profile.username}`}
          />
        </div>
      </a>
      <p className="w-full text-center">{profile.username}</p>
    </>
  );
}
