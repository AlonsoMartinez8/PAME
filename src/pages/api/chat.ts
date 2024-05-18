import type { APIContext } from "astro";

export async function POST(context: APIContext) {
  // Extrae el contenido del cuerpo de la solicitud
  const { prompt, name, description } = await context.request.json();

  // Verifica si el prompt está presente en el cuerpo de la solicitud
  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Obtiene la API key de las variables de entorno
  const apiKey = import.meta.env.OPEN_AI_API_KEY;

  // Verifica si la API key está configurada
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "OpenAI API key is not set" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // Define el prompt del sistema para el asistente
  const systemPrompt = {
    role: "system",
    content:`You are a designer and fashion expert.
You will speak as such, but it is not necessary that you use very specific and professional language typical of your field since you will speak as an intermediate level user in terms of fashion.
You should answer in the shortest and most concise way possible.
You have to try to help and advise the user
This user is called ${name} and this is his description: "${description}".
Furthermore, at the end of your answer you should give approximately three words that summarize your answer in the form of a hastag.
Here is an example:
If the answer is, "I would advise you to use light clothes in pastel tones and considering that it is summer, I would recommend soft fabrics and short clothes" return also "#light #pastel #soft".
    `,
  };

  // Estructura el cuerpo de la solicitud para la API de OpenAI
  const apiRequestBody = {
    model: "gpt-3.5-turbo",
    messages: [systemPrompt, { role: "user", content: prompt }],
  };

  try {
    // Envía la solicitud a la API de OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const data = await response.json();

    // Verifica si la respuesta de la API no es exitosa
    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Devuelve la respuesta exitosa de la API
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Manejo de errores del servidor
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
