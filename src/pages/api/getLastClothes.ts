import type { APIContext } from "astro";
import { Clothe, User, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  const { searchParams } = new URL(context.request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // Obtener todas las prendas
  const allClothes = await db.select().from(Clothe);

  // Obtener las últimas 10 prendas del array
  const lastClothes = allClothes.slice((page-1) * limit, -(page-1) * limit + limit);

  let lastClothesWithUsers = [];

  // Recorrer las últimas prendas para obtener su usuario
  for (const c of lastClothes) {
    const users = await db
      .select()
      .from(User)
      .where(eq(User.wardrobeId, c.wardrobeId));

    // Asegurarse de que se encontró al menos un usuario
    if (users.length > 0) {
      lastClothesWithUsers.push({ clothe: c, user: users[0] });
    }
  }

  // Obtener el número total de prendas
  const totalClothesCount = allClothes.length;

  const totalPages = Math.ceil(totalClothesCount / limit);

  return new Response(
    JSON.stringify({
      clothes: lastClothesWithUsers,
      totalPages,
      currentPage: page,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
