/* ==========================================================================
   اطلاعات سایت و محصولات
   --------------------------------------------------------------------------
   ⚠ مهم: همهٔ مقادیر زیر «نمونه» هستند. قبل از انتشار سایت، اطلاعات تماس،
   آمار شرکت و مشخصات فنی هر مدل را با اطلاعات واقعی جایگزین کنید.
   برای افزودن مدل جدید کافی است یک آبجکت به آرایهٔ PRODUCTS اضافه کنید.
   ========================================================================== */

window.SITE = {
  name: "داتیس آوان نیرو",
  nameEn: "Datis Avan Niroo",
  tagline: "دیزل ژنراتور، انرژی خورشیدی و تأمین برق صنایع",
  phone: "021-00000000",          // TODO: شمارهٔ ثابت واقعی
  mobile: "0900-000-0000",        // TODO: شمارهٔ همراه / واتس‌اپ
  whatsapp: "989000000000",       // TODO: بدون صفر اول و با کد کشور
  email: "info@example.com",      // TODO: ایمیل شرکت
  address: "تهران، خیابان نمونه، پلاک ۰",  // TODO: نشانی دفتر
  workshop: "کارگاه و انبار: شهرک صنعتی نمونه",  // TODO
  hours: "شنبه تا چهارشنبه ۸ تا ۱۷ — پنجشنبه ۸ تا ۱۳",
  instagram: "https://instagram.com/",    // TODO
  // اگر سرویس دریافت فرم دارید (مثلاً Formspree یا API خودتان)، آدرس آن را اینجا بگذارید.
  // در غیر این صورت فرم‌ها پیام را در برنامهٔ ایمیل کاربر آماده می‌کنند.
  formEndpoint: "",
  spotlight: "on-110p",           // مدلی که در کارت «پرفروش این ماه» بالای صفحهٔ اول نمایش داده می‌شود
  stats: [                                  // TODO: آمار واقعی شرکت
    { value: 15, suffix: "+", label: "سال تجربه در صنعت برق" },
    { value: 1200, suffix: "+", label: "دستگاه نصب‌شده" },
    { value: 2500, suffix: " kVA", label: "حداکثر توان تک‌دستگاه" },
    { value: 24, suffix: "/7", label: "پشتیبانی و خدمات اضطراری" }
  ]
};

window.TYPES = {
  open:      { label: "روباز (Open)",       short: "روباز",    icon: "layers",    img: "open-1.jpg",
               desc: "مناسب نصب در موتورخانه و سالن‌های سرپوشیده؛ دسترسی آسان برای سرویس." },
  silent:    { label: "سایلنت (کانوپی)",    short: "سایلنت",   icon: "volume-2",  img: "canopy-1.jpg",
               desc: "کاور عایق صدا و ضد آب برای نصب در فضای باز، ساختمان‌ها و بیمارستان‌ها." },
  container: { label: "کانتینری",           short: "کانتینری", icon: "container", img: "enclosure.jpg",
               desc: "برای توان‌های بالا؛ شامل تابلو، سوخت‌رسانی و تهویه در یک کانتینر استاندارد." },
  trailer:   { label: "سیار (تریلری)",      short: "سیار",     icon: "truck",     img: "rental-fleet.jpg",
               desc: "نصب روی تریلر برای پروژه‌های عمرانی، رویدادها و برق اضطراری موقت." }
};

window.RANGES = [
  { id: "r1", label: "توان پایین",   min: 0,    max: 100,    desc: "منازل، ویلاها، مغازه‌ها و دفاتر",               meter: 2 },
  { id: "r2", label: "توان متوسط",  min: 100,  max: 500,    desc: "ساختمان‌های تجاری، کارگاه‌ها و مراکز درمانی",  meter: 5 },
  { id: "r3", label: "توان بالا",    min: 500,  max: 1000,   desc: "کارخانه‌ها، بیمارستان‌ها و دیتاسنترها",         meter: 8 },
  { id: "r4", label: "نیروگاهی",     min: 1000, max: 100000, desc: "صنایع سنگین، معادن و نیروگاه‌های اضطراری",     meter: 10 }
];

window.BRANDS = ["Perkins", "Cummins", "Volvo Penta", "Doosan", "Baudouin", "MTU"];

/* مشخصات مشترک که برای همهٔ مدل‌ها تکرار می‌شود */
const COMMON = {
  voltage: "400/230 V",
  frequency: "50 Hz",
  phase: "سه‌فاز",
  rpm: 1500,
  pf: "0.8",
  cooling: "رادیاتوری (آب)",
  governor: "الکترونیکی",
  warranty: "۲۴ ماه یا ۲۰۰۰ ساعت کارکرد"
};

