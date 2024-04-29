/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, h as renderComponent } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
import { $ as $$Layout } from './404_CaWSNykx.mjs';
import 'clsx';
/* empty css                          */

function BtnLink({ href, content }) {
  return /* @__PURE__ */ jsx("button", { className: "px-4 py-1 bg-gradient-to-tr from-lime-400/80 to-indigo-500/80 hover:from-lime-500 hover:to-indigo-500 rounded-full", children: /* @__PURE__ */ jsx("a", { href, children: content }) });
}

function NavLink({ href, content }) {
  return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { className: "p-2 hover:animate-pulse", href, children: content }) });
}

function Header({ headerLinks }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleClick = () => {
    setSidebarOpen((open) => !open);
  };
  return /* @__PURE__ */ jsxs("header", { className: "w-full sticky top-0 grid grid-cols-8 backdrop-blur-md items-center z-50", children: [
    /* @__PURE__ */ jsx("aside", { className: "col-span-4 sm:col-span-2 text-center p-4 flex items-center justify-start", children: /* @__PURE__ */ jsx("a", { href: "/PAME", className: "hover:animate-pulse", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", children: "P A M E" }) }) }),
    /* @__PURE__ */ jsx("aside", { className: "col-span-4 sm:col-span-6 p-4 flex items-center justify-end md:hidden", children: /* @__PURE__ */ jsx("button", { onClick: handleClick, children: /* @__PURE__ */ jsx("i", { className: "text-2xl ri-menu-3-line" }) }) }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        id: "sidebar",
        className: `${sidebarOpen ? "flex" : "hidden"} absolute top-0 right-0 h-screen flex-col justify-start w-[60%] md:relative md:h-auto md:w-auto col-span-6 md:grid grid-cols-6 md:items-center bg-slate-800 md:bg-transparent`,
        children: [
          /* @__PURE__ */ jsxs("header", { className: "p-4 flex items-center justify-between md:hidden", children: [
            /* @__PURE__ */ jsx("h2", { children: "Menu" }),
            /* @__PURE__ */ jsx("aside", { children: /* @__PURE__ */ jsx("button", { onClick: handleClick, children: /* @__PURE__ */ jsx("i", { className: "text-2xl ri-xrp-line" }) }) })
          ] }),
          /* @__PURE__ */ jsx("nav", { className: "col-span-4 text-center p-4", children: /* @__PURE__ */ jsx("ul", { className: "flex flex-col md:flex-row items-center md:justify-around py-1 gap-2", children: headerLinks && headerLinks.length > 0 ? headerLinks.map((link, i) => /* @__PURE__ */ jsx(NavLink, { href: link.href, content: link.content }, i)) : /* @__PURE__ */ jsx("li", { children: "Your Wardrobe Online" }) }) }),
          /* @__PURE__ */ jsx("aside", { className: "col-span-2 gap-2 text-center p-4 flex items-center justify-center md:justify-end", children: /* @__PURE__ */ jsx(BtnLink, { href: "/PAME/logIn", content: "Log In" }) })
        ]
      }
    )
  ] });
}

const img1 = new Proxy({"src":"/PAME/_astro/menLaptopIllustration.DRmj3Dhc.png","width":270,"height":229,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alon/Desktop/TFG/PAME/public/img/menLaptopIllustration.png";
							}
							
							return target[name];
						}
					});

const img2 = new Proxy({"src":"/PAME/_astro/friendsIllustration.Cxnj2A9d.png","width":368,"height":482,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alon/Desktop/TFG/PAME/public/img/friendsIllustration.png";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro("https://pameproj.github.io");
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  return renderTemplate`${maybeRenderHead()}<main class="py-10 flex flex-col gap-10" data-astro-cid-bbe6dxrz> <section class="flex flex-row-reverse justify-between items-center min-h-96" data-astro-cid-bbe6dxrz> <aside class="clippath reverse absolute md:before:-z-20 -z-20 md:relative md:z-0 w-full bg-gradient-to-tr from-slate-600/50 to-lime-300/30 p-20 md:w-1/2 flex items-center justify-center" data-astro-cid-bbe6dxrz> <img class="min-w-80 max-h-[300px]"${addAttribute(img1.src, "src")} alt="Image of a man using PAME in his laptop" data-astro-cid-bbe6dxrz> </aside> <article class="p-10 flex flex-col items-start gap-8" data-astro-cid-bbe6dxrz> <h2 class="text-4xl max-w-96" data-astro-cid-bbe6dxrz> <em data-astro-cid-bbe6dxrz>O</em>rganize and <em data-astro-cid-bbe6dxrz>M</em>anage your <em data-astro-cid-bbe6dxrz>W</em>ardrobe
</h2> <p class="max-w-[500px] text-pretty" data-astro-cid-bbe6dxrz> <b data-astro-cid-bbe6dxrz>Register</b> your clothes, <b data-astro-cid-bbe6dxrz>organize</b> them by <b data-astro-cid-bbe6dxrz>categories</b>,
        write down details of each one and <b data-astro-cid-bbe6dxrz>much more</b> </p> <a href="/PAME/myWardrobe" class="border-2 rounded-full px-2 py-1 w-full mx-auto text-center hover:bg-slate-600 hover:animate-pulse transition-colors" data-astro-cid-bbe6dxrz>My Wardrobe</a> </article> </section> <section class="flex flex-row justify-between items-center min-h-96" data-astro-cid-bbe6dxrz> <aside class="clippath absolute w-full md:before:-z-20 -z-20 opacity-80 md:relative md:z-0 md:opacity-100 bg-gradient-to-tr to-white/80 from-lime-600 p-20 md:w-1/2 flex items-center justify-center" data-astro-cid-bbe6dxrz> <img class="max-h-[300px]"${addAttribute(img2.src, "src")} alt="Image of friends who use PAME" data-astro-cid-bbe6dxrz> </aside> <article class="p-10 flex flex-col items-end gap-8" data-astro-cid-bbe6dxrz> <h2 class="text-4xl max-w-96 text-end" data-astro-cid-bbe6dxrz> <em data-astro-cid-bbe6dxrz>C</em>onnect and <em data-astro-cid-bbe6dxrz>S</em>hare with your <em data-astro-cid-bbe6dxrz>F</em>riends
</h2> <p class="max-w-[500px] text-pretty text-end" data-astro-cid-bbe6dxrz>
You can immerse yourself in <b data-astro-cid-bbe6dxrz>Pam Share</b>, discovering <b data-astro-cid-bbe6dxrz>Outfits</b>, making
<b data-astro-cid-bbe6dxrz>friends</b> and <b data-astro-cid-bbe6dxrz>connecting</b> with your acquaintances
</p> <a href="/PAME/pamShare" class="border-2 rounded-full px-2 py-1 w-full mx-auto text-center hover:bg-slate-600 hover:animate-pulse transition-colors" data-astro-cid-bbe6dxrz>Pam Share</a> </article> </section> </main> `;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/components/Hero.astro", void 0);

const $$Astro = createAstro("https://pameproj.github.io");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const headerLinks = [
    { href: "/PAME/pamShare", content: "Pam Share" },
    { href: "/PAME/myWardrobe", content: "My Wardrobe" },
    { href: "/PAME#about", content: "About Us" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - Your Wardrobe Online", "desc": "PAME is a Wardrobe Online where you will be able to Manage your Outfits and Share them with your Friends." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "headerLinks": headerLinks, "client:component-hydration": "load", "client:component-path": "@/components/Header.jsx", "client:component-export": "default" })} ${renderComponent($$result2, "Hero", $$Hero, {})} ${maybeRenderHead()}<section id="about" class="px-4 py-20 min-h-[100vh]"> <h1 class="text-2xl">About</h1> </section> ` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/index.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/index.astro";
const $$url = "/PAME";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { BtnLink as B, Header as H, index as i };
