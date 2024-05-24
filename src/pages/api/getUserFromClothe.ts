import { Clothe, User, db, eq } from "astro:db";

export async function getUserFromClothe(clotheId: string): Promise<string | null> {
  try {
    const clothe = (await db.select().from(Clothe).where(eq(Clothe.id, clotheId))).at(0);
    if (!clothe) {
      return null;
    }

    const user = (await db.select().from(User).where(eq(User.wardrobeId, clothe.wardrobeId))).at(0);
    if (!user) {
      return null;
    }

    return user.id;
  } catch (error) {
    console.error("Error fetching user from clothe:", error);
    return null;
  }
}
