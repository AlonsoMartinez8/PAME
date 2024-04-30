import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userId = formData.get("userId");
  const description = formData.get("description");
  if (
    !description ||
    !userId ||
    typeof userId !== "string" ||
    typeof description !== "string" ||
    description.length > 150
  ) {
    return new Response(
      "Non valid description. It must be 150 characters long as maximun"
    );
  }
  await db
    .update(User)
    .set({ description: description })
    .where(eq(User.id, userId));
  return context.redirect("/profile");
}
