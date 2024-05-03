import { useState } from "react";
import CategorySlider from "./CategorySlider";
import ClotheSlider from "./ClotheSlider";

export default function Wardrobe({ wardrobeId, categories, clothes }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [clothesByCategorySelected, setClothesByCategorySelected] =
    useState(null);

  return (
    <main className="w-full my-2">
      <CategorySlider wardrobeId={wardrobeId} categories={categories} />
      <ClotheSlider
        wardrobeId={wardrobeId}
        clothes={clothesByCategorySelected}
      />
    </main>
  );
}
