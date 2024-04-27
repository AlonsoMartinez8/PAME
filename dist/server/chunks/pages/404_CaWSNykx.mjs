/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, h as renderComponent, m as maybeRenderHead } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro$1 = createAstro("https://pameproj.github.io");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, desc } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description"${addAttribute(desc, "content")}><title>${title}</title>${renderHead()}</head> <body class="min-h-screen bg-gradient-to-b from-indigo-950 to-lime-800"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/layouts/Layout.astro", void 0);

const img = new Proxy({"src":"/PAME/_astro/planeWardrobeIllustration.BomTmEGO.png","width":368,"height":467,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alon/Desktop/TFG/PAME/public/img/planeWardrobeIllustration.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://pameproj.github.io");
const $$404 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - 404 Not Found", "desc": "PAME is a Wardrobe Online where you will be able to Manage your Outfits and Share them with your Friends." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="p-4"> <a href="/PAME" class="hover:animate-pulse"> <h1 class="text-2xl font-semibold">P A M E</h1> </a> </header> <main class="p-4 flex flex-col items-center gap-4"> <h1 class="text-4xl text-center font-semibold">404: Page Not Found</h1> <a class="text-center border-b-[1px]" href="/PAME">Go back to Home</a> <img${addAttribute(img.src, "src")} alt="Wardrobe"> </main> ` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/404.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/404.astro";
const $$url = "/PAME/404";

const _404 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _404 as _ };
