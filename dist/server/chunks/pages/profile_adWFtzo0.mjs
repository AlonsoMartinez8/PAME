/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { H as Header } from './index_DKj-S3sV.mjs';
import { $ as $$Layout } from './404_CaWSNykx.mjs';

const $$Astro = createAstro("https://pameproj.github.io");
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
  const headerLinks = [
    { href: "/PAME/pamShare", content: "Pam Share" },
    { href: "/PAME/myWardrobe", content: "My Wardrobe" },
    { href: "/PAME#about", content: "About Us" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - My Profile", "desc": "Design you PAME profile and Share it with yoour Friends!!" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "headerLinks": headerLinks, "client:component-hydration": "load", "client:component-path": "@/components/Header.jsx", "client:component-export": "default" })}
My Profile
` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/profile.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/profile.astro";
const $$url = "/PAME/profile";

export { $$Profile as default, $$file as file, $$url as url };
