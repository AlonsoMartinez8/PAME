import { useEffect, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import { motion } from "framer-motion";

export default function ProfileSearcher({ profiles }) {
  const [searched, setSearched] = useState("");
  const [founded, setFounded] = useState([]);
  const sliderRef = useRef(null)

  useEffect(() => {
    if (searched != "") {
      setFounded(profiles.filter((p) => p.username.includes(searched)));
    } else {
      setFounded([]);
    }
  }, [searched, profiles]);

  return (
    <>
      <form className="w-full md:max-w-[500px] mx-auto flex items-center justify-between overflow-hidden outline-none border-2 rounded-full px-4">
        <i className="text-2xl ri-search-line"></i>
        <input
          className="w-full bg-transparent outline-none px-4 py-2"
          type="text"
          onChange={(e) => setSearched(e.target.value)}
          placeholder="Search profiles"
        />
      </form>
      <div
          className="w-fit max-w-full"
          ref={sliderRef}
        >
      <motion.ul
        drag="x"
        dragConstraints={sliderRef}
        className="w-fit flex items-center justify-start mt-4 gap-8"
      >
        {profiles &&
          founded.length > 0 &&
          founded.map((profile) => (
            <li key={profile.id}>
              <ProfileCard profile={profile} />
            </li>
          ))}
      </motion.ul></div>
    </>
  );
}
