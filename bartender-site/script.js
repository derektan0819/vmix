/* ==========================================================================
   Mobile Bartender — script.js
   --------------------------------------------------------------------------
   1. SITE_CONFIG   ← ALL page content lives here. Edit this, not the HTML.
   2. Helpers
   3. Rendering (builds the page from SITE_CONFIG)
   4. Interactions (navigation, shortcuts, extras, filters, lightbox, reveal)
   5. Booking form (validation → WhatsApp message)
   6. Placeholder checker
   7. Start-up
   ========================================================================== */

'use strict';

/* ==========================================================================
   1. SITE_CONFIG
   --------------------------------------------------------------------------
   • Anything in [square brackets] is a PLACEHOLDER: it is highlighted on the
     page and counted in the corner badge until you replace it. Names in
     brackets (e.g. "[Portable bar setup]") are suggestions: keep only what
     you really offer, and remove the brackets.
   • image: "" shows a placeholder graphic. To use a real photo, put the file
     in an "images" folder next to index.html and write "images/your-file.jpg".
   • Add/remove items in any list. An EMPTY list ([]) hides that section.
   ========================================================================== */
const SITE_CONFIG = {
  brand: {
    name: "[Your Brand Name]",
    role: "Private Mobile Bartender",
    serviceArea: "[City / Service area]",
  },

  hero: {
    headline: "Craft cocktails, poured at your party.",
    lead: "A private bartender for house parties, birthdays, weddings and company events. Tell me about your night, and I'll be behind the bar.",
    image: "", // e.g. "images/hero.jpg" (portrait 4:5, at least 1600 × 2000 px; shown in an arch)
    imageAlt: "[Describe the hero photo, e.g. Bartender pouring a cocktail at a party]",
    imageFocus: "50% 50%", // which part of the photo stays visible inside the arch ("50% 30%" = a bit higher)
    // Shortcut links under the buttons. Each one jumps to the form with that
    // event type already chosen, so use names from booking.eventTypes.
    quickEventsLabel: "Planning a…",
    quickEvents: ["Birthday", "Wedding", "Corporate event", "House party"],
  },

  // Credentials line under the hero buttons. Real facts only. [] hides it.
  highlights: [
    { value: "[Number]+", label: "events served" },
    { value: "[Number]", label: "years behind the bar" },
    { value: "[Licence / training]", label: "[e.g. certified bartender]" },
  ],

  // Packages: price is free text, shown exactly as written, e.g. "From RM 800"
  packages: [
    {
      id: "intimate",
      name: "Intimate Gathering",
      summary: "For small get-togethers at home with close friends.",
      price: "[Price TBD]",
      details: ["Guests: [TBD]", "Service time: [TBD]", "Included: [TBD]"],
    },
    {
      id: "celebration",
      name: "Birthday & Family Party",
      summary: "For birthdays, anniversaries and family celebrations.",
      price: "[Price TBD]",
      details: ["Guests: [TBD]", "Service time: [TBD]", "Included: [TBD]"],
    },
    {
      id: "event",
      name: "Weddings & Corporate Events",
      summary: "For weddings, company parties and larger occasions.",
      price: "[Price TBD]",
      details: ["Guests: [TBD]", "Service time: [TBD]", "Included: [TBD]"],
    },
  ],

  // Travel & coverage, shown under the packages. Filters out far-away
  // enquiries before they reach you. zones: [] and intro: "" hides the box.
  // Keep the FAQ answer about travel in sync with this.
  coverage: {
    title: "Travel & coverage",
    intro: "Based in Kuala Lumpur. Travel is free within 15 km of KL city centre, e.g. Setapak and [other nearby areas].",
    zones: [
      { area: "Within 15 km of KL city centre", fee: "Free" },
      { area: "Elsewhere in KL & Selangor", fee: "+ [RM XX]" },
      { area: "Outside the Klang Valley", fee: "Ask me" },
    ],
    // Short reminder under "Where's the party?" in the booking form ("" = none)
    formHint: "Free travel within 15 km of KL city centre. A travel fee applies further out.",
  },

  // Extras: shown as tiles AND as tick-boxes in the booking form.
  // icon: "coupe" | "shaker" | "bar" | "glasses" | "leaf" | "clock"
  addons: [
    { id: "mocktails", icon: "leaf", name: "[Mocktail menu]", description: "[Short description]", price: "[Price TBD]" },
    { id: "bar", icon: "bar", name: "[Portable bar setup]", description: "[Short description]", price: "[Price TBD]" },
    { id: "glassware", icon: "glasses", name: "[Glassware]", description: "[Short description]", price: "[Price TBD]" },
    { id: "workshop", icon: "shaker", name: "[Cocktail workshop]", description: "[Short description]", price: "[Price TBD]" },
  ],

  // Cocktail menu: photos are shown at 4:5 (portrait), e.g. 1200 × 1500 px.
  // base: shown after the name like a bar menu ("Negroni ······ Gin").
  // category: used for the filter buttons (hidden if fewer than 2 categories).
  cocktails: [
    { name: "[Cocktail name 1]", base: "[Base spirit]", category: "[Signature]", description: "[One line: base spirit, flavour, mood]", image: "", imageAlt: "" },
    { name: "[Cocktail name 2]", base: "[Base spirit]", category: "[Signature]", description: "[One line: base spirit, flavour, mood]", image: "", imageAlt: "" },
    { name: "[Cocktail name 3]", base: "[Base spirit]", category: "[Classic]", description: "[One line: base spirit, flavour, mood]", image: "", imageAlt: "" },
    { name: "[Cocktail name 4]", base: "[Base spirit]", category: "[Classic]", description: "[One line: base spirit, flavour, mood]", image: "", imageAlt: "" },
    { name: "[Cocktail name 5]", base: "[Zero-proof base]", category: "[Mocktail]", description: "[One line: ingredients, flavour, mood]", image: "", imageAlt: "" },
    { name: "[Cocktail name 6]", base: "[Zero-proof base]", category: "[Mocktail]", description: "[One line: ingredients, flavour, mood]", image: "", imageAlt: "" },
  ],

  // Photos from real parties, shown square (1:1), e.g. 1200 × 1200 px. Real photos open full-size on tap.
  // Best: guests laughing with a drink in hand, your bar set-up, you mid-pour.
  // No bookings yet? Shoot a small party with friends to start.
  // caption (optional), e.g. "Birthday party · Mont Kiara"
  gallery: [
    { image: "", alt: "", caption: "" },
    { image: "", alt: "", caption: "" },
    { image: "", alt: "", caption: "" },
    { image: "", alt: "", caption: "" },
    { image: "", alt: "", caption: "" },
    { image: "", alt: "", caption: "" },
  ],

  // "How it works" steps
  process: [
    { title: "Send your enquiry", text: "Fill in the form below. It opens WhatsApp with your details ready to send." },
    { title: "Lock in your date", text: "I'll confirm your quote and menu. A 50% deposit by TNG eWallet or DuitNow secures the date." },
    { title: "Enjoy the night", text: "[What happens on the day, e.g. arrival and set-up time]" },
  ],

  // Real client reviews only (ask permission first). [] hides the section.
  testimonials: [
    { quote: "[Paste a real client review]", name: "[Client name]", event: "[Event type, month year]" },
    { quote: "[Paste a real client review]", name: "[Client name]", event: "[Event type, month year]" },
    { quote: "[Paste a real client review]", name: "[Client name]", event: "[Event type, month year]" },
  ],

  faq: [
    { question: "Do you bring the alcohol, or do I buy it?", answer: "[Answer TBD]" },
    { question: "How far in advance should I book?", answer: "At least 7 days before your event. For weekends, the earlier the better." },
    { question: "Which areas do you cover? Is there a travel fee?", answer: "Travel is free within 15 km of KL city centre. Elsewhere in KL & Selangor there's a travel fee of [RM XX]. Further out, just ask." },
    { question: "What do I need to prepare at the venue?", answer: "[Answer TBD, e.g. table, ice, power point]" },
    { question: "Can you make non-alcoholic drinks?", answer: "[Answer TBD]" },
    { question: "How do I confirm my booking?", answer: "Pay a 50% deposit by TNG eWallet or DuitNow and your date is locked in. If you cancel less than 3 days before the event, the deposit is non-refundable." },
  ],

  // Booking terms: shown above the Send button. The visitor must tick
  // "I agree" before sending, and the WhatsApp message records it.
  // Keep booking.minNoticeDays and the FAQ in sync. [] removes the box and the tick.
  terms: [
    "Book at least 7 days before your event.",
    "A 50% deposit (TNG eWallet or DuitNow) locks in your date. The balance is due [when, e.g. on the day before service starts].",
    "Cancel less than 3 days before the event and the deposit is non-refundable.",
    "Alcohol is served only to non-Muslim guests aged 21 and above.",
  ],

  // Malaysian alcohol notice + "Are you 21?" check on first visit
  legal: {
    notice: "Strictly for non-Muslims aged 21 and above. Please drink responsibly.", // footer ("" = none)
    ageGate: {
      enabled: true,
      title: "Are you 21 or older?",
      text: "This website features alcoholic drinks and is intended for non-Muslims aged 21 and above.",
      yes: "Yes, I'm 21+",
      no: "No",
      denied: "Sorry, this website is only for visitors aged 21 and above.",
      rememberDays: 30, // don't ask the same visitor again for this many days
    },
  },

  contact: {
    // WhatsApp: country code + number, digits only (no "+", spaces or dashes).
    // e.g. Malaysia 012-345 6789 → "60123456789"
    whatsapp: "[WhatsApp number]",
    whatsappDisplay: "", // optional nicer format for the footer, e.g. "+60 12-345 6789"
    email: "[Email address]", // set to "" to hide
  },

  // url: full link, e.g. "https://instagram.com/your.handle". Delete a line to remove it.
  socials: [
    { name: "Instagram", handle: "[@your.handle]", url: "" },
    { name: "TikTok", handle: "[@your.handle]", url: "" },
  ],

  booking: {
    // Keep "Other" in the list: choosing it shows a free-text field.
    eventTypes: ["House party", "Birthday", "Family gathering", "Wedding", "Corporate event", "Other"],
    hoursOptions: ["2 hours", "3 hours", "4 hours", "5 hours or more"],
    // Earliest date the form accepts, in days from today (0 = any future date)
    minNoticeDays: 7,
    // First and last lines of the WhatsApp message. {brand} = brand.name
    greeting: "Hi {brand}! I'd like to check your availability for an event.",
    signoff: "Sent from your website booking form.",
  },

  // Section headings. nav: label in the top menu ("" = not in the menu).
  // eyebrow: optional small label above a title ("" = none).
  sections: {
    services: {
      nav: "Services",
      eyebrow: "",
      title: "My Services",
      intro: "Pick the setup closest to your event. Not sure which fits? Send an enquiry and we'll work it out together.",
    },
    extras: {
      nav: "",
      eyebrow: "",
      title: "Add to Your Bar",
      intro: "Optional extras for any package. Tap one to include it in your enquiry.",
    },
    menu: {
      nav: "Cocktails",
      eyebrow: "",
      title: "Cocktail Menu",
      intro: "A few drinks from the menu.",
    },
    gallery: {
      nav: "Gallery",
      eyebrow: "",
      title: "Behind the Bar",
      intro: "Real nights from past events: the set-up, the drinks and the people enjoying them.",
    },
    process: {
      nav: "",
      eyebrow: "",
      title: "How Booking Works",
      intro: "",
    },
    reviews: {
      nav: "",
      eyebrow: "",
      title: "What Hosts Say",
      intro: "",
    },
    faq: {
      nav: "FAQ",
      eyebrow: "",
      title: "Good to Know",
      intro: "Quick answers to common questions.",
    },
    booking: {
      nav: "Book",
      eyebrow: "",
      title: "Book Your Bartender",
      intro: "Share a few details and your enquiry opens in WhatsApp, ready to send. It takes about a minute.",
      note: "I usually reply within [reply time].",
    },
  },

  // Button labels
  ui: {
    bookNow: "Book Now",
    seePackages: "See packages",
    enquirePackage: "Enquire about this",
    notSurePackage: "Not sure yet, help me choose",
    chooseEventType: "Choose one…",
    hoursNotSure: "Not sure yet",
    addExtra: "Add",
    extraAdded: "Added ✓",
    allCocktails: "All",
    instagramMore: "See more on Instagram",
    faqMore: "Still have a question?",
    faqMoreLink: "Message me on WhatsApp",
    faqMoreFallback: "Send me an enquiry",
    backToTop: "Back to top ↑",
  },

  // Shows a small "N placeholders left" box in the corner until everything is replaced
  showPlaceholderBadge: true,
};

