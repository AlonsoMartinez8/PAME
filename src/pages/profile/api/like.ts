import type { APIContext } from "astro";
import { Like, and, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  try {
    // Parse the request body to get the input data
    const body = await context.request.json();

    // Extract necessary fields from the body and context
    const { clotheTo, userTo } = body;
    const userFrom = context.locals.user?.id;

    // Validate the received data
    if (!clotheTo || !userTo || !userFrom) {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400, // Return 400 Bad Request if any required data is missing
      });
    }

    // Check if a like already exists from this user for this clothing item
    const exist = (
      await db
        .select()
        .from(Like)
        .where(and(eq(Like.userFrom, userFrom), eq(Like.clotheTo, clotheTo)))
    ).at(0);

    // If the like does not exist, create a new like
    if (!exist) {
      const newLikeId = generateId(15); // Generate a new ID for the like
      await db.insert(Like).values({
        id: newLikeId,
        clotheTo: clotheTo,
        userFrom: userFrom,
        userTo: userTo,
        active: true, // Set the like as active
      });
    } else {
      // If the like exists, toggle its active status
      await db
        .update(Like)
        .set({ active: !exist.active }) // Toggle the active status
        .where(and(eq(Like.userFrom, userFrom), eq(Like.clotheTo, clotheTo)));
    }

    // Return a success message if the like was added or toggled successfully
    return new Response(
      JSON.stringify({ message: "Like added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log any errors that occur
    // Return a 500 Internal Server Error response if something goes wrong
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
