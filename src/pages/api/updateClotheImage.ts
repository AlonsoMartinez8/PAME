import type { APIContext } from "astro";
import { Clothe, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const clotheId = formData.get("clotheId");
  const imageUrl = formData.get("imageUrl");
  if (
    !imageUrl ||
    !clotheId ||
    typeof clotheId !== "string" ||
    typeof imageUrl !== "string"
  ) {
    return new Response("Non valid url", { status: 400 });
  }
  await db
    .update(Clothe)
    .set({ imageUrl: imageUrl })
    .where(eq(Clothe.id, clotheId));
  const referer = context.request.headers.get("Referer");
  if (!referer) {
    return new Response("Redirect URL not found", { status: 400 });
  }

  return context.redirect(referer);
}