/* ==========================================================================
   2. Helpers
   ========================================================================== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const PLACEHOLDER_TEST = /\[[^\]]*\]/;
const PLACEHOLDER_ALL = /\[[^\]]*\]/g;
const OTHER_EVENT = "Other";
const DESKTOP_NAV = "(min-width: 56em)"; // keep in sync with style.css (section 5)
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Section keys in page order → element id
const SECTION_ORDER = ["services", "extras", "menu", "gallery", "process", "reviews", "faq", "booking"];
const sectionId = (key) => (key === "booking" ? "book" : key);

// Safe access to a list in SITE_CONFIG (missing = empty)
const list = (key) => (Array.isArray(SITE_CONFIG[key]) ? SITE_CONFIG[key] : []);

function escapeHTML(value) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value ?? "").replace(/[&<>"']/g, (ch) => map[ch]);
}

// Escape text for HTML and wrap every [placeholder] in a highlighted span
function t(value) {
  return escapeHTML(value).replace(PLACEHOLDER_ALL, (match) => `<span class="tbd">${match}</span>`);
}

const hasPlaceholder = (value) => PLACEHOLDER_TEST.test(String(value ?? ""));
const fillBrand = (text) => String(text).replace(/\{brand\}/g, SITE_CONFIG.brand.name);
const packageId = (pkg, index) => pkg.id || `package-${index + 1}`;
const addonId = (addon, index) => addon.id || `extra-${index + 1}`;
const joinParts = (parts) => parts.filter(Boolean).map(t).join(" · ");

// Returns the WhatsApp number as digits, or null if it is missing / still a placeholder
function getWhatsAppNumber() {
  const raw = String(SITE_CONFIG.contact.whatsapp || "");
  if (!raw || hasPlaceholder(raw)) return null;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

const waLink = (number, text) => `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
const isEmail = (value) => /^[^\s@[\]]+@[^\s@[\]]+\.[^\s@[\]]{2,}$/.test(String(value || ""));
const isLiveUrl = (url) => /^https?:\/\//i.test(url || "") && !hasPlaceholder(url);

// Briefly highlight a form field that a shortcut has just filled in
function flash(el) {
  el.classList.add("is-prefilled");
  window.setTimeout(() => el.classList.remove("is-prefilled"), 2500);
}

// Simple line icons (inline SVG, inherit the text colour)
const ICONS = {
  coupe: '<path d="M9 12h30c0 8.5-6.7 14-15 14S9 20.5 9 12z"/><path d="M24 26v12M17 38h14"/>',
  shaker: '<path d="M19 6h10l-1 6h-8z"/><path d="M16 12h16l-2.5 30h-11z"/><path d="M17.2 20h13.6"/>',
  bar: '<path d="M5 22h38"/><path d="M8 22v18h32V22"/><path d="M8 31h32"/><path d="M15 22V11h4v11M28 22v-6h6v6"/>',
  glasses: '<path d="M9 8h11c0 6.5-2.3 11-5.5 11S9 14.5 9 8z"/><path d="M14.5 19v14M10.5 33h8"/><path d="M28 8h11c0 6.5-2.3 11-5.5 11S28 14.5 28 8z"/><path d="M33.5 19v14M29.5 33h8"/>',
  leaf: '<path d="M10 38c0-16 12-28 28-28 0 16-12 28-28 28z"/><path d="M10 38l16-16"/>',
  clock: '<circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 4"/>',
  pin: '<path d="M24 42S11 29.5 11 20a13 13 0 0 1 26 0c0 9.5-13 22-13 22z"/><circle cx="24" cy="20" r="4.5"/>',
};

function icon(name, className = "icon") {
  return `<svg class="${className}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.coupe}</svg>`;
}

// Lightweight photo placeholder (CSS gradient + label, no image file)
function photoPlaceholder({ label, detail, ariaLabel, className = "" }) {
  return `
    <div class="ph ${className}" role="img" aria-label="${escapeHTML(ariaLabel)}">
      ${icon("coupe", "ph__icon")}
      <p class="ph__label">${escapeHTML(label)}<small>${escapeHTML(detail)}</small></p>
    </div>`;
}

/* ==========================================================================
   3. Rendering
   ========================================================================== */
