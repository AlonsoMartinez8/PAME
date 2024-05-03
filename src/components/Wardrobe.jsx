import { useEffect, useState } from "react";
import CategorySlider from "./CategorySlider";
import ClotheSlider from "./ClotheSlider";

export default function Wardrobe({ wardrobeId, categories, clothes }) {
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [clothesByCategorySelected, setClothesByCategorySelected] =
    useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    
    if(selectedCategory==="All categories"){
      setClothesByCategorySelected(clothes)
    }else{
      const clothesByCategory = clothes.filter(c=>c.categoryId==categoryId)
      setClothesByCategorySelected(clothesByCategory)
    }

    
  };

  return (
    <main className="w-full my-2">
      <CategorySlider
        wardrobeId={wardrobeId}
        categories={categories}
        showConfig={true}
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
