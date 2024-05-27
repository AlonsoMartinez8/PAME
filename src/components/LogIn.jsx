import React, { useState } from "react";

export default function LogIn() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [warning, setWarning] = useState({ warn: false, msg: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/login?password=${passwordValue}&username=${usernameValue}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      if (response.status !== 200) {
        setWarning({ warn: true, msg: data.error || "Invalid credentials" });
      } else {
        setWarning({ warn: false, msg: "" });
        // Redirect user to profile or another appropriate page
        window.location.href = "/profile";
      }
    } catch (err) {
      console.error(err);
      setWarning({ warn: true, msg: "An error occurred. Please try again." });
    }
  };

  return (
    <main className="h-full w-full flex flex-col items-center justify-between pb-4">
      <form
        className="w-full min-w-[300px] max-w-[500px] mx-auto flex flex-col gap-4 p-4"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-xl">Log Into Your Account</h1>
        <label htmlFor="username">
          <p>User Name</p>
          <input
            className="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl"
            type="text"
            name="username"
            placeholder="User name"
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            className="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
        </label>
        {warning.warn && <p className="text-xs text-red-400">{warning.msg}</p>}
        <button className="bg-white/20 mt-2 py-1 rounded-xl hover:shadow-md hover:shadow-white/10">
          Log In
        </button>
      </form>
      <footer className="text-center mb-4">
        <p className="opacity-80">Don't have an account yet?</p>
        <a
          className="text-lg py-1 border-b-[1px] animate-pulse"
          href="/register"
        >
          Register a new <span className="font-semibold">P A M E</span> account
        </a>
      </footer>
    </main>
  );
}
