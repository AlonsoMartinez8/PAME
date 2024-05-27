import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";

export async function POST(context: APIContext): Promise<Response> {
  try {
    const url = new URL(context.request.url);
    const password = url.searchParams.get("password");
    const username = url.searchParams.get("username");

    // Validate Data
    if (
      !username ||
      !password ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Search User in DB
    const foundUser = (
      await db.select().from(User).where(eq(User.username, username))
    ).at(0);

    // User not found
    if (!foundUser) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Verify Password
    const validPassword = await new Argon2id().verify(
      foundUser.password,
      password
    );
    if (!validPassword) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 400,
      });
    }

    // Generate Session
    const session = await lucia.createSession(foundUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    context.cookies.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    // Successfully created session and set cookie
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
