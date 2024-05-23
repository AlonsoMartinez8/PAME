import React, { useState } from "react";

export default function CategoryConfig({ categories }) {
  const [isOpen, setIsOpen] = useState(false);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  return (
    <>
      <button className="rounded-md" onClick={() => setIsOpen(true)}>
        <i className="text-2xl ri-settings-2-line"></i>
      </button>
      <dialog
        className={`w-screen h-screen fixed top-0 left-0 ${
          isOpen ? "flex" : "hidden"
        } items-center z-50 backdrop-blur-md bg-slate-800/50`}
      >
        <div className=" m-auto w-[90%] md:max-w-[500px] bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
          <header className="flex items-center justify-between gap-4 pb-4">
            <h1 className="text-2xl">Category Config</h1>
            <button onClick={() => setIsOpen(false)}>
              <i className="text-2xl ri-close-line"></i>
            </button>
          </header>
          <main className="max-h-[300px] flex flex-col gap-4 overflow-y-scroll overflow-x-hidden">
            {categories && categories.length > 0
              ? categories.map((c) => (
                  <div className="border-[1px] rounded-xl">
                    {isEditingName ? (
                      <div key={c.id} className="flex items-center justify-between px-4">
                        <form
                          action="api/updateCategoryName"
                          method="POST"
                          className="flex items-center justify-end w-full"
                        >
                          <input type="hidden" name="id" value={c.id} />
                          <input
                            className="outline-none bg-transparent py-2 text-xl border-0 w-full"
                            type="text"
                            name="name"
                            placeholder={c.name}
                            required
                          />
                          <button type="submit" className="text-center">
                            <i className="text-2xl ri-add-line" />
                          </button>
                          {isEditingName && (
                            <button
                              onClick={() => setIsEditingName(!isEditingName)}
                            >
                              <i className="text-2xl ri-close-line" />
                            </button>
                          )}
                        </form>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between py-2 px-4">
                        <h1 className="w-full text-xl text-blue-300 overflow-hidden">{c.name}</h1>
                        <button onClick={() => setIsEditingName(true)}>
                          <i className="text-2xl ri-pencil-fill" />
                        </button>
                      </div>
                    )}

                    {isEditingDesc ? (
                      <div className="flex items-center justify-between px-4 py-2">
                        <form
                          action="api/updateCategoryDescription"
                          method="POST"
                          className="flex items-center justify-end w-full"
                        >
                          <input type="hidden" name="id" value={c.id} />
                          <input
                            className="outline-none bg-transparent border-0 w-full"
                            type="text"
                            name="description"
                            placeholder={c.description || "Description"}
                            required
                          />
                          <button type="submit" className="text-center">
                            <i className="text-2xl ri-add-line" />
                          </button>
                          {isEditingDesc && (
                            <button
                              onClick={() => setIsEditingDesc(!isEditingDesc)}
                            >
                              <i className="text-2xl ri-close-line" />
                            </button>
                          )}
                        </form>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-2">
                        <textarea rows={1} className="text-white/80 w-full bg-transparent border-0 overflow-y-hidden">{c.description || "Description"}</textarea>
                        <button onClick={() => setIsEditingDesc(true)}>
                          <i className="text-2xl ri-pencil-fill" />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              : "There are no categories yet"}
          </main>
        </div>
      </dialog>
    </>
  );
}
