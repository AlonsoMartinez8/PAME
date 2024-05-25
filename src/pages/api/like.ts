import type { APIContext } from "astro";
import { Like, and, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userFrom = context.locals.user?.id;
  const userTo = formData.get("userTo");
  const clotheTo = formData.get("clotheTo");
  if (
    !userFrom ||
    !userTo ||
    !clotheTo ||
    !(typeof userFrom === "string") ||
    !(typeof userTo === "string") ||
    !(typeof clotheTo === "string")
  ) {
    return new Response("Invalid form data", { status: 401 });
  }
  const exist = (
    await db
      .select()
      .from(Like)
      .where(and(eq(Like.userFrom, userFrom), eq(Like.clotheTo, clotheTo)))
  ).at(0);
  if (!exist) {
    const newLikeId = generateId(15);
    await db.insert(Like).values({
      id: newLikeId,
      clotheTo: clotheTo,
      userFrom: userFrom,
      userTo: userTo,
      active: true,
    });
  } else {
    if (exist.active) {
      await db
        .update(Like)
        .set({ active: false })
        .where(and(eq(Like.userFrom, userFrom), eq(Like.clotheTo, clotheTo)));
    } else {
      await db
        .update(Like)
        .set({ active: true })
        .where(and(eq(Like.userFrom, userFrom), eq(Like.clotheTo, clotheTo)));
    }
  }
  return context.redirect("/pamShare");
}
