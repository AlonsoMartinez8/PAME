import CategorySlider from "./CategorySlider";

export default function Wardrobe({ wardrobeId, categories }) {
  return (
    <main className="w-full my-2">
      <CategorySlider wardrobeId={wardrobeId} categories={categories} />
    </main>
  );
}
