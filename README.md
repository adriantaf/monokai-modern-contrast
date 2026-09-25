# Monokai Modern Contrast

Near-black workbench with clear borders. Soft Monokai on the code — elegant, not neon.

**Site:** https://adriantaf.github.io/monokai-modern-contrast/

The six token colors keep their Monokai roles — keywords, strings, types, functions, numbers, parameters — at a calmer saturation. Chrome stays almost black; structure comes from borders.

![Preview](./res/screenshot.png)

## Install

In VS Code or Cursor: **Extensions** → search `Monokai Modern Contrast` → Install, then select it from **Color Theme**.

```
ext install AdrianTafoya.monokai-modern-contrast
```

## vs classic Monokai

- Editor `#121212`, sidebar `#0e0e0e` — deeper than classic olive
- Tabs, panels, and status bar use `#2c2c2c` borders for structure
- Keyword rose is softened (`#C45B78`); operators and most identifiers stay `#E8E6E3`
- Git marks and tree selection stay muted so they do not compete with the code

## Palette

| Token | Hex | Used for |
| --- | --- | --- |
| Background | `#0E0E0E` / `#121212` | Chrome / editor |
| Foreground | `#E8E6E3` | Text, operators |
| Border | `#2C2C2C` | Workbench edges |
| Keyword | `#C45B78` | `if`, `class`, tags |
| String | `#B8AE6A` | Strings |
| Function | `#8BAE5B` | Functions, classes |
| Type | `#6A9EAA` | Types (italic) |
| Number | `#9580B8` | Numbers, booleans |
| Parameter | `#C4895A` | Parameters (italic) |
| Comment | `#6E6B66` | Comments |
| Accent | `#8A8680` | Focus, active tab |

## Recommended

```json
{
  "workbench.colorTheme": "Monokai Modern Contrast",
  "editor.semanticHighlighting.enabled": true
}
```

## License

MIT

A theme by [Bektor](https://bektor.tech)