function renderHeader() {
  $("#brand-link").innerHTML = t(SITE_CONFIG.brand.name);
  $$('[data-cta="book"]').forEach((link) => {
    link.textContent = SITE_CONFIG.ui.bookNow;
  });
}

// Top menu: one link per visible section that has a "nav" label
function renderNav() {
  const { sections } = SITE_CONFIG;
  $("#nav-menu").innerHTML = SECTION_ORDER.filter((key) => sections[key] && sections[key].nav)
    .filter((key) => !document.getElementById(sectionId(key)).hidden)
    .map((key) => `<li><a class="nav__link" href="#${sectionId(key)}">${escapeHTML(sections[key].nav)}</a></li>`)
    .join("");
}

function renderHero() {
  const { brand, hero, ui } = SITE_CONFIG;

  // Portrait photo inside the arch (or a placeholder of the same shape)
  const media = hero.image
    ? `<img class="hero__img" src="${escapeHTML(hero.image)}" alt="${escapeHTML(hero.imageAlt)}"
         style="object-position: ${escapeHTML(hero.imageFocus || "50% 50%")}" fetchpriority="high">`
    : photoPlaceholder({
        label: "Hero photo · portrait 4:5",
        detail: "1600 × 2000 px, e.g. you behind the bar mid-pour",
        ariaLabel: "Hero photo placeholder",
      });
  $("#hero-media").innerHTML = `<div class="hero__arch">${media}</div>`;

  const creds = list("highlights");
  const credsHTML = creds.length
    ? `<ul class="hero__creds" role="list">
         ${creds.map((h) => `<li><span class="hero__cred-value">${t(h.value)}</span> ${t(h.label)}</li>`).join("")}
       </ul>`
    : "";

  const quick = (hero.quickEvents || []).filter(Boolean);
  const quickHTML = quick.length
    ? `<div class="quick-events">
         <p class="quick-events__label label" id="quick-events-label">${t(hero.quickEventsLabel)}</p>
         <ul class="quick-events__list" aria-labelledby="quick-events-label">
           ${quick.map((type) => `<li><a class="chip" href="#book" data-event-type="${escapeHTML(type)}">${t(type)}</a></li>`).join("")}
         </ul>
       </div>`
    : "";

  $("#hero-content").innerHTML = `
    <p class="hero__eyebrow label">${joinParts([brand.role, brand.serviceArea])}</p>
    <h1 class="hero__title" id="hero-title">${t(hero.headline)}</h1>
    <p class="hero__lead">${t(hero.lead)}</p>
    <div class="hero__actions">
      <a class="btn btn--primary btn--lg" href="#book">${t(ui.bookNow)}</a>
      <a class="btn btn--ghost btn--lg" href="#services">${t(ui.seePackages)}</a>
    </div>
    ${credsHTML}
    ${quickHTML}`;
}

// Eyebrow + h2 + intro (+ optional note) for a section
function renderSectionHead(key) {
  const section = SITE_CONFIG.sections[key];
  const el = $(`#${key}-head`);
  if (!section || !el) return;
  el.innerHTML = `
    ${section.eyebrow ? `<p class="eyebrow label">${t(section.eyebrow)}</p>` : ""}
    <h2 class="section__title" id="${key}-title">${t(section.title)}</h2>
    ${section.intro ? `<p class="section__intro">${t(section.intro)}</p>` : ""}
    ${section.note ? `<p class="section__note">${t(section.note)}</p>` : ""}`;
  el.classList.add("reveal");
}

