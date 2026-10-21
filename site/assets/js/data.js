/* ==========================================================================
   اطلاعات سایت و محصولات
   --------------------------------------------------------------------------
   ⚠ مشخصات فنی مدل‌ها، پروژه‌ها و متن‌های بورس برق «نمونه» هستند و با TODO
   مشخص شده‌اند. قبل از انتشار نهایی با اطلاعات واقعی جایگزین کنید.
   برای افزودن مدل جدید کافی است یک آبجکت به آرایهٔ مربوط اضافه کنید.
   ========================================================================== */

window.SITE = {
  name: "داتیس آوان نیرو",
  nameEn: "Datis Avan Niroo",
  tagline: "ژنراتور دیزلی و گازی، انرژی خورشیدی و برق صنایع",
  phone: "+989156202183",           // تلفن و واتس‌اپ (یک شماره)
  phoneDisplay: "0915 620 2183",
  whatsapp: "989156202183",         // بدون + و با کد کشور
  telegramBot: "DOT_ON_bot",        // ربات تلگرام عرضه و تقاضای برق آزاد
  email: "info@datison.ir",         // فقط برای نمایش در صفحهٔ تماس و فوتر
  address: "مشهد، بلوار سجاد، بین سجاد ۲ و ۴، پلاک ۹۲، طبقه دوم",
  workshop: "",                     // کارگاه یا انبار؛ خالی باشد نمایش داده نمی‌شود
  mapUrl: "https://neshan.org/maps/share/7b1--bNJFD8Y",  // لوکیشن دفتر در نشان
  hours: "شنبه تا چهارشنبه ۸ تا ۱۸ — پنجشنبه ۸ تا ۱۳",
  // اگر سرویس دریافت فرم دارید (مثلاً Formspree یا API خودتان)، آدرس https آن را اینجا بگذارید
  // و همان دامنه را به connect-src در فایل‌های .htaccess و _headers اضافه کنید.
  // در غیر این صورت فرم‌ها پیام را در واتس‌اپ شرکت آماده می‌کنند.
  formEndpoint: "",
  spotlight: "on-g250m",            // مدل کارت «پرفروش این ماه» در صفحهٔ اول
  stats: [
    { value: 750, suffix: " kW", label: "بیشترین توان ژنراتور" },
    { value: 750, suffix: " W", label: "توان پنل خورشیدی" },
    { value: 150, suffix: " kW", label: "حداقل دیماند برای برق بورس" },
    { value: 24, suffix: "/7", label: "پشتیبانی" }
  ]
};

/* ---------- ژنراتور (همه روباز) ---------- */
window.FUELS = {
  diesel: { label: "دیزل ژنراتور", short: "دیزلی", icon: "fuel", img: "open-1.jpg",
            desc: "برق اضطراری و پشتیبان؛ روشن‌شدن خودکار هنگام قطعی." },
  gas:    { label: "ژنراتور گازی", short: "گازی", icon: "flame", img: "gas-1.jpg",
            desc: "برق پیوسته با گاز طبیعی؛ هزینهٔ سوخت کمتر." }
};

// بازه‌ها بر اساس توان پیوسته (Prime) به کیلووات
window.RANGES = [
  { id: "r1", label: "۲۰۰ تا ۳۵۰ کیلووات", min: 200, max: 350 },
  { id: "r2", label: "۳۵۰ تا ۵۰۰ کیلووات", min: 351, max: 500 },
  { id: "r3", label: "۵۰۰ تا ۷۵۰ کیلووات", min: 501, max: 750 }
];

const COMMON = {
  execution: "روباز (Open)",
  voltage: "400/230 V",
  frequency: "50 Hz",
  phase: "سه‌فاز",
  rpm: 1500,
  pf: "0.8",
  cooling: "رادیاتوری (آب)",
  governor: "الکترونیکی",
  warranty: "گارانتی شرکتی"
};

/* kw: توان پیوسته (Prime) — kva: معادل کیلوولت‌آمپر — standbyKw: توان اضطراری (فقط دیزلی)
   دیزلی: fuel75 / fuel100 مصرف گازوئیل (لیتر در ساعت) — tank: مخزن (لیتر)
   گازی: gas100 مصرف گاز طبیعی در بار کامل (مترمکعب نرمال در ساعت) — effEl: راندمان الکتریکی (٪)
   dims: طول × عرض × ارتفاع (میلی‌متر) — TODO: همهٔ اعداد نمونه هستند */
