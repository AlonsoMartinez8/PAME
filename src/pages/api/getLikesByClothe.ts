import type { APIContext } from "astro";
import { Like, and, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Clothe ID is required" }), {
        status: 400,
      });
    }

    const likes = await db
      .select()
      .from(Like)
      .where(and(eq(Like.clotheTo, id), eq(Like.active, true)));

    return new Response(JSON.stringify({ likes: likes ? likes.length : 0 }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ likes: 0 }), {
      status: 200,
    });
  }
}
