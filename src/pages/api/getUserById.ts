// await db.select().from(User).where(eq(User.id, id))

import { User, db, eq } from "astro:db";

export async function getUserById(id: string): Promise<
  | {
      id: string;
      wardrobeId: string;
      outfitId: string;
      username: string;
      password: string | null;
      imageUrl: string | null;
      description: string | null;
      link: string | null;
      location: string | null;
      birthdate: string | null;
    }
  | undefined
> {
  const result = await db.select().from(User).where(eq(User.id, id));
  return result.length > 0 ? result.at(0) : undefined;
}