window.PRODUCTS = [
  { id: "on-d200p", model: "ON-D200P", fuel: "diesel", brand: "Perkins", kw: 200, kva: 250, standbyKw: 220,
    engine: "Perkins 1506A-E88TAG5", cylinders: "6 خطی", displacement: 8.8, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford HCI434C", controller: "DeepSea DSE7320", ats: true,
    fuel75: 40.5, fuel100: 53.6, tank: 450, dims: [3200, 1150, 1850], weight: 2350,
    images: ["open-1.jpg", "install-open.jpg", "warehouse.jpg"], featured: true,
    intro: "برای کارگاه‌ها، ساختمان‌های تجاری و واحدهای تولیدی." },
  { id: "on-d280v", model: "ON-D280V", fuel: "diesel", brand: "Volvo Penta", kw: 280, kva: 350, standbyKw: 310,
    engine: "Volvo Penta TAD1344GE", cylinders: "6 خطی", displacement: 12.8, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer TAL 047 F", controller: "ComAp InteliLite 9", ats: true,
    fuel75: 55, fuel100: 72.5, tank: 500, dims: [3500, 1300, 2000], weight: 3100,
    images: ["open-2.jpg", "install-open.jpg", "warehouse.jpg"],
    intro: "مصرف سوخت بهینه؛ مناسب بیمارستان‌ها و ساختمان‌های اداری." },
  { id: "on-d360c", model: "ON-D360C", fuel: "diesel", brand: "Cummins", kw: 360, kva: 450, standbyKw: 400,
    engine: "Cummins KTA19-G4", cylinders: "6 خطی", displacement: 18.9, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford HCI544C", controller: "DeepSea DSE8610", ats: true,
    fuel75: 72, fuel100: 95, tank: 600, dims: [3900, 1500, 2200], weight: 4300,
    images: ["install-open.jpg", "open-1.jpg", "warehouse.jpg"], featured: true,
    intro: "قابلیت سنکرون‌سازی موازی؛ مناسب کارخانه‌ها و خطوط تولید." },
  { id: "on-d500b", model: "ON-D500B", fuel: "diesel", brand: "Baudouin", kw: 500, kva: 625, standbyKw: 550,
    engine: "Baudouin 12M26G700/5", cylinders: "V12", displacement: 31.8, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer TAL 049 D", controller: "DeepSea DSE8610", ats: true,
    fuel75: 98, fuel100: 130, tank: 800, dims: [4300, 1700, 2300], weight: 5600,
    images: ["hero.jpg", "open-2.jpg", "install-open.jpg"],
    intro: "برای مجتمع‌های بزرگ، هتل‌ها و مراکز درمانی." },
  { id: "on-d640m", model: "ON-D640M", fuel: "diesel", brand: "MTU", kw: 640, kva: 800, standbyKw: 700,
    engine: "MTU 12V2000G25", cylinders: "V12", displacement: 26.8, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer LSA 50.2", controller: "ComAp InteliGen 500", ats: true,
    fuel75: 124, fuel100: 165, tank: 1000, dims: [4800, 1900, 2400], weight: 6900,
    images: ["hero.jpg", "plant.jpg", "open-1.jpg"],
    intro: "برای دیتاسنترها و صنایع حساس؛ کار موازی و پایش از راه دور." },
  { id: "on-d750c", model: "ON-D750C", fuel: "diesel", brand: "Cummins", kw: 750, kva: 940, standbyKw: 825,
    engine: "Cummins KTA38-G5", cylinders: "V12", displacement: 37.8, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford PI734B", controller: "ComAp InteliGen 500", ats: true,
    fuel75: 146, fuel100: 192, tank: 1200, dims: [5200, 2000, 2500], weight: 8200,
    images: ["plant.jpg", "hero.jpg", "install-open.jpg"],
    intro: "برای صنایع سنگین و برق اضطراری مراکز حیاتی." },
  { id: "on-g250m", model: "ON-G250M", fuel: "gas", brand: "MAN", kw: 250, kva: 313,
    engine: "MAN E3268 LE212", cylinders: "V8", displacement: 18.3, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer TAL 047 F", controller: "ComAp InteliGen NT", ats: true,
    gas100: 68, effEl: 39.5, gasPressure: "۲۰ تا ۲۰۰ میلی‌بار", dims: [3800, 1500, 2100], weight: 4200,
    images: ["gas-2.jpg", "gas-1.jpg", "install-open.jpg"], featured: true,
    intro: "برق پیوسته با گاز طبیعی؛ هزینهٔ سوخت کمتر از دیزل." },
  { id: "on-g400c", model: "ON-G400C", fuel: "gas", brand: "Cummins", kw: 400, kva: 500,
    engine: "Cummins QSK19G", cylinders: "6 خطی", displacement: 19, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford HCI544D", controller: "DeepSea DSE8610", ats: true,
    gas100: 105, effEl: 38.5, gasPressure: "۲۰ تا ۲۰۰ میلی‌بار", dims: [4400, 1700, 2300], weight: 5800,
    images: ["gas-1.jpg", "gas-2.jpg", "plant.jpg"],
    intro: "برای کارخانه‌ها و مجتمع‌هایی که برق پیوسته و ارزان‌تر می‌خواهند." },
  { id: "on-g600w", model: "ON-G600W", fuel: "gas", brand: "MWM", kw: 600, kva: 750,
    engine: "MWM TCG 3016 V12", cylinders: "V12", displacement: 19.6, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer LSA 50.2", controller: "ComAp InteliGen 500", ats: true,
    gas100: 148, effEl: 41.5, gasPressure: "۲۰ تا ۲۰۰ میلی‌بار", dims: [5600, 1900, 2400], weight: 8400,
    images: ["gas-1.jpg", "gas-2.jpg", "plant.jpg"], featured: true,
    intro: "مولد مقیاس کوچک با راندمان بالا برای تولید برق و فروش به شبکه." }
].map(p => Object.assign({}, COMMON, p));

