/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { H as Header } from './index_DKj-S3sV.mjs';
import { $ as $$Layout } from './404_CaWSNykx.mjs';

const $$Astro = createAstro("https://pameproj.github.io");
const $$MyWardrobe = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyWardrobe;
  const headerLinks = [
    { href: "/PAME/pamShare", content: "Pam Share" },
    { href: "/PAME/profile", content: "My Profile" },
    { href: "/PAME#about", content: "About Us" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - My Wardrobe", "desc": "Let's make outfits!! PAME is a Wardrobe Online where you will be able to Manage your Outfits and Share them with your Friends." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "headerLinks": headerLinks, "client:component-hydration": "load", "client:component-path": "@/components/Header.jsx", "client:component-export": "default" })}
My Wardrobe
` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/myWardrobe.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/myWardrobe.astro";
const $$url = "/PAME/myWardrobe";

export { $$MyWardrobe as default, $$file as file, $$url as url };
