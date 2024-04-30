import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userId = formData.get("userId");
  const link = formData.get("link");
  if (
    !link ||
    !userId ||
    typeof userId !== "string" ||
    typeof link !== "string"
  ) {
    return new Response("Non valid link");
  }
  await db.update(User).set({ link: link }).where(eq(User.id, userId));
  return context.redirect("/profile");
}
