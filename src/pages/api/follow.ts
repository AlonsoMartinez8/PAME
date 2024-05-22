import type { APIContext } from "astro";
import { Follow, db, eq } from "astro:db";
import { generateId } from "lucia";

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();
  const userFrom = formData.get("userFrom");
  const userTo = formData.get("userTo");
  const alreadyFollowing = Boolean(formData.get("alreadyFollowing"));
  const followActiveId = formData.get("followActiveId");

  if (
    !userFrom ||
    !userTo ||
    !userTo ||
    !alreadyFollowing ||
    !followActiveId ||
    typeof userFrom != "string" ||
    typeof userTo != "string" ||
    typeof alreadyFollowing != "boolean" ||
    typeof followActiveId != "string"
  ) {
    return new Response(
      `Invalid form data
    from\t${userFrom} ${typeof userFrom} ${userFrom!=null}
    to\t\t${userTo} ${typeof userTo} ${userFrom!=null}
    aF\t\t${alreadyFollowing} ${typeof alreadyFollowing} ${userFrom!=null}
    fA\t\t${followActiveId} ${typeof followActiveId} ${userFrom!=null}
    `,
      { status: 401 }
    );
  }

  return context.redirect("/profile/" + userTo);
}
