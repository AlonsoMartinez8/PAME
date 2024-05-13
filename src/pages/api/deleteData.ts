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

  await db.delete(Outfit)
  await db.delete(Outfit);
  await db.delete(Category);
  await db.delete(Wardrobe);
  await db.delete(User);
  await db.delete(Session);

  return context.redirect("/");
}
