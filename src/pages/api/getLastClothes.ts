import type { APIContext } from "astro";
import { Clothe, User, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  const { searchParams } = new URL(context.request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;

  // Obtener todas las prendas con límite, desplazamiento y orden por fecha de creación
  const clothes = await db.select()
    .from(Clothe)
    .limit(limit)
    .offset(offset);

  let lastClothes = [];

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

  // Obtener el número total de prendas
  const totalClothesCount = (await db.select().from(Clothe)).length;

  const totalPages = Math.ceil(totalClothesCount / limit);

  return new Response(
    JSON.stringify({
      clothes: lastClothes,
      totalPages,  // Asegúrate de que `totalPages` es un número
      currentPage: page,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