window.BRANDS = [...new Set(window.PRODUCTS.map(p => p.brand))];

/* ---------- خدمات (نمایش کارتی در صفحهٔ خدمات) ---------- */
window.SERVICES = [
  { img: "plant.jpg", kicker: "مشاوره", title: "مشاوره و انتخاب توان", headline: "توان درست، از روز اول.",
    text: "محاسبهٔ بار، بازدید از محل و پیشنهاد مدل مناسب؛ بدون هزینه.",
    points: ["محاسبهٔ بار و جریان راه‌اندازی", "انتخاب بین دیزلی و گازی"] },
  { img: "gas-1.jpg", kicker: "تأمین", title: "تأمین ژنراتور دیزلی و گازی", headline: "دیزلی یا گازی؛ ۲۰۰ تا ۷۵۰ کیلووات.",
    text: "عرضهٔ ژنراتور روباز با موتورهای معتبر، همراه با اسناد و گارانتی شرکتی.",
    points: ["Perkins، Cummins، Volvo، MTU، MAN، MWM", "تحویل از انبار یا سفارشی"] },
  { img: "gas-2.jpg", kicker: "نیروگاه", title: "نیروگاه مقیاس کوچک (DG)", headline: "برق و حرارت، کنار مصرف.",
    text: "طراحی و احداث نیروگاه گازی مقیاس کوچک و CHP، همراه با مشاوره برای قرارداد خرید تضمینی برق.",
    points: ["تولید هم‌زمان برق و حرارت (CHP)", "گزارش فنی و مالی پیش از سرمایه‌گذاری"] },
  { img: "install-open.jpg", kicker: "نصب", title: "نصب و راه‌اندازی", headline: "نصب اصولی، تست با لودبانک.",
    text: "حمل، فونداسیون، اگزوز، سوخت‌رسانی یا خط گاز، کابل‌کشی و تست بار.",
    points: ["تست بار پیش از تحویل", "تحویل با صورت‌جلسه"] },
  { img: "switchgear.jpg", kicker: "تابلو برق", title: "تابلو ATS و سنکرون", headline: "برق برمی‌گردد؛ کمتر از ۱۰ ثانیه.",
    text: "تابلوهای چنج‌اور اتوماتیک و سنکرون‌سازی چند ژنراتور با هم یا با شبکه.",
    points: ["انتقال خودکار بار", "کار موازی چند دستگاه"] },
  { img: "solar-industrial.jpg", kicker: "خورشیدی", title: "نیروگاه خورشیدی", headline: "برق از سقف و زمین شما.",
    text: "طراحی و اجرای نیروگاه آن‌گرید و آف‌گرید با پنل‌های ۵۵۰ تا ۷۵۰ وات.",
    points: ["از اخذ مجوز تا اتصال به شبکه", "پایش تولید از راه دور"], link: "solar.html" },
  { img: "grid-lines.jpg", kicker: "بورس برق", title: "برق صنایع از بورس", headline: "برق عادی، سبز و آزاد.",
    text: "تأمین برق از بورس انرژی برای مشترکین با دیماند بالای ۱۵۰ کیلووات.",
    points: ["بررسی رایگان قبض", "ربات تلگرام برق آزاد"], link: "energy.html" },
  { img: "maintenance.jpg", kicker: "سرویس", title: "سرویس و تعمیرات", headline: "همیشه آماده؛ ۲۴ ساعته.",
    text: "سرویس دوره‌ای، تعمیرات اساسی موتور و آلترناتور و تأمین قطعات.",
    points: ["قرارداد سرویس دوره‌ای", "تیم اعزامی اضطراری"] },
  { img: "open-1.jpg", kicker: "قطعات", title: "قطعات یدکی و مواد مصرفی", headline: "قطعهٔ اصل، در کمترین زمان.",
    text: "قطعات اصلی (Genuine) موتور و آلترناتور، روغن، فیلتر و قطعات الکتریکال مولدهای دیزلی و گازی.",
    points: ["قطعات اصلی برندهای معتبر", "روغن و فیلتر برای سرویس دوره‌ای"] },
  { img: "warehouse.jpg", kicker: "اجاره", title: "اجارهٔ ژنراتور", headline: "برق موقت برای پروژه‌ها.",
    text: "اجارهٔ کوتاه‌مدت و بلندمدت ژنراتور روباز، با حمل، نصب و اپراتور.",
    points: ["روزانه، ماهانه یا بلندمدت", "همراه با اپراتور"], id: "rental" }
];

