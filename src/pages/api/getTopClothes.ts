import type { APIContext } from "astro";
import { Clothe, Like, User, and, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  try {
    // Obtener todas las prendas
    const clothes = await db.select().from(Clothe);

    // Crear un array para almacenar la cantidad de likes por prenda y su usuario
    let likesPerClothe = [];

    // Recorrer todas las prendas para obtener la cantidad de likes de cada una y su usuario
    for (const c of clothes) {
      const likesCount = (await db
        .select()
        .from(Like)
        .where(and(eq(Like.clotheTo, c.id), eq(Like.active, true)))).length
        

      const user = (await db
        .select()
        .from(User)
        .where(eq(User.wardrobeId, c.wardrobeId))).at(0)

      // Asegurarse de que se encontró un usuario
      if (user) {
        likesPerClothe.push({ clothe: c, likes: likesCount, user });
      }
    }

    // Ordenar las prendas por cantidad de likes en orden descendente
    likesPerClothe.sort((a, b) => b.likes - a.likes);

    // Obtener las diez prendas con más likes
    const topClothes = likesPerClothe.slice(0, 5);

    const data = topClothes.map((item) => ({
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

    return new Response(JSON.stringify({ data }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 500,
    });
  }
}
