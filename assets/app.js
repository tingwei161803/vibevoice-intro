/* =========================================================================
   multipage · app.js   (vanilla, no build, no chart lib)

   The PAGE-LEVEL LAYOUT ENGINE. shell.js has already injected the shared
   chrome and published window.LDW. This script:

     1. reads the current page from <body data-page="..."> (via LDW),
     2. picks a renderer from RENDERERS by that page's `layout`,
     3. paints it into <main id="page"> and wires its interactions.

   The language comes from the URL, so it cannot change while a page is open —
   there is nothing to repaint on a language switch, only a link to follow.

   RENDERERS is the LAYOUT REGISTRY — one entry per supported page layout:
     hub | gallery | article | dashboard | timeline | table |
     bento | kanban | faq | comparison | leaderboard | scrolly | map
   To add a layout, add one renderer (returns the inner HTML for #page) and,
   if it needs interaction, one matching WIRE entry. Nothing else changes.
   ========================================================================= */
(function () {
  "use strict";

  function boot() {
    // Wait until shell.js has injected the chrome (app bar, nav, footer, #dialog)
    // and published LDW. End-of-body scripts run while readyState === "loading",
    // so the shell defers its injection to DOMContentLoaded — we must wait for it.
    if (!window.LDW || !window.LDW.ready) {
      document.addEventListener("ldw:shell-ready", boot, { once: true });
      return;
    }
    var L = window.LDW;

    var t = L.t, esc = L.escapeHtml, r = L.r;
    var pageEl = document.getElementById("page");
    var teardowns = [];   // observers / listeners to disconnect before each repaint

    /* A tag is either a bilingual { en, zh } pair or a plain string when it is
       the same in both languages (a model size, a unit, a publication name).
       t() passes plain strings straight through, so both shapes work. */
    function tagStrip(tags) {
      var out = (tags || []).map(function (g) {
        return '<span class="tag">' + esc(t(g)) + "</span>";
      }).join("");
      return out ? '<div class="card__tags">' + out + "</div>" : "";
    }

    /* ---------- seeded randomness: the same page always draws the same wave,
       so the prerendered HTML and the live render match byte for byte ---------- */
    function seeded(str) {
      var h = 2166136261;
      for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
      return function () {
        h = (h + 0x6D2B79F5) | 0;
        var x = Math.imul(h ^ (h >>> 15), 1 | h);
        x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
      };
    }

    /* bars of a waveform between x0 and x1 (viewBox units), mirrored around mid */
    function wavePath(rnd, x0, x1, step, mid, amp) {
      var d = "", phase = rnd() * 6;
      for (var x = x0; x <= x1; x += step) {
        var env = 0.55 + 0.45 * Math.sin(x * 0.11 + phase) * Math.sin(x * 0.023 + phase * 2);
        var a = Math.max(1.2, amp * Math.abs(env) * (0.3 + 0.7 * rnd()));
        d += "M" + r(x) + " " + r(mid - a) + "V" + r(mid + a);
      }
      return d;
    }

    /* thin single-lane waveform under each inner page title — the site's divider */
    function waveStrip(seed) {
      var rnd = seeded(seed);
      return '<div class="wavestrip" aria-hidden="true">' +
        '<svg viewBox="0 0 1200 40" preserveAspectRatio="none" focusable="false">' +
        '<path d="' + wavePath(rnd, 3, 1197, 6, 20, 18) + '"/></svg></div>';
    }

    function laneTag(slug) {
      var hit = L.trackOf(slug);
      if (!hit) return "";
      return '<a class="lane-tag" href="index.html#track-' + esc(hit.track.key) + '">' +
        '<i aria-hidden="true"></i><span class="lane-tag__n">T' + hit.index + "</span>" +
        esc(t(hit.track.title)) + "</a>";
    }

    /* ---------- shared bits ---------- */
    function head(p) {
      var sub = t(p.subtitle)
        ? '<p class="page-head__sub">' + esc(t(p.subtitle)) + "</p>" : "";
      return '<header class="page-head">' + laneTag(p.slug) + "<h1>" + esc(t(p.title)) + "</h1>" + sub +
        waveStrip(p.slug) + "</header>";
    }

    /* how much is behind each page, said in its own unit ("5 cards", "8 specs") */
    function pageMeta(q) {
      var zh = L.state.lang !== "en", n, u;
      switch (q.layout) {
        case "gallery":    n = (q.items || []).length;    u = zh ? "張卡片" : "cards"; break;
        case "comparison": n = (q.plans || []).length;    u = zh ? "款並列" : "side by side"; break;
        case "article":    n = (q.sections || []).length; u = zh ? "節" : "sections"; break;
        case "dashboard":  n = q.table ? (q.table.rows || []).length : 0; u = zh ? "項規格" : "specs"; break;
        case "timeline":   n = (q.events || []).length;   u = zh ? "個事件" : "events"; break;
        case "faq":        n = (q.qa || []).length;       u = zh ? "個問題" : "questions"; break;
        case "bento":      n = (q.tiles || []).length;    u = zh ? "個場景" : "scenarios"; break;
        case "table":      n = (q.rows || []).length;     u = zh ? "個連結" : "links"; break;
        default: return "";
      }
      return n ? n + " " + u : "";
    }

    /* ---- home: the multitrack hero ---- */
    var MT_MIN = 90;          // ruler length in minutes
    var MT_U = 10;            // viewBox units per minute
    function multitrack(p) {
      var hero = p.hero || {};
      var speakers = hero.speakers || [];
      var nLanes = speakers.length || 4;
      var rnd = seeded("vibevoice-session");

      /* turns: speakers take turns, never overlapping (VibeVoice does not do
         overlapping speech), each turn 1–6 min with a short pause between */
      var turns = [], tm = 0.6, prev = -1, guard = 0;
      var air = speakers.map(function () { return 0; });
      while (tm < MT_MIN - 1.2 && guard++ < 200) {
        /* whoever has spoken least is most likely to speak next */
        var w = air.map(function (a, k) { return k === prev ? 0 : 1 / Math.pow(1 + a, 1.5); });
        var sum = w.reduce(function (x, y) { return x + y; }, 0), pick = rnd() * sum, s = 0;
        while (s < nLanes - 1 && pick > w[s]) { pick -= w[s]; s++; }
        var dur = 1.5 + rnd() * 4.5;
        var end = Math.min(MT_MIN - 0.5, tm + dur);
        turns.push({ s: s, a: tm, b: end });
        air[s] += end - tm;
        prev = s;
        tm = end + 0.25 + rnd() * 0.5;
      }

      var lanes = speakers.map(function (sp, i) {
        var clips = "", wave = "";
        turns.forEach(function (tn) {
          if (tn.s !== i) return;
          var x0 = tn.a * MT_U, x1 = tn.b * MT_U;
          clips += '<rect x="' + r(x0) + '" y="4" width="' + r(x1 - x0) + '" height="92"/>';
          wave += wavePath(rnd, x0 + 2, x1 - 2, 3, 50, 40);
        });
        return '<div class="mt__lane" data-lane="' + (i + 1) + '">' +
          '<div class="mt__head"><i aria-hidden="true"></i><span class="mt__name">' + esc(t(sp)) + "</span>" +
            '<span class="mt__short" aria-hidden="true">S' + (i + 1) + "</span></div>" +
          '<div class="mt__track"><svg viewBox="0 0 ' + (MT_MIN * MT_U) + ' 100" preserveAspectRatio="none" focusable="false">' +
            '<g class="mt__clips">' + clips + '</g><path class="mt__wave" d="' + wave + '"/></svg></div></div>';
      }).join("");

      var marks = "";
      for (var m = 0; m <= MT_MIN; m += 15) {
        marks += '<span class="mt__mark' + (m % 30 ? " mt__mark--minor" : "") + '" style="left:' + r(m / MT_MIN * 100) + '%">' +
          m + ":00</span>";
      }

      var readouts = (p.stats || []).map(function (st) {
        return '<div class="mt__readout"><dt>' + esc(t(st.label)) + "</dt>" +
          '<dd><b>' + esc(String(st.value)) + "</b> " + esc(t(st.unit)) + "</dd></div>";
      }).join("");

      var zoom = (hero.zoomRows || []).map(function (z) {
        return '<div class="mt__zrow"><span class="mt__zlabel"><b>' + esc(String(z.hz)) + " Hz</b> " + esc(t(z.label)) + "</span>" +
          '<span class="mt__ticks" style="--hz:' + esc(String(z.hz)) + '"></span></div>';
      }).join("");

      return '<figure class="mt" aria-labelledby="mtCap">' +
        '<div class="mt__transport">' +
          '<div class="mt__clock" aria-hidden="true"><span class="mt__time" id="mtTime">90:00</span>' +
            '<span class="mt__total">/ 90:00</span></div>' +
          '<dl class="mt__readouts">' + readouts + "</dl>" +
        "</div>" +
        '<div class="mt__grid">' +
          '<div class="mt__ruler" aria-hidden="true">' + marks + "</div>" +
          lanes +
          '<div class="mt__playhead" aria-hidden="true"></div>' +
        "</div>" +
        '<div class="mt__foot">' +
          '<figcaption class="mt__cap" id="mtCap">' + esc(t(hero.figure)) + "</figcaption>" +
          '<div class="mt__zoom"><p class="mt__ztitle">' + esc(t(hero.zoomTitle)) + "</p>" + zoom +
            '<p class="mt__znote">' + esc(t(hero.zoomNote)) + "</p></div>" +
        "</div>" +
      "</figure>";
    }

    /* ---- home: one row per track ---- */
    function trackRow(tr, i) {
      var clips = (tr.pages || []).map(function (slug) {
        var q = L.pageBySlug(slug);
        if (!q) return "";
        var meta = pageMeta(q);
        return '<a class="clip" href="' + esc(L.pageHref(q)) + '">' +
          '<span class="clip__name">' + esc(t(q.title)) + "</span>" +
          '<span class="clip__sum">' + esc(t(q.subtitle)) + "</span>" +
          (meta ? '<span class="clip__meta">' + esc(meta) + "</span>" : "") + "</a>";
      }).join("");

      var extra = "";
      if (tr.key === "models") {
        var mp = L.pageBySlug("models");
        if (mp && mp.items) {
          extra = '<ul class="modelstrip">' + mp.items.map(function (it) {
            return '<li><a href="models.html#' + esc(it.slug) + '">' +
              esc(t(it.title).replace(/^VibeVoice-/, "")) + "</a></li>";
          }).join("") + "</ul>";
        }
      }
      if (tr.chain) {
        extra = '<ol class="chain">' + tr.chain.map(function (c) {
          return '<li class="chain__step"><b>' + esc(t(c.name)) + "</b><span>" + esc(t(c.role)) + "</span></li>";
        }).join("") + "</ol>";
      }
      if (tr.preview) {
        var cp = L.pageBySlug(tr.preview);
        if (cp) {
          var rows = (cp.features || []).slice(0, tr.previewRows || 5);
          extra = '<div class="minimatrix"><div class="table-wrap">' + cmpTable(cp.plans || [], rows, true) + "</div>" +
            '<a class="more-link" href="' + esc(L.pageHref(cp)) + '">' + esc(t(tr.previewMore)) + "</a></div>";
        }
      }

      return '<section class="trk" id="track-' + esc(tr.key) + '" data-lane="' + (i + 1) + '" aria-labelledby="trk-' + esc(tr.key) + '">' +
        '<header class="trk__head"><span class="trk__num">T' + (i + 1) + "</span>" +
          '<h2 class="trk__title" id="trk-' + esc(tr.key) + '">' + esc(t(tr.title)) + "</h2>" +
          '<p class="trk__note">' + esc(t(tr.note)) + "</p></header>" +
        '<div class="trk__body"><div class="clips clips--' + (tr.pages || []).length + '">' + clips + "</div>" + extra + "</div>" +
      "</section>";
    }

    /* comparison table body, shared by the comparison page and the home preview */
    function cmpTable(plans, feats, compact) {
      var thead = '<th scope="col"></th>' + plans.map(function (pl) {
        return '<th scope="col" class="' + (pl.highlight ? "cmp-col--hl" : "") + '">' +
          '<div class="cmp-plan">' + esc(t(pl.name)) + "</div>" +
          '<div class="cmp-price">' + esc(t(pl.price)) + "</div>" +
          (!compact && t(pl.note) ? '<div class="cmp-note">' + esc(t(pl.note)) + "</div>" : "") + "</th>";
      }).join("");
      var rows = feats.map(function (f) {
        var cells = plans.map(function (pl) {
          var v = f.values ? f.values[pl.key] : undefined;
          var cell;
          if (v === true) cell = '<span class="cmp-yes material-symbols-rounded" aria-label="yes">check</span>';
          else if (v === false || v == null) cell = '<span class="cmp-no" aria-label="no">—</span>';
          else cell = esc(t(v));
          return '<td class="' + (pl.highlight ? "cmp-col--hl" : "") + '">' + cell + "</td>";
        }).join("");
        return '<tr><th scope="row" class="cmp-feat">' + esc(t(f.label)) + "</th>" + cells + "</tr>";
      }).join("");
      return '<table class="cmp-table' + (compact ? " cmp-table--compact" : "") + '">' +
        "<thead><tr>" + thead + "</tr></thead><tbody>" + rows + "</tbody></table>";
    }

    function barChart(series, accent) {
      var W = 520, H = 240, padL = 16, padR = 16, padT = 16, padB = 44;
      var plotW = W - padL - padR, plotH = H - padT - padB;
      var max = Math.max.apply(null, series.map(function (d) { return d.value; }).concat([1]));
      var n = series.length || 1, gap = 14, bw = (plotW - gap * (n - 1)) / n, baseY = padT + plotH;
      var bars = series.map(function (d, i) {
        var x = padL + i * (bw + gap), h = (d.value / max) * plotH, y = baseY - h;
        var label = esc(t(d.label)), val = esc(String(d.value));
        return '<rect class="bar-rect" x="' + r(x) + '" y="' + r(y) + '" width="' + r(bw) +
          '" height="' + r(h) + '" rx="5"' + (accent ? ' style="fill:' + esc(accent) + '"' : "") +
          '><title>' + label + ": " + val + "</title></rect>" +
          '<text class="bar-value" x="' + r(x + bw / 2) + '" y="' + r(y - 6) + '" text-anchor="middle">' + val + "</text>" +
          '<text class="bar-label" x="' + r(x + bw / 2) + '" y="' + r(baseY + 18) + '" text-anchor="middle">' + label + "</text>";
      }).join("");
      return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" preserveAspectRatio="xMidYMid meet" aria-label="bar chart">' +
        '<line class="axis-line" x1="' + padL + '" y1="' + r(baseY) + '" x2="' + r(W - padR) + '" y2="' + r(baseY) + '" />' +
        bars + "</svg>";
    }

    function lineChart(points) {
      var W = 520, H = 240, padL = 28, padR = 16, padT = 16, padB = 32;
      var plotW = W - padL - padR, plotH = H - padT - padB;
      var ys = points.map(function (d) { return d.y; });
      var max = Math.max.apply(null, ys.concat([1])), min = Math.min.apply(null, ys.concat([0]));
      var span = (max - min) || 1, n = points.length || 1;
      var xy = points.map(function (d, i) {
        var x = padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
        var y = padT + plotH - ((d.y - min) / span) * plotH;
        return { x: x, y: y, d: d };
      });
      var path = xy.map(function (pt, i) { return (i ? "L" : "M") + r(pt.x) + " " + r(pt.y); }).join(" ");
      var area = path + " L" + r(xy[xy.length - 1].x) + " " + r(padT + plotH) + " L" + r(xy[0].x) + " " + r(padT + plotH) + " Z";
      var dots = xy.map(function (pt) {
        return '<circle class="line-dot" cx="' + r(pt.x) + '" cy="' + r(pt.y) + '" r="3"><title>' +
          esc(String(pt.d.x)) + ": " + esc(String(pt.d.y)) + "</title></circle>";
      }).join("");
      var labels = xy.map(function (pt) {
        return '<text class="bar-label" x="' + r(pt.x) + '" y="' + r(padT + plotH + 20) + '" text-anchor="middle">' + esc(String(pt.d.x)) + "</text>";
      }).join("");
      return '<svg viewBox="0 0 ' + W + " " + H + '" role="img" preserveAspectRatio="xMidYMid meet" aria-label="line chart">' +
        '<path class="line-area" d="' + area + '" />' +
        '<path class="line-path" d="' + path + '" fill="none" />' + dots + labels + "</svg>";
    }

    /* =====================================================================
       LAYOUT REGISTRY
       ===================================================================== */
    var RENDERERS = {

      /* ---- hub: multitrack hero + the site as four tracks ---- */
      hub: function (p) {
        var rows = L.tracks().map(trackRow).join("");
        return '<header class="page-head page-head--hub"><h1>' + esc(t(p.title)) + "</h1>" +
            '<p class="page-head__sub">' + esc(t(p.subtitle)) + "</p></header>" +
          multitrack(p) +
          '<div class="tracks">' + rows + "</div>";
      },

      /* ---- gallery: search + chips + card grid + dialog ---- */
      gallery: function (p) {
        var cats = (p.categories || []).map(function (c) {
          return '<button class="chip" type="button" data-cat="' + esc(c.key) + '">' +
            esc(c[L.state.lang] || c.en) + "</button>";
        }).join("");
        var allLabel = L.state.lang === "en" ? "All" : "全部";
        return head(p) +
          '<div class="toolbar">' +
            '<input id="search" class="search" type="search" autocomplete="off" ' +
              'placeholder="' + (L.state.lang === "en" ? "Search…" : "搜尋…") + '" ' +
              'aria-label="' + (L.state.lang === "en" ? "Search" : "搜尋") + '" />' +
            (cats ? '<div class="chips"><button class="chip chip--active" type="button" data-cat="">' + esc(allLabel) + "</button>" + cats + "</div>" : "") +
          "</div>" +
          '<p class="result-count" id="resultCount" aria-live="polite"></p>' +
          '<div class="grid" id="grid"></div>';
      },

      /* ---- article: sticky TOC + prose + reading progress ---- */
      article: function (p) {
        var toc = (p.sections || []).map(function (s) {
          return '<a class="toc-link" href="#' + esc(s.id) + '" data-toc="' + esc(s.id) + '">' + esc(t(s.heading)) + "</a>";
        }).join("");
        var body = (p.sections || []).map(function (s) {
          var blocks = (s.blocks || []).map(function (b) {
            if (b.type === "h3") return "<h3>" + esc(t(b.text)) + "</h3>";
            if (b.type === "quote") return "<blockquote>" + esc(t(b.text)) + "</blockquote>";
            if (b.type === "code") return "<pre><code>" + esc(t(b.text)) + "</code></pre>";
            if (b.type === "ul") {
              var arr = (b.items && (b.items[L.state.lang] || b.items.en || b.items.zh)) || [];
              return "<ul>" + arr.map(function (li) { return "<li>" + esc(li) + "</li>"; }).join("") + "</ul>";
            }
            return "<p>" + esc(t(b.text)) + "</p>";
          }).join("");
          return '<section class="article-section" id="' + esc(s.id) + '" data-item ' +
            'aria-labelledby="' + esc(s.id) + '-h"><h2 id="' + esc(s.id) + '-h">' + esc(t(s.heading)) + "</h2>" + blocks + "</section>";
        }).join("");
        return '<div class="reading-progress" id="readingProgress" aria-hidden="true"></div>' +
          head(p) +
          '<div class="article-layout">' +
            '<nav class="toc" aria-label="Contents"><div class="toc__inner">' + toc + "</div></nav>" +
            '<div class="article-body prose">' + body + "</div>" +
          "</div>";
      },

      /* ---- dashboard: stat cards + bar + line + table ---- */
      dashboard: function (p) {
        var stats = (p.stats || []).map(function (s) {
          var d = s.delta;
          var deltaHtml = (d === 0 || d) ?
            '<span class="stat-delta stat-delta--' + (d >= 0 ? "up" : "down") + '">' +
              (d >= 0 ? "▲ " : "▼ ") + esc(String(Math.abs(d))) + "%</span>" : "";
          return '<div class="stat-card" data-item>' +
            '<span class="stat-label">' + esc(t(s.label)) + "</span>" +
            '<b class="stat-value">' + esc(String(s.value)) +
              (t(s.unit) ? ' <span class="stat-unit">' + esc(t(s.unit)) + "</span>" : "") + "</b>" +
            deltaHtml + "</div>";
        }).join("");
        var bars = p.bars ? '<figure class="panel" data-item><figcaption>' + esc(t(p.bars.title)) + "</figcaption>" +
          '<div class="chart-wrap">' + barChart(p.bars.series || []) + "</div></figure>" : "";
        var line = p.line ? '<figure class="panel" data-item><figcaption>' + esc(t(p.line.title)) + "</figcaption>" +
          '<div class="chart-wrap">' + lineChart(p.line.points || []) + "</div></figure>" : "";
        var table = "";
        if (p.table) {
          var thead = (p.table.columns || []).map(function (c) { return "<th>" + esc(t(c.label)) + "</th>"; }).join("");
          var tbody = (p.table.rows || []).map(function (row) {
            return "<tr data-item>" + (p.table.columns || []).map(function (c) {
              var v = row[c.key];
              return "<td>" + esc(typeof v === "object" ? t(v) : String(v == null ? "" : v)) + "</td>";
            }).join("") + "</tr>";
          }).join("");
          table = '<div class="panel panel--wide" data-item><div class="table-wrap"><table class="data-table">' +
            "<thead><tr>" + thead + "</tr></thead><tbody>" + tbody + "</tbody></table></div></div>";
        }
        return head(p) +
          '<div class="stat-grid">' + stats + "</div>" +
          '<div class="panel-grid">' + bars + line + "</div>" + table;
      },

      /* ---- timeline: dated event cards down a rail ---- */
      timeline: function (p) {
        var items = (p.events || []).map(function (ev) {
          return '<li class="tl-item" data-item><div class="tl-dot" aria-hidden="true"></div>' +
            '<div class="tl-card"><span class="tl-date">' + esc(t(ev.date)) + "</span>" +
            '<h3 class="tl-title">' + esc(t(ev.title)) + "</h3>" +
            '<p class="tl-body">' + esc(t(ev.body)) + "</p></div></li>";
        }).join("");
        return head(p) + '<ol class="timeline">' + items + "</ol>";
      },

      /* ---- table: searchable + sortable ---- */
      table: function (p) {
        return head(p) +
          '<div class="toolbar">' +
            '<input id="search" class="search" type="search" autocomplete="off" ' +
              'placeholder="' + (L.state.lang === "en" ? "Search…" : "搜尋…") + '" ' +
              'aria-label="' + (L.state.lang === "en" ? "Search" : "搜尋") + '" />' +
            '<div class="chips" id="tableChips"></div>' +
          "</div>" +
          '<div class="table-wrap"><table class="data-table" id="dataTable"><thead></thead><tbody></tbody></table></div>';
      },

      /* ---- bento: asymmetric tile grid ---- */
      bento: function (p) {
        var tiles = (p.tiles || []).map(function (tile) {
          return '<article class="tile tile--' + esc(tile.size || "sm") + (tile.accent ? " tile--accent" : "") + '" data-item>' +
            (tile.icon ? '<span class="material-symbols-rounded tile__icon" aria-hidden="true">' + esc(tile.icon) + "</span>" : "") +
            (tile.value ? '<b class="tile__value">' + esc(tile.value) + "</b>" : "") +
            '<h3 class="tile__title">' + esc(t(tile.title)) + "</h3>" +
            (t(tile.body) ? '<p class="tile__body">' + esc(t(tile.body)) + "</p>" : "") + "</article>";
        }).join("");
        return head(p) + '<div class="bento">' + tiles + "</div>";
      },

      /* ---- kanban: cards grouped by status column ---- */
      kanban: function (p) {
        var cols = (p.columns || []).map(function (col) {
          var cards = (p.cards || []).filter(function (c) { return c.column === col.key; }).map(function (c) {
            return '<article class="kb-card" data-item><h3 class="kb-card__title">' + esc(t(c.title)) + "</h3>" +
              (t(c.body) ? '<p class="kb-card__body">' + esc(t(c.body)) + "</p>" : "") +
              tagStrip(c.tags) + "</article>";
          }).join("");
          var count = (p.cards || []).filter(function (c) { return c.column === col.key; }).length;
          return '<div class="kb-col"><div class="kb-col__head">' + esc(t(col.label)) +
            ' <span class="kb-col__count">' + count + "</span></div>" +
            '<div class="kb-col__body">' + cards + "</div></div>";
        }).join("");
        return head(p) + '<div class="kanban">' + cols + "</div>";
      },

      /* ---- faq: searchable accordion ---- */
      faq: function (p) {
        var items = (p.qa || []).map(function (row) {
          return '<details class="acc-item" data-item data-q="' + esc((t(row.q) + " " + t(row.a)).toLowerCase()) + '">' +
            '<summary class="acc-q"><span>' + esc(t(row.q)) + "</span>" +
            '<span class="material-symbols-rounded acc-chevron" aria-hidden="true">expand_more</span></summary>' +
            '<div class="acc-a">' + esc(t(row.a)) + "</div></details>";
        }).join("");
        return head(p) +
          '<div class="toolbar"><input id="search" class="search" type="search" autocomplete="off" ' +
            'placeholder="' + (L.state.lang === "en" ? "Search…" : "搜尋…") + '" ' +
            'aria-label="' + (L.state.lang === "en" ? "Search" : "搜尋") + '" /></div>' +
          '<div class="accordion" id="accordion">' + items + "</div>";
      },

      /* ---- comparison: plans (cols) x features (rows) ---- */
      comparison: function (p) {
        return head(p) + '<div class="table-wrap">' + cmpTable(p.plans || [], p.features || [], false) + "</div>";
      },

      /* ---- leaderboard: ranked list + tier grouping toggle ---- */
      leaderboard: function (p) {
        var listLabel = L.state.lang === "en" ? "List" : "排名";
        var tierLabel = L.state.lang === "en" ? "Tiers" : "階級";
        return head(p) +
          '<div class="seg" role="tablist">' +
            '<button class="seg__btn seg__btn--active" type="button" data-view="list">' + esc(listLabel) + "</button>" +
            '<button class="seg__btn" type="button" data-view="tier">' + esc(tierLabel) + "</button>" +
          "</div>" +
          '<div id="lbView"></div>';
      },

      /* ---- scrolly: sticky visual + stepped narrative ---- */
      scrolly: function (p) {
        var steps = (p.steps || []).map(function (s, i) {
          return '<div class="scrolly-step" data-item data-step="' + i + '"><p>' + esc(t(s.text)) + "</p></div>";
        }).join("");
        return head(p) +
          '<div class="scrolly">' +
            '<div class="scrolly-sticky"><div class="scrolly-visual" id="scrollyVisual"></div></div>' +
            '<div class="scrolly-steps">' + steps + "</div>" +
          "</div>";
      },

      /* ---- map: Leaflet map + list (needs Leaflet on the page) ---- */
      map: function (p) {
        return head(p) +
          '<div class="map-layout">' +
            '<div class="map-box" id="map" role="application" aria-label="Map"></div>' +
            '<ul class="map-list" id="mapList"></ul>' +
          "</div>";
      }
    };

    /* =====================================================================
       WIRING (interactions) — keyed by layout, run after innerHTML is set
       ===================================================================== */
    var WIRE = {
      hub: function () { playSweep(); },

      gallery: function (p) {
        var grid = document.getElementById("grid");
        var search = document.getElementById("search");
        var count = document.getElementById("resultCount");
        var chips = [].slice.call(pageEl.querySelectorAll(".chip"));
        var st = { q: "", cat: "" };

        function matches(item) {
          if (st.cat && item.category !== st.cat) return false;
          if (!st.q) return true;
          var hay = (t(item.title) + " " + t(item.summary) + " " +
            (item.tags || []).map(t).join(" ")).toLowerCase();
          return hay.indexOf(st.q) !== -1;
        }
        function paint() {
          var rows = (p.items || []).filter(matches);
          grid.innerHTML = rows.map(function (item) {
            return '<article class="card" tabindex="0" role="button" data-item data-slug="' + esc(item.slug) + '" ' +
              'aria-label="' + esc(t(item.title)) + '">' +
              '<h3 class="card__title">' + esc(t(item.title)) + "</h3>" +
              '<p class="card__summary">' + esc(t(item.summary)) + "</p>" +
              tagStrip(item.tags) + "</article>";
          }).join("");
          if (count) count.textContent = rows.length + (L.state.lang === "en" ? " result(s)" : " 筆結果");
          wireCards();
        }
        function wireCards() {
          [].forEach.call(grid.querySelectorAll(".card[data-slug]"), function (card) {
            var slug = card.dataset.slug;
            card.addEventListener("click", function () { openItem(slug); });
            card.addEventListener("keydown", function (e) {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openItem(slug); }
            });
          });
        }
        function findItem(slug) {
          return (p.items || []).filter(function (it) { return it.slug === slug; })[0] || null;
        }
        function openItem(slug) {
          var item = findItem(slug); if (!item) return;
          var dlg = L.dialog(), body = document.getElementById("dialogBody");
          /* `url` is optional: a gallery item that points somewhere (a repo, a
             paper) gets a link under its text. Items without it are unchanged. */
          var link = item.url ?
            '<p><a class="row-link" href="' + esc(item.url) + '" target="_blank" rel="noopener">' +
              esc(item.url) + "</a></p>" : "";
          body.innerHTML = '<h2 id="dialogTitle">' + esc(t(item.title)) + "</h2>" +
            tagStrip(item.tags) +
            "<p>" + esc(t(item.overview) || t(item.summary)) + "</p>" + link;
          if (!dlg.open) dlg.showModal();
          if (location.hash.slice(1) !== slug) history.replaceState(null, "", "#" + slug);
        }
        function syncHash() {
          var slug = location.hash.slice(1);
          if (slug && findItem(slug)) openItem(slug);
        }
        if (search) search.addEventListener("input", function () { st.q = this.value.trim().toLowerCase(); paint(); });
        chips.forEach(function (chip) {
          chip.addEventListener("click", function () {
            chips.forEach(function (c) { c.classList.remove("chip--active"); });
            chip.classList.add("chip--active");
            st.cat = chip.dataset.cat || "";
            paint();
          });
        });
        /* closing the dialog clears the #slug so the URL returns to clean state
           and a later deep link to the SAME slug fires hashchange again */
        var dlg = L.dialog();
        function onClose() {
          var slug = location.hash.slice(1);
          if (slug && findItem(slug)) history.replaceState(null, "", location.pathname + location.search);
        }
        dlg.addEventListener("close", onClose);
        var onHash = function () { syncHash(); };
        window.addEventListener("hashchange", onHash);
        teardowns.push(function () {
          window.removeEventListener("hashchange", onHash);
          dlg.removeEventListener("close", onClose);
        });
        paint();
        syncHash();
      },

      article: function () {
        var prog = document.getElementById("readingProgress");
        var links = [].slice.call(pageEl.querySelectorAll(".toc-link"));
        var secs = [].slice.call(pageEl.querySelectorAll(".article-section"));
        function onScroll() {
          var h = document.documentElement;
          var max = h.scrollHeight - h.clientHeight;
          if (prog) prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        teardowns.push(function () { window.removeEventListener("scroll", onScroll); });
        if ("IntersectionObserver" in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (!en.isIntersecting) return;
              links.forEach(function (a) {
                var on = a.dataset.toc === en.target.id;
                a.classList.toggle("toc-link--active", on);
              });
            });
          }, { rootMargin: "-30% 0px -60% 0px" });
          secs.forEach(function (s) { io.observe(s); });
          teardowns.push(function () { io.disconnect(); });
        }
      },

      dashboard: function () { /* static charts; nothing to wire */ },

      table: function (p) {
        var table = document.getElementById("dataTable");
        var thead = table.querySelector("thead"), tbody = table.querySelector("tbody");
        var search = document.getElementById("search");
        var chipsBox = document.getElementById("tableChips");
        var cols = p.columns || [];
        var st = { q: "", filter: "", sortKey: null, dir: 1 };
        var filterCol = cols.filter(function (c) { return c.filter; })[0];

        function cellText(row, c) { var v = row[c.key]; return typeof v === "object" ? t(v) : String(v == null ? "" : v); }
        function rowMatches(row) {
          if (filterCol && st.filter && cellText(row, filterCol) !== st.filter) return false;
          if (!st.q) return true;
          return cols.some(function (c) { return cellText(row, c).toLowerCase().indexOf(st.q) !== -1; });
        }
        function paintHead() {
          thead.innerHTML = "<tr>" + cols.map(function (c) {
            var arrow = st.sortKey === c.key ? (st.dir > 0 ? " ▲" : " ▼") : "";
            return '<th class="th-sort" data-key="' + esc(c.key) + '" role="button" tabindex="0" aria-label="Sort by ' +
              esc(t(c.label)) + '">' + esc(t(c.label)) + esc(arrow) + "</th>";
          }).join("") + "</tr>";
          [].forEach.call(thead.querySelectorAll(".th-sort"), function (th) {
            th.addEventListener("click", function () { sortBy(th.dataset.key); });
            th.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sortBy(th.dataset.key); } });
          });
        }
        function sortBy(key) {
          if (st.sortKey === key) st.dir = -st.dir; else { st.sortKey = key; st.dir = 1; }
          paint();
        }
        function paint() {
          paintHead();
          var col = cols.filter(function (c) { return c.key === st.sortKey; })[0];
          var rows = (p.rows || []).filter(rowMatches).slice();
          if (col) {
            rows.sort(function (a, b) {
              var va = a[col.key], vb = b[col.key];
              if (col.type === "num") return (Number(va) - Number(vb)) * st.dir;
              return String(typeof va === "object" ? t(va) : va).localeCompare(String(typeof vb === "object" ? t(vb) : vb)) * st.dir;
            });
          }
          tbody.innerHTML = rows.map(function (row) {
            return "<tr data-item>" + cols.map(function (c) {
              if (c.type === "link") {
                var u = row[c.key];
                return '<td><a class="row-link" href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(u) + "</a></td>";
              }
              return "<td>" + esc(cellText(row, c)) + "</td>";
            }).join("") + "</tr>";
          }).join("");
        }
        if (filterCol) {
          var vals = [];
          (p.rows || []).forEach(function (row) { var v = cellText(row, filterCol); if (vals.indexOf(v) === -1) vals.push(v); });
          var allLabel = L.state.lang === "en" ? "All" : "全部";
          chipsBox.innerHTML = '<button class="chip chip--active" type="button" data-v="">' + esc(allLabel) + "</button>" +
            vals.map(function (v) { return '<button class="chip" type="button" data-v="' + esc(v) + '">' + esc(v) + "</button>"; }).join("");
          [].forEach.call(chipsBox.querySelectorAll(".chip"), function (chip) {
            chip.addEventListener("click", function () {
              [].forEach.call(chipsBox.querySelectorAll(".chip"), function (c) { c.classList.remove("chip--active"); });
              chip.classList.add("chip--active");
              st.filter = chip.dataset.v || "";
              paint();
            });
          });
        }
        if (search) search.addEventListener("input", function () { st.q = this.value.trim().toLowerCase(); paint(); });
        paint();
      },

      bento: function () { /* static */ },
      kanban: function () { /* static */ },

      faq: function () {
        var search = document.getElementById("search");
        var items = [].slice.call(pageEl.querySelectorAll(".acc-item"));
        if (search) search.addEventListener("input", function () {
          var q = this.value.trim().toLowerCase();
          items.forEach(function (it) {
            var hit = !q || (it.dataset.q || "").indexOf(q) !== -1;
            it.style.display = hit ? "" : "none";
          });
        });
      },

      comparison: function () { /* static */ },

      leaderboard: function (p) {
        var view = document.getElementById("lbView");
        var btns = [].slice.call(pageEl.querySelectorAll(".seg__btn"));
        var entries = (p.entries || []).slice().sort(function (a, b) { return b.score - a.score; });
        function row(e, rank) {
          return '<li class="lb-row" data-item>' +
            (rank ? '<span class="lb-rank">' + rank + "</span>" : "") +
            '<span class="lb-tier lb-tier--' + esc(e.tier || "") + '">' + esc(e.tier || "") + "</span>" +
            '<span class="lb-name">' + esc(t(e.name)) + "</span>" +
            '<span class="lb-meta">' + esc(t(e.meta)) + "</span>" +
            '<span class="lb-score">' + esc(String(e.score)) + "</span></li>";
        }
        function listView() {
          view.innerHTML = '<ol class="lb-list">' + entries.map(function (e, i) { return row(e, i + 1); }).join("") + "</ol>";
        }
        function tierView() {
          var tiers = [];
          entries.forEach(function (e) { if (tiers.indexOf(e.tier) === -1) tiers.push(e.tier); });
          view.innerHTML = tiers.map(function (tier) {
            var rows = entries.filter(function (e) { return e.tier === tier; }).map(function (e) { return row(e); }).join("");
            return '<div class="lb-tier-group"><div class="lb-tier-head lb-tier--' + esc(tier) + '">' + esc(tier) + "</div>" +
              '<ol class="lb-list">' + rows + "</ol></div>";
          }).join("");
        }
        btns.forEach(function (b) {
          b.addEventListener("click", function () {
            btns.forEach(function (x) { x.classList.remove("seg__btn--active"); });
            b.classList.add("seg__btn--active");
            if (b.dataset.view === "tier") tierView(); else listView();
          });
        });
        listView();
      },

      scrolly: function (p) {
        var visual = document.getElementById("scrollyVisual");
        var steps = [].slice.call(pageEl.querySelectorAll(".scrolly-step"));
        function paintVisual(i) {
          var s = (p.steps || [])[i]; if (!s) return;
          var v = s.visual || {};
          if (v.type === "bars") {
            visual.innerHTML = '<div class="chart-wrap">' + barChart(v.bars || [], v.color) + "</div>";
          } else {
            visual.innerHTML = '<div class="scrolly-stat" style="color:' + esc(v.color || "var(--primary)") + '">' +
              esc(t(v.value)) + "</div>";
          }
        }
        paintVisual(0);
        if ("IntersectionObserver" in window) {
          var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
              if (en.isIntersecting) {
                steps.forEach(function (s) { s.classList.remove("scrolly-step--active"); });
                en.target.classList.add("scrolly-step--active");
                paintVisual(parseInt(en.target.dataset.step, 10) || 0);
              }
            });
          }, { rootMargin: "-45% 0px -45% 0px" });
          steps.forEach(function (s) { io.observe(s); });
          teardowns.push(function () { io.disconnect(); });
        }
      },

      map: function (p) {
        var listEl = document.getElementById("mapList");
        var places = p.places || [];
        listEl.innerHTML = places.map(function (pl) {
          return '<li class="place" data-item data-slug="' + esc(pl.slug) + '" tabindex="0" role="button" ' +
            'aria-label="' + esc(t(pl.name)) + '"><b>' + esc(t(pl.name)) + "</b>" +
            '<span>' + esc(t(pl.body)) + "</span></li>";
        }).join("");

        if (typeof window.L === "undefined" || !window.L.map) {
          // Leaflet not loaded (offline / blocked): list-only graceful fallback.
          document.getElementById("map").innerHTML =
            '<div class="map-fallback">' + esc(L.state.lang === "en" ? "Map unavailable offline — see the list." : "離線時地圖無法載入 — 請看清單。") + "</div>";
          return;
        }
        var map = window.L.map("map", { scrollWheelZoom: false });
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap", maxZoom: 19
        }).addTo(map);
        var markers = {}, group = [];
        places.forEach(function (pl) {
          /* alt + title give Leaflet's marker <img role="button"> an accessible name */
          var m = window.L.marker([pl.lat, pl.lng], { alt: t(pl.name), title: t(pl.name), keyboard: true })
            .addTo(map).bindPopup("<b>" + esc(t(pl.name)) + "</b><br>" + esc(t(pl.body)));
          markers[pl.slug] = m; group.push([pl.lat, pl.lng]);
        });
        if (group.length) map.fitBounds(group, { padding: [30, 30] });
        [].forEach.call(listEl.querySelectorAll(".place"), function (li) {
          function go() { var m = markers[li.dataset.slug]; if (m) { map.panTo(m.getLatLng()); m.openPopup(); } }
          li.addEventListener("click", go);
          li.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
        });
        teardowns.push(function () { try { map.remove(); } catch (e) {} });
      }
    };

    /* ---- home: the playhead sweeps 0:00 -> 90:00 once, the clock follows ----
       The sweep itself is CSS (it runs, and ends fully drawn, without JS).
       Reduced motion: no sweep, the clock just reads 90:00. */
    function playSweep() {
      var el = document.getElementById("mtTime");
      if (!el || !window.requestAnimationFrame) return;
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      var DELAY = 300, DUR = 2600, start = null;
      function fmt(min) {
        var m = Math.floor(min), sec = Math.floor((min - m) * 60);
        return (m < 10 ? "0" : "") + m + ":" + (sec < 10 ? "0" : "") + sec;
      }
      function step(ts) {
        if (start === null) start = ts;
        var pr = Math.min(1, Math.max(0, (ts - start - DELAY) / DUR));
        var eased = 1 - Math.pow(1 - pr, 3);
        el.textContent = pr >= 1 ? "90:00" : fmt(MT_MIN * eased);
        if (pr < 1) requestAnimationFrame(step);
      }
      el.textContent = "00:00";
      requestAnimationFrame(step);
    }

    /* =====================================================================
       RENDER the current page
       ===================================================================== */
    function render() {
      teardowns.forEach(function (fn) { try { fn(); } catch (e) {} });
      teardowns = [];
      var p = L.currentPage();
      if (!p) { pageEl.innerHTML = '<p class="empty">No page data.</p>'; return; }
      var fn = RENDERERS[p.layout] || RENDERERS.gallery;
      pageEl.className = "page page--" + p.layout;
      var lane = L.trackOf(p.slug);
      if (lane) pageEl.setAttribute("data-lane", String(lane.index));
      else pageEl.removeAttribute("data-lane");
      pageEl.innerHTML = fn(p);
      var w = WIRE[p.layout];
      if (w) w(p);
    }

    render();
  }

  boot();
})();
