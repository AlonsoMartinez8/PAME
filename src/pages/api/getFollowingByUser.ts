import type { APIContext } from "astro";
import { Follow, User, and, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    const following = await db
      .select()
      .from(Follow)
      .where(and(eq(Follow.userFrom, userId), eq(Follow.active, true)));

      const users = await Promise.all(
        following.map(async (f) => {
          const user = (await db.select().from(User).where(eq(User.id, f.userTo))).at(0);
          return user;
        })
      );

    return new Response(JSON.stringify({ following: users }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}