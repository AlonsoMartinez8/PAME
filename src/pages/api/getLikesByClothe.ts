import { Like, User, db, eq } from "astro:db";

export async function getLikesByClothe(id: string): Promise<number> {
  const likes = await db.select().from(Like).where(eq(Like.clotheTo, id))
  return likes!=null?likes.length:0
}
