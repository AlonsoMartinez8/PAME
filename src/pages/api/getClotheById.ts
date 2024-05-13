import { Clothe, db, eq } from "astro:db";

export async function getClotheById(id: string): Promise<{
  id: string;
  wardrobeId: string;
  categoryId: string;
  name: string | null;
  description: string | null;
  public: boolean;
  imageUrl: string;
  link: string | null;
} | undefined> {
  const result = await db.select().from(Clothe).where(eq(Clothe.id, id));
  return result.length > 0 ? result.at(0) : undefined;
}
