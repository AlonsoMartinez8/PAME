import { useRef, useState } from "react";
import mockup from "@/../public/img/mockup.png";
import { getURL, uploadFile } from "@/firebase/config";
import CategorySlider from "@c/CategorySlider.jsx";
import { generateId } from "lucia";
import { motion } from "framer-motion";

export default function ClotheSlider({ wardrobeId, categories, clothes }) {
  // State of the 'New Clothe' modal visibility
  const [isOpen, setIsOpen] = useState(false);
  // State of the privacity of the new clothe
  const [isPublic, setIsPublic] = useState(false);
  // Image url of the new clothe
  const [selectedNewClotheImage, setSelectedNewClotheImage] = useState(
    mockup.src
  );
  // ID of the new clothe
  const [newClotheId, setNewClotheId] = useState(null);
  // Category selected for the new clothe
  const [newClotheCategory, setNewClotheCategory] = useState("All categories");
  // Slider ref hook
  const sliderRef = useRef(null);

  // Function that generates a new ID
  const newIdForClothe = () => {
    setNewClotheId(generateId(15));
  };

  // Function that handles the click event on file input
  const handleNewClotheImageClick = () => {
    document.getElementById("fileInput").click();
  };

  // Functions that handles the file input change
  /**m
   * #ISSUES #UPGRADE #OPTIMIZE
   * It uploads every file user selects.
   * These files will be taking up storage unnecessarily
   *
   */
  const handleFileInputChange = async (event) => {
    // Variable that contains the file
    const selectedFile = event.target.files[0];

    // Verify if there's a file selected
    if (selectedFile) {
      // Generate a new ID for clothe
      newIdForClothe();
      // Upload file to Firebase and get URL
      await uploadFile(selectedFile, `clothes/${wardrobeId}`, newClotheId);
      const url = await getURL(`clothes/${wardrobeId}`, newClotheId);
      setSelectedNewClotheImage(url);
    }
  };

  // Function that handles the selection of the new clothe category
  const handleNewClotheCategory = (categoryId) => {
    if (!categoryId) {
      setNewClotheCategory("all");
    } else {
      setNewClotheCategory(categoryId);
    }
  };

  return (
    <nav className="py-2 items-start flex flex-col justify-start gap-4 ">
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

      <div id="clotheSlider" className="w-full overflow-hidden" ref={sliderRef}>
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
              There is no clothes yet
            </p>
          )}
        </motion.ul>
      </div>

      {/** NEW CLOTHE MODAL */}
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
