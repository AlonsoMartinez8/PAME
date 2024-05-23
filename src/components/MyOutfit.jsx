import React from "react";
import avatar from "../../public/img/avatar.png"

export default function MyOutfit() {
  return (
    <section className="relative flex flex-col py-1 px-4 mt-10">
      <header class="w-full flex items-center">
        <h1 transition:name="pageTitle" class="text-2xl">
          M Y * O U T F I T
        </h1>
      </header>
      <main className="implementing flex items-center justify-center">
        <img src={avatar.src} />
      </main>
    </section>
  );
}