/* type: open | silent | container | trailer
   prime / standby: kVA
   fuel75 / fuel100: مصرف سوخت (لیتر در ساعت)
   dims: طول × عرض × ارتفاع (میلی‌متر) */
window.PRODUCTS = [
  {
    id: "on-22p", model: "ON-22P", type: "silent", brand: "Perkins",
    prime: 20, standby: 22,
    engine: "Perkins 403A-15G2", cylinders: "3 خطی", displacement: 1.5, aspiration: "تنفس طبیعی",
    alternator: "Stamford S0L2-P1", controller: "DeepSea DSE7320", ats: true,
    fuel75: 4.2, fuel100: 5.3, tank: 60, noise: 67,
    dims: [1800, 850, 1150], weight: 720,
    images: ["canopy-2.jpg", "canopy-1.jpg", "warehouse.jpg"],
    featured: false,
    intro: "ژنراتور کم‌صدا و جمع‌وجور برای ویلاها، فروشگاه‌ها و دفاتر کوچک که با کلید اتوماتیک (ATS) در لحظهٔ قطع برق خودکار روشن می‌شود."
  },
  {
    id: "on-33p", model: "ON-33P", type: "silent", brand: "Perkins",
    prime: 30, standby: 33,
    engine: "Perkins 1103A-33G", cylinders: "3 خطی", displacement: 3.3, aspiration: "تنفس طبیعی",
    alternator: "Stamford PI144J", controller: "DeepSea DSE7320", ats: true,
    fuel75: 6.1, fuel100: 7.9, tank: 90, noise: 68,
    dims: [2100, 950, 1300], weight: 1050,
    images: ["canopy-1.jpg", "canopy-2.jpg", "warehouse.jpg"],
    featured: true,
    intro: "انتخاب محبوب برای ساختمان‌های مسکونی و تجاری؛ کاور سایلنت با عایق صوتی و مخزن سوخت داخلی برای کارکرد طولانی."
  },
  {
    id: "on-44pt", model: "ON-44PT", type: "trailer", brand: "Perkins",
    prime: 40, standby: 44,
    engine: "Perkins 1103A-33TG1", cylinders: "3 خطی", displacement: 3.3, aspiration: "توربوشارژ",
    alternator: "Mecc Alte ECP32-1S", controller: "DeepSea DSE6120", ats: false,
    fuel75: 8.3, fuel100: 10.8, tank: 150, noise: 70,
    dims: [3300, 1500, 1900], weight: 1650,
    images: ["rental-fleet.jpg", "canopy-1.jpg", "install-crane.jpg"],
    featured: false,
    intro: "ژنراتور سیار روی تریلر دو محور با ترمز و چراغ راهنما؛ مناسب کارگاه‌های عمرانی، رویدادها و برق موقت."
  },
  {
    id: "on-66p", model: "ON-66P", type: "open", brand: "Perkins",
    prime: 60, standby: 66,
    engine: "Perkins 1103A-33TG2", cylinders: "3 خطی", displacement: 3.3, aspiration: "توربوشارژ",
    alternator: "Stamford UCI224D", controller: "DeepSea DSE7320", ats: true,
    fuel75: 11.9, fuel100: 15.6, tank: 120, noise: null,
    dims: [2000, 800, 1350], weight: 980,
    images: ["open-1.jpg", "open-2.jpg", "warehouse.jpg"],
    featured: false,
    intro: "مدل روباز برای نصب در موتورخانه؛ شاسی مقاوم با لرزه‌گیر و مخزن سوخت داخل شاسی."
  },
  {
    id: "on-110p", model: "ON-110P", type: "silent", brand: "Perkins",
    prime: 100, standby: 110,
    engine: "Perkins 1104C-44TAG2", cylinders: "4 خطی", displacement: 4.4, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford UCI274C", controller: "DeepSea DSE7320", ats: true,
    fuel75: 16.5, fuel100: 21.4, tank: 220, noise: 71,
    dims: [3100, 1100, 1750], weight: 1650,
    images: ["canopy-1.jpg", "canopy-2.jpg", "warehouse.jpg"],
    featured: true,
    intro: "پرفروش‌ترین مدل برای برج‌ها، مراکز خرید و کلینیک‌ها؛ با کنترلر دیجیتال و امکان پایش از راه دور."
  },
  {
    id: "on-165c", model: "ON-165C", type: "open", brand: "Cummins",
    prime: 150, standby: 165,
    engine: "Cummins 6BTAA5.9-G2", cylinders: "6 خطی", displacement: 5.9, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford UCI274G", controller: "DeepSea DSE7320", ats: true,
    fuel75: 25.1, fuel100: 33.2, tank: 300, noise: null,
    dims: [2600, 1000, 1600], weight: 1720,
    images: ["open-2.jpg", "open-1.jpg", "warehouse.jpg"],
    featured: false,
    intro: "موتور کامینز با قطعات در دسترس و هزینهٔ نگهداری پایین؛ مناسب کارگاه‌ها و واحدهای تولیدی."
  },
  {
    id: "on-220v", model: "ON-220V", type: "silent", brand: "Volvo Penta",
    prime: 200, standby: 220,
    engine: "Volvo Penta TAD733GE", cylinders: "6 خطی", displacement: 7.1, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer TAL 044 F", controller: "ComAp InteliLite 9", ats: true,
    fuel75: 32.0, fuel100: 41.5, tank: 400, noise: 72,
    dims: [3800, 1300, 2100], weight: 2850,
    images: ["canopy-2.jpg", "canopy-1.jpg", "install-crane.jpg"],
    featured: true,
    intro: "موتور ولوو پنتا با مصرف سوخت بهینه و آلایندگی پایین؛ مناسب بیمارستان‌ها و ساختمان‌های اداری."
  },
  {
    id: "on-385c", model: "ON-385C", type: "open", brand: "Cummins",
    prime: 350, standby: 385,
    engine: "Cummins NTA855-G2A", cylinders: "6 خطی", displacement: 14.0, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford HCI444FS", controller: "DeepSea DSE8610", ats: true,
    fuel75: 51.0, fuel100: 67.3, tank: 500, noise: null,
    dims: [3500, 1400, 2000], weight: 3600,
    images: ["open-1.jpg", "hero.jpg", "warehouse.jpg"],
    featured: false,
    intro: "ژنراتور صنعتی قدرتمند با قابلیت سنکرون‌سازی موازی؛ مناسب کارخانه‌ها و خطوط تولید."
  },
  {
    id: "on-500d", model: "ON-500D", type: "silent", brand: "Doosan",
    prime: 455, standby: 500,
    engine: "Doosan DP158LD", cylinders: "V8", displacement: 14.6, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer TAL 049 D", controller: "DeepSea DSE8610", ats: true,
    fuel75: 66.5, fuel100: 88.0, tank: 800, noise: 75,
    dims: [5200, 1700, 2400], weight: 5400,
    images: ["canopy-1.jpg", "enclosure.jpg", "install-crane.jpg"],
    featured: true,
    intro: "توان بالا در کاور سایلنت؛ انتخاب مناسب برای مجتمع‌های بزرگ، هتل‌ها و مراکز درمانی."
  },
  {
    id: "on-660v", model: "ON-660V", type: "container", brand: "Volvo Penta",
    prime: 600, standby: 660,
    engine: "Volvo Penta TWD1643GE", cylinders: "6 خطی", displacement: 16.1, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford HCI544D", controller: "ComAp InteliGen 500", ats: true,
    fuel75: 90.0, fuel100: 118.0, tank: 1000, noise: 75,
    dims: [6058, 2438, 2591], weight: 9800,
    images: ["enclosure.jpg", "install-crane.jpg", "plant.jpg"],
    featured: false,
    intro: "کانتینر ۲۰ فوت شامل ژنراتور، تابلو برق، سیستم سوخت‌رسانی و تهویه؛ آمادهٔ حمل و نصب سریع."
  },
  {
    id: "on-1000c", model: "ON-1000C", type: "container", brand: "Cummins",
    prime: 900, standby: 1000,
    engine: "Cummins KTA38-G5", cylinders: "V12", displacement: 38.0, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Stamford PI734B", controller: "ComAp InteliGen 500", ats: true,
    fuel75: 142.0, fuel100: 190.0, tank: 1500, noise: 78,
    dims: [12192, 2438, 2896], weight: 16500,
    images: ["enclosure.jpg", "plant.jpg", "install-crane.jpg"],
    featured: true,
    intro: "کانتینر ۴۰ فوت برای دیتاسنترها و صنایع؛ قابلیت کار موازی چند دستگاه و پایش از راه دور."
  },
  {
    id: "on-1400b", model: "ON-1400B", type: "container", brand: "Baudouin",
    prime: 1250, standby: 1400,
    engine: "Baudouin 12M33G1400/5", cylinders: "V12", displacement: 32.7, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer LSA 50.2", controller: "ComAp InteliGen 500", ats: true,
    fuel75: 190.0, fuel100: 250.0, tank: 2000, noise: 80,
    dims: [12192, 2438, 2896], weight: 19000,
    images: ["plant.jpg", "enclosure.jpg", "hero.jpg"],
    featured: false,
    intro: "راهکار نیروگاهی برای معادن، پالایشگاه‌ها و صنایع سنگین با طراحی مقاوم برای کارکرد مداوم."
  },
  {
    id: "on-2000m", model: "ON-2000M", type: "container", brand: "MTU",
    prime: 1800, standby: 2000,
    engine: "MTU 16V4000G23", cylinders: "V16", displacement: 76.3, aspiration: "توربوشارژ + اینترکولر",
    alternator: "Leroy Somer LSA 52.3", controller: "ComAp InteliGen 500", ats: true,
    fuel75: 262.0, fuel100: 345.0, tank: 2500, noise: 82,
    dims: [12192, 2438, 2896], weight: 25500,
    images: ["hero.jpg", "plant.jpg", "enclosure.jpg"],
    featured: true,
    intro: "بزرگ‌ترین مدل سبد محصولات؛ مناسب نیروگاه‌های اضطراری، فرودگاه‌ها و مراکز حیاتی."
  }
].map(p => Object.assign({}, COMMON, p));

