import { useRef, useState } from "react";
import mockup from "@/../public/img/mockup.png";
import { getURL, uploadFile } from "@/firebase/config";
import CategorySlider from "@c/CategorySlider.jsx";
import { generateId } from "lucia";
import { motion } from "framer-motion";

export default function ClotheSlider({ wardrobeId, categories, clothes }) {
  // Slider ref hook
  const sliderRef = useRef(null);
  // New Clothe Modal Visibility
  const [newClotheModalVisibility, setNewClotheModalVisibility] =
    useState(false);

  return (
    <>
      <nav className="py-2 items-start flex flex-col justify-start gap-4 ">
        {/** CONFIGURATION */}
        <aside className="flex justify-end items-center gap-2">
          {/** MOSSAICO VIEW */}
          <button className="rounded-md">
            <i className="text-2xl ri-dashboard-horizontal-fill"></i>
          </button>
          {/** CAROUSEL VIEW */}
          <button className="rounded-md">
            <i className="text-2xl ri-carousel-view"></i>
          </button>
          {/** ADD CLOTHE */}
          <button
            className="rounded-md"
            onClick={() =>
              setNewClotheModalVisibility(!newClotheModalVisibility)
            }
          >
            <i className="text-2xl ri-add-line"></i>
          </button>
        </aside>

        {/** SLIDER */}
        <div
          id="clotheSlider"
          className="w-full overflow-hidden"
          ref={sliderRef}
        >
          {/** CLOTHE LIST */}
          {/** flex-wrap for carousel / flex-nowrap mosaico */}
          <motion.ul
            drag="x"
            dragConstraints={sliderRef}
            className="flex items-center justify-start gap-2 w-fit mx-auto px-20"
          >
            {clothes && clothes.length > 0 ? (
              clothes.map((c) => (
                <img
                  key={c.id}
                  src={c.imageUrl}
                  className="rounded-xl border-2 mx-auto h-64 w-64 cursor-pointer object-contain"
                />
              ))
            ) : (
              <p className="text-nowrap w-full text-center">
                There are no clothes yet
              </p>
            )}
          </motion.ul>
        </div>
      </nav>

      {/** NEW CLOTHE MODAL */}
      <dialog
        className={`${
          newClotheModalVisibility ? "flex" : "hidden"
        } w-screen h-screen top-0 left-0 items-center z-50 backdrop-blur-md bg-slate-800/50`}
      >
        <div className="m-auto w-[90%] md:max-w-[500px] bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
          {/** HEADER */}
          <header className="flex items-center justify-between gap-4 pb-4">
            <h1 className="text-2xl">New Clothe</h1>
            <button
              onClick={() =>
                setNewClotheModalVisibility(!newClotheModalVisibility)
              }
            >
              <i className="text-2xl ri-close-line"></i>
            </button>
          </header>
          {/** FORM */}
          <main>
            <form
              className="flex flex-col items-start justify-start gap-4"
              action="api/newClothe"
              method="POST"
            >
              {/** CLOTHE ID */}
              <input type="hidden" name="id" />

              {/** WARDROBE */}
              <input type="hidden" name="wardrobeId" value={wardrobeId} />

              {/** CATEGORY */}
              <input type="hidden" name="categoryId" />
              <CategorySlider
                wardrobeId={wardrobeId}
                categories={categories}
                showConfig={false}
              />

              {/** NAME */}
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="name"
                placeholder="Name"
              />

              {/** DESCRIPTION */}
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="description"
                placeholder="Description"
              />

              {/** CLOTHE PRIVACITY */}
              <fieldset className="flex items-center justify-start gap-2">
                {/** CHECK BOX */}
                <input
                  type="checkbox"
                  className="w-5 aspect-square border-2"
                  name="clothePrivacity"
                />
                {/** TEXT*/}
                <span className="text-blue-400 font-semibold">Public</span>
                {/**
                {isPublic ? (
                  <span
                    className="text-blue-400 font-semibold"
                    onClick={() => setIsPublic(false)}
                  >
                    Public
                  </span>
                ) : (
                  <span
                    className="text-pink-400 font-semibold"
                    onClick={() => setIsPublic(true)}
                  >
                    Private
                  </span>
                )} 
                */}
              </fieldset>

              {/** IMAGE */}
              <input
                type="file"
                name="file"
                className="hidden"
                id="fileInput"
              />
              <input type="hidden" name="imageUrl" />
              <img
                src={mockup.src}
                className="mx-auto rounded-xl border-2 h-64 w-full cursor-pointer object-contain"
              />

              {/** LINK */}
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="url"
                name="link"
                placeholder="Link"
              />

              {/** SUBMIT */}
              <button
                type="submit"
                className="px-4 py-2 rounded-xl border-2 mx-auto"
              >
                Add clothe
              </button>
            </form>
          </main>
        </div>
      </dialog>
    </>
  );
}
