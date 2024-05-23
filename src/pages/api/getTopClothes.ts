import { Clothe, Like, db, eq } from "astro:db";

export async function getTopClothes(): Promise<
  {
    id: string;
    wardrobeId: string;
    categoryId: string;
    name: string | null;
    description: string | null;
    public: boolean;
    imageUrl: string;
    link: string | null;
  }[]
> {
  // Obtener todas las prendas
  const clothes = await db.select().from(Clothe);

  // Crear un array para almacenar la cantidad de likes por prenda
  const likesPerClothe = [];

  // Recorrer todas las prendas para obtener la cantidad de likes de cada una
  for (const c of clothes) {
    const likes = (await db.select().from(Like).where(eq(Like.clotheTo, c.id)))
      .length;
    likesPerClothe.push({ clothe: c, likes: likes });
  }

  // Ordenar las prendas por cantidad de likes en orden descendente
  likesPerClothe.sort((a, b) => b.likes - a.likes);

  // Obtener las diez prendas con más likes
  const topClothes = likesPerClothe.slice(0, 10).map((item) => item.clothe);

  // Devolver las diez prendas con más likes
  return topClothes.map((c) => ({
    id: c.id,
    wardrobeId: c.wardrobeId,
    categoryId: c.categoryId,
    name: c.name,
    description: c.description,
    public: c.public,
    imageUrl: c.imageUrl,
    link: c.link,
  }));
}