window.PROJECTS = [   // TODO: پروژه‌های واقعی شرکت را جایگزین کنید
  { img: "install-open.jpg", title: "برق اضطراری بیمارستان", place: "تهران", power: "2 × 360 kW" },
  { img: "gas-1.jpg", title: "مولد گازی مجتمع صنعتی", place: "اصفهان", power: "600 kW" },
  { img: "solar-industrial.jpg", title: "نیروگاه خورشیدی پشت‌بامی", place: "مشهد", power: "1 MW" }
];

/* ==========================================================================
   انرژی خورشیدی — TODO: مشخصات پنل‌ها را با دیتاشیت رسمی جایگزین کنید
   watt: توان نامی (Wp) — eff: راندمان (٪) — ولتاژ و جریان در شرایط STC
   ========================================================================== */
const PANEL_COMMON = {
  tol: "0 ~ +5 W", noct: 45, maxV: 1500, tempRange: "−40 ~ +85 °C",
  load: "برف ۵۴۰۰ پاسکال / باد ۲۴۰۰ پاسکال",
  glass: "شیشهٔ سکوریت ضدانعکاس", frame: "آلومینیوم آنودایز", jbox: "IP68", connector: "MC4",
  warranty: "گارانتی شرکتی", halfcut: true
};

window.SOLAR_PANELS = [
  { id: "sp-550m", model: "ON-SP550M", watt: 550, cellEn: "Mono PERC", cell: "مونوکریستال PERC", cells: "۱۴۴ نیم‌سلول", bifacial: false,
    eff: 21.3, vmp: 41.9, imp: 13.13, voc: 49.9, isc: 14.0, tempPmax: -0.35, dims: [2279, 1134, 35], weight: 28.5,
    images: ["panel-mono.jpg", "solar-industrial.jpg", "solar-install.jpg"], featured: true,
    intro: "پرفروش‌ترین پنل برای نیروگاه‌های پشت‌بامی و صنعتی." },
  { id: "sp-580n", model: "ON-SP580N", watt: 580, cellEn: "TOPCon Bifacial", cell: "TOPCon نوع N دوطرفه", cells: "۱۴۴ نیم‌سلول", bifacial: true,
    eff: 22.5, vmp: 42.6, imp: 13.62, voc: 51.2, isc: 14.35, tempPmax: -0.30, dims: [2278, 1134, 30], weight: 32,
    images: ["panel-mono.jpg", "solar-farm.jpg", "solar-industrial.jpg"],
    intro: "ضریب دمایی پایین برای گرمای تابستان؛ تولید اضافه از سطح پشتی." },
  { id: "sp-620n", model: "ON-SP620N", watt: 620, cellEn: "TOPCon Bifacial", cell: "TOPCon نوع N دوطرفه", cells: "۱۳۲ نیم‌سلول", bifacial: true,
    eff: 22.9, vmp: 39.6, imp: 15.66, voc: 47.6, isc: 16.5, tempPmax: -0.29, dims: [2382, 1134, 30], weight: 33.5,
    images: ["panel-mono.jpg", "solar-farm-2.jpg", "solar-farm.jpg"],
    intro: "برای نیروگاه‌های زمینی؛ هزینهٔ سازه کمتر به ازای هر کیلووات." },
  { id: "sp-670n", model: "ON-SP670N", watt: 670, cellEn: "TOPCon Bifacial", cell: "TOPCon نوع N دوطرفه", cells: "۱۳۲ نیم‌سلول (۲۱۰ میلی‌متری)", bifacial: true,
    eff: 21.6, vmp: 38.5, imp: 17.4, voc: 46.0, isc: 18.5, tempPmax: -0.30, dims: [2384, 1303, 33], weight: 38.3,
    images: ["panel-mono.jpg", "solar-farm.jpg", "solar-farm-2.jpg"],
    intro: "پنل بزرگ‌قاب برای نیروگاه‌های مگاواتی." },
  { id: "sp-700n", model: "ON-SP700N", watt: 700, cellEn: "TOPCon Bifacial", cell: "TOPCon نوع N دوطرفه", cells: "۱۳۲ نیم‌سلول (۲۱۰ میلی‌متری)", bifacial: true,
    eff: 22.5, vmp: 40.2, imp: 17.42, voc: 48.1, isc: 18.4, tempPmax: -0.29, dims: [2384, 1303, 33], weight: 38.5,
    images: ["panel-mono.jpg", "solar-farm-2.jpg", "solar-industrial.jpg"], featured: true,
    intro: "توان بالا در هر پنل؛ کابل‌کشی و نصب کمتر." },
  { id: "sp-750h", model: "ON-SP750H", watt: 750, cellEn: "HJT Bifacial", cell: "هتروجانکشن (HJT) نوع N دوطرفه", cells: "۱۳۲ نیم‌سلول (۲۱۰ میلی‌متری)", bifacial: true,
    eff: 24.1, vmp: 42.0, imp: 17.86, voc: 50.0, isc: 18.9, tempPmax: -0.24, dims: [2384, 1303, 33], weight: 38.9,
    images: ["panel-mono.jpg", "solar-farm.jpg", "solar-industrial.jpg"],
    intro: "بیشترین توان و کمترین افت در گرما؛ برای نیروگاه‌های بزرگ." }
].map(p => Object.assign({}, PANEL_COMMON, p));

