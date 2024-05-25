import type { APIContext } from "astro";
import { Follow, and, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const userTo = url.searchParams.get("userId");
    const userFrom = context.locals.user?.id;

    if (!userTo || !userFrom) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    const follow = (
      await db
        .select()
        .from(Follow)
        .where(and(eq(Follow.userTo, userTo), eq(Follow.userFrom, userFrom)))
    ).at(0);

    if (!follow) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    const isFollowing = follow.active;

    return new Response(
      JSON.stringify({ isFollowing: isFollowing ? true : false }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
