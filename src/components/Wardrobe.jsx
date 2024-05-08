import { useEffect, useState } from "react";
import CategorySlider from "./CategorySlider";
import ClotheSlider from "./ClotheSlider";

export default function Wardrobe({ wardrobeId, categories, clothes }) {
  // Category selected on category slider hook
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Clothes by category selected hook
  const [clothesByCategorySelected, setClothesByCategorySelected] =
    useState(clothes);

  // Function to handle the category selection on category slider
  const handleCategorySelect = (categoryId) => {
    // Change value of the category selected hook
    setSelectedCategory(categoryId);
    // Check if category selected is 'all categories'
    // If 'all categories' is selected set all wardrobe clothes on the state hook
    // If it isn't, filter all clothes by category and set'em on the state hook
    if (selectedCategory === "all") { // selected category name?
      setClothesByCategorySelected(clothes);
    } else {
      const clothesByCategory = clothes.filter(
        (c) => c.categoryId == categoryId
      );
      setClothesByCategorySelected(clothesByCategory);
    }
  };

  return (
    <main className="w-full my-2">
      <CategorySlider
        wardrobeId={wardrobeId}
        categories={categories}
        showConfig={true}
        showAll={true}
        onCategorySelect={handleCategorySelect}
      />
      <ClotheSlider
        wardrobeId={wardrobeId}
        categories={categories}
        selectedCategory={selectedCategory}
        clothes={clothesByCategorySelected}
      />
    </main>
  );
}