window.SERVICES = [
  { icon: "file-text", title: "مشاوره و انتخاب توان", text: "محاسبهٔ بار مصرفی، بازدید از محل و پیشنهاد مدل و ظرفیت مناسب بدون هزینه.",
    points: ["محاسبهٔ دقیق بار و ضریب همزمانی", "انتخاب بین روباز، سایلنت و کانتینری"] },
  { icon: "package", title: "تأمین و فروش", text: "عرضهٔ دیزل ژنراتور نو با موتورهای معتبر و ارائهٔ اسناد و گارانتی.",
    points: ["موتورهای Perkins، Cummins، Volvo و...", "تحویل از انبار یا سفارشی"] },
  { icon: "hard-hat", title: "نصب و راه‌اندازی", text: "حمل، جابه‌جایی با جرثقیل، اجرای فونداسیون، اگزوز، سوخت‌رسانی و کابل‌کشی.",
    points: ["تست بار با لودبانک", "تحویل با صورت‌جلسهٔ راه‌اندازی"] },
  { icon: "plug-zap", title: "تابلو ATS و سنکرون", text: "طراحی و ساخت تابلوهای چنج‌اور اتوماتیک و سنکرون‌سازی چند ژنراتور.",
    points: ["انتقال خودکار بار در کمتر از ۱۰ ثانیه", "کار موازی با شبکه یا چند دستگاه"] },
  { icon: "sun", title: "طراحی و اجرای نیروگاه خورشیدی", text: "از طراحی و اخذ مجوز تا نصب پنل، اینورتر و اتصال به شبکه، برای منازل، ساختمان‌ها و صنایع.",
    points: ["متصل به شبکه، آف‌گرید و هیبرید با دیزل ژنراتور", "پایش تولید از راه دور"] },
  { icon: "landmark", title: "تأمین برق صنایع از بورس", text: "خرید برق عادی، سبز و آزاد از بورس انرژی برای مشترکین با دیماند بالای ۱۵۰ کیلووات.",
    points: ["بررسی قبض و برآورد هزینه", "پیگیری ثبت‌نام، خرید و تسویهٔ ماهانه"] },
  { icon: "wrench", title: "سرویس و تعمیرات", text: "قراردادهای نگهداری دوره‌ای، تعمیرات اساسی موتور و آلترناتور و تأمین قطعات.",
    points: ["سرویس دوره‌ای طبق ساعت کارکرد", "تیم اعزامی اضطراری ۲۴ ساعته"] },
  { icon: "truck", title: "اجارهٔ ژنراتور", text: "اجارهٔ کوتاه‌مدت و بلندمدت ژنراتورهای سیار برای پروژه‌ها و رویدادها.",
    points: ["حمل، نصب و اپراتور", "توان ۲۰ تا ۵۰۰ کیلوولت‌آمپر"] }
];

