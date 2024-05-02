import { Category, db, eq } from "astro:db";

export async function getCategoriesByWardrobe(
  wardrobeId: string
): Promise<Array<Object>> {
  return await db
    .select()
    .from(Category)
    .where(eq(Category.wardrobeId, wardrobeId));
}
