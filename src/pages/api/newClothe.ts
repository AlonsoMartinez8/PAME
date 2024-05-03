import type { APIContext } from "astro";
import { Clothe, db } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const id = formData.get("id");
  const wardrobeId = formData.get("wardrobeId");
  const categoryId = formData.get("categoryId");
  const name = formData.get("name");
  const description = formData.get("description");
  const isPublic = Boolean(formData.get("public"));
  const imageUrl = formData.get("imageUrl");
  const link = formData.get("link");

  if (
    !id ||
    typeof id !== "string" ||
    !wardrobeId ||
    typeof wardrobeId !== "string" ||
    !categoryId ||
    typeof categoryId !== "string" ||
    !name ||
    typeof name !== "string" ||
    !isPublic ||
    typeof isPublic !== "boolean" ||
    !imageUrl ||
    typeof imageUrl !== "string" ||
    typeof description !== "string" ||
    typeof link !== "string"
  ) {
    return new Response("Non valid form fields", { status: 400 });
  }

  await db.insert(Clothe).values([
    {
      id: id,
      wardrobeId: wardrobeId,
      categoryId: categoryId,
      name: name,
      description: description,
      public: isPublic,
      imageUrl: imageUrl,
      link: link,
    },
  ]);

  return context.redirect("/myWardrobe");
}
