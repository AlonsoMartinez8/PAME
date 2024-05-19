import type { APIRoute } from "astro";
import { User, db, like } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const name = params.name;

  if (!name || typeof name !== "string") {
    return new Response(null, {
      status: 401,
      statusText: "Not valid",
    });
  }

  const profiles = await db
    .select()
    .from(User)
    .where(like(User.username, `%${name}%`));

  return new Response(JSON.stringify(profiles), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