window.WHY = [       // TODO: اعداد را با تعهدات واقعی شرکت جایگزین کنید
  { title: "تست بار پیش از تحویل", big: "۱۰۰٪ بار",
    text: "هر دستگاه پیش از تحویل با لودبانک در بار کامل تست می‌شود و نتیجه در صورت‌جلسهٔ راه‌اندازی ثبت می‌شود." },
  { title: "پایش از راه دور", big: "۲۴/۷",
    text: "با ماژول GSM یا اترنت، وضعیت بار، سوخت، ساعت کارکرد و خطاها را از هر جا روی موبایل ببینید." },
  { title: "سرویس و قطعات", big: "۴۸ ساعت",
    text: "تیم فنی سیار و انبار قطعات مصرفی برای کوتاه‌ترین زمان توقف در شرایط اضطراری." },
  { title: "گارانتی رسمی", big: "۲۴ ماه",
    text: "گارانتی موتور و آلترناتور به‌همراه قرارداد سرویس دوره‌ای بر اساس ساعت کارکرد." }
];

window.PROJECTS = [   // TODO: پروژه‌های واقعی شرکت را جایگزین کنید
  { img: "install-crane.jpg", title: "برق اضطراری بیمارستان", place: "تهران", power: "۲ × ۵۰۰ kVA",
    text: "تأمین، نصب با جرثقیل و راه‌اندازی دو دستگاه سایلنت به‌همراه تابلو سنکرون و ATS." },
  { img: "enclosure.jpg", title: "نیروگاه اضطراری مجتمع صنعتی", place: "اصفهان", power: "۱۰۰۰ kVA",
    text: "ژنراتور کانتینری با سیستم سوخت‌رسانی مرکزی و پایش از راه دور." },
  { img: "plant.jpg", title: "موتورخانهٔ برق دیتاسنتر", place: "مشهد", power: "۴ × ۱۴۰۰ kVA",
    text: "چهار دستگاه موازی با افزونگی N+1 برای تضمین برق بدون وقفه." }
];

