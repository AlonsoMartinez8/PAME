import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userId = formData.get("userId");
  const location = formData.get("location");
  if (
    !location ||
    !userId ||
    typeof userId !== "string" ||
    typeof location !== "string"
  ) {
    return new Response("Non valid location", {status:400});
  }
  await db.update(User).set({ location: location }).where(eq(User.id, userId));
  return context.redirect("/profile");
}
