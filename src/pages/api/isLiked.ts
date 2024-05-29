import type { APIContext } from "astro";
import { Like, and, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const id = url.searchParams.get("id");
    const userFrom = context.locals.user?.id;

    if (!id || !userFrom) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    const like = (
      await db
        .select()
        .from(Like)
        .where(and(eq(Like.clotheTo, id), eq(Like.userFrom, userFrom)))
    ).at(0);

    if (!like) {
      return new Response(JSON.stringify({ isLiked: false }), {
        status: 200,
      });
    }

    const isLiked = like.active;

    return new Response(JSON.stringify({ isLiked: isLiked ? true : false }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
