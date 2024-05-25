import type { APIContext } from "astro";
import { User } from "astro:db";
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

    // Retrieve followers
    const followers = await db
      .select()
      .from(Follow)
      .where(and(eq(Follow.userTo, userId), eq(Follow.active, true)));

    // Retrieve user details for each follower
    const users = await Promise.all(
      followers.map(async (f) => {
        const user = (await db.select().from(User).where(eq(User.id, f.userFrom))).at(0);
        return user;
      })
    );

    return new Response(JSON.stringify({ followers: users }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