function renderServices() {
  const { ui } = SITE_CONFIG;
  $("#services-list").innerHTML = list("packages")
    .map(
      (pkg, i) => `
      <article class="service reveal" style="--reveal-i: ${i}">
        <h3 class="service__name">${t(pkg.name)}</h3>
        <p class="service__price">${t(pkg.price)}</p>
        <p class="service__summary">${t(pkg.summary)}</p>
        ${
          pkg.details && pkg.details.length
            ? `<ul class="dash-list">${pkg.details.map((d) => `<li><span>${t(d)}</span></li>`).join("")}</ul>`
            : ""
        }
        <a class="btn btn--outline btn--block" href="#book" data-package="${escapeHTML(packageId(pkg, i))}"
           aria-label="${escapeHTML(`${ui.enquirePackage}: ${pkg.name}`)}">${t(ui.enquirePackage)}</a>
      </article>`
    )
    .join("");
}

// Travel & coverage box under the packages (a small rate card: area ······ fee)
function renderCoverage() {
  const coverage = SITE_CONFIG.coverage || {};
  const zones = (coverage.zones || []).filter((z) => z.area || z.fee);
  const el = $("#services-coverage");
  el.hidden = !zones.length && !coverage.intro;
  if (el.hidden) return;

  el.innerHTML = `
    <div class="coverage__head">
      ${icon("pin")}
      <div>
        ${coverage.title ? `<h3 class="coverage__title">${t(coverage.title)}</h3>` : ""}
        ${coverage.intro ? `<p class="coverage__intro">${t(coverage.intro)}</p>` : ""}
      </div>
    </div>
    ${
      zones.length
        ? `<ul class="coverage__zones" role="list">
             ${zones
               .map(
                 (z) => `
               <li class="coverage__zone">
                 <span class="coverage__area">${t(z.area)}</span>
                 <span class="coverage__leader" aria-hidden="true"></span>
                 <span class="coverage__fee">${t(z.fee)}</span>
               </li>`
               )
               .join("")}
           </ul>`
        : ""
    }`;
  el.classList.add("reveal");
}

function renderExtras() {
  const { ui } = SITE_CONFIG;
  $("#extras-list").innerHTML = list("addons")
    .map(
      (addon, i) => `
      <li class="extra reveal" style="--reveal-i: ${i % 2}">
        ${icon(addon.icon)}
        <div class="extra__body">
          <h3 class="extra__name">${t(addon.name)}</h3>
          ${addon.description ? `<p class="extra__desc">${t(addon.description)}</p>` : ""}
          ${addon.price ? `<p class="extra__price">${t(addon.price)}</p>` : ""}
        </div>
        <button class="btn btn--outline btn--sm extra__toggle" type="button" aria-pressed="false"
                data-addon="${escapeHTML(addonId(addon, i))}">
          <span class="btn__text">${escapeHTML(ui.addExtra)}</span>
          <span class="visually-hidden">: ${escapeHTML(addon.name)}</span>
        </button>
      </li>`
    )
    .join("");
}

function renderMenu() {
  const drinks = list("cocktails");
  $("#menu-list").innerHTML = drinks
    .map((drink, i) => {
      const media = drink.image
        ? `<img class="drink__img" src="${escapeHTML(drink.image)}" alt="${escapeHTML(drink.imageAlt || drink.name)}"
             width="1200" height="1500" loading="lazy" decoding="async">`
        : photoPlaceholder({
            label: "Cocktail photo · 4:5",
            detail: "1200 × 1500 px",
            ariaLabel: `Photo placeholder for ${drink.name}`,
            className: `ph--tint-${i % 6}`,
          });
      return `
        <li class="drink reveal" style="--reveal-i: ${i % 3}" data-category="${escapeHTML(drink.category || "")}">
          <div class="drink__media">${media}</div>
          ${drink.category ? `<p class="drink__tag label">${t(drink.category)}</p>` : ""}
          <div class="drink__title">
            <h3 class="drink__name">${t(drink.name)}</h3>
            ${drink.base ? `<span class="drink__leader" aria-hidden="true"></span><span class="drink__base label">${t(drink.base)}</span>` : ""}
          </div>
          ${drink.description ? `<p class="drink__desc">${t(drink.description)}</p>` : ""}
        </li>`;
    })
    .join("");

  // Filter buttons: "All" + one per category (only if there are 2+ categories)
  const categories = [...new Set(drinks.map((d) => d.category).filter(Boolean))];
  const filters = $("#menu-filters");
  filters.hidden = categories.length < 2;
  filters.innerHTML = filters.hidden
    ? ""
    : [`<button class="chip" type="button" aria-pressed="true" data-filter="">${escapeHTML(SITE_CONFIG.ui.allCocktails)}</button>`]
        .concat(categories.map((c) => `<button class="chip" type="button" aria-pressed="false" data-filter="${escapeHTML(c)}">${t(c)}</button>`))
        .join("");
}

function renderGallery() {
  const { socials, ui } = SITE_CONFIG;
  $("#gallery-list").innerHTML = list("gallery")
    .map((photo, i) => {
      const caption = photo.caption ? `<span class="gallery__caption">${t(photo.caption)}</span>` : "";
      const label = photo.alt || photo.caption || `Event photo ${i + 1}`;
      const inner = photo.image
        ? `<button class="gallery__open" type="button" data-gallery-index="${i}" aria-label="${escapeHTML(`Enlarge photo: ${label}`)}">
             <img class="gallery__img" src="${escapeHTML(photo.image)}" alt="" width="1200" height="1200" loading="lazy" decoding="async">
             ${caption}
           </button>`
        : photoPlaceholder({
            label: "Party photo · 1:1",
            detail: "1200 × 1200 px, guests with drinks or your bar set-up",
            ariaLabel: `Event photo placeholder ${i + 1}`,
            className: `ph--tint-${(i + 2) % 6}`,
          }) + caption;
      return `<li class="gallery__item reveal" style="--reveal-i: ${i % 3}">${inner}</li>`;
    })
    .join("");

  // "See more on Instagram" button, once the Instagram link is set
  const instagram = (socials || []).find((s) => /instagram/i.test(s.name || "") && isLiveUrl(s.url));
  $("#gallery-more").innerHTML = instagram
    ? `<a class="btn btn--outline" href="${escapeHTML(instagram.url)}" target="_blank" rel="noopener">${escapeHTML(ui.instagramMore)}</a>`
    : "";
}

