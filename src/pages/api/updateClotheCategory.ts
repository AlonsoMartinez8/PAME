import type { APIContext } from "astro";
import { Clothe, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const clotheId = formData.get("clotheId");
  const categoryId = formData.get("categoryId");
  if (!clotheId || !categoryId) {
    return new Response("Missing form fields", { status: 400 });
  }
  if (typeof clotheId !== "string" || typeof categoryId !== "string") {
    return new Response("Invalid form fields", { status: 400 });
  }
  await db
    .update(Clothe)
    .set({ categoryId: categoryId })
    .where(eq(Clothe.id, clotheId));

  return context.redirect("/myWardrobe");
}
