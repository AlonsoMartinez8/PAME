import type { APIContext } from "astro";
import { Clothe, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const clotheId = formData.get("clotheId");
  const link = formData.get("link");
  if (!clotheId || !link) {
    return new Response("Missing form fields", { status: 400 });
  }
  if (typeof clotheId !== "string" || typeof link !== "string") {
    return new Response("Invalid form fields", { status: 400 });
  }
  await db
    .update(Clothe)
    .set({ link: link })
    .where(eq(Clothe.id, clotheId));
  
  const referer = context.request.headers.get("Referer");
  if (!referer) {
    return new Response("Redirect URL not found", { status: 400 });
  }
  
  return context.redirect(referer);
}
