/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent, m as maybeRenderHead } from '../astro_J1CebqPL.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './404_CaWSNykx.mjs';
import { B as BtnLink } from './index_DKj-S3sV.mjs';

const $$Astro = createAstro("https://pameproj.github.io");
const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Register;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "PAME - Register", "desc": "Register a new PAME account and enjoy!. PAME is a Wardrobe Online where you will be able to Manage your Outfits and Share them with your Friends." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="p-4"> <a href="/PAME" class="hover:animate-pulse"> <h1 class="text-2xl font-semibold">P A M E</h1> </a> </header> <main class="h-full w-full flex flex-col items-center justify-between pb-4"> <form class="w-full min-w-[300px] max-w-[500px] mx-auto flex flex-col gap-4 p-4" action=""> <h1 class="text-center text-xl">Register A New Account</h1> <label for="username"><p>User Name</p><input class="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl" type="text" name="username" placeholder="User name"></label> <label for="email"><p>E-Mail</p><input class="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl" type="email" name="email" placeholder="electronicMail@pame.com"></label> <label for="password"><p>Password</p><input class="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl" type="password" name="password" placeholder="Password"></label> <label for="repeatpassword"><p>Repeat Password</p><input class="w-full bg-transparent border-2 mt-2 py-1 px-2 rounded-xl" type="password" name="repeatpassword" placeholder="Repeat Password"></label> <button class="bg-white/20 mt-2 py-1 rounded-xl hover:shadow-md hover:shadow-white/10">Register</button> </form> <footer class="text-center"> <p class="opacity-80 mb-2">Already have an account?</p> ${renderComponent($$result2, "BtnLink", BtnLink, { "href": "/PAME/logIn", "content": "Log Into You Account" })}
CHECK
</footer> </main> ` })}`;
}, "C:/Users/Alon/Desktop/TFG/PAME/src/pages/register.astro", void 0);

const $$file = "C:/Users/Alon/Desktop/TFG/PAME/src/pages/register.astro";
const $$url = "/PAME/register";

export { $$Register as default, $$file as file, $$url as url };
