import type { APIContext } from "astro";
import {
  Clothe,
  db,
  eq,
} from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData()
  const clotheId = formData.get("clotheId")
  if(!clotheId||typeof clotheId !== "string"){
    return new Response("Invalid reques", {status: 400})
  }

  await db.delete(Clothe).where(eq(Clothe.id, clotheId))
  return context.redirect("/myWardrobe");
}
