import React, { useState } from "react";

export default function Assistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.error || "An error occurred");
        return;
      }

      const data = await res.json();
      setResponse(data.choices[0].message.content || "No response from the assistant");
    } catch (err) {
      setError("Failed to fetch the response. Please try again.");
    }
  };

  return (
    <>
      <nav className="w-full max-w-[600px] mx-auto gap-2 border-2 rounded-xl overflow-hidden mt-2">
        <form
          className="w-full flex items-center justify-end"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full px-4 py-1 bg-transparent border-0 outline-none"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Hi, how can I help you?"
            required
          />
          <button
            type="submit"
            className="flex flex-nowrap items-center justify-center px-4 py-1 text-indigo-800 bg-white"
          >
            <i className="text-2xl ri-bard-line"></i> Send
          </button>
        </form>
      </nav>
      {error && (
        <div className="w-full max-w-[600px] mx-auto p-2 mb-2 text-red-500 border-b-[.5px]">
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div
          className={`w-full flex items-start justify-between max-w-[600px] mx-auto p-2 mb-2 text-pretty ${
            isOpen ? "h-full" : "max-h-10"
          } overflow-hidden border-b-[.5px]`}
        >
          <p>{response}</p>
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
