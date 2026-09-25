/**
 * English by default. Spanish via ?lang=es, localStorage, or the language toggle.
 */
(function (global) {
  const STORAGE_KEY = "mmc-lang";

  const strings = {
    es: {
      docTitle: "Monokai Modern Contrast",
      docDescription:
        "Workbench casi negro con bordes claros. Sintaxis Monokai suave — elegante, sin neón. Tema gratis para VS Code y Cursor.",
      navIndex: "Índice",
      navPalette: "Paleta",
      navInstall: "Instalar",
      heroAria: "Inicio",
      heroImgAlt: "Editor con Monokai Modern Contrast",
      brandLine: "Modern Contrast",
      lede: "Monokai suave sobre casi negro. Bordes para estructura. Nada de neón.",
      ctaPrimary: "Instalar tema",
      ctaGhost: "Ver specimen",
      scrollHint: "Desplazar",
      marquee:
        "keyword #C45B78 — string #B8AE6A — function #8BAE5B — type #6A9EAA — number #9580B8 — parameter #C4895A — comment #6E6B66 —",
      previewLabel: "01 / Specimen",
      previewTitle: "El código habla.\nEl chrome calla.",
      previewCopy:
        "Más profundo que el Monokai clásico. Bordes claros. Rosa de keywords suavizado — sin fluorescencia.",
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
      reelTag: "Monokai suave. Chrome casi negro.",
      reelHeroTitle: "Rosa donde importa.<br/>El chrome, en silencio.",
      reelHeroCopy: "Keywords calmados. Workbench oscuro. Sin neón.",
      reelCaption: "En VS Code / Cursor",
      reelPreviewAlt: "Vista previa del tema",
      reelCtaTitle: "Instálalo hoy.",
      reelCtaCopy: "Gratis en el Marketplace · MIT · Bektor",
    },
    en: {
      docTitle: "Monokai Modern Contrast",
      docDescription:
        "Near-black workbench with clear borders. Soft Monokai syntax — elegant, not neon. Free theme for VS Code and Cursor.",
      navIndex: "Index",
      navPalette: "Palette",
      navInstall: "Install",
      heroAria: "Home",
      heroImgAlt: "Editor with Monokai Modern Contrast",
      brandLine: "Modern Contrast",
      lede: "Soft Monokai on near-black. Borders for structure. Nothing neon.",
      ctaPrimary: "Install theme",
      ctaGhost: "View specimen",
      scrollHint: "Scroll",
      marquee:
        "keyword #C45B78 — string #B8AE6A — function #8BAE5B — type #6A9EAA — number #9580B8 — parameter #C4895A — comment #6E6B66 —",
      previewLabel: "01 / Specimen",
      previewTitle: "Code speaks.\nChrome stays quiet.",
      previewCopy:
        "Deeper than classic Monokai. Clear borders. Keyword rose is softened — no fluorescence.",
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
      reelTag: "Soft Monokai. Near-black chrome.",
      reelHeroTitle: "Rose where it matters.<br/>Chrome stays quiet.",
      reelHeroCopy: "Calm keywords. Dark workbench. No neon.",
      reelCaption: "In VS Code / Cursor",
      reelPreviewAlt: "Theme preview",
      reelCtaTitle: "Install it today.",
      reelCtaCopy: "Free on the Marketplace · MIT · Bektor",
    },
  };

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

  function init() {
    const forced = fromQuery() || fromStorage();
    apply(forced || "en");
    return forced || "en";
  }

  global.MMC_I18N = {
    strings,
    init,
    apply,
    setLang,
    toggle,
  };
})(window);
