import type { APIContext } from "astro";
import { Clothe, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
    console.log("func")
  const formData = await context.request.formData();
  const clotheId = formData.get("clotheId");
  const clothePrivacity = !Boolean(formData.get("clothePrivacity"));
  if (!clotheId || !clothePrivacity) {
    return new Response("Missing form fields", { status: 400 });
  }
  if (typeof clotheId !== "string" || typeof clothePrivacity !== "boolean") {
    return new Response("Invalid form fields", { status: 400 });
  }
  await db
    .update(Clothe)
    .set({ public: clothePrivacity })
    .where(eq(Clothe.id, clotheId));
  const referer = context.request.headers.get("Referer");
  if (!referer) {
    return new Response("Redirect URL not found", { status: 400 });
  }
  return context.redirect(referer);
}