window.SOLAR_SYSTEMS = [
  { key: "ongrid", img: "solar-roof.jpg", title: "آن‌گرید", tag: "متصل به شبکه",
    text: "مصرف شما را کم می‌کند یا برق را به شبکه می‌فروشد." },
  { key: "industrial", img: "solar-industrial.jpg", title: "نیروگاه صنعتی", tag: "سقف سوله و زمین",
    text: "از صدها کیلووات تا چند مگاوات." },
  { key: "offgrid", img: "solar-farm-2.jpg", title: "آف‌گرید", tag: "مستقل از شبکه",
    text: "با باتری؛ برای باغ، چاه و دکل مخابراتی." },
  { key: "hybrid", img: "solar-install.jpg", title: "هیبرید", tag: "شبکه + باتری",
    text: "متصل به شبکه، با برق پشتیبان هنگام قطعی." }
];

// ماشین‌حساب: ورودی ظرفیت سیستم (کیلووات)؛ محاسبه فقط بر اساس پنل ۵۵۰ واتی
window.SOLAR_CALC = {
  regions: [
    { v: 4.3, label: "کم‌تابش (سواحل شمال)" },
    { v: 5.2, label: "متوسط (بیشتر شهرها)" },
    { v: 5.9, label: "پرتابش (مرکز، جنوب و شرق)" }
  ],
  pr: 0.78,              // ضریب عملکرد سیستم
  panelW: 550,           // پنل مبنای محاسبه
  hectarePerMW: 1.5      // زمین لازم: هر مگاوات حدود ۱٫۵ هکتار
};

