import React from "react";

export default function Assistant() {
  return (
    <>
      <nav className="w-full max-w-[600px] mx-auto gap-2 border-2 rounded-xl overflow-hidden mt-2">
        <form method="POST" className="w-full flex items-center justify-end">
          <input
            className="w-full px-4 py-1 bg-transparent border-0 outline-none"
            type="text"
            name="userPrompt"
            placeholder="Hi, how can I help you?"
            required
          />
          <button className="flex flex-nowrap items-center justify-center px-4 py-1 text-indigo-800 bg-white">
            <i className="text-2xl ri-bard-line"></i> Send
          </button>
        </form>
      </nav>
      <div className="w-full max-w-[600px] mx-auto p-2 mb-2 text-pretty"></div>
    </>
  );
}
