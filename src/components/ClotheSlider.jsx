import { useState } from "react";
import mockup from "@/../public/img/mockup.png";
import { getURL, uploadFile } from "@/firebase/config";
import CategorySlider from "@c/CategorySlider.jsx";
import { generateId } from "lucia";

export default function ClotheSlider({
  wardrobeId,
  selectedCategory,
  categories,
  clothes,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [selectedNewClotheImage, setSelectedNewClotheImage] = useState(
    mockup.src
  );
  const [newClotheId, setNewClotheId] = useState(null);

  const newIdForClothe = () => {
    setNewClotheId(generateId(15));
  };

  const [newClotheCategory, setNewClotheCategory] = useState("All categories");

  const handleNewClotheImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileInputChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      newIdForClothe();
      await uploadFile(selectedFile, `clothes/${wardrobeId}`, newClotheId);
      const url = await getURL(`clothes/${wardrobeId}`, newClotheId);
      setSelectedNewClotheImage(url);
    }
  };

  const handleNewClotheCategory = (categoryId) => {
    setNewClotheCategory(categoryId);
  };

  return (
    <nav className="py-2 items-start flex flex-col justify-start gap-2 ">
      <aside className="flex justify-end items-center gap-2">
        <button className="rounded-md">
          <i className="text-2xl ri-dashboard-horizontal-fill"></i>
        </button>
        <button className="rounded-md">
          <i className="text-2xl ri-carousel-view"></i>
        </button>
        <button className="rounded-md" onClick={() => setIsOpen(true)}>
          <i className="text-2xl ri-add-line"></i>
        </button>
      </aside>
      <ul className="flex items-center justify-center gap-2 w-full h-[200px]">
        {clothes && clothes.length > 0 ? (
          clothes.map((c) => <p>Clothe</p>)
        ) : (
          <p className="text-nowrap">There is no clothes yet</p>
        )}
      </ul>

      {/** NEW CLOTHE FORM */}
      <dialog
        className={`w-screen h-screen top-0 left-0 ${
          isOpen ? "flex" : "hidden"
        } items-center z-50 backdrop-blur-md bg-slate-800/50`}
      >
        <div className="m-auto w-[90%] md:max-w-[500px] bg-gradient-to-r from-slate-900 to-indigo-900 back p-4 rounded-xl">
          <header className="flex items-center justify-between gap-4 pb-4">
            <h1 className="text-2xl">New Clothe</h1>
            <button onClick={() => setIsOpen(false)}>
              <i className="text-2xl ri-close-line"></i>
            </button>
          </header>
          <main>
            <form
              className="flex flex-col items-start justify-start gap-4"
              action="api/newClothe"
              method="POST"
            >
              {/** CLOTHE ID */}
              <input type="hidden" name="id" value={newClotheId} />

              {/** WARDROBE */}
              <input type="hidden" name="wardrobeId" value={wardrobeId} />

              {/** CATEGORY */}
              <input
                type="hidden"
                name="categoryId"
                value={newClotheCategory}
              />
              <CategorySlider
                wardrobeId={wardrobeId}
                categories={categories}
                showConfig={false}
                onCategorySelect={handleNewClotheCategory}
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

              {/** PUBLIC */}
              <fieldset className="flex items-center justify-start gap-2">
                <input
                  type="checkbox"
                  className="w-5 aspect-square border-2"
                  checked={isPublic}
                  name="public"
                  placeholder="public"
                  value={isPublic}
                  onChange={() => setIsPublic(!isPublic)}
                />
                {isPublic ? (
                  <span className="text-blue-400 font-semibold" onClick={()=>setIsPublic(false)}>Public</span>
                ) : (
                  <span className="text-pink-400 font-semibold" onClick={()=>setIsPublic(true)}>Private</span>
                )}
              </fieldset>

              {/** IMAGE */}
              <input
                type="file"
                name="file"
                className="hidden"
                id="fileInput"
                onChange={handleFileInputChange}
              />
              <input
                type="hidden"
                name="imageUrl"
                value={selectedNewClotheImage}
              />
              <img
                src={selectedNewClotheImage}
                className="mx-auto rounded-xl border-2 h-64 w-full cursor-pointer object-contain"
                onClick={handleNewClotheImageClick}
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
    </nav>
  );
}
