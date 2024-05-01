import BtnLink from "@/components/BtnLog.jsx";
import NavLink from "@c/NavLink.jsx";
import { useState } from "react";

export default function Header({ headerLinks, user, show }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = () => {
    setSidebarOpen((open) => !open);
  };

  return (
    <header className="w-full sticky top-0 grid grid-cols-8 backdrop-blur-md items-center z-50">
      <aside className="col-span-4 sm:col-span-2 text-center p-4 flex items-center justify-start">
        <a href="/" className="hover:animate-pulse">
          <h1 className="text-2xl font-semibold">P A M E</h1>
        </a>
      </aside>

      <aside className="col-span-4 sm:col-span-6 p-4 flex items-center justify-end md:hidden">
        <button onClick={handleClick}>
          <i className="text-2xl ri-menu-3-line"></i>
        </button>
      </aside>

      <section
        id="sidebar"
        className={`${
          sidebarOpen ? "flex" : "hidden"
        } absolute top-0 right-0 h-screen flex-col justify-start w-[60%] md:relative md:h-auto md:w-auto col-span-6 md:grid grid-cols-6 md:items-center bg-slate-800 md:bg-transparent`}
      >
        <header className="p-4 flex items-center justify-between md:hidden">
          <h2>Menu</h2>
          <aside>
            <button onClick={handleClick}>
              <i className="text-2xl ri-xrp-line"></i>
            </button>
          </aside>
        </header>

        <nav className="col-span-4 text-center p-4">
          <ul className="flex flex-col md:flex-row items-center md:justify-around py-1 gap-2">
            {headerLinks && headerLinks.length > 0 ? (
              headerLinks.map((link, i) => (
                <NavLink key={i} href={link.href} content={link.content} />
              ))
            ) : (
              <li>Your Wardrobe Online</li>
            )}
          </ul>
        </nav>
        {show && (
          <aside className="col-span-2 gap-2 text-center p-4 flex items-center justify-center md:justify-end">
            <BtnLink href="/logIn" content="Log In" log={!user} />
          </aside>
        )}
      </section>
    </header>
  );
}
