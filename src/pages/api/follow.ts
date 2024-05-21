import type { APIContext } from "astro";
import { Follow, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userFrom = formData.get("idUserFrom");
  const userTo = formData.get("idUserTo");
  const alreadyFollowing = formData.get("alreadyFollowing");

  if (
    !userFrom ||
    !userTo ||
    typeof userFrom != "string" ||
    typeof userTo != "string"
  ) {
    return new Response("Invalid form data", { status: 401 });
  }

  const followId = generateId(15);

  if (alreadyFollowing) {
    const followActiveId = formData.get("followActiveId");
    if (!followActiveId || typeof followActiveId != "string")
      return new Response("Invalid form data", { status: 401 });
    await db
      .update(Follow)
      .set({
        active: false,
      })
      .where(eq(Follow.id, followActiveId));
  } else if (!alreadyFollowing) {
    await db.insert(Follow).values({
      id: followId,
      userFrom: userFrom,
      userTo: userTo,
      active: true,
    });
  }

  return context.redirect(context.url.toString());
}
