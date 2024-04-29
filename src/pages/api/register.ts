import type { APIContext } from "astro";
import { User, db } from "astro:db";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { Lucia } from "lucia";
import { lucia } from "@/auth";

export async function POST(context: APIContext): Promise<Response> {
    // Form Data
    const formData = await context.request.formData()
    const username = formData.get('username')
    const password = formData.get('password')
    const repeatpassword = formData.get('repeatpassword')

    // Validate Data
    if(!username || !password || !repeatpassword){
        return new Response('All field are required',{status: 400})
    }
    if(typeof username !== 'string' || username.length < 5 || username.length > 15) {
        return new Response('Non valid username. Must be between 5 and 15 characters long',{status: 400})
    }
    if(typeof password !== 'string' || password.length < 5 || password.length > 15) {
        return new Response('Non valid password. Must be between 5 and 15 characters long',{status: 400})
    }
    if(repeatpassword !== password) {
        return new Response('Passwords does not coincide',{status: 400})
    }
    // Generate id and hash password
    const userId = generateId(15)
    const hashedPassword = await new Argon2id().hash(password)
    // Insert Data to DB
    await db.insert(User).values([{
        id: userId,
        username,
        password: hashedPassword
    }])
    // Generate Session
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    // Redirect user
    return context.redirect('/profile')
}