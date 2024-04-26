import type { APIContext } from "astro";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";
import { db, User } from "astro:db";

export async function POST(context: APIContext): Promise<Response> {
  // Parse the form data
  const formData = await context.request.formData();
  // Form fields
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatpassword = formData.get("repeatpassword");

  // Validate the form data
  // All fields are required
  if (!username || !password || !repeatpassword || !email) {
    return new Response("All fields are required", { status: 400 });
  }
  // Username
  if (
    typeof username !== "string" ||
    username.length < 4 ||
    username.length > 10
  ) {
    return new Response("User name must be between 4 and 10 characters long", {
      status: 400,
    });
  }
  // EMail
  if (typeof email !== "string") {
    return new Response("E-Mail not valid", { status: 400 });
  }
  // Password
  if (
    typeof password !== "string" ||
    password.length < 4 ||
    password.length > 10
  ) {
    return new Response("Password must be between 4 and 10 characters long", {
      status: 400,
    });
  }
  // Repeat Password
  if (repeatpassword !== password) {
    return new Response("Repeated Password doesn't match with Password", {
      status: 400,
    });
  }

  // Insert User into DB
  // Generate ID
  const userId = generateId(15);
  // Hash password
  const hashedPassword = await new Argon2id().hash(password);
  // Insertar
  await db.insert(User).values({
    id: userId,
    username,
    email,
    password: hashedPassword
  })

  // Generate Session
  const session = await lucia.createSession(userId, {});
  // Create session cookie
  const sessionCookie = lucia.createSessionCookie(session.id);
  // Put cookie in browser
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  // Redirect
  return context.redirect("/PAME/myWardrobe");
}
