export async function post({ request }: { request: Request }) {
  // Extrae el contenido del cuerpo de la solicitud
  const { prompt } = await request.json();

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
    content:
      "Speak like you are a professional clothes designer trying to help find the best clothes.",
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
