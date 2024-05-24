import type { APIContext } from "astro";
import { Follow, db, eq, and } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userTo = formData.get("userTo");
  const userFrom = formData.get("userFrom");
  const alreadyFollowing = formData.get("alreadyFollowing") === "true";
  const newId = generateId(15);

  if (!userFrom || !userTo) {
    return new Response("Invalid form data", { status: 401 });
  }

  if (alreadyFollowing == null) {
    // Create follow
    await db.insert(Follow).values({
      userFrom: userFrom.toString(),
      userTo: userTo.toString(),
      active: true,
      id: newId,
    });
  } else if (alreadyFollowing === false) {
    // Update active=true
    await db
      .update(Follow)
      .set({ active: true })
      .where(and(eq(Follow.userFrom, userFrom.toString()), eq(Follow.userTo, userTo.toString())));
  } else if (alreadyFollowing === true) {
    // Unfollow, update active=false
    await db
      .update(Follow)
      .set({ active: false })
      .where(and(eq(Follow.userFrom, userFrom.toString()), eq(Follow.userTo, userTo.toString())));
  }

  return context.redirect("/profile/" + userTo);
}
