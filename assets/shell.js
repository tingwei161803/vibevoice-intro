/* =========================================================================
   multipage · shell.js   (vanilla, no build)

   The SHARED CHROME for every page: app bar, cross-page nav, footer and the
   detail <dialog>. It also owns global state (language + theme) and exposes a
   tiny toolkit on window.LDW that each page's app.js reuses.

   Loaded on EVERY page BEFORE app.js. It:
     1. reads the language from <html lang> and the theme from localStorage,
     2. injects app bar + nav + footer + dialog around <main id="page">,
     3. wires the theme toggle and points the language link at this page's
        counterpart in the other language,
     4. highlights the current page (from <body data-page="...">).

   Language belongs to the URL, not to the visitor: the Chinese pages live at
   the root and the English ones under /en/, so switching language is a
   navigation rather than an in-place repaint. Theme still persists in
   localStorage (an origin-wide store) and survives moving between pages.
   ========================================================================= */
(function () {
  "use strict";

  var META = window.SITE_META || { title: {}, subtitle: {}, footer: {} };
  var PAGES = Array.isArray(window.SITE_PAGES) ? window.SITE_PAGES : [];

  /* repo the ★ button links to */
  var GH_REPO = "tingwei161803/vibevoice-intro";

  /* ---------- chrome i18n (page content strings live in the data) ---------- */
  var I18N = {
    en: { close: "Close", menu: "Pages", skip: "Skip to content", star: "Star this project on GitHub",
          toDark: "Switch to dark theme", toLight: "Switch to light theme" },
    zh: { close: "關閉", menu: "頁面", skip: "跳到內容", star: "在 GitHub 上為這個專案加星",
          toDark: "切換到深色主題", toLight: "切換到淺色主題" }
  };

  /* ---------- sandbox-safe localStorage ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* No saved choice -> follow the OS. Only an explicit click is saved, so a
     first visit never locks a visitor into whichever theme they happened to get.
     (An inline script in each <head> does the same before first paint.) */
  function initialTheme() {
    var saved = lsGet("theme");
    if (saved === "dark" || saved === "light") return saved;
    try {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) return "light";
    } catch (e) { /* ignore */ }
    return "dark";
  }

  /* ---------- global state ----------
     The URL decides the language, so <html lang> is what we read. localStorage
     must not seed it: a crawler has no localStorage and would always be handed
     the fallback, which is how one half of the site ended up with no address of
     its own. Writing the choice back is gone too; the address carries it now. */
  function langFromDocument() {
    var declared = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    return declared.indexOf("zh") === 0 ? "zh" : "en";
  }

  /* the same page in the other language — mirror the path, never guess */
  var TWIN_DIR = "/en";
  function altLangHref() {
    var path = location.pathname || "/";
    if (path === TWIN_DIR || path.indexOf(TWIN_DIR + "/") === 0) {
      return path.slice(TWIN_DIR.length) || "/";
    }
    return TWIN_DIR + path;
  }

  var state = {
    lang:  langFromDocument(),
    theme: initialTheme()
  };

  /* ---------- helpers shared with app.js ---------- */
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || obj.zh || "";
  }
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }
  function r(n) { return Math.round(n * 100) / 100; }

  /* ---------- tracks: the home page groups every page into four lanes ----------
     Lane n uses speaker colour n (--s1 … --s4) everywhere: nav, page labels, home. */
  function homePage() {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].slug === "home") return PAGES[i];
    return null;
  }
  function tracks() { var h = homePage(); return (h && h.tracks) || []; }
  function trackOf(slug) {
    var list = tracks();
    for (var i = 0; i < list.length; i++) {
      if ((list[i].pages || []).indexOf(slug) !== -1) return { index: i + 1, track: list[i] };
    }
    return null;
  }
  function pageBySlug(slug) {
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].slug === slug) return PAGES[i];
    return null;
  }

  function pageHref(p) { return p.slug === "home" ? "index.html" : p.slug + ".html"; }
  function currentSlug() { return document.body.getAttribute("data-page") || "home"; }
  function currentPage() {
    var slug = currentSlug();
    for (var i = 0; i < PAGES.length; i++) if (PAGES[i].slug === slug) return PAGES[i];
    return PAGES[0] || null;
  }

  /* =======================================================================
     CHROME INJECTION — app bar, nav, footer, dialog around <main id="page">
     ===================================================================== */
  function injectChrome() {
    var main = document.getElementById("page");
    if (!main) return;

    /* skip link */
    var skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#page";
    skip.id = "skipLink";
    document.body.insertBefore(skip, document.body.firstChild);

    /* app bar */
    var appbar = document.createElement("header");
    appbar.className = "appbar";
    appbar.innerHTML =
      '<div class="appbar__inner">' +
        '<a class="brand" href="index.html">' +
          '<svg class="brand__logo" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">' +
            '<rect x="1" y="6" width="3" height="8" rx="1.5" fill="var(--s1)"/>' +
            '<rect x="6" y="2" width="3" height="16" rx="1.5" fill="var(--s2)"/>' +
            '<rect x="11" y="5" width="3" height="10" rx="1.5" fill="var(--s3)"/>' +
            '<rect x="16" y="8" width="3" height="4" rx="1.5" fill="var(--s4)"/>' +
          '</svg>' +
          '<span class="brand__name" id="brandName"></span>' +
        '</a>' +
        '<div class="appbar__actions">' +
          '<a class="gh-star" id="ghStar" href="https://github.com/' + GH_REPO + '" ' +
             'target="_blank" rel="noopener" data-repo="' + GH_REPO + '">' +
            '<span class="material-symbols-rounded gh-star__icon" aria-hidden="true">star</span>' +
            '<span class="gh-star__count" id="ghStarCount" aria-hidden="true"></span>' +
          '</a>' +
          '<a class="icon-btn" id="langToggle" href="' + escapeHtml(altLangHref()) + '" ' +
             'hreflang="' + (state.lang === "en" ? "zh-Hant" : "en") + '" rel="alternate" ' +
             'title="Language" aria-label="' +
             (state.lang === "en" ? "切換到中文版 / View in Chinese" : "View in English / 切換到英文版") + '">' +
            '<span class="material-symbols-rounded">translate</span>' +
            '<span class="icon-btn__txt" id="langLabel"></span>' +
          '</a>' +
          '<button class="icon-btn" id="themeToggle" type="button" title="Theme" aria-label="Toggle theme / 切換主題">' +
            '<span class="material-symbols-rounded" id="themeIcon">dark_mode</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    document.body.insertBefore(appbar, main);

    /* cross-page nav */
    var nav = document.createElement("nav");
    nav.className = "pagenav";
    nav.id = "pageNav";
    nav.innerHTML = '<div class="pagenav__scroller" id="pageNavScroller"><div class="pagenav__inner" id="pageNavInner"></div></div>';
    document.body.insertBefore(nav, main);

    /* footer */
    var footer = document.createElement("footer");
    footer.className = "footer";
    footer.innerHTML = '<div class="footer__inner">' +
      '<p class="footer__text" id="footerText"></p>' +
      '<div class="footer__lang" id="footerLang"></div>' +
      '<div class="profile-links">' +
        '<a class="icon-btn" href="https://www.peteraim.com" target="_blank" rel="noopener" title="Home" aria-label="Back to peteraim.com / 返回首頁">' +
          '<span class="material-symbols-rounded">home</span>' +
        '</a>' +
        '<a class="icon-btn" href="https://www.linkedin.com/in/ai-med/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn (opens in new tab)">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>' +
        '</a>' +
      '</div>' +
      '</div>';
    main.parentNode.insertBefore(footer, main.nextSibling);

    /* Each page ships a plain "other language" link after the scripts so it
       exists without JS; with JS it moves into the footer instead of floating
       below it. */
    var alt = document.querySelector(".lang-alt-link");
    var slot = document.getElementById("footerLang");
    if (alt && slot) { alt.removeAttribute("style"); slot.appendChild(alt); }

    /* shared detail dialog (used by card layouts) */
    var dialog = document.createElement("dialog");
    dialog.className = "dialog";
    dialog.id = "dialog";
    dialog.setAttribute("aria-labelledby", "dialogTitle");
    dialog.innerHTML =
      '<div class="dialog__bar">' +
        '<span class="dialog__spacer"></span>' +
        '<button class="icon-btn" id="dialogClose" type="button" aria-label="Close / 關閉">' +
          '<span class="material-symbols-rounded">close</span>' +
        '</button>' +
      '</div>' +
      '<div class="dialog__body" id="dialogBody"></div>';
    document.body.appendChild(dialog);

    /* dialog wiring (shared close behaviour; deep links handled by app.js) */
    document.getElementById("dialogClose").addEventListener("click", function () {
      if (dialog.open) dialog.close();
    });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  }

  function paintNav() {
    var inner = document.getElementById("pageNavInner");
    if (!inner) return;
    inner.innerHTML = "";
    var here = currentSlug();
    function link(p, label) {
      var a = document.createElement("a");
      a.className = "navlink" + (p.slug === here ? " navlink--active" : "");
      a.href = pageHref(p);
      if (p.slug === here) a.setAttribute("aria-current", "page");
      a.textContent = label;
      return a;
    }
    var home = homePage();
    if (home) inner.appendChild(link(home, t(home.navTitle) || t(home.title)));
    var placed = { home: true };
    tracks().forEach(function (tr, i) {
      var g = document.createElement("span");
      g.className = "navgroup";
      g.setAttribute("data-lane", String(i + 1));
      var swatch = document.createElement("span");
      swatch.className = "navgroup__swatch";
      swatch.setAttribute("aria-hidden", "true");
      swatch.title = t(tr.title);
      g.appendChild(swatch);
      (tr.pages || []).forEach(function (slug) {
        var p = pageBySlug(slug);
        if (!p) return;
        placed[slug] = true;
        g.appendChild(link(p, t(p.title)));
      });
      inner.appendChild(g);
    });
    /* any page not assigned to a track still gets a link */
    PAGES.forEach(function (p) { if (!placed[p.slug]) inner.appendChild(link(p, t(p.title))); });

    var scroller = document.getElementById("pageNavScroller");
    var active = inner.querySelector(".navlink--active");
    if (scroller && active) {
      var left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
      scroller.scrollLeft = Math.max(0, left);
    }
    updateNavEdges();
  }

  /* fade the edge that has more links behind it, so a cut-off row reads as scrollable */
  function updateNavEdges() {
    var sc = document.getElementById("pageNavScroller");
    if (!sc) return;
    var max = sc.scrollWidth - sc.clientWidth;
    sc.classList.toggle("is-scroll-start", max > 2 && sc.scrollLeft > 2);
    sc.classList.toggle("is-scroll-end", max > 2 && sc.scrollLeft < max - 2);
  }

  /* ---------- chrome text in the active language ---------- */
  function refreshChrome() {
    var page = currentPage();
    var siteTitle = t(META.title);
    var pageTitle = page ? t(page.title) : "";
    document.title = pageTitle ? pageTitle + " · " + siteTitle : siteTitle;

    var brand = document.getElementById("brandName");
    if (brand) brand.textContent = siteTitle;
    var foot = document.getElementById("footerText");
    if (foot) foot.textContent = "© " + new Date().getFullYear() + " " + siteTitle;
    var skip = document.getElementById("skipLink");
    if (skip) skip.textContent = ui("skip");
    var nav = document.getElementById("pageNav");
    if (nav) nav.setAttribute("aria-label", ui("menu"));
    var dc = document.getElementById("dialogClose");
    if (dc) dc.setAttribute("aria-label", ui("close"));
    var gs = document.getElementById("ghStar");
    if (gs) { gs.setAttribute("aria-label", ui("star")); gs.setAttribute("title", ui("star")); }
    paintNav();
  }

  /* ---------- GitHub star count (cached per session, hidden unless > 0) ---------- */
  function formatStars(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    return String(n);
  }
  function loadStars() {
    var el = document.getElementById("ghStarCount");
    var badge = document.getElementById("ghStar");
    if (!el) return;
    /* Cached per session (success AND failure), so at most one request per
       visit. The count comes from shields.io's JSON badge rather than
       api.github.com: the GitHub API rate-limits anonymous visitors (403, a
       console error on every page), shields answers 200 from its own cache.
       Anything that is not a positive number leaves a plain star link. */
    var KEY = "ghstars:" + GH_REPO;
    function show(n) {
      if (typeof n === "number" && n > 0) {
        el.textContent = formatStars(n);
        if (badge) badge.classList.add("gh-star--count");
      }
    }
    var cached = null;
    try { cached = JSON.parse(ssGet(KEY) || "null"); } catch (e) { cached = null; }
    if (cached && typeof cached === "object") { show(cached.n); return; }
    if (!window.fetch) return;
    fetch("https://img.shields.io/github/stars/" + GH_REPO + ".json")
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var raw = j ? String(j.value != null ? j.value : j.message || "") : "";
        var n = /^\d+$/.test(raw) ? parseInt(raw, 10) : 0;
        ssSet(KEY, JSON.stringify({ n: n }));
        show(n);
      })
      .catch(function () { ssSet(KEY, JSON.stringify({ n: 0 })); });
  }

  /* =======================================================================
     THEME + LANGUAGE
     ===================================================================== */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    var icon = document.getElementById("themeIcon");
    if (icon) icon.textContent = state.theme === "dark" ? "light_mode" : "dark_mode";
    var btn = document.getElementById("themeToggle");
    if (btn) {
      var lbl = ui(state.theme === "dark" ? "toLight" : "toDark");
      btn.setAttribute("aria-label", lbl);
      btn.setAttribute("title", lbl);
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", state.theme === "dark" ? "#07070c" : "#f6f5fb");
  }
  /* The toggle is a link now, so it is labelled with the language it leads TO,
     not the one already on screen. */
  function applyLangChrome() {
    var label = document.getElementById("langLabel");
    if (label) label.textContent = state.lang === "en" ? "中" : "EN";
  }

  function wire() {
    document.getElementById("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      lsSet("theme", state.theme);
      applyTheme();
    });
    var sc = document.getElementById("pageNavScroller");
    if (sc) {
      sc.addEventListener("scroll", updateNavEdges, { passive: true });
      window.addEventListener("resize", updateNavEdges);
    }
  }

  /* =======================================================================
     PUBLIC TOOLKIT (app.js uses this)
     ===================================================================== */
  window.LDW = {
    ready: false,          // flipped true once the chrome (incl. #dialog) is injected
    state: state,
    t: t, ui: ui, escapeHtml: escapeHtml, r: r,
    lsGet: lsGet, lsSet: lsSet,
    pages: PAGES, meta: META,
    currentPage: currentPage, currentSlug: currentSlug, pageHref: pageHref,
    tracks: tracks, trackOf: trackOf, pageBySlug: pageBySlug,
    refreshChrome: refreshChrome,
    dialog: function () { return document.getElementById("dialog"); }
  };

  /* =======================================================================
     INIT
     ===================================================================== */
  function init() {
    injectChrome();
    applyTheme();
    applyLangChrome();
    refreshChrome();
    wire();
    loadStars();
    window.LDW.ready = true;
    document.dispatchEvent(new CustomEvent("ldw:shell-ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
