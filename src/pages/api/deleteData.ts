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
  db.delete(Outfit).catch((err) => console.error(err));
  db.delete(Category).catch((err) => console.error(err));
  db.delete(Wardrobe).catch((err) => console.error(err));
  db.delete(User).catch((err) => console.error(err));
  db.delete(Session).catch((err) => console.error(err));
  db.delete(Clothe).catch((err) => console.error(err));
  db.delete(Like).catch((err) => console.error(err));
  db.delete(Follow).catch((err) => console.error(err));
  return context.redirect("/");
}
