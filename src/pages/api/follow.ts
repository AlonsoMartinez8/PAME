import type { APIContext } from "astro";
import { Follow, and, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const body = await context.request.json();

    const { userTo } = body;
    const userFrom = context.locals.user?.id;
    if (!userTo || !userFrom) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
      });
    }

    const exist = (
      await db
        .select()
        .from(Follow)
        .where(and(eq(Follow.userFrom, userFrom), eq(Follow.userTo, userTo)))
    ).at(0);
    if (!exist) {
      const newFollowId = generateId(15);
      await db.insert(Follow).values({
        id: newFollowId,
        userFrom: userFrom,
        userTo: userTo,
        active: true,
      });
    } else {
      if (exist.active) {
        await db
          .update(Follow)
          .set({ active: false })
          .where(and(eq(Follow.userFrom, userFrom), eq(Follow.userTo, userTo)));
      } else {
        await db
          .update(Follow)
          .set({ active: true })
          .where(and(eq(Follow.userFrom, userFrom), eq(Follow.userTo, userTo)));
      }
    }
    return new Response(JSON.stringify({ message: "Follow successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
