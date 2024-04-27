/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead, e as addAttribute } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './404_CaWSNykx.mjs';

const img = new Proxy({"src":"/PAME/_astro/3dWardrobeIllustration.DYpTpBtb.png","width":367,"height":215,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Alon/Desktop/TFG/PAME/public/img/3dWardrobeIllustration.png";
							}
							
							return target[name];
						}
					});

const $$Astro = createAstro("https://pameproj.github.io");
const $$LogIn = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LogIn;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - Log In", "desc": "Log Into your PAME account. PAME is a Wardrobe Online where you will be able to Manage your Outfits and Share them with your Friends." }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<header class="p-4"> <a href="/PAME" class="hover:animate-pulse"> <h1 class="text-2xl font-semibold">P A M E</h1> </a> </header> <main class="h-full w-full flex flex-col items-center justify-between pb-4"> <form class="w-full min-w-[300px] max-w-[500px] mx-auto flex flex-col gap-4 p-4" action=""> <h1 class="text-center text-xl">Log Into Your Account</h1> <label for="username"><p>User Name</p><input class="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl" type="text" name="username" placeholder="User name"></label> <label for="password"><p>Password</p><input class="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl" type="password" name="password" placeholder="Password"></label> <button class="bg-white/20 mt-2 py-1 rounded-xl hover:shadow-md hover:shadow-white/10">Log In</button> </form> <img${addAttribute(img.src, "src")} alt="Image of a wardrobe"> <footer class="text-center"> <p class="opacity-80">Don't have an account yet?</p> <a class="text-lg py-1 border-b-[1px] animate-pulse" href="/PAME/register">Register a new <span class="font-semibold">P A M E</span> account</a> </footer> </main> ` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/logIn.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/logIn.astro";
const $$url = "/PAME/logIn";

export { $$LogIn as default, $$file as file, $$url as url };
