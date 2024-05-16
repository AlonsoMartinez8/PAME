import { Category, db, eq } from "astro:db";

export async function getCategoryById(id: string): Promise<{
  id: string;
  wardrobeId: string;
  name: string | null;
  description: string | null;
} | undefined> {
  const result = await db.select().from(Category).where(eq(Category.id, id));
  return result.length > 0 ? result.at(0) : undefined;
}