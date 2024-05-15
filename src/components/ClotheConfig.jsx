import React, { useState } from "react";

export default function ClotheConfig({ clothe }) {
  const {
    id,
    wardrobeId,
    categoryId,
    name,
    description,
    privacity,
    imageUrl,
    link,
  } = clothe;

  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [isPublic, setIsPublic] = useState(privacity);
  const [deleteAlert, setDeleteAlert] = useState(false);

  return (
    <>
      <article className="w-full py-2 border-b-2 flex items-end justify-end gap-4">
        <h1 className="text-3xl text-end text-transparent py-1 font-semibold bg-gradient-to-r from-indigo-300 via-green-300 to-slate-300 w-fit bg-clip-text">
          {clothe ? name : "No Clothe Found"}
        </h1>
      </article>

      <article className="w-full">
        <div className="w-full">
          {clothe && description && !isEditingDesc ? (
            <div className="flex items-center justify-between gap-2">
              <p>{description}</p>
              <button onClick={() => setIsEditingDesc(!isEditingDesc)}>
                <i className="text-2xl ri-pencil-fill" />
              </button>
            </div>
          ) : (
            <form
              action="api/updateClotheDescription"
              method="post"
              className="w-full flex items-center gap-2"
            >
              <input type="hidden" name="clotheId" value={id} />
              <textarea
                rows="2"
                name="description"
                className="w-full bg-transparent"
                placeholder={
                  description
                    ? description
                    : "Describe your clothe. It is advisable to have a detailed description so that the smart assistant can help you"
                }
              />
              <button type="submit" className="text-center">
                <i className="text-2xl ri-add-line" />
              </button>
              {isEditingDesc && (
                <button onClick={() => setIsEditingDesc(!isEditingDesc)}>
                  <i className="text-2xl ri-close-line" />
                </button>
              )}
            </form>
          )}
        </div>
      </article>

      <article className="w-full">
        {clothe && link && !isEditingLink ? (
          <div className="flex items-center justify-between gap-2">
            <a
              href={link}
              className="text-blue-300 hover:text-green-500 overflow-hidden"
              target="_blank"
            >
              {link}
            </a>
            <button onClick={() => setIsEditingLink(!isEditingLink)}>
              <i className="text-2xl ri-pencil-fill" />
            </button>
          </div>
        ) : (
          <form
            action="api/updateClotheLink"
            method="post"
            className="w-full flex items-center gap-2"
          >
            <input type="hidden" name="clotheId" value={id} />
            <input
              name="link"
              type="url"
              className="w-full bg-transparent"
              placeholder={link ? link : "Add the link of your clothe"}
            />
            <button type="submit" className="text-center">
              <i className="text-2xl ri-add-line" />
            </button>
            {isEditingLink && (
              <button onClick={() => setIsEditingLink(!isEditingLink)}>
                <i className="text-2xl ri-close-line" />
              </button>
            )}
          </form>
        )}
      </article>

      <article>Category</article>

      <article className="w-full">
        {clothe && isPublic ? (
          <form
            action="api/updateClothePrivacity"
            method="post"
            className="w-full flex items-center justify-between gap-2"
          >
            <span className=" min-w-44 text-center px-4 py-1 rounded-xl bg-gradient-to-r from-green-500 to-indigo-500">
              Public
            </span>
            <i className="ri-arrow-right-double-line"></i>
            <input type="hidden" name="privacity" value={"private"} />
            <button
              onClick={() => setIsPublic(!isPublic)}
              className=" min-w-44 text-center px-4 py-1 rounded-xl bg-gradient-to-r from-indigo-300/50 hover:shadow-xl hover:to-red-300 to-red-500"
            >
              Set private
            </button>
          </form>
        ) : (
          <form
            action="api/updateClothePrivacity"
            method="post"
            className="w-full flex items-center justify-between gap-2"
          >
            <span className="w-full text-center px-4 py-1 rounded-xl bg-gradient-to-r from-red-500 to-indigo-500">
              Private
            </span>
            <input type="hidden" name="privacity" value={"public"} />
            <i className="ri-arrow-right-double-line"></i>
            <button
              onClick={() => setIsPublic(!isPublic)}
              className="w-full text-center px-4 py-1 rounded-xl bg-gradient-to-r from-indigo-300/50 hover:shadow-xl hover:to-green-300 to-green-500"
            >
              Set public
            </button>
          </form>
        )}
      </article>

      <article className="w-full flex items-center justify-between gap-2">
        {clothe ? (
          <>
            <button
              onClick={() => setDeleteAlert(!deleteAlert)}
              className="w-1/2 text-center px-4 py-1 rounded-xl bg-red-500 hover:bg-red-900"
            >
              Delete Clothe
            </button>
            <button className="w-1/2 text-center px-4 py-1 rounded-xl border-2 hover:bg-slate-100/50">
              Add to outfit
            </button>
          </>
        ) : (
          ""
        )}
      </article>

      <dialog
        className={`${
          deleteAlert ? "flex" : "hidden"
        } w-screen h-screen top-0 left-0 items-center z-50 backdrop-blur-md bg-slate-800/50`}
      >
        <div className="m-auto w-[90%] md:max-w-[500px] bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
          {/** HEADER */}
          <header className="flex items-center justify-between gap-4 pb-4">
            <h1 className="text-2xl">Delete Clothe</h1>
            <button onClick={() => setDeleteAlert(!deleteAlert)}>
              <i className="text-2xl ri-close-line"></i>
            </button>
          </header>
          <main>
            <form
              action="api/deleteClothe"
              className="flex flex-col items-center justify-center gap-4"
              method="POST"
            >
              <p>Are you sure to remove this clothe?</p>
              <button className="w-1/2 text-center px-4 py-1 rounded-xl bg-red-500 hover:bg-red-900">
                Delete Clothe
              </button>
            </form>
          </main>
        </div>
      </dialog>
    </>
  );
}