window.FAQ = [
  { q: "چطور توان مناسب ژنراتور را انتخاب کنم؟",
    a: "مجموع توان تجهیزاتی که باید هم‌زمان کار کنند را حساب کنید و جریان راه‌اندازی موتورها (مثل پمپ، آسانسور و کمپرسور) را هم در نظر بگیرید. معمولاً ۲۰ تا ۲۵ درصد ظرفیت اضافه پیشنهاد می‌شود. کارشناسان ما این محاسبه را رایگان برایتان انجام می‌دهند." },
  { q: "تفاوت توان Prime و Standby چیست؟",
    a: "توان Prime توانی است که ژنراتور می‌تواند به‌صورت پیوسته و با بار متغیر تأمین کند. توان Standby حداکثر توان برای برق اضطراری در زمان قطع شبکه است و معمولاً حدود ۱۰ درصد بیشتر از Prime است." },
  { q: "ژنراتور سایلنت چقدر صدا دارد؟",
    a: "بسته به توان، سطح صدای مدل‌های سایلنت در فاصلهٔ ۷ متری بین ۶۵ تا ۸۰ دسی‌بل است. برای محیط‌های حساس، کاور سوپرسایلنت هم قابل سفارش است." },
  { q: "آیا نصب و راه‌اندازی هم انجام می‌دهید؟",
    a: "بله. حمل، فونداسیون، اگزوز، کابل‌کشی، تابلو ATS، تست بار و آموزش اپراتور همگی توسط تیم فنی ما انجام می‌شود." },
  { q: "گارانتی و خدمات پس از فروش چگونه است؟",
    a: "دستگاه‌ها دارای گارانتی و خدمات پس از فروش هستند و امکان عقد قرارداد سرویس دوره‌ای و پشتیبانی اضطراری ۲۴ ساعته وجود دارد." }
];


/* ==========================================================================
   انرژی خورشیدی
   ⚠ مشخصات پنل‌ها نمونه هستند؛ با دیتاشیت رسمی برندی که عرضه می‌کنید جایگزین کنید.
   watt: توان نامی (Wp) — eff: راندمان (٪) — ولتاژها و جریان‌ها در شرایط STC
   ========================================================================== */
const PANEL_COMMON = {
  tol: "0 ~ +5 W", noct: 45, maxV: 1500, tempRange: "−40 ~ +85 °C",
  load: "برف ۵۴۰۰ پاسکال / باد ۲۴۰۰ پاسکال",
  glass: "شیشهٔ سکوریت ضدانعکاس ۳٫۲ میلی‌متر", frame: "آلومینیوم آنودایز", jbox: "IP68", connector: "MC4"
};

