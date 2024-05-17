import React, { useState } from "react";

export default function Assistant({ apiKey }) {
  const [assistantRes, setAssistantRes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  async function processMessageToChatGPT(event) {
    event.preventDefault();
    const message = [
      {
        role: "user",
        content: document.getElementById("userPrompt").value,
      },
    ];
    const systemPrompt = {
      role: "system",
      content:
        "Speak like you are a proffesional clothe designer trying to help to find the best clothes",
    };
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemPrompt, ...message],
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => setAssistantRes(data.choices[0].message.content));
  }

  return (
    <>
      <nav className="w-full max-w-[600px] mx-auto gap-2 border-2 rounded-xl overflow-hidden mt-2">
        <form
          className="w-full flex items-center justify-end"
          onSubmit={processMessageToChatGPT}
        >
          <input
            className="w-full px-4 py-1 bg-transparent border-0 outline-none"
            type="text"
            name="userPrompt"
            id="userPrompt"
            placeholder="Hi, how can I help you?"
            required
          />
          <button className="flex flex-nowrap items-center justify-center px-4 py-1 text-indigo-800 bg-white">
            <i className="text-2xl ri-bard-line"></i> Send
          </button>
        </form>
      </nav>
      {assistantRes !== "" && (
        <div
          className={`w-full flex items-start justify-between max-w-[600px] mx-auto p-2 mb-2 text-pretty ${
            isOpen ? "h-full" : "max-h-10"
          } overflow-hidden border-b-[.5px]`}
        >
          <p>{assistantRes}</p>
          <button onClick={() => setIsOpen(!isOpen)}>
            <i
              className={`text-2xl ri-arrow-${isOpen ? "up" : "down"}-s-line`}
            ></i>
          </button>
        </div>
      )}
    </>
  );
}
