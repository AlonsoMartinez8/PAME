import { Clothe, Like, User, db, eq } from "astro:db";

interface LastClothe {
  user: {
    id: string;
    wardrobeId: string;
    outfitId: string;
    username: string;
    password: string;
    imageUrl: string | null;
    description: string | null;
    link: string | null;
    location: string | null;
    birthdate: string | null;
  };
  clothe: {
    id: string;
    wardrobeId: string;
    categoryId: string;
    name: string | null;
    description: string | null;
    public: boolean;
    imageUrl: string;
    link: string | null;
  };
}

export async function getLastClothes(): Promise<LastClothe[]> {
  // Obtener todas las prendas
  const clothes = await db.select().from(Clothe);

  let lastClothes: LastClothe[] = [];

  // Recorrer todas las prendas para obtener su usuario
  for (const c of clothes) {
    const users = await db
      .select()
      .from(User)
      .where(eq(User.wardrobeId, c.wardrobeId));

    // Asegurarse de que se encontró al menos un usuario
    if (users.length > 0) {
      lastClothes.push({ clothe: c, user: users[0] });
    }
  }

  // Ordenar las prendas por orden descendente
  lastClothes.reverse();

  return lastClothes;
}
