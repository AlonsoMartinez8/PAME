import { useState } from "react";

export default function ProfileSearcher() {
  const [foundedProfiles, setFoundedProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/getProfilesByName?name=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers here if required
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `${response.status} ${response.statusText}: ${errorText}`
        );
      }

      const data = await response.json();
      setFoundedProfiles(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="w-full md:max-w-[500px] mx-auto flex items-center justify-between overflow-hidden outline-none border-2 rounded-full"
      >
        <input
          className="w-full bg-transparent outline-none px-4 py-2"
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search profiles"
        />
        <button
          type="submit"
          className="flex flex-nowrap items-center justify-center px-4 py-1 text-indigo-800 bg-white"
        >
          <i className="text-2xl ri-search-line"></i>Search
        </button>
      </form>
      {loading && <div className="mt-4">Loading...</div>}
      {error && <div className="mt-4">Error: {error}</div>}
      {foundedProfiles && foundedProfiles.length > 0 && (
        <ul className="min-h-16 w-full flex items-center justify-start mt-4">
          {foundedProfiles.map((profile) => (
            <li key={profile.id}>{profile.username}</li>
          ))}
        </ul>
      )}
    </>
  );
}