function renderProcess() {
  $("#process-list").innerHTML = list("process")
    .map(
      (step, i) => `
      <li class="step reveal" style="--reveal-i: ${i}">
        <h3 class="step__title">${t(step.title)}</h3>
        ${step.text ? `<p class="step__text">${t(step.text)}</p>` : ""}
      </li>`
    )
    .join("");
}

function renderReviews() {
  $("#reviews-list").innerHTML = list("testimonials")
    .map(
      (review, i) => `
      <figure class="review reveal" style="--reveal-i: ${i % 3}">
        <blockquote class="review__quote"><p>${t(review.quote)}</p></blockquote>
        <figcaption class="review__by">
          <span class="review__name">${t(review.name)}</span>
          ${review.event ? t(review.event) : ""}
        </figcaption>
      </figure>`
    )
    .join("");
}

function renderFaq() {
  const { ui, booking } = SITE_CONFIG;
  const faqList = $("#faq-list");
  // name="faq" makes it an accordion (one open at a time) in modern browsers
  faqList.innerHTML = list("faq")
    .map(
      (item) => `
      <details class="faq__item" name="faq">
        <summary class="faq__q">${t(item.question)}</summary>
        <div class="faq__a"><p>${t(item.answer)}</p></div>
      </details>`
    )
    .join("");
  faqList.classList.add("reveal");

  const wa = getWhatsAppNumber();
  $("#faq-more").innerHTML =
    `${escapeHTML(ui.faqMore)} ` +
    (wa
      ? `<a href="${escapeHTML(waLink(wa, fillBrand(booking.greeting)))}" target="_blank" rel="noopener">${escapeHTML(ui.faqMoreLink)}</a>`
      : `<a href="#book">${escapeHTML(ui.faqMoreFallback)}</a>`);
}

// Fill the <select> menus and tick-boxes in the booking form
function renderBookingOptions() {
  const { booking, ui } = SITE_CONFIG;
  const types = booking.eventTypes.includes(OTHER_EVENT) ? booking.eventTypes : [...booking.eventTypes, OTHER_EVENT];

  $("#f-event-type").innerHTML =
    `<option value="" disabled selected>${escapeHTML(ui.chooseEventType)}</option>` +
    types.map((type) => `<option value="${escapeHTML(type)}">${escapeHTML(type)}</option>`).join("");

  $("#f-hours").innerHTML =
    `<option value="">${escapeHTML(ui.hoursNotSure)}</option>` +
    (booking.hoursOptions || []).map((h) => `<option value="${escapeHTML(h)}">${escapeHTML(h)}</option>`).join("");

  $("#f-package").innerHTML =
    `<option value="">${escapeHTML(ui.notSurePackage)}</option>` +
    list("packages")
      .map((pkg, i) => {
        const price = pkg.price && !hasPlaceholder(pkg.price) ? ` · ${pkg.price}` : "";
        return `<option value="${escapeHTML(packageId(pkg, i))}">${escapeHTML(pkg.name + price)}</option>`;
      })
      .join("");

  const addons = list("addons");
  $("#field-addons").hidden = !addons.length;
  $("#addon-checks").innerHTML = addons
    .map(
      (addon, i) => `
      <label class="check">
        <input type="checkbox" name="addons" value="${escapeHTML(addonId(addon, i))}">
        <span>${t(addon.name)}</span>
      </label>`
    )
    .join("");

  // Travel reminder next to the venue field
  const hint = SITE_CONFIG.coverage && SITE_CONFIG.coverage.formHint;
  if (hint) $("#f-venue-hint").insertAdjacentHTML("beforeend", ` ${t(hint)}`);

  // Booking terms above the Send button (+ the "I agree" tick)
  const terms = list("terms");
  $("#booking-terms").hidden = !terms.length;
  // <span> keeps the text one flex item, so a [placeholder] can't split the line
  $("#terms-list").innerHTML = terms.map((term) => `<li><span>${t(term)}</span></li>`).join("");
}

function renderFooter() {
  const { brand, contact, ui, legal } = SITE_CONFIG;
  const item = (html) => `<li>${html}</li>`;
  const contactItems = [];

  // WhatsApp
  const wa = getWhatsAppNumber();
  if (wa) {
    const shown = contact.whatsappDisplay || `+${wa}`;
    contactItems.push(`<a class="footer__item" href="${waLink(wa)}" target="_blank" rel="noopener">WhatsApp · ${escapeHTML(shown)}</a>`);
  } else if (contact.whatsapp) {
    const shown = hasPlaceholder(contact.whatsapp) ? contact.whatsapp : "[Check WhatsApp number format]";
    contactItems.push(`<span class="footer__item">WhatsApp · ${t(shown)}</span>`);
  }

  // Email
  if (isEmail(contact.email)) {
    contactItems.push(`<a class="footer__item" href="mailto:${escapeHTML(contact.email)}">${escapeHTML(contact.email)}</a>`);
  } else if (contact.email) {
    const shown = hasPlaceholder(contact.email) ? contact.email : "[Check email format]";
    contactItems.push(`<span class="footer__item">Email · ${t(shown)}</span>`);
  }

  const socialItems = list("socials")
    .filter((s) => s.name || s.handle)
    .map((s) => {
      const label = [s.name, s.handle].filter(Boolean).join(" · ");
      return isLiveUrl(s.url)
        ? `<a class="footer__item" href="${escapeHTML(s.url)}" target="_blank" rel="noopener">${t(label)}</a>`
        : `<span class="footer__item">${t(label)}</span>`;
    });

  $("#footer-content").innerHTML = `
    <div class="footer__grid">
      <div>
        <p class="footer__brand">${t(brand.name)}</p>
        <p class="footer__area">${joinParts([brand.role, brand.serviceArea])}</p>
      </div>
      ${contactItems.length ? `<div><h2 class="footer__heading">Contact</h2><ul class="footer__list">${contactItems.map(item).join("")}</ul></div>` : ""}
      ${socialItems.length ? `<div><h2 class="footer__heading">Follow</h2><ul class="footer__list">${socialItems.map(item).join("")}</ul></div>` : ""}
    </div>
    ${legal && legal.notice ? `<p class="footer__legal label">${t(legal.notice)}</p>` : ""}
    <div class="footer__bottom">
      <p>© ${new Date().getFullYear()} ${t(brand.name)}</p>
      <a class="footer__top" href="#top">${escapeHTML(ui.backToTop)}</a>
    </div>`;
}

// Hide sections whose list is empty, then alternate backgrounds on the rest
function applySectionVisibility() {
  const counts = {
    services: list("packages").length,
    extras: list("addons").length,
    menu: list("cocktails").length,
    gallery: list("gallery").length,
    process: list("process").length,
    reviews: list("testimonials").length,
    faq: list("faq").length,
    booking: 1,
  };
  SECTION_ORDER.forEach((key) => {
    document.getElementById(sectionId(key)).hidden = !counts[key];
  });

  $$("main > .section")
    .filter((section) => !section.hidden)
    .forEach((section, i) => section.classList.toggle("section--alt", i % 2 === 1));
}

