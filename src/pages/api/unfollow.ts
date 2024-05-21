import type { APIContext } from "astro";
import { Follow, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = context.request.formData();
  const followId = (await formData).get("followId");

  if (!followId || typeof followId != "string") {
    return new Response("Invalid form data", { status: 401 });
  }

  await db.update(Follow).set({
    active: false,
  }).where(eq(Follow.id, followId))
  return context.redirect(context.url.toString());
}