window.SOLAR_FAQ = [
  { q: "برای هر مگاوات چقدر زمین لازم است؟",
    a: "حدود ۱٫۵ هکتار برای نیروگاه زمینی. روی سقف سوله، فضای لازم بسته به شکل و سایه‌اندازی سقف متفاوت است." },
  { q: "نیروگاه آن‌گرید چطور درآمد یا صرفه‌جویی ایجاد می‌کند؟",
    a: "برق تولیدی مصرف شما را کم می‌کند یا طبق قرارداد خرید تضمینی به شبکه فروخته می‌شود. مراحل قرارداد را ما پیگیری می‌کنیم." },
  { q: "پنل‌ها گارانتی دارند؟",
    a: "بله، همهٔ پنل‌ها گارانتی شرکتی دارند. شرایط گارانتی را کارشناس ما برایتان ارسال می‌کند." }
];

/* ==========================================================================
   تأمین برق صنایع از بورس انرژی
   ⚠ TODO: تعاریف و مراحل زیر کلی هستند؛ با واحد بازرگانی و مقررات جاری تطبیق دهید.
   ========================================================================== */
window.ENERGY = { minDemand: 150 };

window.ENERGY_PLANS = [
  { key: "normal", icon: "zap", title: "برق عادی", tag: "تابلو اصلی بورس",
    text: "برق نیروگاه‌های حرارتی با قیمت کشف‌شده در بورس.",
    points: ["قیمت شفاف", "قرارداد ماهانه یا بلندمدت"] },
  { key: "green", icon: "leaf", title: "برق سبز", tag: "تابلو برق سبز",
    text: "برق نیروگاه‌های خورشیدی و بادی، با گواهی برق سبز.",
    points: ["سهم برق تجدیدپذیر صنایع", "گواهی مصرف برق سبز"] },
  { key: "free", icon: "trending-up", title: "برق آزاد", tag: "نرخ آزاد / دوجانبه",
    text: "قرارداد مستقیم با تولیدکننده؛ برای مصرف مازاد.",
    points: ["انعطاف در مقدار و زمان", "عرضه و تقاضا در ربات تلگرام"] }
];

window.ENERGY_STEPS = [
  "بررسی قبض و دیماند",
  "ثبت‌نام و کد معاملاتی",
  "انتخاب نوع برق و قرارداد",
  "خرید و تحویل از شبکه",
  "تسویه و گزارش ماهانه"
];

window.ENERGY_FAQ = [
  { q: "چه مشترکینی می‌توانند برق را از بورس بخرند؟",
    a: "مشترکین صنعتی و تجاری با دیماند قراردادی بالای ۱۵۰ کیلووات. تصویر قبض را بفرستید تا شرایط را بررسی کنیم." },
  { q: "آیا کنتور یا انشعاب من تغییر می‌کند؟",
    a: "خیر. برق از همان شبکه و کنتور می‌رسد؛ فقط طرف قرارداد و قیمت‌گذاری تغییر می‌کند." },
  { q: "ربات تلگرام برق آزاد چه کاری انجام می‌دهد؟",
    a: "در ربات، پیشنهادهای عرضه و تقاضای برق آزاد را ثبت و دنبال می‌کنید تا با طرف مقابل مناسب قرارداد ببندید." }
];