/* ==========================================================================
   4. Interactions
   ========================================================================== */
function setupNavigation() {
  const header = $("#site-header");
  const toggle = $(".nav__toggle");

  const setOpen = (open) => {
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!header.classList.contains("is-open")));

  // Close the mobile menu when a link is tapped, on Escape, or on a tap outside
  header.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (header.classList.contains("is-open") && !header.contains(e.target)) setOpen(false);
  });
  window.matchMedia(DESKTOP_NAV).addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });

  // Header turns solid once the page is scrolled
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Shortcuts that pre-fill the form: package cards and "Planning a…" chips
function setupShortcuts() {
  const packageSelect = $("#f-package");
  const eventSelect = $("#f-event-type");

  document.addEventListener("click", (e) => {
    const pkgButton = e.target.closest("[data-package]");
    if (pkgButton) {
      packageSelect.value = pkgButton.dataset.package;
      flash(packageSelect);
    }

    const eventLink = e.target.closest("[data-event-type]");
    if (eventLink) {
      const value = eventLink.dataset.eventType;
      if (Array.from(eventSelect.options).some((o) => o.value === value)) {
        eventSelect.value = value;
        eventSelect.dispatchEvent(new Event("change", { bubbles: true }));
        flash(eventSelect);
      }
    }
  });
}

// Extras: tile buttons and form tick-boxes always stay in sync
function setupExtras() {
  const { ui } = SITE_CONFIG;
  const boxes = () => $$("#addon-checks input");

  const sync = () => {
    const chosen = new Set(boxes().filter((b) => b.checked).map((b) => b.value));
    $$("[data-addon]").forEach((button) => {
      const on = chosen.has(button.dataset.addon);
      button.setAttribute("aria-pressed", String(on));
      $(".btn__text", button).textContent = on ? ui.extraAdded : ui.addExtra;
    });
  };

  document.addEventListener("click", (e) => {
    const button = e.target.closest("[data-addon]");
    if (!button) return;
    const box = boxes().find((b) => b.value === button.dataset.addon);
    if (box) {
      box.checked = !box.checked;
      sync();
    }
  });
  $("#addon-checks").addEventListener("change", sync);
}

// Cocktail menu filter buttons
function setupMenuFilters() {
  const filters = $("#menu-filters");
  filters.addEventListener("click", (e) => {
    const button = e.target.closest("[data-filter]");
    if (!button) return;
    const value = button.dataset.filter;
    $$("[data-filter]", filters).forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    $$("#menu-list .drink").forEach((drink) => {
      drink.hidden = Boolean(value) && drink.dataset.category !== value;
    });
  });
}

// Full-size photo viewer for real gallery photos (native <dialog>)
function setupLightbox() {
  const dialog = $("#lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const img = $("#lightbox-img");
  const caption = $("#lightbox-caption");
  const photos = list("gallery")
    .map((photo, index) => ({ ...photo, index }))
    .filter((photo) => photo.image);
  let current = 0;

  const show = (position) => {
    current = (position + photos.length) % photos.length;
    const photo = photos[current];
    img.src = photo.image;
    img.alt = photo.alt || photo.caption || "Event photo";
    caption.innerHTML = photo.caption ? t(photo.caption) : "";
    caption.hidden = !photo.caption;
  };

  const many = photos.length > 1;
  $("#lightbox-prev").hidden = !many;
  $("#lightbox-next").hidden = !many;

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-gallery-index]");
    if (!trigger) return;
    show(photos.findIndex((p) => p.index === Number(trigger.dataset.galleryIndex)));
    dialog.showModal();
    document.documentElement.classList.add("has-dialog");
  });

  dialog.addEventListener("close", () => document.documentElement.classList.remove("has-dialog"));
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close(); // tap on the dark backdrop
  });
  dialog.addEventListener("keydown", (e) => {
    if (!many) return;
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });
  $("#lightbox-close").addEventListener("click", () => dialog.close());
  $("#lightbox-prev").addEventListener("click", () => show(current - 1));
  $("#lightbox-next").addEventListener("click", () => show(current + 1));
}

// Floating WhatsApp button: opens a chat, or falls back to the form until a number is set
function setupFloatingWhatsApp() {
  const button = $("#wa-float");
  const wa = getWhatsAppNumber();
  if (wa) {
    button.href = waLink(wa, fillBrand(SITE_CONFIG.booking.greeting));
    button.target = "_blank";
    button.rel = "noopener";
  } else {
    button.href = "#book";
    button.setAttribute("aria-label", "Go to the booking form");
  }
}

// "Are you 21 or older?" check, once per visitor (remembered in this browser)
const AGE_KEY = "ageConfirmedAt";

function setupAgeGate() {
  const gate = (SITE_CONFIG.legal && SITE_CONFIG.legal.ageGate) || {};
  const dialog = $("#age-gate");
  if (!gate.enabled || !dialog || typeof dialog.showModal !== "function") return;

  const rememberMs = (Number(gate.rememberDays) || 0) * 864e5;
  try {
    const confirmedAt = Number(localStorage.getItem(AGE_KEY));
    if (confirmedAt && Date.now() - confirmedAt < rememberMs) return;
  } catch {
    // Storage blocked (private mode etc.): simply ask again
  }

  $("#age-gate-icon").innerHTML = icon("coupe");
  $("#age-gate-brand").innerHTML = t(SITE_CONFIG.brand.name);
  $("#age-gate-title").innerHTML = t(gate.title);
  $("#age-gate-text").innerHTML = t(gate.text);
  $("#age-gate-yes").textContent = gate.yes;
  $("#age-gate-no").textContent = gate.no;

  let confirmed = false;
  const open = () => {
    dialog.showModal();
    document.documentElement.classList.add("has-dialog");
  };

  // Escape must not skip the question. Some browsers still close the dialog
  // on a repeated Escape, so it simply re-opens until "Yes" is chosen.
  dialog.addEventListener("cancel", (e) => e.preventDefault());
  dialog.addEventListener("close", () => {
    if (!confirmed) open();
    else document.documentElement.classList.remove("has-dialog");
  });

  $("#age-gate-yes").addEventListener("click", () => {
    confirmed = true;
    try {
      localStorage.setItem(AGE_KEY, String(Date.now()));
    } catch {
      // Not remembered; the visitor will be asked again next time
    }
    dialog.close();
  });

  $("#age-gate-no").addEventListener("click", () => {
    const denied = $("#age-gate-denied");
    $("#age-gate-actions").hidden = true;
    denied.textContent = gate.denied;
    denied.hidden = false;
    denied.focus();
  });

  open();
}

