import { Clothe, Like, User, db, eq } from "astro:db";

export async function getTopClothes(): Promise<
  {
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

  // Crear un array para almacenar la cantidad de likes por prenda y su usuario
  let likesPerClothe: {
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
    likes: number;
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
  }[] = [];

  // Recorrer todas las prendas para obtener la cantidad de likes de cada una y su usuario
  for (const c of clothes) {
    const likes = await db.select().from(Like).where(eq(Like.clotheTo, c.id));
    const user = (
      await db.select().from(User).where(eq(User.wardrobeId, c.wardrobeId))
    ).at(0);

    // Asegurarse de que se encontró un usuario
    if (user) {
      likesPerClothe.push({ clothe: c, likes: likes.length, user: user });
    }
  }

  // Ordenar las prendas por cantidad de likes en orden descendente
  likesPerClothe.sort((a, b) => b.likes - a.likes);

  // Obtener las diez prendas con más likes
  const topClothes = likesPerClothe.slice(0, 10);

  // Devolver las diez prendas con más likes y su usuario
  return topClothes.map((item) => ({
    user: {
      id: item.user.id,
      wardrobeId: item.user.wardrobeId,
      outfitId: item.user.outfitId,
      username: item.user.username,
      password: item.user.password,
      imageUrl: item.user.imageUrl,
      description: item.user.description,
      link: item.user.link,
      location: item.user.location,
      birthdate: item.user.birthdate,
    },
    id: item.clothe.id,
    wardrobeId: item.clothe.wardrobeId,
    categoryId: item.clothe.categoryId,
    name: item.clothe.name,
    description: item.clothe.description,
    public: item.clothe.public,
    imageUrl: item.clothe.imageUrl,
    link: item.clothe.link,
  }));
}
