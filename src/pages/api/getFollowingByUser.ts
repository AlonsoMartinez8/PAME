import type { APIContext } from "astro";
import { Follow, and, db, eq } from "astro:db";

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

    return new Response(JSON.stringify({ following: following }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}