// Gentle fade-in on scroll. Skipped entirely for reduced-motion users.
function setupReveal() {
  const items = $$(".reveal");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  // Anything already on screen is shown straight away (no flash of faded content)
  items.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
  });
  document.documentElement.classList.add("has-reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  items.filter((el) => !el.classList.contains("is-visible")).forEach((el) => observer.observe(el));
}

/* ==========================================================================
   5. Booking form
   ========================================================================== */
const FIELDS = {
  name: "#f-name",
  contact: "#f-contact",
  date: "#f-date",
  time: "#f-time",
  guests: "#f-guests",
  hours: "#f-hours",
  venue: "#f-venue",
  eventType: "#f-event-type",
  eventOther: "#f-event-other",
  package: "#f-package",
  notes: "#f-notes",
  agree: "#f-agree",
};

// Friendly error messages, shown under each field
const ERRORS = {
  name: "Please tell me your name.",
  contactEmpty: "Please add a phone/WhatsApp number or email so I can reply.",
  contactInvalid: "That doesn't look quite right. Please check the number or email.",
  dateEmpty: "Please choose the date of your event.",
  datePast: "That date has already passed. Please pick a later date.",
  dateTooSoon: (days) =>
    `I need at least ${days} days' notice. For anything sooner, message me on WhatsApp and I'll check if I'm free.`,
  guestsEmpty: "Roughly how many guests? A best guess is fine.",
  guestsInvalid: "Please enter a whole number, like 25.",
  venue: "Where's the party? Just the area is fine.",
  eventType: "Please choose the type of event.",
  eventOther: "Please describe your event in a few words.",
  agree: "Please tick the box to confirm you've read the booking terms.",
};

// A date as YYYY-MM-DD in the visitor's own time zone, `offsetDays` from today
function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const todayISO = () => isoDate(0);
const minNoticeDays = () => Math.max(0, Math.floor(Number(SITE_CONFIG.booking.minNoticeDays) || 0));
const earliestDateISO = () => isoDate(minNoticeDays());

function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function validateContact(value) {
  if (!value) return ERRORS.contactEmpty;
  if (value.startsWith("@")) return value.length > 1 ? "" : ERRORS.contactInvalid; // Instagram handle
  if (value.includes("@")) return isEmail(value) ? "" : ERRORS.contactInvalid; // email
  if (/^[\d\s()+.-]+$/.test(value)) {
    return value.replace(/\D/g, "").length >= 7 ? "" : ERRORS.contactInvalid; // phone
  }
  return value.length >= 2 ? "" : ERRORS.contactInvalid; // anything else, e.g. a handle without "@"
}

// Required fields, in page order. Each returns "" when valid, or the error message.
const VALIDATORS = {
  name: (v) => (v ? "" : ERRORS.name),
  contact: validateContact,
  date: (v) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return ERRORS.dateEmpty;
    if (v < todayISO()) return ERRORS.datePast;
    return v < earliestDateISO() ? ERRORS.dateTooSoon(minNoticeDays()) : "";
  },
  guests: (v) => {
    if (!v) return ERRORS.guestsEmpty;
    return /^\d+$/.test(v) && Number(v) >= 1 ? "" : ERRORS.guestsInvalid;
  },
  venue: (v) => (v ? "" : ERRORS.venue),
  eventType: (v) => (v ? "" : ERRORS.eventType),
  eventOther: (v, data) => (data.eventType === OTHER_EVENT && !v ? ERRORS.eventOther : ""),
  agree: (v) => (list("terms").length && !v ? ERRORS.agree : ""),
};

function getFormData() {
  const value = (key) => ($(FIELDS[key]).value || "").trim();
  return {
    name: value("name"),
    contact: value("contact"),
    date: value("date"),
    time: value("time"),
    // Accept full-width digits (e.g. from a Chinese keyboard) as normal digits
    guests: value("guests").replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)),
    hours: value("hours"),
    venue: value("venue"),
    eventType: value("eventType"),
    eventOther: value("eventOther"),
    package: value("package"),
    addons: $$("#addon-checks input:checked").map((box) => box.value),
    notes: value("notes"),
    agree: $(FIELDS.agree).checked ? "yes" : "",
  };
}

function setFieldError(key, message) {
  const input = $(FIELDS[key]);
  const error = $(`#${input.id}-error`);
  input.closest(".field").classList.toggle("field--invalid", Boolean(message));
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
  if (error) error.textContent = message;
}

function validateField(key, data = getFormData()) {
  const message = VALIDATORS[key](data[key], data);
  setFieldError(key, message);
  return message;
}

// Validates everything; returns the first invalid input (or null)
function validateForm(data) {
  let firstInvalid = null;
  Object.keys(VALIDATORS).forEach((key) => {
    if (validateField(key, data) && !firstInvalid) firstInvalid = $(FIELDS[key]);
  });
  return firstInvalid;
}

// The message the visitor sends (WhatsApp understands *bold*)
function buildMessage(data) {
  const { booking } = SITE_CONFIG;
  const pkg = list("packages").find((p, i) => packageId(p, i) === data.package);
  const extras = data.addons.map((id) => {
    const addon = list("addons").find((a, i) => addonId(a, i) === id);
    return addon ? addon.name : id;
  });
  const eventType = data.eventType === OTHER_EVENT ? `Other (${data.eventOther})` : data.eventType;

  const lines = [fillBrand(booking.greeting), "", "*Booking enquiry*"];
  lines.push(`Name: ${data.name}`);
  lines.push(`Contact: ${data.contact}`);
  lines.push(`Date: ${formatDate(data.date)}`);
  if (data.time) lines.push(`Start time: ${data.time}`);
  lines.push(`Guests: ${Number(data.guests)}`);
  if (data.hours) lines.push(`Hours: ${data.hours}`);
  lines.push(`Venue: ${data.venue}`);
  lines.push(`Event: ${eventType}`);
  lines.push(`Package: ${pkg ? pkg.name : "Not sure yet"}`);
  if (extras.length) lines.push(`Extras: ${extras.join(", ")}`);
  if (data.notes) lines.push("", "*Notes*", data.notes);
  if (list("terms").length && data.agree) lines.push("", "I've read and agree to your booking terms ✓");
  lines.push("", booking.signoff);
  return lines.join("\n");
}

