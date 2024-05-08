import { useRef, useState } from "react";
import mockup from "@/../public/img/mockup.png";
import CategorySlider from "@c/CategorySlider.jsx";
import { motion } from "framer-motion";

export default function ClotheSlider({ wardrobeId, categories, clothes }) {
  // Slider ref hook
  const sliderRef = useRef(null);
  // New Clothe Modal Visibility state hook
  const [newClotheModalVisibility, setNewClotheModalVisibility] =
    useState(false);
  // New Clothe Category Selected state hook
  const [newClotheCategorySelected, setNewClotheCategorySelected] =
    useState("");
  // File selected on fileInput URL form image source state hook
  const [fileURL, setFileURL] = useState(null);
  // Display mode for slider
  const [carouselMode, setCarouselMode] = useState(true);

  // Function that handles the selection of a category for the new clothe
  const handleNewClotheCategorySelect = (categoryId) => {
    setNewClotheCategorySelected(categoryId);
  };

  // Function that handles the click on the form image
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  // Function that handles the change of the fileInput
  const handleFileInputChange = (event) => {
    const newFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      setFileURL(dataURL);
    };
    reader.readAsDataURL(newFile);
  };

  return (
    <>
      <nav className="w-full py-2 grid items-center grid-cols-10 gap-2">
        {/** CONFIGURATION */}
        <aside className="flex justify-center items-center gap-8 col-span-full">
          {/** MOSSAICO VIEW */}
          <button className="rounded-md" onClick={() => setCarouselMode(false)}>
            <i className="text-2xl ri-dashboard-horizontal-fill"></i>
          </button>
          {/** CAROUSEL VIEW */}
          <button className="rounded-md" onClick={() => setCarouselMode(true)}>
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
          className="overflow-hidden col-span-full w-fit max-w-full px-0"
          ref={sliderRef}
        >
          {/** CLOTHE LIST */}
          {/** flex-wrap for carousel / flex-nowrap mosaico */}
          <motion.ul
            drag="x"
            dragConstraints={carouselMode ? sliderRef : { left: 0, right: 0 }}
            className={`flex items-start justify-center gap-2 ${
              carouselMode
                ? "w-fit  flex-nowrap"
                : "w-full flex-wrap"
            } `}
          >
            {clothes && clothes.length > 0 ? (
              clothes.map((c) => (
                <div className={`w-36 md:w-44 rounded-xl overflow-hidden cursor-pointer bg-slate-50/50`}>
                  <img
                    src={c.imageUrl}
                    className="h-64 md:h-72 pointer-events-none object-cover mx-auto"
                  />
                </div>
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
              method="POST"
              action="api/newClothe"
            >
              {/** WARDROBE */}
              <input type="hidden" name="wardrobeId" value={wardrobeId} />
              {/** CATEGORY */}
              <input
                type="hidden"
                name="categoryId"
                value={newClotheCategorySelected}
                required
              />
              <CategorySlider
                wardrobeId={wardrobeId}
                categories={categories}
                showConfig={false}
                showAll={false}
                onCategorySelect={handleNewClotheCategorySelect}
              />

              {/** NAME */}
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="name"
                placeholder="Name"
                required
              />

              {/** DESCRIPTION */}
              <input
                className="bg-transparent py-1 px-4 w-full border-2 rounded-xl"
                type="text"
                name="description"
                placeholder="Description"
              />

              {/** IMAGE */}
              <input
                type="file"
                name="fileInput"
                className="hidden"
                id="fileInput"
                onChange={handleFileInputChange}
              />
              <input type="hidden" name="dataURL" value={fileURL} />
              <img
                src={fileURL || mockup.src}
                className="mx-auto h-64 w-full cursor-pointer object-contain"
                onClick={handleImageClick}
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
                className="px-4 py-2 rounded-xl border-2 mx-auto"
                type="submit"
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
