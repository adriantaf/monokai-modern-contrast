# Promo — Monokai Modern Contrast

Piezas para difusión del tema (landing SaaS + reel corto).

## Idioma (ES / EN)

El texto se elige por **ubicación** (país hispanohablante → español; resto → inglés), con fallback al idioma del navegador.

- Forzar: `?lang=es` o `?lang=en`
- Alternar en la landing con el botón ES/EN (queda guardado)

## Abrir en local

```bash
npx --yes serve promo -l 4173
```

- Landing: http://localhost:4173/
- Reel 16:9: http://localhost:4173/reel
- Español: http://localhost:4173/?lang=es
- English: http://localhost:4173/?lang=en

## Assets

| Archivo | Uso |
| --- | --- |
| `index.html` | Landing promocional |
| `reel.html` | Secuencia automática para video |
| `reel.mp4` | Clip ~14s listo para redes |
| `i18n.js` | Detección de idioma + strings ES/EN |
| `hero.png` | Hero full-bleed |
| `preview.png` | Captura real del tema |
| `social.png` | Cuadrado para redes |
| `icon.png` | Icono de la extensión |
