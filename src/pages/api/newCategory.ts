import type { APIContext } from "astro";
import { Category, db } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const wardrobeId = formData.get("wardrobeId");
  const name = formData.get("name");
  const description = formData.get("description");
  if (
    !wardrobeId ||
    !name ||
    typeof wardrobeId !== "string" ||
    typeof name !== "string" ||
    typeof description !== "string"
  ) {
    return new Response("Non valid category", { status: 404 });
  }
  const id = generateId(15);
  await db.insert(Category).values([
    {
      id,
      wardrobeId,
      name,
      description,
    },
  ]);
  return context.redirect("/myWardrobe");
}
