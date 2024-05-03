import { Clothe, db, eq } from "astro:db";

export async function getClothesByWardrobe(
  wardrobeId: string
): Promise<Array<Object>> {
  return await db
    .select()
    .from(Clothe)
    .where(eq(Clothe.wardrobeId, wardrobeId));
}
