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
      docTitle: "Monokai Modern Contrast",
      docDescription:
        "Monokai clásico en el código. Workbench oliva, sin neón. Tema gratis para VS Code y Cursor.",
      navIndex: "Índice",
      navPalette: "Paleta",
      navInstall: "Instalar",
      heroAria: "Inicio",
      heroImgAlt: "Editor con Monokai Modern Contrast",
      brandLine: "Modern Contrast",
      lede: "Los seis colores donde pertenecen. El resto, papel.",
      ctaPrimary: "Instalar tema",
      ctaGhost: "Ver specimen",
      scrollHint: "Desplazar",
      marquee:
        "keyword #F92672 — string #E6DB74 — function #A6E22E — type #66D9EF — number #AE81FF — parameter #FD971F — comment #75715E —",
      previewLabel: "01 / Specimen",
      previewTitle: "El código habla.\nEl chrome calla.",
      previewCopy:
        "Más profundo que el Monokai clásico. Tabs y foco en oliva. El rosa de keywords sigue siendo el original.",
      previewImgAlt: "Captura de Monokai Modern Contrast en VS Code",
      paletteLabel: "02 / Tokens",
      paletteTitle: "Seis. Nada más.",
      tokenKeyword: "keyword",
      tokenString: "string",
      tokenFunction: "function",
      tokenType: "type",
      tokenNumber: "number",
      tokenParameter: "parameter",
      installLabel: "03 / Install",
      installTitle: "Un comando.",
      installHint: "Clic para copiar",
      installCopied: "Copiado",
      footerBy: "MIT · Bektor",
      langSwitch: "EN",
      langSwitchAria: "Cambiar a inglés",
      reelTag: "Monokai clásico. Chrome más silencioso.",
      reelHeroTitle: "El rosa donde importa.<br/>El chrome, en silencio.",
      reelHeroCopy: "Keywords clásicos. Workbench oliva. Sin neón de más.",
      reelCaption: "En VS Code / Cursor",
      reelPreviewAlt: "Vista previa del tema",
      reelCtaTitle: "Instálalo hoy.",
      reelCtaCopy: "Gratis en el Marketplace · MIT · Bektor",
    },
    en: {
      docTitle: "Monokai Modern Contrast",
      docDescription:
        "Classic Monokai on the code. Quiet olive chrome. Free theme for VS Code and Cursor.",
      navIndex: "Index",
      navPalette: "Palette",
      navInstall: "Install",
      heroAria: "Home",
      heroImgAlt: "Editor with Monokai Modern Contrast",
      brandLine: "Modern Contrast",
      lede: "The six colors stay where they belong. Everything else stays paper.",
      ctaPrimary: "Install theme",
      ctaGhost: "View specimen",
      scrollHint: "Scroll",
      marquee:
        "keyword #F92672 — string #E6DB74 — function #A6E22E — type #66D9EF — number #AE81FF — parameter #FD971F — comment #75715E —",
      previewLabel: "01 / Specimen",
      previewTitle: "Code speaks.\nChrome stays quiet.",
      previewCopy:
        "Deeper than classic Monokai. Tabs and focus stay olive. Keyword pink is still the original.",
      previewImgAlt: "Screenshot of Monokai Modern Contrast in VS Code",
      paletteLabel: "02 / Tokens",
      paletteTitle: "Six. Nothing else.",
      tokenKeyword: "keyword",
      tokenString: "string",
      tokenFunction: "function",
      tokenType: "type",
      tokenNumber: "number",
      tokenParameter: "parameter",
      installLabel: "03 / Install",
      installTitle: "One command.",
      installHint: "Click to copy",
      installCopied: "Copied",
      footerBy: "MIT · Bektor",
      langSwitch: "ES",
      langSwitchAria: "Switch to Spanish",
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
