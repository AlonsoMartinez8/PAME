/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { H as Header } from './index_DKj-S3sV.mjs';
import { $ as $$Layout } from './404_CaWSNykx.mjs';

const $$Astro = createAstro("https://pameproj.github.io");
const $$PamShare = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PamShare;
  const headerLinks = [
    { href: "/PAME/myWardrobe", content: "My Wardrobe" },
    { href: "/PAME#about", content: "About Us" }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - Pam Share", "desc": "Let's share your clothes in PAME!! PAME is a Wardrobe Online where you will be able to Manage your Outfits and Share them with your Friends." }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "headerLinks": headerLinks, "client:component-hydration": "load", "client:component-path": "@/components/Header.jsx", "client:component-export": "default" })}
Pam Share
` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/pamShare.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/pamShare.astro";
const $$url = "/PAME/pamShare";

export { $$PamShare as default, $$file as file, $$url as url };
