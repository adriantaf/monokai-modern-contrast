/**
 * Locale by location: Spanish for Spanish-speaking countries, English otherwise.
 * Override: ?lang=es|en  or  localStorage key `mmc-lang`
 */
(function (global) {
  const STORAGE_KEY = "mmc-lang";
  const ES_COUNTRIES = new Set([
    "ES", "MX", "AR", "CO", "CL", "PE", "VE", "EC", "GT", "CU",
    "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "GQ", "PR",
  ]);

  const strings = {
    es: {
      docTitle: "Monokai Modern Contrast — Classic Monokai. Chrome más silencioso.",
      docDescription:
        "Monokai clásico en el código. Un workbench oliva silencioso a su alrededor. Tema gratis para VS Code y Cursor.",
      navInstall: "Instalar",
      heroAria: "Inicio",
      heroImgAlt: "Editor con Monokai Modern Contrast",
      headline: "Monokai clásico en el código. Un workbench oliva silencioso a su alrededor.",
      lede: "Los seis colores donde pertenecen. El resto, papel. Chrome oliva, no neón.",
      ctaPrimary: "Instalar en VS Code / Cursor",
      ctaGhost: "Ver el tema",
      previewLabel: "En el editor",
      previewTitle: "Contraste sutil, no un reskin neón.",
      previewCopy:
        "Editor más profundo que el Monokai clásico. Tabs, badges y foco en la familia oliva-marrón. El rosa de keywords sigue siendo el original.",
      previewImgAlt: "Captura de Monokai Modern Contrast en VS Code",
      paletteLabel: "Paleta",
      paletteTitle: "Seis colores. El resto, silencio.",
      paletteCopy:
        "Keywords, strings, types, functions, numbers, parameters. Todo lo demás se queda en papel.",
      installLabel: "Instalar",
      installTitle: "Un comando. Listo.",
      installCopyBefore: "Busca ",
      installCopyAfter: " en Extensions, o ejecuta:",
      footerBy: "MIT · Un tema de ",
      langSwitch: "EN",
      langSwitchAria: "Cambiar a inglés",
      // reel
      reelTag: "Monokai clásico. Chrome más silencioso.",
      reelHeroTitle: "El rosa donde importa.<br/>El chrome, en silencio.",
      reelHeroCopy: "Keywords clásicos. Workbench oliva. Sin neón de más.",
      reelCaption: "En VS Code / Cursor",
      reelPreviewAlt: "Vista previa del tema",
      reelCtaTitle: "Instálalo hoy.",
      reelCtaCopy: "Gratis en el Marketplace · MIT · Bektor",
    },
    en: {
      docTitle: "Monokai Modern Contrast — Classic Monokai. Quieter chrome.",
      docDescription:
        "Classic Monokai on the code. A quiet olive workbench around it. Free theme for VS Code and Cursor.",
      navInstall: "Install",
      heroAria: "Home",
      heroImgAlt: "Editor with Monokai Modern Contrast",
      headline: "Classic Monokai on the code. A quiet olive workbench around it.",
      lede: "The six colors stay where they belong. Everything else stays paper. Olive chrome, not neon.",
      ctaPrimary: "Install for VS Code / Cursor",
      ctaGhost: "See the theme",
      previewLabel: "In the editor",
      previewTitle: "Subtle contrast — not a neon reskin.",
      previewCopy:
        "A deeper editor than classic Monokai. Tabs, badges, and focus stay in the brown-olive family. Keyword pink is still the original.",
      previewImgAlt: "Screenshot of Monokai Modern Contrast in VS Code",
      paletteLabel: "Palette",
      paletteTitle: "Six colors. The rest is quiet.",
      paletteCopy:
        "Keywords, strings, types, functions, numbers, parameters. Everything else stays paper.",
      installLabel: "Install",
      installTitle: "One command. Done.",
      installCopyBefore: "Search ",
      installCopyAfter: " in Extensions, or run:",
      footerBy: "MIT · A theme by ",
      langSwitch: "ES",
      langSwitchAria: "Switch to Spanish",
      // reel
      reelTag: "Classic Monokai. Quieter chrome.",
      reelHeroTitle: "Pink where it matters.<br/>Chrome stays quiet.",
      reelHeroCopy: "Classic keywords. Olive workbench. No extra neon.",
      reelCaption: "In VS Code / Cursor",
      reelPreviewAlt: "Theme preview",
      reelCtaTitle: "Install it today.",
      reelCtaCopy: "Free on the Marketplace · MIT · Bektor",
    },
  };

  function fromBrowser() {
    const langs = [
      ...(navigator.languages || []),
      navigator.language || "",
    ].map((l) => String(l).toLowerCase());
    return langs.some((l) => l.startsWith("es")) ? "es" : "en";
  }

  function fromQuery() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "es" || q === "en") return q;
    return null;
  }

  function fromStorage() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v === "es" || v === "en") return v;
    } catch (_) {}
    return null;
  }

  async function fromLocation() {
    const controllers = [
      async () => {
        const res = await fetch("https://get.geojs.io/v1/ip/country.json", {
          signal: AbortSignal.timeout(2500),
        });
        if (!res.ok) throw new Error("geojs");
        const data = await res.json();
        return String(data.country || data.country_code || "").toUpperCase();
      },
      async () => {
        const res = await fetch("https://ipapi.co/country_code/", {
          signal: AbortSignal.timeout(2500),
        });
        if (!res.ok) throw new Error("ipapi");
        return (await res.text()).trim().toUpperCase();
      },
    ];

    for (const fn of controllers) {
      try {
        const cc = await fn();
        if (cc && /^[A-Z]{2}$/.test(cc)) {
          return ES_COUNTRIES.has(cc) ? "es" : "en";
        }
      } catch (_) {}
    }
    return null;
  }

  function apply(lang) {
    const t = strings[lang] || strings.en;
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key || t[key] == null) return;
      if (el.hasAttribute("data-i18n-html")) {
        el.innerHTML = t[key];
      } else {
        el.textContent = t[key];
      }
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr");
      if (!spec) return;
      spec.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key && t[key] != null) el.setAttribute(attr, t[key]);
      });
    });

    if (t.docTitle) document.title = t.docTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && t.docDescription) meta.setAttribute("content", t.docDescription);

    document.dispatchEvent(
      new CustomEvent("mmc:lang", { detail: { lang, strings: t } })
    );
    return t;
  }

  function setLang(lang, persist) {
    const next = lang === "es" ? "es" : "en";
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {}
    }
    return apply(next);
  }

  function toggle() {
    const cur = document.documentElement.dataset.lang === "es" ? "es" : "en";
    return setLang(cur === "es" ? "en" : "es", true);
  }

  async function init() {
    const forced = fromQuery() || fromStorage();
    if (forced) {
      apply(forced);
      return forced;
    }

    // Optimistic: browser first so text isn't wrong while geo loads
    apply(fromBrowser());

    const byGeo = await fromLocation();
    if (byGeo && !fromQuery() && !fromStorage()) {
      apply(byGeo);
      return byGeo;
    }
    return document.documentElement.dataset.lang || "en";
  }

  global.MMC_I18N = {
    strings,
    init,
    apply,
    setLang,
    toggle,
    fromBrowser,
  };
})(window);
