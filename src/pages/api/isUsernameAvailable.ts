import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";

export async function GET(context: APIContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const username = url.searchParams.get("username");
    if (!username) {
      return new Response(JSON.stringify({ error: "Missing username" }), {
        status: 400,
      });
    }

    const users = await db
      .select()
      .from(User)
      .where(eq(User.username, username));

    const available = users.length==0

    return new Response(JSON.stringify({ available: available }), {
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
