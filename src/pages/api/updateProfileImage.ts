import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userId = formData.get("userId");
  const imageUrl = formData.get("imageUrl");
  if (
    !imageUrl ||
    !userId ||
    typeof userId !== "string" ||
    typeof imageUrl !== "string"
  ) {
    return new Response("Non valid url", { status: 400 });
  }
  await db.update(User).set({ imageUrl: imageUrl }).where(eq(User.id, userId));
  return context.redirect("/profile");
}
