import { getURL, uploadFile } from "@/firebase/config";
import type { APIContext } from "astro";
import { Clothe, db } from "astro:db";
import { generateId } from "lucia";

function dataURL2File(dataURL: string, filename: string): File {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

export async function POST(context: APIContext): Promise<Response> {
  const formData = await context.request.formData();

  const id = generateId(15);
  const wardrobeId = formData.get("wardrobeId");
  const categoryId = formData.get("categoryId");
  const name = formData.get("name");
  const description = formData.get("description");
  const privacity = true;
  const dataURL = formData.get("dataURL");
  const link = formData.get("link");

  if (!wardrobeId || !categoryId || !name || !dataURL) {
    return new Response("Missing form fields", { status: 400 });
  }

  if (
    typeof wardrobeId !== "string" ||
    typeof categoryId !== "string" ||
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof dataURL !== "string" ||
    typeof link !== "string"
  ) {
    return new Response("Invalid fields type", { status: 400 });
  }

  const imageFile = dataURL2File(dataURL, `${id}==>${name}`);

  await uploadFile(imageFile, "clothes/" + wardrobeId, id);
  const imageURL = await getURL("clothes/" + wardrobeId, id);

  if (!imageURL) return new Response("Image upload failed", { status: 400 });

  await db.insert(Clothe).values([
    {
      id: id,
      wardrobeId: wardrobeId,
      categoryId: categoryId,
      name: name,
      description: description,
      public: privacity,
      imageUrl: imageURL,
      link: link,
    },
  ]);

  return context.redirect("/myWardrobe");
}
