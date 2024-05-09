import type { APIContext } from "astro";
import { Clothe, db } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();

  const id = formData.get("id");
  const wardrobeId = formData.get("wardrobeId");
  const categoryId = formData.get("categoryId");
  const name = formData.get("name");
  const description = formData.get("description");
  const privacity = true;
  const imageURL = formData.get("url");
  const link = formData.get("link");

  if (!id || !wardrobeId || !categoryId || !name || !imageURL) {
    return new Response(
      "Missing form fields: " +
        `
id: ${id} 
wardrobeId: ${wardrobeId} 
categoryId: ${categoryId} 
name: ${name} 
description: ${description} 
privacity: ${privacity} 
imageURL: ${imageURL} 
link: ${link}`,
      { status: 400 }
    );
  }

  if (
    typeof id !== "string" ||
    typeof wardrobeId !== "string" ||
    typeof categoryId !== "string" ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof imageURL !== "string" ||
    typeof link !== "string"
  ) {
    return new Response("Invalid fields type", { status: 400 });
  }

  await db.insert(Clothe).values([
    {
      id: id,
      wardrobeId: wardrobeId,
      categoryId: categoryId,
      name: name,
      description: description,
      public: privacity,
      imageUrl: imageURL,
      link: link,
    },
  ]);

  return context.redirect("/myWardrobe");
}
