/* ==========================================================================
   داتیس آوان نیرو — shared layout + page scripts
   Pages are selected by <body data-page="...">
   ========================================================================== */
(function () {
  "use strict";

  const S = window.SITE, P = window.PRODUCTS, T = window.TYPES, R = window.RANGES;
  const SP = window.SOLAR_PANELS || [];
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  const nf = new Intl.NumberFormat("fa-IR");
  const nf1 = new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 1 });
  const fa = n => nf.format(n);
  const fa1 = n => nf1.format(n);
  const faDigits = s => String(s).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const toEnDigits = s => String(s).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (name, cls = "") => `<svg class="icon ${cls}" aria-hidden="true" focusable="false"><use href="#i-${name}"></use></svg>`;
  const img = f => `assets/img/${f}`;
  const tel = n => "tel:" + toEnDigits(n).replace(/[^\d+]/g, "");
  const kw = kva => Math.round(kva * 0.8);
  const rangeOf = p => R.find(r => p.standby > r.min && p.standby <= r.max) || R[R.length - 1];
  const productUrl = p => `product.html#id-${p.id}`;
  // Page state comes from the query string or from hash tokens like #type-silent~range-r2
  // (the hash form also works on hosts that strip the query string).
  const params = (() => {
    const q = new URLSearchParams(location.search);
    location.hash.slice(1).split("~").forEach(t => {
      const i = t.indexOf("-"), k = t.slice(0, i);
      if (i > 0 && ["id", "type", "range", "model", "brand", "need"].includes(k)) q.set(k, decodeURIComponent(t.slice(i + 1)).replace(/\./g, ",").replace(/_/g, " "));
    });
    return q;
  })();
  const productTitle = p => `دیزل ژنراتور ${fa(p.standby)} کیلوولت‌آمپر ${p.brand}`;

  /* ---------- layout ---------- */
  const NAV = [
    { href: "index.html", page: "home", label: "خانه" },
    { href: "products.html", page: "products", label: "دیزل ژنراتور" },
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

    const navLinks = NAV.map(n => `<li><a href="${n.href}"${n.page === activePage ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("");

    const header = $("#site-header");
    if (header) header.outerHTML = `
      <header class="site-header" id="top">
        <div class="header-bar">
          <a class="brand" href="index.html" aria-label="${esc(S.name)} — صفحهٔ اصلی">
            <img src="assets/img/logo/h1.png" alt="${esc(S.name)}" width="720" height="193">
          </a>
          <nav class="nav" aria-label="منوی اصلی"><ul>${navLinks}</ul></nav>
          <div class="header-actions">
            <a class="header-phone" href="${tel(S.phone)}">${icon("phone")}<span class="ltr">${faDigits(S.phone)}</span></a>
            <a class="btn btn--primary" href="contact.html#quote">استعلام قیمت</a>
          </div>
          <button class="menu-btn" type="button" aria-label="باز کردن منو" aria-expanded="false" aria-controls="drawer">${icon("menu")}</button>
        </div>
      </header>
      <div class="drawer" id="drawer" aria-hidden="true">
        <div class="drawer__scrim" data-close></div>
        <div class="drawer__panel" role="dialog" aria-modal="true" aria-label="منو">
          <div class="drawer__top">
            <img src="assets/img/logo/h1.png" alt="${esc(S.name)}" width="720" height="193">
            <button class="menu-btn" type="button" data-close aria-label="بستن منو">${icon("x")}</button>
          </div>
          <nav aria-label="منوی موبایل">
            ${NAV.map(n => `<a href="${n.href}"${n.page === activePage ? ' aria-current="page"' : ""}>${n.label}${icon("chevron-left")}</a>`).join("")}
          </nav>
          <div class="drawer__contact">
            <a class="btn btn--primary btn--block" href="contact.html#quote">${icon("file-text")}استعلام قیمت</a>
            <a class="btn btn--ghost btn--block" href="${tel(S.phone)}">${icon("phone")}<span class="ltr num">${faDigits(S.phone)}</span></a>
          </div>
        </div>
      </div>`;

    const footer = $("#site-footer");
    if (footer) footer.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div>
              <img src="assets/img/logo/h2.png" alt="${esc(S.name)}" width="720" height="193" loading="lazy">
              <p>${esc(S.tagline)}؛ از مشاوره و انتخاب توان تا نصب، راه‌اندازی و خدمات پس از فروش همراه شما هستیم.</p>
            </div>
            <a class="cta-pair" href="contact.html#quote"><span class="btn btn--white">درخواست مشاورهٔ رایگان</span><span class="cta-pair__arrow">${icon("arrow-left")}</span></a>
          </div>
          <div class="footer-grid">
            <div>
              <h4>دسترسی سریع</h4>
              <ul>${NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul>
            </div>
            <div>
              <h4>دیزل ژنراتور</h4>
              <ul>
                ${Object.entries(T).map(([k, t]) => `<li><a href="products.html#type-${k}">ژنراتور ${t.short}</a></li>`).join("")}
                <li><a href="services.html#rental">اجارهٔ ژنراتور</a></li>
              </ul>
            </div>
            <div>
              <h4>انرژی</h4>
              <ul>
                <li><a href="solar.html">نیروگاه و پنل خورشیدی</a></li>
                <li><a href="solar.html#calc">محاسبهٔ ظرفیت خورشیدی</a></li>
                <li><a href="energy.html">برق عادی از بورس</a></li>
                <li><a href="energy.html#plans">برق سبز و برق آزاد</a></li>
              </ul>
            </div>
            <div>
              <h4>ارتباط با ما</h4>
              <ul>
                <li><span>${icon("map-pin")}${esc(S.address)}</span></li>
                <li><a href="${tel(S.phone)}">${icon("phone")}<span class="ltr">${faDigits(S.phone)}</span></a></li>
                <li><a href="${tel(S.mobile)}">${icon("message-circle")}<span class="ltr">${faDigits(S.mobile)}</span></a></li>
                <li><a href="mailto:${esc(S.email)}">${icon("mail")}<span class="ltr">${esc(S.email)}</span></a></li>
                <li><span>${icon("clock")}${esc(S.hours)}</span></li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${fa(new Date().getFullYear())} ${esc(S.name)} — تمامی حقوق محفوظ است.</span>
            <a href="credits.html">منابع تصاویر</a>
          </div>
        </div>
      </footer>
      <div class="fab-bar">
        <a class="btn btn--light" href="${tel(S.phone)}">${icon("phone")}تماس</a>
        <a class="btn btn--primary" href="contact.html#quote">${icon("file-text")}استعلام قیمت</a>
      </div>`;

    initHeader();
  }

  function initHeader() {
    const header = $(".site-header");
    const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const drawer = $("#drawer");
    const openBtn = $(".site-header .menu-btn");
    if (!drawer || !openBtn) return;
    const focusables = () => $$("a, button", drawer);
    const open = () => {
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      openBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      setTimeout(() => focusables()[0]?.focus(), 50);
    };
    const close = () => {
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      openBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      openBtn.focus();
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
  function productCard(p) {
    return `
      <article class="pcard">
        <div class="pcard__media">
          <img src="${img(p.images[0])}" alt="${esc(productTitle(p))}" loading="lazy" width="1200" height="900">
          <span class="pcard__type">${T[p.type].short}</span>
          <span class="bubble" aria-hidden="true">${icon("arrow-left")}</span>
        </div>
        <div class="pcard__body">
          <div class="pcard__head">
            <div>
              <span class="pcard__model">${esc(p.model)}</span>
              <h3><a href="${productUrl(p)}">${esc(productTitle(p))}</a></h3>
            </div>
            <div class="pcard__kva"><b>${fa(p.standby)}</b><small>kVA</small></div>
          </div>
          <ul class="pchips" aria-label="مشخصات کلیدی">
            <li>${icon("settings")}<span class="ltr">${esc(p.brand)}</span></li>
            <li>${icon("zap")}<span>Prime <span class="ltr">${fa(p.prime)} kVA</span></span></li>
            <li>${icon("fuel")}<span>${fa1(p.fuel75)} لیتر/ساعت</span></li>
            ${p.noise ? `<li>${icon("volume-2")}<span class="ltr">${fa(p.noise)} dB(A)</span></li>` : ""}
          </ul>
          <div class="pcard__foot">
            <span class="link-arrow">مشخصات کامل${icon("arrow-left")}</span>
            <a class="btn btn--ghost btn--sm" href="contact.html#model-${p.model}" aria-label="استعلام قیمت ${esc(p.model)}">استعلام قیمت</a>
          </div>
        </div>
      </article>`;
  }

  const panelTitle = p => `پنل خورشیدی ${fa(p.watt)} وات ${p.bifacial ? "دوطرفه" : "مونوکریستال"}`;

  function solarCard(p) {
    return `
      <article class="pcard">
        <div class="pcard__media">
          <img src="${img(p.images[0])}" alt="${esc(panelTitle(p))}" loading="lazy" width="1200" height="795">
          <span class="pcard__type">${p.bifacial ? "دوطرفه" : "تک‌رو"}</span>
          <span class="bubble" aria-hidden="true">${icon("arrow-left")}</span>
        </div>
        <div class="pcard__body">
          <div class="pcard__head">
            <div>
              <span class="pcard__model">${esc(p.model)}</span>
              <h3><a href="${productUrl(p)}">${esc(panelTitle(p))}</a></h3>
            </div>
            <div class="pcard__kva"><b>${fa(p.watt)}</b><small>Wp</small></div>
          </div>
          <ul class="pchips" aria-label="مشخصات کلیدی">
            <li>${icon("sun")}<span class="ltr">${esc(p.cellEn)}</span></li>
            <li>${icon("gauge")}<span>راندمان ${fa1(p.eff)}٪</span></li>
            <li>${icon("shield-check")}<span>${fa(p.warrantyPower)} سال گارانتی توان</span></li>
          </ul>
          <div class="pcard__foot">
            <span class="link-arrow">مشخصات کامل${icon("arrow-left")}</span>
            <a class="btn btn--ghost btn--sm" href="contact.html#model-${p.model}~need-solar" aria-label="استعلام قیمت ${esc(p.model)}">استعلام قیمت</a>
          </div>
        </div>
      </article>`;
  }

  function initReveal() {
    const els = $$(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("is-in")); return; }
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }

  function countUp(el, to, suffix) {
    const fmt = v => `<span class="ltr">${fa(v)}<small>${esc(faDigits(suffix))}</small></span>`;
    const done = () => { el.innerHTML = fmt(to); };
    if (reduceMotion || !("IntersectionObserver" in window)) return done();
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1200;
      const step = t => {
        const k = Math.min(1, (t - t0) / dur), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
        el.innerHTML = fmt(v);
        if (k < 1) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
  }

  function renderStats(root) {
    if (!root) return;
    root.innerHTML = S.stats.map(s => `<li><strong data-to="${s.value}" data-suffix="${esc(s.suffix)}"><span class="ltr">${fa(s.value)}<small>${esc(faDigits(s.suffix))}</small></span></strong><span>${esc(s.label)}</span></li>`).join("");
    $$("strong", root).forEach(el => countUp(el, +el.dataset.to, el.dataset.suffix));
  }

  function renderServices(root, limit) {
    if (!root) return;
    const list = limit ? window.SERVICES.slice(0, limit) : window.SERVICES;
    root.innerHTML = list.map((s, i) => `
      <article class="service reveal"${s.title.includes("اجاره") ? ' id="rental"' : ""}>
        <div class="service__head"><span class="service__icon">${icon(s.icon)}</span><span class="service__num" aria-hidden="true">${fa(i + 1).padStart(2, "۰")}</span></div>
        <h3>${esc(s.title)}</h3>
        <p>${esc(s.text)}</p>
        <ul>${s.points.map(pt => `<li>${icon("check")}<span>${esc(pt)}</span></li>`).join("")}</ul>
      </article>`).join("");
  }

  function renderProjects(root) {
    if (!root) return;
    root.innerHTML = window.PROJECTS.map(pr => `
      <article class="project reveal">
        <img src="${img(pr.img)}" alt="${esc(pr.title)}" loading="lazy" width="1200" height="900">
        <div class="project__row"><h3>${esc(pr.title)}</h3><span class="project__power">${esc(pr.power)}</span></div>
        <div class="project__meta">${icon("map-pin")}${esc(pr.place)}</div>
        <p>${esc(pr.text)}</p>
      </article>`).join("");
  }

  function renderFaq(root, list = window.FAQ) {
    if (!root) return;
    root.innerHTML = list.map((f, i) => `
      <details${i === 0 ? " open" : ""}>
        <summary>${esc(f.q)}${icon("chevron-down")}</summary>
        <div><p>${esc(f.a)}</p></div>
      </details>`).join("");
  }

  function fillContactBits() {
    $$("[data-tel]").forEach(el => { if (S[el.dataset.tel]) el.href = tel(S[el.dataset.tel]); });
    $$("[data-site]").forEach(el => {
      const key = el.dataset.site, v = S[key];
      if (v == null) return;
      if (key === "phone" || key === "mobile") { el.textContent = faDigits(v); if (el.tagName === "A") el.href = tel(v); }
      else if (key === "email") { el.textContent = v; if (el.tagName === "A") el.href = "mailto:" + v; }
      else if (key === "whatsapp") { if (el.tagName === "A") el.href = "https://wa.me/" + v; }
      else if (key === "instagram") { if (el.tagName === "A") el.href = v; }
      else el.textContent = v;
    });
  }

  /* ---------- forms ---------- */
  function initForms() {
    $$("form[data-quote]").forEach(form => {
      const status = $(".form-status", form);
      const modelSel = $("select[name=model]", form);
      if (modelSel) {
        modelSel.insertAdjacentHTML("beforeend",
          `<optgroup label="دیزل ژنراتور">${P.map(p => `<option value="${esc(p.model)}">${esc(p.model)} — ${fa(p.standby)} kVA ${esc(p.brand)}</option>`).join("")}</optgroup>` +
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

      form.addEventListener("submit", async e => {
        e.preventDefault();
        const inputs = $$("input[name]", form);
        const bad = inputs.filter(i => !check(i));
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
            // every filled field, labelled with its visible label
            const lines = $$("[name]", form).filter(el => el.name !== "message" && el.value).map(el => {
              const lb = el.id && $(`label[for="${el.id}"]`, form);
              const val = el.tagName === "SELECT" ? el.options[el.selectedIndex].text : el.value;
              return `${lb ? lb.textContent.replace("*", "").trim() : el.name}: ${val}`;
            });
            if (data.message) lines.push("", data.message);
            const subject = (form.dataset.subject || "استعلام قیمت") + (data.model ? " — " + data.model : "");
            location.href = `mailto:${S.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
            show(true, `برای ارسال، برنامهٔ ایمیل شما باز می‌شود. اگر باز نشد، با شمارهٔ <a class="ltr num" href="${tel(S.phone)}">${faDigits(S.phone)}</a> تماس بگیرید.`);
          }
        } catch (err) {
          show(false, `ارسال انجام نشد. لطفاً دوباره تلاش کنید یا با <a class="ltr num" href="${tel(S.phone)}">${faDigits(S.phone)}</a> تماس بگیرید.`);
        } finally {
          btn.disabled = false; btn.innerHTML = label;
        }
      });
    });
  }

  /* ---------- pages ---------- */
  const pages = {};

  pages.home = function () {
    // hero: "now showing" model + engine makers
    const sp = P.find(p => p.id === S.spotlight) || P.find(p => p.featured);
    const spot = $("#spotlight");
    if (sp && spot) {
      spot.href = productUrl(sp);
      spot.innerHTML = `
        <img src="${img(sp.images[0])}" alt="" width="144" height="112">
        <span class="spotlight__text">
          <span class="spotlight__tag">پرفروش این ماه</span>
          <b><span class="ltr">${esc(sp.model)}</span> — ${fa(sp.standby)} کیلوولت‌آمپر</b>
          <small>${T[sp.type].label} • موتور <span class="ltr">${esc(sp.brand)}</span></small>
        </span>
        <span class="bubble" aria-hidden="true">${icon("arrow-left")}</span>`;
    }
    $("#engines").innerHTML = window.BRANDS.map(b => `<li>${esc(b)}</li>`).join("");
    const minKva = Math.min(...P.map(p => p.standby)), maxKva = Math.max(...P.map(p => p.standby));
    $$("[data-kva-range]").forEach(el => (el.textContent = `${fa(minKva)} تا ${fa(maxKva)}`));

    // finder bar
    const fRange = $("#f-range"), fType = $("#f-type"), fBrand = $("#f-brand");
    fRange.insertAdjacentHTML("beforeend", R.map(r => `<option value="${r.id}">${rangeLabel(r)}</option>`).join(""));
    fType.insertAdjacentHTML("beforeend", Object.entries(T).map(([k, t]) => `<option value="${k}">${t.label}</option>`).join(""));
    fBrand.insertAdjacentHTML("beforeend", window.BRANDS.map(b => `<option value="${esc(b)}">${esc(b)}</option>`).join(""));
    $("#finder-form").addEventListener("submit", e => {
      e.preventDefault();
      const t = [];
      if (fRange.value) t.push("range-" + fRange.value);
      if (fType.value) t.push("type-" + fType.value);
      if (fBrand.value) t.push("brand-" + fBrand.value.replace(/ /g, "_"));
      location.href = "products.html" + (t.length ? "#" + t.join("~") : "");
    });

    renderStats($("#stats"));

    // power scale: every model plotted on its range segment
    $("#scale").innerHTML = R.map(r => {
      const top = r.max >= 100000 ? 2500 : r.max;
      const list = P.filter(p => rangeOf(p) === r);
      const dots = list.map(p => {
        const pct = Math.max(0, Math.min(100, ((p.standby - r.min) / (top - r.min)) * 100));
        return `<a class="scale__dot" href="${productUrl(p)}" style="inset-inline-start:${pct.toFixed(1)}%" data-label="${esc(p.model)} · ${p.standby} kVA" aria-label="${esc(p.model)}، ${fa(p.standby)} کیلوولت‌آمپر"></a>`;
      }).join("");
      return `
        <div class="scale__col">
          <div class="scale__seg">${dots}</div>
          <div class="scale__ticks" aria-hidden="true"><span>${fa(r.min)}</span><span>${fa(top)} kVA</span></div>
          <span class="scale__label">${esc(r.label)}</span>
          <span class="scale__kva">${rangeLabel(r, true)}<small>kVA</small></span>
          <p>${esc(r.desc)}</p>
          <a class="link-arrow" href="products.html#range-${r.id}">${fa(list.length)} مدل${icon("arrow-left")}</a>
        </div>`;
    }).join("");

    // types bento (silent first: the most requested execution)
    const order = ["silent", "open", "container", "trailer"];
    $("#types").innerHTML = order.map(k => {
      const t = T[k];
      return `
      <a class="tile" href="products.html#type-${k}">
        <img src="${img(t.img)}" alt="" loading="lazy" width="1200" height="900">
        <div class="tile__top"><span class="tile__count">${fa(P.filter(p => p.type === k).length)} مدل</span><span class="bubble" aria-hidden="true">${icon("arrow-left")}</span></div>
        <div class="tile__body"><h3>ژنراتور ${t.label}</h3><p>${esc(t.desc)}</p></div>
      </a>`;
    }).join("");

    // featured products with type pills
    const tabs = $("#featured-tabs"), grid = $("#featured");
    const tabDefs = [["all", "منتخب", P.filter(p => p.featured).length]].concat(order.map(k => [k, T[k].short, P.filter(p => p.type === k).length]));
    tabs.innerHTML = tabDefs.map(([k, label, n], i) => `<button type="button" class="pill" data-k="${k}" aria-pressed="${i === 0}">${label}<span class="n">${fa(n)}</span></button>`).join("");
    const showFeatured = k => {
      const list = k === "all" ? P.filter(p => p.featured) : P.filter(p => p.type === k);
      grid.innerHTML = list.slice(0, 6).map(productCard).join("");
    };
    tabs.addEventListener("click", e => {
      const b = e.target.closest(".pill"); if (!b) return;
      $$(".pill", tabs).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      showFeatured(b.dataset.k);
    });
    showFeatured("all");

    // why-us accordion
    const acc = $("#why-acc");
    acc.innerHTML = window.WHY.map((w, i) => `
      <div class="acc__item">
        <button type="button" class="acc__btn" id="why-b${i}" aria-expanded="${i === 0}" aria-controls="why-p${i}">${esc(w.title)}${icon("chevron-down")}</button>
        <div class="acc__panel" id="why-p${i}" role="region" aria-labelledby="why-b${i}"${i === 0 ? "" : " hidden"}>
          <span class="acc__big">${esc(w.big)}</span>
          <p>${esc(w.text)}</p>
        </div>
      </div>`).join("");
    acc.addEventListener("click", e => {
      const b = e.target.closest(".acc__btn"); if (!b) return;
      $$(".acc__btn", acc).forEach(x => {
        const on = x === b;
        x.setAttribute("aria-expanded", String(on));
        $("#" + x.getAttribute("aria-controls")).hidden = !on;
      });
    });

    renderProjects($("#projects"));
    renderFaq($("#faq"));
  };

  function rangeLabel(r, bare) {
    const txt = r.max >= 100000 ? `بالای ${fa(r.min)}` : r.min === 0 ? `تا ${fa(r.max)}` : `${fa(r.min)} تا ${fa(r.max)}`;
    return bare ? txt + " " : `${r.label} (${txt} kVA)`;
  }

  pages.products = function () {
    const state = {
      q: params.get("q") || "",
      range: (params.get("range") || "").split(",").filter(Boolean),
      type: (params.get("type") || "").split(",").filter(Boolean),
      brand: (params.get("brand") || "").split(",").filter(Boolean),
      sort: params.get("sort") || "power-asc"
    };

    const form = $("#filters");
    const groups = {
      range: R.map(r => ({ v: r.id, label: rangeLabel(r), n: P.filter(p => rangeOf(p) === r).length })),
      type: Object.entries(T).map(([k, t]) => ({ v: k, label: t.label, n: P.filter(p => p.type === k).length })),
      brand: window.BRANDS.map(b => ({ v: b, label: b, n: P.filter(p => p.brand === b).length, ltr: true }))
    };
    Object.entries(groups).forEach(([key, opts]) => {
      $(`#g-${key}`).insertAdjacentHTML("beforeend", opts.map(o => `
        <label class="check"><input type="checkbox" name="${key}" value="${esc(o.v)}"${state[key].includes(o.v) ? " checked" : ""}>
          <span${o.ltr ? ' class="ltr"' : ""}>${esc(o.label)}</span><span class="count num">${fa(o.n)}</span></label>`).join(""));
    });
    const qInput = $("#q"), sortSel = $("#sort");
    qInput.value = state.q; sortSel.value = state.sort;

    const labelFor = (key, v) => (groups[key].find(o => o.v === v) || {}).label || v;

    function apply() {
      const q = toEnDigits(state.q.trim().toLowerCase());
      let list = P.filter(p =>
        (!state.range.length || state.range.includes(rangeOf(p).id)) &&
        (!state.type.length || state.type.includes(p.type)) &&
        (!state.brand.length || state.brand.includes(p.brand)) &&
        (!q || [p.model, p.brand, p.engine, String(p.standby), String(p.prime), T[p.type].label].join(" ").toLowerCase().includes(q))
      );
      const sorters = {
        "power-asc": (a, b) => a.standby - b.standby,
        "power-desc": (a, b) => b.standby - a.standby,
        "fuel-asc": (a, b) => a.fuel75 / a.prime - b.fuel75 / b.prime
      };
      list.sort(sorters[state.sort] || sorters["power-asc"]);

      $("#count").innerHTML = `${fa(list.length)} مدل <span>از ${fa(P.length)} مدل</span>`;
      $("#results").innerHTML = list.length ? list.map(productCard).join("") : "";
      $("#empty").hidden = !!list.length;

      const chips = [];
      ["range", "type", "brand"].forEach(k => state[k].forEach(v => chips.push({ k, v, label: labelFor(k, v) })));
      if (state.q) chips.push({ k: "q", v: state.q, label: `«${state.q}»` });
      $("#chips").innerHTML = chips.map(c => `<button type="button" class="chip" data-k="${c.k}" data-v="${esc(c.v)}" aria-label="حذف فیلتر ${esc(c.label)}">${esc(c.label)}${icon("x")}</button>`).join("");

      const out = new URLSearchParams();
      if (state.q) out.set("q", state.q);
      ["range", "type", "brand"].forEach(k => state[k].length && out.set(k, state[k].join(",")));
      if (state.sort !== "power-asc") out.set("sort", state.sort);
      const tokens = ["range", "type"].filter(k => state[k].length).map(k => `${k}-${state[k].join(".")}`);
      try { history.replaceState(null, "", location.pathname + location.search + (tokens.length ? "#" + tokens.join("~") : "")); } catch (err) { /* sandboxed hosts */ }
    }

    form.addEventListener("change", e => {
      const t = e.target;
      if (t.type === "checkbox") state[t.name] = $$(`input[name=${t.name}]:checked`, form).map(i => i.value);
      apply();
    });
    let timer;
    qInput.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { state.q = qInput.value; apply(); }, 200); });
    form.addEventListener("submit", e => e.preventDefault());
    sortSel.addEventListener("change", () => { state.sort = sortSel.value; apply(); });
    $("#chips").addEventListener("click", e => {
      const c = e.target.closest(".chip"); if (!c) return;
      const { k, v } = c.dataset;
      if (k === "q") { state.q = ""; qInput.value = ""; }
      else { state[k] = state[k].filter(x => x !== v); const cb = $(`input[name=${k}][value="${CSS.escape(v)}"]`, form); if (cb) cb.checked = false; }
      apply();
    });
    const reset = () => {
      state.q = ""; state.range = []; state.type = []; state.brand = [];
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

  pages.product = function () {
    const id = params.get("id");
    // in-page links (tabs, "#quote") scroll without replacing the #id-… token
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href^="#"]');
      const target = a && a.getAttribute("href").length > 1 && document.querySelector(a.getAttribute("href"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }); }
    });
    const solar = SP.find(x => x.id === id);
    if (solar) return solarProductPage(solar);
    const p = P.find(x => x.id === id);
    const root = $("#product");
    if (!p) {
      $("#pd-title").textContent = "محصول پیدا نشد";
      root.innerHTML = `<div class="empty">${icon("search")}<h3>این مدل در فهرست محصولات وجود ندارد</h3><p>ممکن است نشانی اشتباه باشد یا مدل از فهرست حذف شده باشد.</p><a class="btn" href="products.html">مشاهدهٔ همهٔ محصولات</a></div>`;
      $$(".pd-only").forEach(el => el.remove());
      return;
    }

    const title = productTitle(p);
    document.title = `${p.model} — ${title} | ${S.name}`;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = `${title} مدل ${p.model} با موتور ${p.engine}؛ توان Prime ${p.prime} kVA، مشخصات فنی کامل و استعلام قیمت از ${S.name}.`;
    $("#pd-title").textContent = `${p.model} — ${title}`;
    $("#pd-crumb").textContent = p.model;
    $("#pd-sub").textContent = `${T[p.type].label} • موتور ${p.engine}`;

    const imgs = p.images;
    root.innerHTML = `
      <div class="print-head"><img src="assets/img/logo/h1.png" alt="${esc(S.name)}"><span class="ltr num">${faDigits(S.phone)} • ${esc(S.email)}</span></div>
      <div class="pd">
        <div class="gallery">
          <div class="gallery__main"><img id="g-main" src="${img(imgs[0])}" alt="${esc(title)}" width="1200" height="900"></div>
          <div class="gallery__thumbs" role="group" aria-label="تصاویر محصول">
            ${imgs.map((f, i) => `<button type="button" aria-pressed="${i === 0}" data-src="${img(f)}" aria-label="تصویر ${fa(i + 1)}"><img src="${img(f)}" alt="" loading="lazy" width="300" height="225"></button>`).join("")}
          </div>
        </div>
        <div class="pd__summary">
          <div class="pd__tags">
            <span class="tag">${icon(T[p.type].icon)}${T[p.type].label}</span>
            <span class="tag tag--orange ltr">${esc(p.brand)}</span>
            ${p.ats ? `<span class="tag">${icon("plug-zap")}قابلیت ATS</span>` : ""}
          </div>
          <p class="pd__intro">${esc(p.intro)}</p>
          <div class="nameplate">
            <div class="hl"><span>توان Standby</span><b class="num">${fa(p.standby)}<small>kVA</small></b></div>
            <div><span>توان Prime</span><b class="num">${fa(p.prime)}<small>kVA</small></b></div>
            <div><span>توان اکتیو (Prime)</span><b class="num">${fa(kw(p.prime))}<small>kW</small></b></div>
            <div><span>مصرف سوخت در ۷۵٪ بار</span><b class="num">${fa1(p.fuel75)}<small>L/h</small></b></div>
          </div>
          <div class="pd__actions">
            <a class="btn btn--primary" href="#quote">${icon("file-text")}استعلام قیمت این مدل</a>
            <a class="btn btn--ghost" href="${tel(S.phone)}">${icon("phone")}تماس</a>
            <button class="btn btn--ghost" type="button" id="print">${icon("download")}دریافت دیتاشیت</button>
          </div>
          <ul class="pd__assure">
            <li>${icon("shield-check")}گارانتی ${esc(p.warranty)}</li>
            <li>${icon("hard-hat")}نصب، راه‌اندازی و تست بار توسط تیم فنی</li>
            <li>${icon("headphones")}خدمات پس از فروش و تأمین قطعات</li>
          </ul>
        </div>
      </div>`;

    const main = $("#g-main");
    $$(".gallery__thumbs button").forEach(b => b.addEventListener("click", () => {
      main.src = b.dataset.src;
      $$(".gallery__thumbs button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    }));
    $("#print").addEventListener("click", () => window.print());

    const row = (k, v, ltr) => v == null || v === "" ? "" : `<tr><th scope="row">${k}</th><td>${ltr ? `<span class="ltr">${v}</span>` : v}</td></tr>`;
    const table = (ic, cap, rows) => `<table class="spec-table"><caption>${icon(ic)}${cap}</caption><tbody>${rows}</tbody></table>`;
    $("#specs").innerHTML = `
      ${table("zap", "مشخصات الکتریکی",
        row("توان Standby", `<span class="ltr">${fa(p.standby)} kVA / ${fa(kw(p.standby))} kW</span>`) +
        row("توان Prime", `<span class="ltr">${fa(p.prime)} kVA / ${fa(kw(p.prime))} kW</span>`) +
        row("ولتاژ خروجی", esc(p.voltage), true) + row("فرکانس", esc(p.frequency), true) +
        row("فاز", esc(p.phase)) + row("ضریب توان", esc(p.pf), true) +
        row("سرعت", `${fa(p.rpm)} دور در دقیقه`))}
      ${table("settings", "موتور",
        row("مدل موتور", esc(p.engine), true) + row("سازنده", esc(p.brand), true) +
        row("آرایش سیلندر", esc(p.cylinders)) + row("حجم موتور", `${fa1(p.displacement)} لیتر`) +
        row("سیستم تنفس", esc(p.aspiration)) + row("خنک‌کاری", esc(p.cooling)) + row("گاورنر", esc(p.governor)))}
      ${table("fuel", "سوخت",
        row("مصرف در ۷۵٪ بار", `${fa1(p.fuel75)} لیتر در ساعت`) +
        row("مصرف در ۱۰۰٪ بار", `${fa1(p.fuel100)} لیتر در ساعت`) +
        row("ظرفیت مخزن", `${fa(p.tank)} لیتر`) +
        row("کارکرد با مخزن پر (۷۵٪)", `حدود ${fa1(p.tank / p.fuel75)} ساعت`))}
      ${table("cpu", "آلترناتور و کنترل",
        row("آلترناتور", esc(p.alternator), true) + row("کنترلر", esc(p.controller), true) +
        row("تابلو ATS", p.ats ? "دارد / قابل سفارش" : "اختیاری"))}
      ${table("ruler", "ابعاد و وزن",
        row("ابعاد (طول × عرض × ارتفاع)", `<span class="ltr num">${p.dims.map(fa).join(" × ")}</span> میلی‌متر`) +
        row("وزن خالص", `${fa(p.weight)} کیلوگرم`) +
        row("نوع اجرا", T[p.type].label) +
        row("سطح صدا (۷ متر)", p.noise ? `<span class="ltr">${fa(p.noise)} dB(A)</span>` : "— (نسخهٔ روباز)"))}
      ${table("shield-check", "گارانتی و خدمات",
        row("گارانتی", esc(p.warranty)) + row("نصب و راه‌اندازی", "دارد") + row("قرارداد سرویس دوره‌ای", "قابل ارائه"))}`;

    const feats = [
      ["activity", "کنترلر دیجیتال", `نمایش ولتاژ، جریان، فرکانس، ساعت کارکرد و خطاها با کنترلر ${p.controller}.`],
      ["refresh-cw", "روشن‌شدن خودکار", "با تابلو ATS، ژنراتور در لحظهٔ قطع برق شبکه خودکار روشن می‌شود و بار را می‌گیرد."],
      ["shield-check", "حفاظت‌های کامل", "توقف خودکار در دمای بالا، فشار روغن پایین، اضافه‌سرعت و اضافه‌بار."],
      ["battery-charging", "باتری و شارژر", "باتری استارت با شارژر اتوماتیک برای آمادگی دائمی دستگاه."],
      p.type === "open" ? ["layers", "شاسی ضدلرزش", "شاسی فولادی با لرزه‌گیرهای لاستیکی و مخزن سوخت یکپارچه."]
                        : ["volume-2", "کاهش صدا", "کاور با عایق صوتی و صدا‌خفه‌کن اگزوز برای محیط‌های حساس."],
      ["calendar-clock", "پایش از راه دور", "امکان افزودن ماژول GSM یا اترنت برای پایش و گزارش وضعیت."]
    ];
    $("#features").innerHTML = feats.map(([ic, t, d]) => `<li>${icon(ic)}<div><b>${t}</b><br><span>${esc(d)}</span></div></li>`).join("");

    const related = P.filter(x => x.id !== p.id).sort((a, b) =>
      (a.type === p.type ? 0 : 1) - (b.type === p.type ? 0 : 1) || Math.abs(a.standby - p.standby) - Math.abs(b.standby - p.standby)).slice(0, 3);
    $("#related").innerHTML = related.map(productCard).join("");

    const qf = $("form[data-quote]");
    if (qf) qf.dataset.model = p.model;

    // tabs highlight while scrolling
    const tabs = $$(".tabs a");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(entries => entries.forEach(en => {
        if (en.isIntersecting) tabs.forEach(t => t.classList.toggle("is-active", t.getAttribute("href") === "#" + en.target.id));
      }), { rootMargin: "-40% 0px -55% 0px" });
      tabs.forEach(t => { const s = $(t.getAttribute("href")); if (s) io.observe(s); });
    }
  };

  // shared bits of the detail page (gallery, specs, quote form) for a solar panel
  function solarProductPage(p) {
    const title = panelTitle(p);
    document.title = `${p.model} — ${title} | ${S.name}`;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = `${title} مدل ${p.model}، ${p.cell}، راندمان ${p.eff}٪؛ مشخصات فنی کامل و استعلام قیمت از ${S.name}.`;
    $("#pd-title").textContent = `${p.model} — ${title}`;
    $("#pd-crumb").textContent = p.model;
    $("#pd-sub").textContent = `${p.cell} • ${p.cells}`;
    const cat = $("#pd-cat"); if (cat) { cat.href = "solar.html"; cat.textContent = "انرژی خورشیدی"; }

    const imgs = p.images;
    $("#product").innerHTML = `
      <div class="print-head"><img src="assets/img/logo/h1.png" alt="${esc(S.name)}"><span class="ltr">${faDigits(S.phone)} • ${esc(S.email)}</span></div>
      <div class="pd">
        <div class="gallery">
          <div class="gallery__main"><img id="g-main" src="${img(imgs[0])}" alt="${esc(title)}" width="1200" height="900"></div>
          <div class="gallery__thumbs" role="group" aria-label="تصاویر محصول">
            ${imgs.map((f, i) => `<button type="button" aria-pressed="${i === 0}" data-src="${img(f)}" aria-label="تصویر ${fa(i + 1)}"><img src="${img(f)}" alt="" loading="lazy" width="300" height="225"></button>`).join("")}
          </div>
        </div>
        <div class="pd__summary">
          <div class="pd__tags">
            <span class="tag">${icon("sun")}<span class="ltr">${esc(p.cellEn)}</span></span>
            ${p.bifacial ? `<span class="tag tag--orange">دوطرفه (Bifacial)</span>` : ""}
            ${p.halfcut ? `<span class="tag">نیم‌سلول (Half-cut)</span>` : ""}
          </div>
          <p class="pd__intro">${esc(p.intro)}</p>
          <div class="nameplate">
            <div class="hl"><span>توان نامی (Pmax)</span><b>${fa(p.watt)}<small>Wp</small></b></div>
            <div><span>راندمان پنل</span><b>${fa1(p.eff)}<small>%</small></b></div>
            <div><span>ولتاژ مدار باز (Voc)</span><b>${fa1(p.voc)}<small>V</small></b></div>
            <div><span>گارانتی خطی توان</span><b>${fa(p.warrantyPower)}<small>سال</small></b></div>
          </div>
          <div class="pd__actions">
            <a class="btn btn--primary" href="#quote">${icon("file-text")}استعلام قیمت این پنل</a>
            <a class="btn btn--ghost" href="${tel(S.phone)}">${icon("phone")}تماس</a>
            <a class="btn btn--ghost" href="solar.html#calc">${icon("calculator")}محاسبهٔ تعداد پنل</a>
          </div>
          <ul class="pd__assure">
            <li>${icon("shield-check")}گارانتی محصول ${fa(p.warrantyProduct)} سال و توان خطی ${fa(p.warrantyPower)} سال</li>
            <li>${icon("hard-hat")}طراحی، نصب سازه و راه‌اندازی نیروگاه توسط تیم فنی</li>
            <li>${icon("headphones")}پایش تولید و خدمات پس از فروش</li>
          </ul>
        </div>
      </div>`;

    const main = $("#g-main");
    $$(".gallery__thumbs button").forEach(b => b.addEventListener("click", () => {
      main.src = b.dataset.src;
      $$(".gallery__thumbs button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    }));

    const row = (k, v, ltr) => `<tr><th scope="row">${k}</th><td>${ltr ? `<span class="ltr">${v}</span>` : v}</td></tr>`;
    const table = (ic, cap, rows) => `<table class="spec-table"><caption>${icon(ic)}${cap}</caption><tbody>${rows}</tbody></table>`;
    $("#specs").innerHTML = `
      ${table("zap", "مشخصات الکتریکی (STC)",
        row("توان نامی (Pmax)", `${fa(p.watt)} W`, true) + row("ولتاژ در توان بیشینه (Vmp)", `${fa1(p.vmp)} V`, true) +
        row("جریان در توان بیشینه (Imp)", `${fa1(p.imp)} A`, true) + row("ولتاژ مدار باز (Voc)", `${fa1(p.voc)} V`, true) +
        row("جریان اتصال کوتاه (Isc)", `${fa1(p.isc)} A`, true) + row("راندمان پنل", `${fa1(p.eff)}٪`) + row("تلورانس توان", esc(p.tol), true))}
      ${table("layers", "مشخصات مکانیکی",
        row("نوع سلول", esc(p.cell)) + row("تعداد سلول", esc(p.cells)) +
        row("ابعاد (طول × عرض × ضخامت)", `<span class="ltr">${p.dims.map(fa).join(" × ")}</span> میلی‌متر`) +
        row("وزن", `${fa1(p.weight)} کیلوگرم`) + row("شیشه", esc(p.glass)) + row("قاب", esc(p.frame)) +
        row("جعبه اتصال / کانکتور", `<span class="ltr">${esc(p.jbox)} / ${esc(p.connector)}</span>`))}
      ${table("thermometer", "شرایط کاری",
        row("ضریب دمایی Pmax", `${fa1(p.tempPmax)}٪ بر درجه`) + row("دمای نامی کار سلول (NOCT)", `${fa(p.noct)} °C`, true) +
        row("حداکثر ولتاژ سیستم", `${fa(p.maxV)} V DC`, true) + row("دمای کاری", esc(p.tempRange), true) + row("تحمل بار مکانیکی", esc(p.load)))}
      ${table("shield-check", "گارانتی",
        row("گارانتی محصول", `${fa(p.warrantyProduct)} سال`) + row("گارانتی خطی توان", `${fa(p.warrantyPower)} سال`) +
        row("نوع سیستم", p.watt < 300 ? "آف‌گرید کوچک" : "آن‌گرید، صنعتی و هیبرید"))}`;
    const note = $("#spec-note");
    if (note) note.textContent = "مقادیر الکتریکی در شرایط استاندارد آزمون (STC: تابش ۱۰۰۰ وات بر مترمربع، دمای سلول ۲۵ درجه) هستند. برای دیتاشیت رسمی سازنده با ما تماس بگیرید.";

    const feats = [
      ["layers", p.halfcut ? "طراحی نیم‌سلول" : "سلول تمام‌اندازه", p.halfcut ? "تلفات مقاومتی کمتر و افت تولید کمتر هنگام سایهٔ جزئی." : "ساختار ساده و مقاوم برای سیستم‌های ۱۲ ولت."],
      ["thermometer", "ضریب دمایی پایین", `افت توان ${fa1(Math.abs(p.tempPmax))}٪ به ازای هر درجه؛ مناسب گرمای تابستان.`],
      ["shield-check", "مقاوم در برابر PID", "کاهش افت توان ناشی از ولتاژ بالای سیستم در طول سال‌ها."],
      ["wind", "تحمل باد و برف", esc(p.load) + "؛ مناسب سقف‌ها و سازه‌های زمینی."],
      p.bifacial ? ["sun", "تولید از دو طرف", "سطح پشتی پنل، نور بازتابی زمین را هم جذب می‌کند و تولید را افزایش می‌دهد."]
                 : ["sun", "شیشهٔ ضدانعکاس", "جذب بیشتر نور در صبح و عصر."],
      ["trending-up", "گارانتی خطی توان", `تضمین توان خروجی به مدت ${fa(p.warrantyPower)} سال.`]
    ];
    $("#features").innerHTML = feats.map(([ic, t, d]) => `<li>${icon(ic)}<div><b>${t}</b><br><span>${d}</span></div></li>`).join("");
    $("#related").innerHTML = SP.filter(x => x.id !== p.id).sort((a, b) => Math.abs(a.watt - p.watt) - Math.abs(b.watt - p.watt)).slice(0, 3).map(solarCard).join("");
    const relLink = $("#related-link"); if (relLink) relLink.href = "solar.html#panels";
    const qf = $("form[data-quote]");
    if (qf) { qf.dataset.model = p.model; qf.dataset.subject = "استعلام قیمت پنل خورشیدی"; }
  }

  pages.solar = function () {
    $("#systems").innerHTML = window.SOLAR_SYSTEMS.map(s => `
      <a class="tile" href="#quote" data-system="${s.key}">
        <img src="${img(s.img)}" alt="" loading="lazy" width="1200" height="800">
        <div class="tile__top"><span class="tile__count">${esc(s.tag)}</span><span class="bubble" aria-hidden="true">${icon("arrow-left")}</span></div>
        <div class="tile__body"><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
      </a>`).join("");
    $("#panels-grid").innerHTML = SP.map(solarCard).join("");
    renderFaq($("#faq"), window.SOLAR_FAQ);

    // pick a system tile → preselect it in the form
    const sysSel = $("#s-system");
    sysSel.insertAdjacentHTML("beforeend", window.SOLAR_SYSTEMS.map(s => `<option value="${s.key}">${esc(s.title)}</option>`).join(""));
    $("#systems").addEventListener("click", e => { const t = e.target.closest("[data-system]"); if (t) sysSel.value = t.dataset.system; });

    // sizing calculator
    const C = window.SOLAR_CALC;
    const reg = $("#c-region");
    reg.innerHTML = C.regions.map((r, i) => `<option value="${r.v}"${i === 1 ? " selected" : ""}>${esc(r.label)} — ${fa1(r.v)} ساعت</option>`).join("");
    const kwhIn = $("#c-kwh");
    const out = k => $(`[data-out="${k}"]`);
    let last = null;
    function calc() {
      const kwh = parseFloat(toEnDigits(kwhIn.value).replace(/[^\d.]/g, "")) || 0;
      const psh = parseFloat(reg.value);
      if (kwh <= 0) { ["kwp", "panels", "area", "year", "co2"].forEach(k => (out(k).textContent = "—")); last = null; return; }
      const kwp = kwh / (30 * psh * C.pr);
      const panels = Math.ceil((kwp * 1000) / C.panelW);
      const realKwp = panels * C.panelW / 1000;
      const year = realKwp * psh * 365 * C.pr;
      out("kwp").textContent = fa1(realKwp);
      out("panels").textContent = fa(panels);
      out("area").textContent = fa(Math.ceil(panels * C.areaPerPanel));
      out("year").textContent = fa(Math.round(year));
      out("co2").textContent = fa1((year * C.co2PerKwh) / 1000);
      last = { kwh, kwp: realKwp, panels };
    }
    kwhIn.addEventListener("input", calc); reg.addEventListener("change", calc);
    calc();
    $("#calc-cta").addEventListener("click", () => {
      if (last) {
        $("#s-kwh").value = fa(last.kwh);
        $("#s-msg").value = `برآورد ماشین‌حساب: حدود ${fa1(last.kwp)} کیلووات (${fa(last.panels)} پنل ${fa(C.panelW)} واتی).`;
      }
      $("#quote").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  };

  pages.energy = function () {
    const E = window.ENERGY;
    $("#plans-grid").innerHTML = window.ENERGY_PLANS.map(pl => `
      <article class="plan plan--${pl.key} reveal">
        <div class="plan__top"><span class="plan__icon">${icon(pl.icon)}</span><span class="plan__tag">${esc(pl.tag)}</span></div>
        <h3>${esc(pl.title)}</h3>
        <p>${esc(pl.text)}</p>
        <ul>${pl.points.map(x => `<li>${icon("check")}<span>${esc(x)}</span></li>`).join("")}</ul>
        <p class="plan__fit"><b>مناسب برای:</b> ${esc(pl.fit)}</p>
        <a class="btn btn--block ${pl.key === "green" ? "btn--primary" : "btn--ghost"}" href="#quote" data-plan="${pl.key}">درخواست ${esc(pl.title)}</a>
      </article>`).join("");

    const cmp = window.ENERGY_COMPARE;
    $("#compare").innerHTML = `
      <thead><tr><th scope="col">ویژگی</th>${window.ENERGY_PLANS.map(pl => `<th scope="col"><span class="dot dot--${pl.key}"></span>${esc(pl.title)}</th>`).join("")}</tr></thead>
      <tbody>${cmp.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;

    $("#energy-steps").innerHTML = window.ENERGY_STEPS.map((s, i) => `<li><time>${fa(i + 1)}</time><div><b>${esc(s.t)}</b><span>${esc(s.d)}</span></div></li>`).join("");
    renderFaq($("#faq"), window.ENERGY_FAQ);

    const typeSel = $("#e-type");
    document.addEventListener("click", e => { const b = e.target.closest("[data-plan]"); if (b) typeSel.value = b.dataset.plan; });

    // eligibility check
    const dIn = $("#el-demand"), mIn = $("#el-kwh"), res = $("#el-result");
    const num = v => parseFloat(toEnDigits(v).replace(/[^\d.]/g, "")) || 0;
    function check() {
      const d = num(dIn.value);
      if (!d) { res.className = "elig__result"; res.innerHTML = `${icon("clipboard-list")}<span>دیماند قراردادی را از قبض برق خود وارد کنید.</span>`; return; }
      if (d >= E.minDemand) {
        const m = num(mIn.value);
        res.className = "elig__result is-ok";
        res.innerHTML = `${icon("circle-check")}<span><b>اشتراک شما با دیماند ${fa(d)} کیلووات، مشمول خرید برق از بورس است.</b>${m ? ` مصرف سالانهٔ تقریبی شما ${fa(Math.round(m * 12 / 1000))} مگاوات‌ساعت است.` : ""} برای برآورد هزینه، درخواست را ثبت کنید.</span>`;
      } else {
        res.className = "elig__result is-no";
        res.innerHTML = `${icon("sun")}<span><b>دیماند ${fa(d)} کیلووات کمتر از ${fa(E.minDemand)} کیلووات است.</b> برای کاهش هزینهٔ برق، <a href="solar.html">نیروگاه خورشیدی پشت‌بامی</a> را بررسی کنید.</span>`;
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
    renderServices($("#services"));
    renderFaq($("#faq"));
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
  renderLayout();
  fillContactBits();
  if (pages[page]) pages[page]();
  initForms();
  initReveal();
})();