window.SOLAR_PANELS = [
  { id: "sp-200m", model: "ON-SP200M", watt: 200, cellEn: "Mono PERC", cell: "مونوکریستال PERC", cells: "۳۶ سلول", bifacial: false, halfcut: false,
    eff: 19.8, vmp: 20.6, imp: 9.71, voc: 24.6, isc: 10.35, tempPmax: -0.36, dims: [1480, 680, 35], weight: 11.5,
    warrantyProduct: 10, warrantyPower: 25, images: ["panel-mono.jpg", "solar-roof.jpg", "solar-install.jpg"],
    intro: "پنل سبک و کم‌حجم برای سیستم‌های آف‌گرید کوچک: ویلا، دوربین مداربسته، پمپ آب کوچک و شارژ باتری ۱۲ ولت." },
  { id: "sp-450m", model: "ON-SP450M", watt: 450, cellEn: "Mono PERC Half-cut", cell: "مونوکریستال PERC نیم‌سلول", cells: "۱۴۴ نیم‌سلول", bifacial: false, halfcut: true,
    eff: 20.7, vmp: 41.4, imp: 10.87, voc: 49.5, isc: 11.6, tempPmax: -0.35, dims: [2094, 1038, 35], weight: 23.5,
    warrantyProduct: 12, warrantyPower: 25, images: ["panel-mono.jpg", "solar-roof.jpg", "solar-install.jpg"],
    intro: "انتخاب اقتصادی برای نیروگاه‌های خانگی و پشت‌بامی؛ ابعاد مناسب برای حمل و نصب روی سقف‌های کوچک." },
  { id: "sp-550m", model: "ON-SP550M", watt: 550, cellEn: "Mono PERC Half-cut", cell: "مونوکریستال PERC نیم‌سلول", cells: "۱۴۴ نیم‌سلول", bifacial: false, halfcut: true,
    eff: 21.3, vmp: 41.9, imp: 13.13, voc: 49.9, isc: 14.0, tempPmax: -0.35, dims: [2279, 1134, 35], weight: 28.5,
    warrantyProduct: 12, warrantyPower: 25, images: ["panel-mono.jpg", "solar-industrial.jpg", "solar-install.jpg"],
    featured: true,
    intro: "پرفروش‌ترین پنل برای نیروگاه‌های متصل به شبکه و صنعتی؛ توان بالا در هر پنل یعنی سازه و کابل‌کشی کمتر." },
  { id: "sp-580n", model: "ON-SP580N", watt: 580, cellEn: "N-type TOPCon Bifacial", cell: "TOPCon نوع N دوطرفه", cells: "۱۴۴ نیم‌سلول", bifacial: true, halfcut: true,
    eff: 22.5, vmp: 42.6, imp: 13.62, voc: 51.2, isc: 14.35, tempPmax: -0.30, dims: [2278, 1134, 30], weight: 32,
    warrantyProduct: 15, warrantyPower: 30, images: ["panel-mono.jpg", "solar-farm.jpg", "solar-industrial.jpg"],
    featured: true,
    intro: "فناوری TOPCon با ضریب دمایی پایین برای گرمای تابستان ایران؛ شیشه‌دوطرفه با تولید اضافه از سطح پشتی." },
  { id: "sp-620n", model: "ON-SP620N", watt: 620, cellEn: "N-type TOPCon Bifacial", cell: "TOPCon نوع N دوطرفه", cells: "۱۳۲ نیم‌سلول (۲۱۰ میلی‌متری)", bifacial: true, halfcut: true,
    eff: 22.9, vmp: 39.6, imp: 15.66, voc: 47.6, isc: 16.5, tempPmax: -0.29, dims: [2382, 1134, 30], weight: 33.5,
    warrantyProduct: 15, warrantyPower: 30, images: ["panel-mono.jpg", "solar-farm-2.jpg", "solar-farm.jpg"],
    intro: "برای نیروگاه‌های زمینی و مگاواتی؛ بیشترین توان در هر پنل برای کمترین هزینهٔ سازه و نصب به ازای هر کیلووات." }
].map(p => Object.assign({}, PANEL_COMMON, p));

