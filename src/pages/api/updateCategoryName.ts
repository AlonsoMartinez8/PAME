import type { APIContext } from "astro";
import { Category, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const id = formData.get("id");
  const name = formData.get("name");
  if (!id || !name) {
    return new Response("Missing form fields", { status: 400 });
  }
  if (typeof id !== "string" || typeof name !== "string") {
    return new Response("Invalid form fields", { status: 400 });
  }
  await db.update(Category).set({ name: name }).where(eq(Category.id, id));

  return context.redirect("/myWardrobe");
}
