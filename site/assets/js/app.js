/* ==========================================================================
   داتیس آوان نیرو — shared layout + page scripts
   Pages are selected by <body data-page="...">
   ========================================================================== */
(function () {
  "use strict";

  const S = window.SITE, P = window.PRODUCTS, F = window.FUELS, R = window.RANGES;
  const SP = window.SOLAR_PANELS || [];
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  const nf = new Intl.NumberFormat("fa-IR");
  const nf1 = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 2 });
  const fa = n => nf.format(n);
  const fa1 = n => nf1.format(n);
  const fa2 = n => nf2.format(n);
  const faDigits = s => String(s).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const toEnDigits = s => String(s).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  const num = v => parseFloat(toEnDigits(v).replace(/[^\d.]/g, "")) || 0;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
  const img = f => `assets/img/${f}`;
  const TEL = "tel:" + S.phone;
  const WA = "https://wa.me/" + S.whatsapp;
  const TG = "https://t.me/" + S.telegramBot;
  const PHONE = `<span class="ltr">${faDigits(S.phoneDisplay)}</span>`;
  const ext = 'target="_blank" rel="noopener"';
  const rangeOf = p => R.find(r => p.kw >= r.min && p.kw <= r.max) || R[R.length - 1];
  const productUrl = p => `product.html#id-${p.id}`;
  const productTitle = p => `${F[p.fuel].label} ${fa(p.kw)} کیلووات ${p.brand}`;
  const panelTitle = p => `پنل خورشیدی ${fa(p.watt)} وات`;

  // Page state comes from the query string or from hash tokens like #fuel-gas~range-r2
  // (the hash form also works on hosts that strip the query string).
  // URLs are attacker-controllable: decode defensively and cap the length so a
  // malformed link (e.g. "#range-%E0") cannot abort the whole script.
  const safeDecode = s => { try { return decodeURIComponent(s); } catch (e) { return ""; } };
  const params = (() => {
    let q;
    try { q = new URLSearchParams(location.search); } catch (e) { q = new URLSearchParams(); }
    location.hash.slice(1, 500).split("~").forEach(t => {
      const i = t.indexOf("-"), k = t.slice(0, i);
      if (i > 0 && ["id", "fuel", "range", "model", "brand", "need", "type"].includes(k)) {
        const v = safeDecode(t.slice(i + 1)).replace(/\./g, ",").replace(/_/g, " ");
        if (v) q.set(k, v.slice(0, 100));
      }
    });
    return q;
  })();

  /* ---------- layout ---------- */
  const NAV = [
    { href: "index.html", page: "home", label: "خانه" },
    { href: "products.html", page: "products", label: "ژنراتور" },
    { href: "solar.html", page: "solar", label: "انرژی خورشیدی" },
    { href: "energy.html", page: "energy", label: "برق صنایع از بورس" },
    { href: "services.html", page: "services", label: "خدمات" },
    { href: "about.html", page: "about", label: "درباره ما" },
    { href: "contact.html", page: "contact", label: "تماس" }
  ];
  const page = document.body.dataset.page;
  const isSolarId = id => /^sp-/.test(id || "");
  const activePage = page === "product" ? (isSolarId(params.get("id")) ? "solar" : "products") : page;

  function renderLayout() {
    document.body.insertAdjacentHTML("afterbegin", window.ICON_SPRITE || "");
    const cur = n => (n.page === activePage ? ' aria-current="page"' : "");

    const header = $("#site-header");
    if (header) header.outerHTML = `
      <header class="nav" id="top">
        <div class="nav__in">
          <a class="brand" href="index.html" aria-label="${esc(S.name)} — صفحهٔ اصلی">
            <img src="assets/img/logo/h1.png" alt="${esc(S.name)}" width="720" height="193">
          </a>
          <nav class="nav__links" aria-label="منوی اصلی"><ul>${NAV.map(n => `<li><a href="${n.href}"${cur(n)}>${esc(n.label)}</a></li>`).join("")}</ul></nav>
          <div class="nav__end">
            <a class="nav__phone" href="${TEL}" aria-label="تماس ${esc(S.phoneDisplay)}">${icon("phone")}${PHONE}</a>
            <a class="btn btn--sm nav__cta" href="contact.html#quote">استعلام قیمت</a>
            <button class="menu-btn" type="button" aria-label="منو" aria-expanded="false" aria-controls="drawer">${icon("menu")}</button>
          </div>
        </div>
      </header>
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawer__scrim" data-close></div>
        <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="منو">
          <div class="drawer__top">
            <img src="assets/img/logo/h1.png" alt="${esc(S.name)}" width="720" height="193">
            <button class="menu-btn" type="button" data-close aria-label="بستن منو">${icon("x")}</button>
          </div>
          <nav aria-label="منوی موبایل">${NAV.map(n => `<a href="${n.href}"${cur(n)}>${esc(n.label)}</a>`).join("")}</nav>
          <div class="drawer__contact">
            <a class="btn btn--block" href="${TEL}">${icon("phone")}${PHONE}</a>
            <a class="btn btn--secondary btn--block" href="${WA}" ${ext}>واتس‌اپ</a>
            <a class="btn btn--secondary btn--block" href="${TG}" ${ext}>ربات تلگرام برق آزاد</a>
          </div>
        </div>
      </div>`;

    const footer = $("#site-footer");
    if (footer) footer.outerHTML = `
      <footer class="footer">
        <div class="wrap">
          <div class="footer__top">
            <img src="assets/img/logo/h1.png" alt="${esc(S.name)}" width="720" height="193" loading="lazy">
            <p>${esc(S.tagline)}</p>
          </div>
          <div class="footer-grid">
            <div>
              <h4>ژنراتور</h4>
              <ul>
                ${Object.entries(F).map(([k, f]) => `<li><a href="products.html#fuel-${esc(k)}">${esc(f.label)}</a></li>`).join("")}
                ${R.map(r => `<li><a href="products.html#range-${esc(r.id)}">${esc(r.label)}</a></li>`).join("")}
              </ul>
            </div>
            <div>
              <h4>انرژی</h4>
              <ul>
                <li><a href="solar.html">نیروگاه و پنل خورشیدی</a></li>
                <li><a href="solar.html#calc">برآورد تولید برق</a></li>
                <li><a href="energy.html">برق عادی، سبز و آزاد</a></li>
                <li><a href="${TG}" ${ext}>ربات برق آزاد</a></li>
              </ul>
            </div>
            <div>
              <h4>شرکت</h4>
              <ul>${NAV.filter(n => ["services", "about", "contact"].includes(n.page)).map(n => `<li><a href="${n.href}">${esc(n.label)}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>تماس</h4>
              <ul>
                <li><a href="${TEL}">${PHONE}</a></li>
                <li><a href="${WA}" ${ext}>واتس‌اپ</a></li>
                ${S.email ? `<li><a href="mailto:${esc(S.email)}"><span class="ltr">${esc(S.email)}</span></a></li>` : ""}
                <li><span>${esc(S.hours)}</span></li>
              </ul>
            </div>
          </div>
          <div class="footer__bottom">
            <span>© ${fa(new Date().getFullYear())} ${esc(S.name)}</span>
            <a href="credits.html">منابع تصاویر</a>
          </div>
        </div>
      </footer>
      <div class="fab-bar">
        <a class="btn btn--secondary" href="${TEL}">${icon("phone")}تماس</a>
        <a class="btn" href="${WA}" ${ext}>واتس‌اپ</a>
      </div>
      <button class="to-top" type="button" aria-label="بازگشت به بالای صفحه">${icon("arrow-up")}</button>`;

    initHeader();
  }

  function initHeader() {
    const nav = $(".nav"), toTop = $(".to-top");
    const onScroll = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 8);
      if (toTop) toTop.classList.toggle("is-visible", y > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (toTop) toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      const skip = $(".skip-link"); if (skip) skip.focus({ preventScroll: true });
    });

    const drawer = $("#drawer");
    const openBtn = $(".nav .menu-btn");
    if (!drawer || !openBtn) return;
    const focusables = () => $$("a, button", drawer);
    const open = () => {
      drawer.classList.add("is-open"); drawer.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden";
      setTimeout(() => focusables()[0]?.focus(), 50);
    };
    const close = () => {
      drawer.classList.remove("is-open"); drawer.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; openBtn.focus();
    };
    openBtn.addEventListener("click", open);
    $$("[data-close]", drawer).forEach(b => b.addEventListener("click", close));
    drawer.addEventListener("keydown", e => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const f = focusables(), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- shared components ---------- */
  const more = (label = "مشخصات") => `<span class="link">${label}${icon("chevron-left")}</span>`;

  function productCard(p) {
    const usage = p.fuel === "gas" ? `راندمان ${fa1(p.effEl)}٪` : `${fa1(p.fuel75)} لیتر در ساعت`;
    return `
      <article class="card">
        <div class="card__media"><img src="${img(p.images[0])}" alt="${esc(productTitle(p))}" loading="lazy" width="1200" height="900"></div>
        <div class="card__body">
          <span class="card__kicker">${esc(F[p.fuel].label)} · <span class="ltr">${esc(p.model)}</span></span>
          <div class="card__row">
            <h3 class="card__title"><a href="${productUrl(p)}"><span class="ltr">${esc(p.brand)}</span></a></h3>
            <span class="card__power">${fa(p.kw)}<small>کیلووات</small></span>
          </div>
          <p class="card__meta"><span class="ltr">${fa(p.kva)} kVA</span> · ${usage}</p>
          <div class="card__foot">${more()}<a class="btn btn--secondary btn--sm" href="contact.html#model-${esc(p.model)}" aria-label="استعلام قیمت ${esc(p.model)}">استعلام</a></div>
        </div>
      </article>`;
  }

  function solarCard(p) {
    return `
      <article class="card">
        <div class="card__media"><img src="${img(p.images[0])}" alt="${esc(panelTitle(p))}" loading="lazy" width="1200" height="795"></div>
        <div class="card__body">
          <span class="card__kicker">پنل خورشیدی · <span class="ltr">${esc(p.model)}</span></span>
          <div class="card__row">
            <h3 class="card__title"><a href="${productUrl(p)}"><span class="ltr">${esc(p.cellEn)}</span></a></h3>
            <span class="card__power">${fa(p.watt)}<small>وات</small></span>
          </div>
          <p class="card__meta">راندمان ${fa1(p.eff)}٪ · ${esc(p.warranty)}</p>
          <div class="card__foot">${more()}<a class="btn btn--secondary btn--sm" href="contact.html#model-${esc(p.model)}~need-solar" aria-label="استعلام قیمت ${esc(p.model)}">استعلام</a></div>
        </div>
      </article>`;
  }

  function renderStats(root) {
    if (!root) return;
    root.innerHTML = S.stats.map(s => `<div class="stat"><b><span class="ltr">${fa(s.value)}<small>${esc(faDigits(s.suffix.trim()))}</small></span></b><span>${esc(s.label)}</span></div>`).join("");
  }

  function renderProjects(root) {
    if (!root) return;
    root.innerHTML = window.PROJECTS.map(pr => `
      <article class="card">
        <div class="card__media"><img src="${img(pr.img)}" alt="${esc(pr.title)}" loading="lazy" width="1200" height="900"></div>
        <div class="card__body">
          <span class="card__kicker">${esc(pr.place)}</span>
          <h3 class="card__title">${esc(pr.title)}</h3>
          <p class="card__meta"><span class="ltr">${esc(pr.power)}</span></p>
        </div>
      </article>`).join("");
  }

  function renderFaq(root, list) {
    if (!root || !list) return;
    root.innerHTML = list.map(f => `
      <details>
        <summary>${esc(f.q)}${icon("chevron-down")}</summary>
        <div><p>${esc(f.a)}</p></div>
      </details>`).join("");
  }

  function fillContactBits() {
    $$("[data-site]").forEach(el => {
      const key = el.dataset.site;
      if (key === "phone") { el.innerHTML = PHONE; if (el.tagName === "A") el.href = TEL; }
      else if (key === "whatsapp") { if (el.tagName === "A") { el.href = WA; el.target = "_blank"; el.rel = "noopener"; } }
      else if (key === "telegram") { if (el.tagName === "A") { el.href = TG; el.target = "_blank"; el.rel = "noopener"; } if (!el.children.length && !el.textContent.trim()) el.innerHTML = `<span class="ltr">@${esc(S.telegramBot)}</span>`; }
      else if (key === "email") {
        if (!S.email) { const row = el.closest(".row"); (row || el).hidden = true; return; }
        el.textContent = S.email; if (el.tagName === "A") el.href = "mailto:" + S.email;
      }
      else if (S[key] != null) el.textContent = S[key];
    });
  }

  /* ---------- forms ---------- */
  function initForms() {
    $$("form[data-quote]").forEach(form => {
      const status = $(".form-status", form);
      const modelSel = $("select[name=model]", form);
      if (modelSel) {
        const opt = p => `<option value="${esc(p.model)}">${esc(p.model)} — ${fa(p.kw)} kW ${esc(p.brand)}</option>`;
        modelSel.insertAdjacentHTML("beforeend",
          Object.entries(F).map(([k, f]) => `<optgroup label="${esc(f.label)}">${P.filter(p => p.fuel === k).map(opt).join("")}</optgroup>`).join("") +
          (SP.length ? `<optgroup label="پنل خورشیدی">${SP.map(p => `<option value="${esc(p.model)}">${esc(p.model)} — ${fa(p.watt)} وات</option>`).join("")}</optgroup>` : ""));
        const qm = params.get("model") || form.dataset.model;
        if (qm) modelSel.value = qm;
      }
      const needSel = $("select[name=need]", form);
      if (needSel && params.get("need")) needSel.value = params.get("need");

      const validators = {
        name: v => v.trim().length >= 3 || "لطفاً نام و نام خانوادگی را وارد کنید.",
        phone: v => /^(\+98|0098|0)?9\d{9}$|^0\d{2,3}-?\d{7,8}$/.test(toEnDigits(v).replace(/[\s-]/g, "")) || "شمارهٔ تماس معتبر نیست؛ مثال: ۰۹۱۲۱۲۳۴۵۶۷",
        email: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "نشانی ایمیل معتبر نیست."
      };
      const check = input => {
        const fn = validators[input.name];
        if (!fn) return true;
        const res = fn(input.value);
        const field = input.closest(".field");
        const err = $(".error", field);
        if (res === true) { field.classList.remove("has-error"); input.removeAttribute("aria-invalid"); return true; }
        field.classList.add("has-error"); input.setAttribute("aria-invalid", "true"); if (err) err.textContent = res; return false;
      };
      $$("input", form).forEach(inp => inp.addEventListener("blur", () => { if (inp.value) check(inp); }));
      // bound field sizes so a submission stays a small, well-formed message
      const limits = { name: 80, phone: 20, email: 120, message: 1000 };
      $$("input[name], textarea[name]", form).forEach(el => { if (!el.maxLength || el.maxLength < 0) el.maxLength = limits[el.name] || 100; });

      form.addEventListener("submit", async e => {
        e.preventDefault();
        const bad = $$("input[name]", form).filter(i => !check(i));
        if (bad.length) { bad[0].focus(); return; }
        const data = Object.fromEntries(new FormData(form).entries());
        const btn = $("button[type=submit]", form);
        const label = btn.innerHTML;
        btn.disabled = true; btn.textContent = "در حال ارسال…";
        const show = (ok, msg) => {
          status.className = "form-status " + (ok ? "is-success" : "is-error");
          status.innerHTML = icon(ok ? "circle-check" : "x") + `<span>${msg}</span>`;
        };
        try {
          if (S.formEndpoint) {
            const r = await fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
            if (!r.ok) throw new Error(r.status);
            show(true, "درخواست شما ثبت شد. کارشناسان ما به‌زودی با شما تماس می‌گیرند.");
            form.reset();
          } else {
            const lines = $$("[name]", form).filter(el => el.name !== "message" && el.value).map(el => {
              const lb = el.id && $(`label[for="${el.id}"]`, form);
              const val = el.tagName === "SELECT" ? el.options[el.selectedIndex].text : el.value;
              return `${lb ? lb.textContent.replace("*", "").trim() : el.name}: ${val}`;
            });
            if (data.message) lines.push("", data.message);
            const subject = (form.dataset.subject || "استعلام قیمت") + (data.model ? " — " + data.model : "");
            if (S.email) {
              location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
              show(true, `برای ارسال، برنامهٔ ایمیل شما باز می‌شود. سریع‌تر: <a href="${WA}" ${ext}>پیام در واتس‌اپ</a> یا تماس با <a href="${TEL}">${PHONE}</a>.`);
            } else {
              // No mailbox configured: hand the request to the company's own WhatsApp
              // number instead of an address nobody reads.
              const a = document.createElement("a");
              a.href = `${WA}?text=${encodeURIComponent([subject, "", ...lines].join("\n"))}`;
              a.target = "_blank"; a.rel = "noopener noreferrer";
              document.body.appendChild(a); a.click(); a.remove();
              show(true, `پیام شما در واتس‌اپ آماده شد؛ برای ثبت درخواست، آن را در واتس‌اپ ارسال کنید. اگر باز نشد با <a href="${TEL}">${PHONE}</a> تماس بگیرید.`);
            }
          }
        } catch (err) {
          show(false, `ارسال انجام نشد. لطفاً دوباره تلاش کنید یا با <a href="${TEL}">${PHONE}</a> تماس بگیرید.`);
        } finally {
          btn.disabled = false; btn.innerHTML = label;
        }
      });
    });
  }


  /* ---------- pages ---------- */
  const pages = {};

  function segmented(root, defs, onPick) {
    root.innerHTML = defs.map(([k, label], i) => `<button type="button" data-k="${esc(k)}" aria-pressed="${i === 0}">${esc(label)}</button>`).join("");
    root.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", root).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      onPick(b.dataset.k);
    });
    onPick(defs[0][0]);
  }

  pages.home = function () {
    const grid = $("#featured");
    segmented($("#featured-tabs"), [["all", "منتخب"]].concat(Object.entries(F).map(([k, f]) => [k, f.short])), k => {
      const list = k === "all" ? P.filter(p => p.featured) : P.filter(p => p.fuel === k);
      grid.innerHTML = list.slice(0, 4).map(productCard).join("");
    });
    renderStats($("#stats"));
    renderProjects($("#projects"));
  };

  pages.products = function () {
    const state = {
      q: params.get("q") || "",
      range: (params.get("range") || "").split(",").filter(Boolean),
      fuel: (params.get("fuel") || "").split(",").filter(Boolean),
      brand: (params.get("brand") || "").split(",").filter(Boolean),
      sort: params.get("sort") || "power-asc"
    };
    const form = $("#filters");
    const groups = {
      range: R.map(r => ({ v: r.id, label: r.label, n: P.filter(p => rangeOf(p) === r).length })),
      fuel: Object.entries(F).map(([k, f]) => ({ v: k, label: f.label, n: P.filter(p => p.fuel === k).length })),
      brand: window.BRANDS.map(b => ({ v: b, label: b, n: P.filter(p => p.brand === b).length, ltr: true }))
    };
    Object.entries(groups).forEach(([key, opts]) => {
      $(`#g-${key}`).insertAdjacentHTML("beforeend", opts.map(o => `
        <label class="check"><input type="checkbox" name="${key}" value="${esc(o.v)}"${state[key].includes(o.v) ? " checked" : ""}>
          <span${o.ltr ? ' class="ltr"' : ""}>${esc(o.label)}</span><span class="count">${fa(o.n)}</span></label>`).join(""));
    });
    const qInput = $("#q"), sortSel = $("#sort");
    qInput.value = state.q; sortSel.value = state.sort;
    const labelFor = (key, v) => (groups[key].find(o => o.v === v) || {}).label || v;

    function apply() {
      const q = toEnDigits(state.q.trim().toLowerCase());
      const list = P.filter(p =>
        (!state.range.length || state.range.includes(rangeOf(p).id)) &&
        (!state.fuel.length || state.fuel.includes(p.fuel)) &&
        (!state.brand.length || state.brand.includes(p.brand)) &&
        (!q || [p.model, p.brand, p.engine, String(p.kw), String(p.kva), F[p.fuel].label].join(" ").toLowerCase().includes(q))
      ).sort((a, b) => state.sort === "power-desc" ? b.kw - a.kw : a.kw - b.kw);

      $("#count").innerHTML = `<b>${fa(list.length)}</b> مدل از ${fa(P.length)}`;
      $("#results").innerHTML = list.map(productCard).join("");
      $("#empty").hidden = !!list.length;

      const chips = [];
      ["range", "fuel", "brand"].forEach(k => state[k].forEach(v => chips.push({ k, v, label: labelFor(k, v) })));
      if (state.q) chips.push({ k: "q", v: state.q, label: `«${state.q}»` });
      $("#chips").innerHTML = chips.map(c => `<button type="button" class="chip" data-k="${esc(c.k)}" data-v="${esc(c.v)}" aria-label="حذف فیلتر ${esc(c.label)}">${esc(c.label)}${icon("x")}</button>`).join("");

      const tokens = ["range", "fuel"].filter(k => state[k].length).map(k => `${k}-${state[k].join(".")}`);
      try { history.replaceState(null, "", location.pathname + location.search + (tokens.length ? "#" + tokens.join("~") : "")); } catch (err) { /* sandboxed hosts */ }
    }

    form.addEventListener("change", e => {
      const t = e.target;
      if (t.type === "checkbox") state[t.name] = $$(`input[name=${t.name}]:checked`, form).map(i => i.value);
      apply();
    });
    let timer;
    qInput.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { state.q = qInput.value; apply(); }, 200); });
    sortSel.addEventListener("change", () => { state.sort = sortSel.value; apply(); });
    $("#chips").addEventListener("click", e => {
      const c = e.target.closest(".chip"); if (!c) return;
      const { k, v } = c.dataset;
      if (k === "q") { state.q = ""; qInput.value = ""; }
      else { state[k] = state[k].filter(x => x !== v); const cb = $(`input[name=${k}][value="${CSS.escape(v)}"]`, form); if (cb) cb.checked = false; }
      apply();
    });
    const reset = () => {
      state.q = ""; state.range = []; state.fuel = []; state.brand = [];
      qInput.value = ""; $$("input[type=checkbox]", form).forEach(i => (i.checked = false));
      apply();
    };
    $("#reset").addEventListener("click", reset);
    $("#empty-reset").addEventListener("click", reset);
    const toggle = $("#filters-toggle");
    toggle.addEventListener("click", () => {
      const open = form.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    apply();
  };

  /* product detail (generator or solar panel) */
  const row = (k, v, ltr) => v == null || v === "" ? "" : `<tr><th scope="row">${k}</th><td>${ltr ? `<span class="ltr">${v}</span>` : v}</td></tr>`;
  const table = (ic, cap, rows) => `<section class="spec"><h3>${icon(ic)}${cap}</h3><div class="panel"><table><tbody>${rows}</tbody></table></div></section>`;
  const cell = (label, value, unit, hl) => `<div class="stat${hl ? " hl" : ""}"><b><span class="ltr">${value}<small>${unit}</small></span></b><span>${label}</span></div>`;

  function detailShell(title, imgs, tags, intro, plate, actions, assure) {
    return `
      <div class="pd">
        <div class="gallery">
          <div class="gallery__main"><img id="g-main" src="${img(imgs[0])}" alt="${esc(title)}" width="1200" height="900"></div>
          <div class="gallery__thumbs" role="group" aria-label="تصاویر محصول">
            ${imgs.map((f, i) => `<button type="button" aria-pressed="${i === 0}" data-src="${img(f)}" aria-label="تصویر ${fa(i + 1)}"><img src="${img(f)}" alt="" loading="lazy" width="300" height="225"></button>`).join("")}
          </div>
        </div>
        <div class="pd__summary">
          <div class="pd__tags">${tags}</div>
          <p class="pd__intro">${esc(intro)}</p>
          <div class="panel"><div class="cells cells--2 plate">${plate}</div></div>
          <div class="pd__actions">${actions}</div>
          <ul class="pd__assure">${assure}</ul>
        </div>
      </div>`;
  }
  function initGallery() {
    const main = $("#g-main");
    $$(".gallery__thumbs button").forEach(b => b.addEventListener("click", () => {
      main.src = b.dataset.src;
      $$(".gallery__thumbs button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    }));
  }
  const features = list => list.map(([ic, t, d]) => `<div class="row">${icon(ic)}<div class="row__main"><span class="row__title">${esc(t)}</span><span class="row__text">${esc(d)}</span></div></div>`).join("");

  pages.product = function () {
    const id = params.get("id");
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      let target = null;
      try { target = a && a.getAttribute("href").length > 1 && document.querySelector(a.getAttribute("href")); } catch (err) { target = null; }
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }
    });
    const solar = SP.find(x => x.id === id);
    if (solar) return solarProductPage(solar);
    const p = P.find(x => x.id === id);
    if (!p) {
      $("#pd-title").textContent = "محصول پیدا نشد";
      $("#product").innerHTML = `<div class="panel empty">${icon("search")}<h3>این مدل در فهرست نیست</h3><div class="actions"><a class="btn" href="products.html">همهٔ ژنراتورها</a></div></div>`;
      $$(".pd-only").forEach(el => el.remove());
      return;
    }
    const gas = p.fuel === "gas";
    const title = productTitle(p);
    document.title = `${p.model} — ${title} | ${S.name}`;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = `${title} مدل ${p.model}، موتور ${p.engine}، ${p.kw} کیلووات؛ مشخصات فنی و استعلام قیمت از ${S.name}.`;
    $("#pd-kicker").textContent = `${F[p.fuel].label} · ${p.execution}`;
    $("#pd-title").innerHTML = `<span class="ltr">${esc(p.brand)}</span> ${fa(p.kw)} کیلووات`;
    $("#pd-crumb").textContent = p.model;
    $("#pd-sub").textContent = `مدل ${p.model} · موتور ${p.engine}`;

    $("#product").innerHTML = detailShell(title, p.images,
      `<span class="tag">${esc(F[p.fuel].label)}</span><span class="tag">روباز</span><span class="tag">${esc(p.warranty)}</span>`,
      p.intro,
      cell("توان پیوسته (Prime)", fa(p.kw), "kW", true) + cell("توان ظاهری", fa(p.kva), "kVA") +
      (gas ? cell("راندمان الکتریکی", fa1(p.effEl), "%") + cell("مصرف گاز در بار کامل", fa(p.gas100), "m³/h")
           : cell("توان اضطراری", fa(p.standbyKw), "kW") + cell("مصرف سوخت در ۷۵٪ بار", fa1(p.fuel75), "L/h")),
      `<a class="btn" href="#quote">استعلام قیمت</a><a class="btn btn--secondary" href="${WA}" ${ext}>واتس‌اپ</a>`,
      `<li>${icon("circle-check")}نصب، راه‌اندازی و تست بار</li><li>${icon("circle-check")}سرویس دوره‌ای و قطعات اصلی</li>`);
    initGallery();

    $("#specs").innerHTML = `
      ${table("zap", "الکتریکی",
        row("توان پیوسته (Prime)", `${fa(p.kw)} kW / ${fa(p.kva)} kVA`, true) +
        (gas ? "" : row("توان اضطراری (Standby)", `${fa(p.standbyKw)} kW`, true)) +
        row("ولتاژ خروجی", esc(p.voltage), true) + row("فرکانس", esc(p.frequency), true) +
        row("فاز", esc(p.phase)) + row("ضریب توان", esc(p.pf), true) + row("سرعت", `${fa(p.rpm)} دور در دقیقه`))}
      ${table("settings", "موتور",
        row("مدل موتور", esc(p.engine), true) + row("سازنده", esc(p.brand), true) +
        row("سوخت", gas ? "گاز طبیعی" : "گازوئیل") + row("آرایش سیلندر", esc(p.cylinders)) +
        row("حجم موتور", `${fa1(p.displacement)} لیتر`) + row("سیستم تنفس", esc(p.aspiration)) + row("خنک‌کاری", esc(p.cooling)))}
      ${gas
        ? table("flame", "سوخت گاز",
            row("مصرف گاز در بار کامل", `${fa(p.gas100)} مترمکعب نرمال در ساعت`) +
            row("راندمان الکتریکی", `${fa1(p.effEl)}٪`) + row("فشار گاز ورودی", esc(p.gasPressure)))
        : table("fuel", "سوخت",
            row("مصرف در ۷۵٪ بار", `${fa1(p.fuel75)} لیتر در ساعت`) + row("مصرف در ۱۰۰٪ بار", `${fa1(p.fuel100)} لیتر در ساعت`) +
            row("ظرفیت مخزن", `${fa(p.tank)} لیتر`) + row("کارکرد با مخزن پر (۷۵٪)", `حدود ${fa1(p.tank / p.fuel75)} ساعت`))}
      ${table("cpu", "آلترناتور و کنترل",
        row("آلترناتور", esc(p.alternator), true) + row("کنترلر", esc(p.controller), true) + row("تابلو ATS", p.ats ? "دارد / قابل سفارش" : "اختیاری"))}
      ${table("ruler", "ابعاد و وزن",
        row("نوع اجرا", esc(p.execution)) +
        row("ابعاد (طول × عرض × ارتفاع)", `<span class="ltr">${p.dims.map(fa).join(" × ")}</span> میلی‌متر`) +
        row("وزن", `${fa(p.weight)} کیلوگرم`))}
      ${table("shield-check", "گارانتی و خدمات",
        row("گارانتی", esc(p.warranty)) + row("نصب و راه‌اندازی", "دارد") + row("قرارداد سرویس دوره‌ای", "قابل ارائه"))}`;
    const note = $("#spec-note");
    if (note) note.textContent = "مقادیر مصرف سوخت تقریبی و در شرایط استاندارد هستند.";

    $("#features").innerHTML = features([
      ["refresh-cw", "روشن‌شدن خودکار", "با تابلو ATS، هنگام قطع شبکه خودکار روشن می‌شود."],
      ["activity", "کنترلر دیجیتال", `نمایش وضعیت و خطاها با ${p.controller}.`],
      ["shield-check", "حفاظت کامل", "توقف خودکار در دمای بالا، فشار روغن پایین و اضافه‌بار."],
      gas ? ["flame", "خط گاز و رگولاتور", "اجرای خط گاز، رگولاتور و شیر قطع اضطراری."]
          : ["calendar-clock", "پایش از راه دور", "ماژول GSM یا اترنت برای گزارش وضعیت."]
    ]);

    const related = P.filter(x => x.id !== p.id).sort((a, b) =>
      (a.fuel === p.fuel ? 0 : 1) - (b.fuel === p.fuel ? 0 : 1) || Math.abs(a.kw - p.kw) - Math.abs(b.kw - p.kw)).slice(0, 3);
    $("#related").innerHTML = related.map(productCard).join("");
    const qf = $("form[data-quote]");
    if (qf) qf.dataset.model = p.model;
  };

  function solarProductPage(p) {
    const title = panelTitle(p);
    document.title = `${p.model} — ${title} | ${S.name}`;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = `${title} مدل ${p.model}، ${p.cell}، راندمان ${p.eff}٪؛ مشخصات فنی و استعلام قیمت از ${S.name}.`;
    $("#pd-kicker").textContent = "پنل خورشیدی";
    $("#pd-title").innerHTML = `${esc(title)}`;
    $("#pd-crumb").textContent = p.model;
    $("#pd-sub").textContent = `مدل ${p.model} · ${p.cell}`;
    const cat = $("#pd-cat"); if (cat) { cat.href = "solar.html"; cat.textContent = "انرژی خورشیدی"; }

    $("#product").innerHTML = detailShell(title, p.images,
      `<span class="tag"><span class="ltr">${esc(p.cellEn)}</span></span>${p.bifacial ? `<span class="tag">دوطرفه</span>` : ""}<span class="tag">${esc(p.warranty)}</span>`,
      p.intro,
      cell("توان نامی", fa(p.watt), "Wp", true) + cell("راندمان", fa1(p.eff), "%") +
      cell("ولتاژ مدار باز", fa1(p.voc), "V") + cell("جریان اتصال کوتاه", fa1(p.isc), "A"),
      `<a class="btn" href="#quote">استعلام قیمت</a><a class="btn btn--secondary" href="solar.html#calc">برآورد تولید برق</a>`,
      `<li>${icon("circle-check")}طراحی، نصب و راه‌اندازی نیروگاه</li><li>${icon("circle-check")}پایش تولید از راه دور</li>`);
    initGallery();

    $("#specs").innerHTML = `
      ${table("zap", "الکتریکی (STC)",
        row("توان نامی (Pmax)", `${fa(p.watt)} W`, true) + row("ولتاژ در توان بیشینه (Vmp)", `${fa1(p.vmp)} V`, true) +
        row("جریان در توان بیشینه (Imp)", `${fa1(p.imp)} A`, true) + row("ولتاژ مدار باز (Voc)", `${fa1(p.voc)} V`, true) +
        row("جریان اتصال کوتاه (Isc)", `${fa1(p.isc)} A`, true) + row("راندمان پنل", `${fa1(p.eff)}٪`) + row("تلورانس توان", esc(p.tol), true))}
      ${table("layers", "مکانیکی",
        row("نوع سلول", esc(p.cell)) + row("تعداد سلول", esc(p.cells)) +
        row("ابعاد (طول × عرض × ضخامت)", `<span class="ltr">${p.dims.map(fa).join(" × ")}</span> میلی‌متر`) +
        row("وزن", `${fa1(p.weight)} کیلوگرم`) + row("شیشه", esc(p.glass)) + row("قاب", esc(p.frame)) +
        row("جعبه اتصال / کانکتور", `${esc(p.jbox)} / ${esc(p.connector)}`, true))}
      ${table("thermometer", "شرایط کاری",
        row("ضریب دمایی Pmax", `${fa2(p.tempPmax)}٪ بر درجه`) + row("دمای نامی کار سلول (NOCT)", `${fa(p.noct)} °C`, true) +
        row("حداکثر ولتاژ سیستم", `${fa(p.maxV)} V DC`, true) + row("تحمل بار مکانیکی", esc(p.load)))}
      ${table("shield-check", "گارانتی", row("گارانتی", esc(p.warranty)) + row("کاربرد", "آن‌گرید، آف‌گرید و نیروگاه صنعتی"))}`;
    const note = $("#spec-note");
    if (note) note.textContent = "مقادیر الکتریکی در شرایط استاندارد آزمون (STC) هستند.";
    $("#features").innerHTML = features([
      ["layers", "طراحی نیم‌سلول", "تلفات کمتر و افت کمتر در سایهٔ جزئی."],
      ["thermometer", "ضریب دمایی پایین", `افت ${fa2(Math.abs(p.tempPmax))}٪ به ازای هر درجه.`],
      ["wind", "تحمل باد و برف", p.load],
      p.bifacial ? ["sun", "تولید از دو طرف", "سطح پشتی، نور بازتابی زمین را هم جذب می‌کند."] : ["sun", "شیشهٔ ضدانعکاس", "جذب بیشتر نور در صبح و عصر."]
    ]);
    $("#related").innerHTML = SP.filter(x => x.id !== p.id).sort((a, b) => Math.abs(a.watt - p.watt) - Math.abs(b.watt - p.watt)).slice(0, 3).map(solarCard).join("");
    const relLink = $("#related-link"); if (relLink) { relLink.href = "solar.html#panels"; relLink.firstChild.textContent = "همهٔ پنل‌ها"; }
    const qf = $("form[data-quote]");
    if (qf) { qf.dataset.model = p.model; qf.dataset.subject = "استعلام قیمت پنل خورشیدی"; }
  }

  pages.solar = function () {
    $("#systems").innerHTML = window.SOLAR_SYSTEMS.map(s => `
      <article class="card">
        <div class="card__media card__media--wide"><img src="${img(s.img)}" alt="" loading="lazy" width="1200" height="800"></div>
        <div class="card__body">
          <span class="card__kicker">${esc(s.tag)}</span>
          <h3 class="card__title"><a href="#quote" data-system="${esc(s.key)}">${esc(s.title)}</a></h3>
          <p class="card__text">${esc(s.text)}</p>
        </div>
      </article>`).join("");
    $("#panels-grid").innerHTML = SP.map(solarCard).join("");
    renderFaq($("#faq"), window.SOLAR_FAQ);

    const sysSel = $("#s-system");
    sysSel.insertAdjacentHTML("beforeend", window.SOLAR_SYSTEMS.map(s => `<option value="${esc(s.key)}">${esc(s.title)} (${esc(s.tag)})</option>`).join(""));
    $("#systems").addEventListener("click", e => { const t = e.target.closest("[data-system]"); if (t) sysSel.value = t.dataset.system; });

    const C = window.SOLAR_CALC;
    const reg = $("#c-region"), kwIn = $("#c-kw"), priceIn = $("#c-price");
    reg.innerHTML = C.regions.map((r, i) => `<option value="${r.v}"${i === 1 ? " selected" : ""}>${esc(r.label)}</option>`).join("");
    const out = k => $(`[data-out="${k}"]`);
    let last = null;
    function calc() {
      const kw = num(kwIn.value), psh = parseFloat(reg.value), price = num(priceIn.value);
      if (kw <= 0) { ["year", "month", "land", "value"].forEach(k => (out(k).textContent = "—")); last = null; return; }
      const year = kw * psh * 365 * C.pr;
      const ha = (kw / 1000) * C.hectarePerMW;
      out("year").textContent = fa(Math.round(year));
      out("month").textContent = `${fa(Math.round(year / 12))} کیلووات‌ساعت`;
      out("land").textContent = `${ha < 0.1 ? fa2(ha) : fa1(ha)} هکتار (${fa(Math.round(ha * 10000))} مترمربع)`;
      out("value").textContent = price > 0 ? `${fa(Math.round((year * price) / 1e6))} میلیون تومان` : "—";
      last = { kw, year };
    }
    [kwIn, priceIn].forEach(el => el.addEventListener("input", calc));
    reg.addEventListener("change", calc);
    calc();
    $("#calc-cta").addEventListener("click", () => {
      if (last) {
        $("#s-kw").value = fa(last.kw);
        $("#s-msg").value = `برآورد ماشین‌حساب: ${fa(last.kw)} کیلووات، حدود ${fa(Math.round(last.year))} کیلووات‌ساعت در سال.`;
      }
      $("#quote").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  pages.energy = function () {
    const E = window.ENERGY;
    $("#plans-grid").innerHTML = window.ENERGY_PLANS.map(pl => `
      <div class="plan">
        <span class="plan__icon">${icon(pl.icon)}</span>
        <span class="card__kicker">${esc(pl.tag)}</span>
        <h3>${esc(pl.title)}</h3>
        <p>${esc(pl.text)}</p>
        <ul>${pl.points.map(x => `<li>${icon("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
        ${pl.key === "free"
          ? `<a class="link" href="${TG}" ${ext}>ربات تلگرام برق آزاد${icon("chevron-left")}</a>`
          : `<a class="link" href="#quote" data-plan="${esc(pl.key)}">درخواست ${esc(pl.title)}${icon("chevron-left")}</a>`}
      </div>`).join("");
    $("#energy-steps").innerHTML = window.ENERGY_STEPS.map((s, i) => `<div class="row"><span class="row__num">${fa(i + 1)}</span><span class="row__title">${esc(s)}</span></div>`).join("");
    renderFaq($("#faq"), window.ENERGY_FAQ);

    const typeSel = $("#e-type");
    document.addEventListener("click", e => { const b = e.target.closest("[data-plan]"); if (b) typeSel.value = b.dataset.plan; });

    const dIn = $("#el-demand"), mIn = $("#el-kwh"), res = $("#el-result");
    function check() {
      const d = num(dIn.value);
      if (!d) { res.className = "elig__result"; res.innerHTML = `${icon("clipboard-list")}<span>دیماند قراردادی را از قبض برق وارد کنید.</span>`; return; }
      if (d >= E.minDemand) {
        const m = num(mIn.value);
        res.className = "elig__result is-ok";
        res.innerHTML = `${icon("circle-check")}<span><b>دیماند ${fa(d)} کیلووات: مشمول خرید برق از بورس.</b>${m ? `مصرف سالانه حدود ${fa(Math.round(m * 12 / 1000))} مگاوات‌ساعت.` : ""}</span>`;
      } else {
        res.className = "elig__result is-no";
        res.innerHTML = `${icon("sun")}<span><b>دیماند کمتر از ${fa(E.minDemand)} کیلووات است.</b><a href="solar.html">نیروگاه خورشیدی پشت‌بامی</a> را بررسی کنید.</span>`;
      }
    }
    dIn.addEventListener("input", check); mIn.addEventListener("input", check); check();
    $("#el-cta").addEventListener("click", () => {
      if (dIn.value) $("#e-demand").value = dIn.value;
      if (mIn.value) $("#e-kwh").value = mIn.value;
      $("#quote").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  pages.services = function () {
    const rail = $("#svc-rail"), modal = $("#svc-modal");
    rail.innerHTML = window.SERVICES.map((s, i) => `
      <article class="xcard" role="listitem"${s.id ? ` id="${esc(s.id)}"` : ""}>
        <img src="${img(s.img)}" alt="" loading="lazy" width="1200" height="900">
        <div class="xcard__text"><span class="xcard__kicker">${esc(s.kicker)}</span><h3 class="xcard__title">${esc(s.headline)}</h3></div>
        <button type="button" class="xcard__more" data-i="${i}" aria-label="بیشتر دربارهٔ ${esc(s.title)}" aria-haspopup="dialog">${icon("plus")}</button>
      </article>`).join("");
    const stepW = () => { const c = $(".xcard", rail); return c ? c.getBoundingClientRect().width + 18 : 320; };
    $$(".rail-btn").forEach(b => b.addEventListener("click", () => {
      rail.scrollBy({ left: (b.dataset.dir === "next" ? -1 : 1) * stepW(), behavior: reduceMotion ? "auto" : "smooth" });
    }));
    let opener = null;
    rail.addEventListener("click", e => {
      const b = e.target.closest(".xcard__more"); if (!b) return;
      const s = window.SERVICES[+b.dataset.i];
      opener = b;
      $("#svc-m-img").src = img(s.img);
      $("#svc-m-kicker").textContent = s.kicker;
      $("#svc-m-title").textContent = s.title;
      $("#svc-m-text").textContent = s.text;
      $("#svc-m-points").innerHTML = s.points.map(x => `<li>${icon("check")}<span>${esc(x)}</span></li>`).join("");
      const cta = $("#svc-m-cta");
      if (s.link) { cta.href = s.link; cta.textContent = "مشاهدهٔ صفحه"; }
      else { cta.href = "contact.html#quote"; cta.textContent = "درخواست این خدمت"; }
      if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
    });
    const close = () => { modal.close ? modal.close() : modal.removeAttribute("open"); };
    $("#svc-m-close").addEventListener("click", close);
    modal.addEventListener("click", e => { if (e.target === modal) close(); });
    modal.addEventListener("close", () => opener && opener.focus());
  };

  pages.about = function () {
    renderStats($("#stats"));
    renderProjects($("#projects"));
    $("#brands").innerHTML = window.BRANDS.map(b => `<li>${esc(b)}</li>`).join("");
  };

  pages.contact = function () {
    if (params.get("model") || params.get("need")) setTimeout(() => $("#quote").scrollIntoView(), 0);
  };

  /* ---------- boot ---------- */
  $$("form:not([data-quote])").forEach(f => f.addEventListener("submit", e => e.preventDefault()));
  renderLayout();
  fillContactBits();
  if (pages[page]) pages[page]();
  initForms();
})();
