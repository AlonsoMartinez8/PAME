import '@astrojs/internal-helpers/path';
import 'cookie';
import { bold, red, yellow, dim, blue } from 'kleur/colors';
import 'html-escaper';
import 'clsx';
import './chunks/astro_J1CebqPL.mjs';
import { compile } from 'path-to-regexp';

const dateTimeFormat = new Intl.DateTimeFormat([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false
});
const levels = {
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  silent: 90
};
function log(opts, level, label, message, newLine = true) {
  const logLevel = opts.level;
  const dest = opts.dest;
  const event = {
    label,
    level,
    message,
    newLine
  };
  if (!isLogLevelEnabled(logLevel, level)) {
    return;
  }
  dest.write(event);
}
function isLogLevelEnabled(configuredLogLevel, level) {
  return levels[configuredLogLevel] <= levels[level];
}
function info(opts, label, message, newLine = true) {
  return log(opts, "info", label, message, newLine);
}
function warn(opts, label, message, newLine = true) {
  return log(opts, "warn", label, message, newLine);
}
function error(opts, label, message, newLine = true) {
  return log(opts, "error", label, message, newLine);
}
function debug(...args) {
  if ("_astroGlobalDebug" in globalThis) {
    globalThis._astroGlobalDebug(...args);
  }
}
function getEventPrefix({ level, label }) {
  const timestamp = `${dateTimeFormat.format(/* @__PURE__ */ new Date())}`;
  const prefix = [];
  if (level === "error" || level === "warn") {
    prefix.push(bold(timestamp));
    prefix.push(`[${level.toUpperCase()}]`);
  } else {
    prefix.push(timestamp);
  }
  if (label) {
    prefix.push(`[${label}]`);
  }
  if (level === "error") {
    return red(prefix.join(" "));
  }
  if (level === "warn") {
    return yellow(prefix.join(" "));
  }
  if (prefix.length === 1) {
    return dim(prefix[0]);
  }
  return dim(prefix[0]) + " " + blue(prefix.splice(1).join(" "));
}
if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}
class Logger {
  options;
  constructor(options) {
    this.options = options;
  }
  info(label, message, newLine = true) {
    info(this.options, label, message, newLine);
  }
  warn(label, message, newLine = true) {
    warn(this.options, label, message, newLine);
  }
  error(label, message, newLine = true) {
    error(this.options, label, message, newLine);
  }
  debug(label, ...messages) {
    debug(label, ...messages);
  }
  level() {
    return this.options.level;
  }
  forkIntegrationLogger(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
}
class AstroIntegrationLogger {
  options;
  label;
  constructor(logging, label) {
    this.options = logging;
    this.label = label;
  }
  /**
   * Creates a new logger instance with a new label, but the same log options.
   */
  fork(label) {
    return new AstroIntegrationLogger(this.options, label);
  }
  info(message) {
    info(this.options, this.label, message);
  }
  warn(message) {
    warn(this.options, this.label, message);
  }
  error(message) {
    error(this.options, this.label, message);
  }
  debug(message) {
    debug(this.label, message);
  }
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const path = toPath(params);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/node","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/node.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/logIn\\/?$","segments":[[{"content":"logIn","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/logIn.astro","pathname":"/logIn","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"}],"routeData":{"route":"/mywardrobe","isIndex":false,"type":"page","pattern":"^\\/myWardrobe\\/?$","segments":[[{"content":"myWardrobe","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/myWardrobe.astro","pathname":"/myWardrobe","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"}],"routeData":{"route":"/pamshare","isIndex":false,"type":"page","pattern":"^\\/pamShare\\/?$","segments":[[{"content":"pamShare","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pamShare.astro","pathname":"/pamShare","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/profile\\/?$","segments":[[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/profile.astro","pathname":"/profile","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"}],"routeData":{"route":"/register","isIndex":false,"type":"page","pattern":"^\\/register\\/?$","segments":[[{"content":"register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/register.astro","pathname":"/register","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/PAME/_astro/index.BMSXGXOW.css"},{"type":"inline","content":"em[data-astro-cid-bbe6dxrz]{margin-right:.1em}.clippath[data-astro-cid-bbe6dxrz]{clip-path:polygon(0 0,100% 10%,100% 90%,0 100%);&.reverse{clip-path:polygon(0 10%,100% 0,100% 100%,0 90%)}&:before{content:\"\";position:absolute;top:0;right:0;width:100%;height:100%;background:linear-gradient(to bottom,#0c220f80,#41534480)}}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"site":"https://pameproj.github.io","base":"/PAME","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/Alon/Desktop/TFG/PAME/src/pages/404.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alon/Desktop/TFG/PAME/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alon/Desktop/TFG/PAME/src/pages/logIn.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alon/Desktop/TFG/PAME/src/pages/myWardrobe.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alon/Desktop/TFG/PAME/src/pages/pamShare.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alon/Desktop/TFG/PAME/src/pages/profile.astro",{"propagation":"none","containsHead":true}],["C:/Users/Alon/Desktop/TFG/PAME/src/pages/register.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000noop-middleware":"_noop-middleware.mjs","/src/pages/logIn.astro":"chunks/pages/logIn_BG43lteL.mjs","/src/pages/myWardrobe.astro":"chunks/pages/myWardrobe_jNflivvj.mjs","/node_modules/astro/dist/assets/endpoint/node.js":"chunks/pages/node_XrCzB8BT.mjs","/src/pages/pamShare.astro":"chunks/pages/pamShare_CnOaccv2.mjs","/src/pages/profile.astro":"chunks/pages/profile_adWFtzo0.mjs","/src/pages/register.astro":"chunks/pages/register_CeI9AOYl.mjs","\u0000@astrojs-manifest":"manifest_k1UGML1l.mjs","C:/Users/Alon/Desktop/TFG/PAME/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/node@_@js":"chunks/node_DDw33-Ec.mjs","\u0000@astro-page:src/pages/404@_@astro":"chunks/404_CUogQiOj.mjs","\u0000@astro-page:src/pages/logIn@_@astro":"chunks/logIn_C5EPYgXo.mjs","\u0000@astro-page:src/pages/myWardrobe@_@astro":"chunks/myWardrobe_DPeuV4K4.mjs","\u0000@astro-page:src/pages/pamShare@_@astro":"chunks/pamShare_zzwPghbL.mjs","\u0000@astro-page:src/pages/profile@_@astro":"chunks/profile_C8j8hCMc.mjs","\u0000@astro-page:src/pages/register@_@astro":"chunks/register_66-6Q7f3.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_UeFHOKaw.mjs","@/components/Header.jsx":"_astro/Header.JQ7WATUt.js","@astrojs/react/client.js":"_astro/client.8-OOQPfo.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/PAME/_astro/3dWardrobeIllustration.DYpTpBtb.png","/PAME/_astro/planeWardrobeIllustration.BomTmEGO.png","/PAME/_astro/menLaptopIllustration.DRmj3Dhc.png","/PAME/_astro/friendsIllustration.Cxnj2A9d.png","/PAME/_astro/remixicon.DUK49BtM.eot","/PAME/_astro/remixicon.BVOYbT3K.woff2","/PAME/_astro/remixicon.DfzPQSMi.woff","/PAME/_astro/remixicon.D9ZyeRwQ.ttf","/PAME/_astro/remixicon.ncU_JTfY.svg","/PAME/_astro/index.BMSXGXOW.css","/PAME/favicon.svg","/PAME/img/3dWardrobeIllustration.png","/PAME/img/friendsIllustration.png","/PAME/img/menLaptopIllustration.png","/PAME/img/outfitIllustration.png","/PAME/img/planeWardrobeIllustration.png","/PAME/img/womanMobileIllustration.png","/PAME/_astro/client.8-OOQPfo.js","/PAME/_astro/Header.JQ7WATUt.js","/PAME/_astro/index.NEDEFKed.js"],"buildFormat":"directory","checkOrigin":false});

export { AstroIntegrationLogger as A, Logger as L, getEventPrefix as g, levels as l, manifest };