window.SOLAR_SYSTEMS = [
  { key: "ongrid", icon: "house", img: "solar-roof.jpg", title: "متصل به شبکه (آن‌گرید)", tag: "۵ تا ۲۰۰ کیلووات",
    text: "برق تولیدی مصرف شما را کم می‌کند یا به شبکه فروخته می‌شود؛ مناسب منازل، ساختمان‌ها و طرح‌های خرید تضمینی." },
  { key: "industrial", icon: "factory", img: "solar-industrial.jpg", title: "نیروگاه صنعتی و پشت‌بامی", tag: "۱۰۰ کیلووات تا چند مگاوات",
    text: "روی سقف سوله، پارکینگ یا زمین کارخانه؛ کاهش هزینهٔ برق و تأمین سهم برق تجدیدپذیر صنایع." },
  { key: "hybrid", icon: "battery-charging", img: "solar-install.jpg", title: "هیبرید خورشیدی + دیزل ژنراتور", tag: "کاهش مصرف سوخت",
    text: "پنل، باتری و دیزل ژنراتور با یک کنترلر هوشمند؛ ژنراتور فقط وقتی لازم است روشن می‌شود." },
  { key: "offgrid", icon: "sun", img: "solar-farm-2.jpg", title: "مستقل از شبکه (آف‌گرید)", tag: "با باتری",
    text: "برای ویلا، باغ، چاه کشاورزی و دکل مخابراتی در مناطقی که شبکه ندارند یا ناپایدار است." }
];

// ماشین‌حساب: ساعات اوج تابش (PSH) و ضریب عملکرد سیستم
window.SOLAR_CALC = {
  regions: [
    { v: 4.3, label: "کم‌تابش (سواحل شمال)" },
    { v: 5.2, label: "متوسط (بیشتر شهرها)" },
    { v: 5.9, label: "پرتابش (مرکز، جنوب و شرق)" }
  ],
  pr: 0.78,              // Performance Ratio
  panelW: 550,           // پنل مبنای محاسبه
  areaPerPanel: 2.9,     // مترمربع سقف به ازای هر پنل (با فاصلهٔ ردیف‌ها)
  co2PerKwh: 0.6         // کیلوگرم CO2 به ازای هر کیلووات‌ساعت برق شبکه (تقریبی)
};

window.SOLAR_FAQ = [
  { q: "برای خانه یا کارخانهٔ من چند کیلووات پنل لازم است؟",
    a: "به مصرف ماهانه و میزان تابش منطقه بستگی دارد. با ماشین‌حساب همین صفحه یک برآورد اولیه بگیرید؛ کارشناس ما پس از بازدید، طراحی دقیق را ارائه می‌کند." },
  { q: "نیروگاه متصل به شبکه چطور درآمد یا صرفه‌جویی ایجاد می‌کند؟",
    a: "برق تولیدی یا مصرف داخلی شما را کم می‌کند یا طبق قرارداد خرید تضمینی به شبکه فروخته می‌شود. شرایط قرارداد طبق ضوابط جاری ساتبا تعیین می‌شود و ما مراحل آن را پیگیری می‌کنیم." },
  { q: "عمر پنل خورشیدی چقدر است؟",
    a: "۲۵ تا ۳۰ سال، با گارانتی خطی توان. افت توان سالانهٔ پنل‌های باکیفیت معمولاً کمتر از نیم درصد است." },
  { q: "گرما و گرد و غبار روی تولید اثر دارد؟",
    a: "بله. شست‌وشوی دوره‌ای و انتخاب پنل با ضریب دمایی پایین‌تر (مثل TOPCon) افت تولید در تابستان را کم می‌کند." },
  { q: "هیبرید خورشیدی و دیزل ژنراتور چه مزیتی دارد؟",
    a: "در ساعات آفتابی بار با برق خورشیدی تأمین می‌شود و ژنراتور خاموش می‌ماند. مصرف سوخت، ساعت کارکرد و هزینهٔ سرویس ژنراتور کم می‌شود." }
];

/* ==========================================================================
   تأمین برق صنایع از بورس انرژی
   ⚠ TODO: تعاریف، مزایا و مراحل زیر کلی هستند؛ قبل از انتشار با واحد بازرگانی
   شرکت و مقررات جاری بورس انرژی و وزارت نیرو تطبیق داده شوند.
   ========================================================================== */
window.ENERGY = {
  minDemand: 150   // حداقل دیماند قراردادی (کیلووات)
};