function showResult(message, whatsappUrl) {
  const panel = $("#booking-result");
  const waButton = $("#result-whatsapp");
  const text = $("#result-text");

  $("#result-message").value = message;
  $("#result-status").textContent = "";

  if (whatsappUrl) {
    waButton.href = whatsappUrl;
    waButton.hidden = false;
    text.textContent =
      "WhatsApp should open with your message filled in, so just tap send. If it didn't open, use the button below, or copy the message and send it another way.";
  } else {
    // Owner hasn't set a number yet: make that obvious, keep Copy as the way forward
    waButton.hidden = true;
    text.innerHTML = t(
      "[WhatsApp number not set up yet: add it in SITE_CONFIG.contact.whatsapp] For now, copy the message below and send it using the contact details at the bottom of the page."
    );
  }

  panel.hidden = false;
  panel.focus({ preventScroll: true });
  panel.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}

async function copyMessage() {
  const textarea = $("#result-message");
  const status = $("#result-status");
  let copied = false;

  try {
    await navigator.clipboard.writeText(textarea.value);
    copied = true;
  } catch {
    // Fallback for older browsers / non-secure pages
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    }
  }

  status.textContent = copied
    ? "Copied! Paste it into WhatsApp, Instagram or an email."
    : "Couldn't copy automatically. The message is selected, so please copy it by hand.";
}

/* --------------------------------------------------------------------------
   SWITCHING TO EMAIL LATER (Formspree or similar)
   --------------------------------------------------------------------------
   1. Create a form at https://formspree.io and copy its endpoint,
      e.g. "https://formspree.io/f/abcdwxyz".
   2. In handleSubmit() below, replace the "WhatsApp" block with:

        fetch("https://formspree.io/f/abcdwxyz", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, message }),
        })
          .then((res) => {
            if (!res.ok) throw new Error(res.status);
            // show your own "Thanks, I'll be in touch" message here
          })
          .catch(() => showResult(message, "")); // fall back to Copy

   3. Other services (Web3Forms, EmailJS, Netlify Forms, Google Apps Script)
      work the same way: POST `data` as JSON or FormData to their URL.
   -------------------------------------------------------------------------- */
let hasTriedSubmit = false;

function handleSubmit(event) {
  event.preventDefault();
  hasTriedSubmit = true;

  const data = getFormData();
  const firstInvalid = validateForm(data);
  if (firstInvalid) {
    firstInvalid.focus(); // focus moves to the first problem; its error is read out by screen readers
    return;
  }

  const message = buildMessage(data);

  // --- WhatsApp ---
  const number = getWhatsAppNumber();
  const whatsappUrl = number ? waLink(number, message) : "";
  if (whatsappUrl) {
    // Opened during the submit click, so pop-up blockers allow it
    const win = window.open(whatsappUrl, "_blank");
    if (win) win.opener = null;
  }
  showResult(message, whatsappUrl);
}

function setupBookingForm() {
  const form = $("#booking-form");
  const eventType = $(FIELDS.eventType);
  const otherField = $("#field-event-other");

  $(FIELDS.date).min = earliestDateISO(); // date picker greys out days that are too soon

  // Show the free-text field only when "Other" is chosen
  eventType.addEventListener("change", () => {
    const isOther = eventType.value === OTHER_EVENT;
    otherField.hidden = !isOther;
    if (!isOther) setFieldError("eventOther", "");
  });

  // Live feedback: check a field when leaving it (if filled in),
  // and re-check as the visitor types once an error is showing
  Object.keys(VALIDATORS).forEach((key) => {
    const input = $(FIELDS[key]);
    input.addEventListener("blur", () => {
      const filled = input.type === "checkbox" ? input.checked : input.value.trim();
      if (filled || hasTriedSubmit) validateField(key);
    });
    const recheck = () => {
      if (hasTriedSubmit || input.getAttribute("aria-invalid") === "true") validateField(key);
    };
    input.addEventListener("input", recheck);
    input.addEventListener("change", recheck);
  });

  form.addEventListener("submit", handleSubmit);
  $("#result-copy").addEventListener("click", copyMessage);
}

/* ==========================================================================
   6. Placeholder checker
   --------------------------------------------------------------------------
   Lists everything still marked [ ... ], every missing photo and the SEO
   tags in index.html. Full list: open the corner badge, or the browser
   console. The badge disappears by itself once the list is empty.
   ========================================================================== */
function collectPlaceholders() {
  const found = [];

  (function walk(value, path) {
    if (typeof value === "string") {
      if (hasPlaceholder(value)) found.push(path);
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => walk(v, `${path}[${i}]`));
    } else if (value && typeof value === "object") {
      Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`));
    }
  })(SITE_CONFIG, "SITE_CONFIG");

  if (SITE_CONFIG.contact.whatsapp && !hasPlaceholder(SITE_CONFIG.contact.whatsapp) && !getWhatsAppNumber()) {
    found.push("SITE_CONFIG.contact.whatsapp (wrong format: digits only, with country code)");
  }
  if (!SITE_CONFIG.hero.image) found.push("SITE_CONFIG.hero.image (photo)");
  list("cocktails").forEach((c, i) => {
    if (!c.image) found.push(`SITE_CONFIG.cocktails[${i}].image (photo)`);
  });
  list("gallery").forEach((g, i) => {
    if (!g.image) found.push(`SITE_CONFIG.gallery[${i}].image (photo)`);
  });

  if (hasPlaceholder(document.title)) found.push("index.html <title>");
  $$("head meta[content]").forEach((meta) => {
    if (hasPlaceholder(meta.content)) {
      found.push(`index.html <meta ${meta.getAttribute("property") || meta.getAttribute("name")}>`);
    }
  });

  return found;
}

function reportPlaceholders() {
  const found = collectPlaceholders();
  if (!found.length) return;

  console.warn(`[Site] ${found.length} placeholders left to replace:\n- ${found.join("\n- ")}`);
  if (!SITE_CONFIG.showPlaceholderBadge) return;

  const badge = document.createElement("div");
  badge.className = "tbd-badge";
  badge.innerHTML = `
    <details>
      <summary>${found.length} placeholder${found.length === 1 ? "" : "s"} left to replace</summary>
      <ol>${found.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ol>
    </details>
    <button class="tbd-badge__close" type="button" aria-label="Hide placeholder notice">×</button>`;
  badge.querySelector("button").addEventListener("click", () => badge.remove());
  document.body.appendChild(badge);
}

/* ==========================================================================
   7. Start-up
   ========================================================================== */
function init() {
  renderHeader();
  renderHero();
  SECTION_ORDER.forEach(renderSectionHead);
  renderServices();
  renderCoverage();
  renderExtras();
  renderMenu();
  renderGallery();
  renderProcess();
  renderReviews();
  renderFaq();
  renderBookingOptions();
  renderFooter();
  applySectionVisibility();
  renderNav();

  setupNavigation();
  setupShortcuts();
  setupExtras();
  setupMenuFilters();
  setupLightbox();
  setupFloatingWhatsApp();
  setupBookingForm();
  setupReveal();
  reportPlaceholders();
  setupAgeGate();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
