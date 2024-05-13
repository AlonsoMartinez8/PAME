import type { APIContext } from "astro";
import {
  Session,
  User,
  Wardrobe,
  Clothe,
  Outfit,
  Category,
  Follow,
  Like,
  db,
} from "astro:db";

export async function POST(context: APIContext): Promise<Response> {

  await db.delete(Clothe);

  return context.redirect("/");
}
