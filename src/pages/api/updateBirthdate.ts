import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userId = formData.get("userId");
  const birthdate = formData.get("birthdate");
  if (
    !birthdate ||
    !userId ||
    typeof userId !== "string" ||
    typeof birthdate !== "string"
  ) {
    return new Response("Non valid birthdate", {status:400});
  }
  await db.update(User).set({ birthdate: birthdate }).where(eq(User.id, userId));
  return context.redirect("/profile");
}
