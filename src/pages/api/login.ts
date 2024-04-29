import type { APIContext } from "astro";
import { User, db, eq } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";

export async function POST(context: APIContext): Promise<Response> {
  // Form Data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  // Validate Data
  if (!username || !password) {
    return new Response("All field are required", { status: 400 });
  }
  if (typeof username !== "string") {
    return new Response("Non valid username", { status: 400 });
  }
  if (typeof password !== "string") {
    return new Response("Non valid password", { status: 400 });
  }
  // Search User in DB
  const foundUser = (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);
  // User not found
  if (!foundUser) {
    return new Response("Incorrect username or password", { status: 400 });
  }
  // Verify password
  if (!password) {
    return new Response("Incorrect username or password", { status: 400 });
  }
  const validPassword = await new Argon2id().verify(
    foundUser.password,
    password
  );
  if (!validPassword) {
    return new Response("Incorrect username or password", { status: 400 });
  }
  // Generate Session
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  // Redirect user
  return context.redirect("/profile");
}