window.ENERGY_PLANS = [
  { key: "normal", icon: "zap", title: "برق عادی", tag: "تابلو اصلی بورس انرژی",
    text: "خرید برق تولید نیروگاه‌های حرارتی از بورس انرژی، با قیمتی که در رقابت عرضه و تقاضا کشف می‌شود.",
    points: ["قیمت شفاف و کشف‌شده در بورس", "قرارداد ماهانه یا بلندمدت", "ثبت خرید در قبض همان اشتراک"],
    fit: "صنایع با مصرف پایه و یکنواخت" },
  { key: "green", icon: "leaf", title: "برق سبز", tag: "تابلو برق سبز",
    text: "برق تولیدشده در نیروگاه‌های خورشیدی و بادی که در تابلو برق سبز بورس انرژی عرضه می‌شود.",
    points: ["تأمین سهم برق تجدیدپذیر صنایع", "گواهی مصرف برق سبز", "کاهش ردپای کربن برای صادرات و گزارش ESG"],
    fit: "صنایع صادرات‌محور و مشمول الزام تجدیدپذیر" },
  { key: "free", icon: "trending-up", title: "برق آزاد", tag: "نرخ آزاد / قرارداد دوجانبه",
    text: "تأمین برق با نرخ آزاد و قرارداد مستقیم با تولیدکننده، برای مصرف مازاد یا نیاز به تأمین مطمئن‌تر.",
    points: ["انعطاف در مقدار و زمان تحویل", "مناسب مصرف بالاتر از سهمیه", "مذاکرهٔ مستقیم قیمت و شرایط"],
    fit: "صنایع با مصرف متغیر یا بیش از سهمیه" }
];

window.ENERGY_COMPARE = [
  ["منبع تولید", "نیروگاه‌های حرارتی شبکه", "نیروگاه‌های خورشیدی و بادی", "نیروگاه‌های طرف قرارداد"],
  ["نحوهٔ قیمت‌گذاری", "کشف قیمت در بورس", "کشف قیمت در تابلو برق سبز", "نرخ توافقی"],
  ["مدت قرارداد", "ماهانه تا سالانه", "ماهانه تا سالانه", "بر اساس توافق"],
  ["مزیت اصلی", "قیمت شفاف و رقابتی", "گواهی سبز و سهم تجدیدپذیر", "انعطاف در حجم و زمان"],
  ["مناسب برای", "مصرف پایه و یکنواخت", "صادرکنندگان و صنایع مشمول الزام", "مصرف متغیر یا مازاد"]
];

window.ENERGY_STEPS = [
  { t: "بررسی قبض و دیماند", d: "دیماند قراردادی، مصرف ماهانه و الگوی بار شما را بررسی و هزینه را برآورد می‌کنیم." },
  { t: "ثبت‌نام و کد معاملاتی", d: "مدارک شرکت را برای ثبت در سامانهٔ بورس انرژی آماده و پیگیری می‌کنیم." },
  { t: "انتخاب نوع برق و قرارداد", d: "ترکیب مناسب برق عادی، سبز و آزاد و مدت قرارداد تعیین می‌شود." },
  { t: "خرید و تحویل", d: "برق در بورس خریداری و از طریق شبکهٔ سراسری به اشتراک شما تحویل می‌شود." },
  { t: "تسویه و گزارش ماهانه", d: "گزارش مصرف، هزینه و گواهی‌ها هر ماه برایتان ارسال می‌شود." }
];

window.ENERGY_FAQ = [
  { q: "چه مشترکینی می‌توانند برق را از بورس بخرند؟",
    a: "مشترکین صنعتی و تجاری با دیماند قراردادی بالای ۱۵۰ کیلووات. برای اطمینان از شرایط اشتراک خود، تصویر قبض برق را برای ما بفرستید." },
  { q: "آیا محل تحویل برق یا کنتور من تغییر می‌کند؟",
    a: "خیر. برق همچنان از همان شبکهٔ توزیع و همان کنتور به شما می‌رسد؛ فقط طرف قرارداد و نحوهٔ قیمت‌گذاری تغییر می‌کند." },
  { q: "تفاوت برق سبز با برق عادی چیست؟",
    a: "برق فیزیکی همان برق شبکه است، اما در برق سبز معادل مصرف شما در نیروگاه‌های تجدیدپذیر تولید و با گواهی ثبت می‌شود." },
  { q: "قیمت برق در بورس چقدر است؟",
    a: "قیمت در هر عرضه بر اساس عرضه و تقاضا کشف می‌شود. پس از بررسی قبض، برآورد هزینه و مقایسه با تعرفهٔ فعلی را برایتان آماده می‌کنیم." },
  { q: "چه مدارکی لازم است؟",
    a: "تصویر قبض برق اخیر، مدارک ثبتی شرکت و معرفی‌نامهٔ صاحب امضا. فهرست کامل را کارشناس ما ارسال می‌کند." }
];