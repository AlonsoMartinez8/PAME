import type { APIContext } from "astro";
import { User, Wardrobe, Outfit, db, eq } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "@/auth";

export async function POST(context: APIContext): Promise<Response> {
  // Form Data
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const repeatpassword = formData.get("repeatpassword");
  // Validate Data
  if (!username || !password || !repeatpassword) {
    return new Response("All field are required", { status: 400 });
  }
  if (
    typeof username !== "string" ||
    username.length < 5 ||
    username.length > 15
  ) {
    return new Response(
      "Non valid username. Must be between 5 and 15 characters long",
      { status: 400 }
    );
  }
  const usernameAlreadyExists = await (
    await db.select().from(User).where(eq(User.username, username))
  ).at(0);
  if (usernameAlreadyExists) {
    return new Response("Non valid username. That username already exists", {
      status: 400,
    });
  }
  if (
    typeof password !== "string" ||
    password.length < 5 ||
    password.length > 20 ||
    !containSymbols(password) ||
    !containNumbers(password)
  ) {
    return new Response(
      "Non valid password. Must be between 5 and 20 characters long, contain symbols and numbers",
      { status: 400 }
    );
  }
  if (repeatpassword !== password) {
    return new Response("Passwords does not coincide", { status: 400 });
  }
  // Generate id and hash password
  const userId = generateId(15);
  const hashedPassword = await new Argon2id().hash(password);
  // Create Wardrobe & Outfit
  const wardrobeId = generateId(15);
  const outfitId = generateId(15);
  await db.insert(Wardrobe).values([{ id: wardrobeId }]);
  await db.insert(Outfit).values([{ id: outfitId }]);
  // Insert Data to DB
  await db.insert(User).values([
    {
      id: userId,
      wardrobeId,
      outfitId,
      username,
      password: hashedPassword,
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/pame-f2cf9.appspot.com/o/profile%2FnoUserImage.png?alt=media&token=418bc910-e6a0-426e-bdcc-6e299be58ed6",
    },
  ]);
  // Generate Session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  context.cookies.set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  // Redirect user
  return context.redirect("/profile");
}

function containSymbols(pass: string): boolean {
  const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return symbolRegex.test(pass);
}

function containNumbers(pass: string): boolean {
  const numberRegex = /[0-9]/;
  return numberRegex.test(pass);
}
