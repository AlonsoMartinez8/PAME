import type { APIContext } from "astro";
import { Follow, and, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userFrom = context.locals.user?.id;
  const userTo = formData.get("userTo");
  if (
    !userFrom ||
    !userTo ||
    !(typeof userFrom === "string") ||
    !(typeof userTo === "string")
  ) {
    return new Response("Invalid form data", { status: 401 });
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
  return context.redirect("/pamShare");
}
