# Keairan Citanduy â€” Design System Package

> Editorial-documentary visual language for an Indonesian hydrological
> intelligence platform (WS Citanduy). Civic-tech with the calm
> authority of a magazine cover.

---

## Product Overview

**Keairan Citanduy** is the digital implementation of the *Platform
Intelijen Hidrologi Terpadu WS Citanduy* blueprint (BBWS / SIH3,
4 September 2026). It is a hydrological intelligence product for
Indonesia's Citanduy River Basin (Â±3.500 kmÂ², spanning Jabar and
Jateng) and serves three distinct audiences from a single data
pipeline:

1. **Warga DAS Citanduy** â€” general public, mobile-first, free. They
   get the *Peta Pantau Banjir*, the *Kalender Cuaca Tani Mikro*, and
   the *Kanal Pelaporan Warga*.
2. **Petambak udang vaname & petani** â€” paying commercial users of
   **AquaAlert**, the WhatsApp + SMS early-warning gateway that
   translates upstream river discharge into 12â€“24 hour salinity and
   flood warnings per pond.
3. **Konsultan AMDAL & kawasan industri** â€” paying corporate users of
   **Hydro-AMDAL**, the document-generation product that drafts BAB
   III *Analisis Hidrologi* (IDF curves, debit rencana, T<sub>r</sub>
   tables) directly into PDF/DOCX.

The product is bilingual on the front (Indonesian primary, English
small-caps for labels), numerik-forward on the back (every reading,
coordinate, currency figure, and timestamp is mono typeset), and
intentionally restrained on the outside (one yellow accent, one dark
editorial band per page).

### Core capabilities

| Capability | Surface | Source |
|---|---|---|
| Peta pantau banjir (live station map, status N/W/S) | `examples/dashboard.html`, `preview/applied-public-dashboard.html` | `assets/main.css` ticker/station, `assets/map-das-citanduy.svg` |
| Kalender cuaca tani mikro (72 px calendar cell, warn badge) | `examples/dashboard.html`, `ui_kits/app/components/dashboard.html` | `assets/main.css` calendar-cell |
| Laporan warga (form + feed) | `examples/dashboard.html`, `ui_kits/app/components/citizen-report.html` | `assets/main.css` report-form |
| AquaAlert WhatsApp / SMS warning | `examples/aqua-alert.html`, `ui_kits/app/components/aqua-alert.html` | `assets/icon-warning.svg` |
| Hydro-AMDAL BAB III doc + IDF curve | `examples/hydro-amdal.html`, `ui_kits/app/components/hydro-amdal.html` | `assets/main.css` doc-preview |
| Metodologi pipeline + spec tables | `examples/methodology.html` | `assets/main.css` spec-table |
| Beranda hero + 3 pillars + stat strip | `examples/index.html`, `ui_kits/app/components/masthead.html` | `assets/main.css` masthead / pillar / stat-strip |

### What this package is

A reusable **Open Design** design-system package extracted from the
source project **"Website Clone"**
(`34f5303a-4fc3-4e6f-ac12-e392cdffb01c`). The package preserves every
high-signal artifact, asset, and source example from the source
workspace and re-emits them under a documented visual contract.

| Need | Where it is satisfied |
|---|---|
| One source of truth for tokens & components | `DESIGN.md` Â§0â€“Â§7 |
| A reusable Claude Design skill | `SKILL.md` (frontmatter + sections) |
| Reviewer walk-through | `preview/index.html` + 8 focused preview cards + 3 applied screens |
| Drop-in kit for new surfaces | `ui_kits/app/` |
| Preserved source pages | `examples/` |
| Evidence trail | `context/provenance.md`, `context/component-manifest.md` |

---

## Source / Context References

| File | Role |
|---|---|
| `context/source-context.md` | Verbatim metadata from the source project (`kind: prototype`, `intent: web-clone`, `skipDiscoveryBrief: true`, `websiteCloneFrom: https://keairan-citanduy.example`, `themePaletteHint: warm-paper + yellow-accent`) |
| `context/provenance.md` | Per-file map of source â†’ package output (preserved vs derived) |
| `context/component-manifest.md` | 22-component catalog with file + line pointers |
| `DESIGN.md` Â§0 | Source-backed evidence table mapping every copied file to the tokens/components it seeded |
| `examples/Blueprint-Platform-Keairan-Citanduy.pdf` | Reference blueprint (BBWS / SIH3, 4 September 2026) |
| `brand-spec.md` | Verbatim brand spec from source |
| `examples/index.html` | Source: Beranda (hero, pillars, stat strip, band-dark) |
| `examples/dashboard.html` | Source: Peta & Dashboard Publik (ticker, tabs, station, calendar, report form) |
| `examples/aqua-alert.html` | Source: AquaAlert (WA bubble, comparison table, pricing) |
| `examples/hydro-amdal.html` | Source: Hydro-AMDAL (doc preview, IDF curve, pricing) |
| `examples/methodology.html` | Source: Metodologi (spec table, pipeline diagram, citations) |

---

## Package Contents

```
keairan-citanduy/
â”œâ”€â”€ DESIGN.md                       Source of truth (visual contract, tokens, components, motion, voice, anti-patterns)
â”œâ”€â”€ SKILL.md                        Claude Design skill manifest (frontmatter + workflow)
â”œâ”€â”€ README.md                       This file
â”œâ”€â”€ colors_and_type.css             OKLch tokens + hex fallbacks + font stacks + helper classes
â”œâ”€â”€ brand-spec.md                   Verbatim brand spec from source
â”‚
â”œâ”€â”€ assets/                         Brand & runtime assets
â”‚   â”œâ”€â”€ main.css                    Verbatim shared stylesheet (24 KB) â€” load after colors_and_type.css
â”‚   â”œâ”€â”€ logo-mark.svg               Yellow square + black "K" wordmark
â”‚   â”œâ”€â”€ wordmark.svg                Full horizontal lockup
â”‚   â”œâ”€â”€ favicon.svg                 32 px favicon (source-derived)
â”‚   â”œâ”€â”€ pattern-topo.svg            Editorial topographic pattern
â”‚   â”œâ”€â”€ map-das-citanduy.svg        DAS Citanduy base map
â”‚   â”œâ”€â”€ marker-status-normal.svg    Map marker (Normal)
â”‚   â”œâ”€â”€ marker-status-waspada.svg   Map marker (Waspada)
â”‚   â”œâ”€â”€ marker-status-siaga.svg     Map marker (Siaga, with pulse)
â”‚   â”œâ”€â”€ icon-warning.svg            Triangular warning glyph
â”‚   â””â”€â”€ sih3-stations.json          8-station coordinate set
â”‚
â”œâ”€â”€ build/                          Runtime icons
â”‚   â”œâ”€â”€ icon-32.svg                 PWA / favicon 32 px
â”‚   â”œâ”€â”€ apple-touch-icon.svg        Apple touch 180 px
â”‚   â””â”€â”€ og-cover.svg                Open Graph 1920 Ã— 480
â”‚
â”œâ”€â”€ preview/                        Reviewer landing + 8 focused preview cards + 3 applied screens
â”‚
â”œâ”€â”€ ui_kits/app/                    Applied interface kit (loadable)
â”‚
â”œâ”€â”€ examples/                       Preserved source pages (verbatim)
â”‚
â””â”€â”€ context/                        Notes & provenance
```

### Preserved assets, fonts, build artifacts, source examples

| Category | Count | Folder | What is preserved |
|---|---|---|---|
| Preserved source pages (verbatim) | 5 HTML | `examples/` | `index.html` (Beranda), `dashboard.html` (Peta), `aqua-alert.html`, `hydro-amdal.html`, `methodology.html` |
| Source blueprint | 1 PDF | `examples/` | `Blueprint-Platform-Keairan-Citanduy.pdf` (BBWS / SIH3, 4 Sept 2026) |
| Source stylesheet | 1 CSS | `assets/` | `main.css` (24 KB, verbatim) |
| Brand assets (source-grounded) | 9 SVG + 1 JSON | `assets/` | logo-mark, wordmark, favicon, pattern-topo, map-das-citanduy, 3 marker-status, icon-warning, sih3-stations.json |
| Runtime build icons | 3 SVG | `build/` | icon-32, apple-touch-icon, og-cover |
| Notes | 3 MD | `context/` | source-context, provenance, component-manifest |
| Brand spec | 1 MD | root | `brand-spec.md` (verbatim) |

### ui_kits/app/ structure

```
ui_kits/app/
â”œâ”€â”€ index.html                  Launcher â€” kartu modul + daftar komponen
â”œâ”€â”€ README.md                   Reuse guide (this skill's UI kit doc)
â””â”€â”€ components/
    â”œâ”€â”€ masthead.html           Sticky masthead + hero 4:5
    â”œâ”€â”€ dashboard.html             Ticker / station card / tabs / calendar
    â”œâ”€â”€ aqua-alert.html         WhatsApp bubble / comparison table / pricing
    â”œâ”€â”€ hydro-amdal.html        Doc preview card / IDF curve SVG
    â””â”€â”€ citizen-report.html     Citizen-science form + reports feed
```

---

## Preview Manifest

The reviewer should walk the previews in the order below. The first is
the highest-value entry point; subsequent cards narrow in on each
discipline.

| # | File | What it proves | Source-backed components or assets |
|---|---|---|---|
| 1 | `preview/index.html` | Single page that links every other preview card | masthead, hero, pillars, brand mark |
| 2 | `preview/applied-public-dashboard.html` | The most complex applied screen (map + ticker + stations + live toast) | ticker, station card, badge N/W/S, calendar, map, legend |
| 3 | `preview/colors.html` | Full color surface: brand + status + contrast pairs | all `--bg-*`, `--fg-*`, `--status-*` tokens |
| 4 | `preview/colors-primary.html` | Focused: 6 primary tokens + 4 contrast pairs with ratios | `--bg`, `--surface`, `--fg`, `--muted`, `--border`, `--accent` |
| 5 | `preview/typography.html` | Type scale ringkas (display, body, mono) | `--display`, `--body`, `--mono`, `--h1`â€“`--h4` |
| 6 | `preview/typography-specimens.html` | Focused: full specimens + fluid scale + dark quote | `--display`/`--body`/`--mono`/`--lede`/`--eyebrow` |
| 7 | `preview/spacing.html` | Spacing & shape ringkas | `--gutter`, `--section-pad`, `--radius-*`, `--shadow-*` |
| 8 | `preview/spacing-tokens.html` | Focused: gutter, section pad, 8-step scale, 3 radius, 3 shadow | same as above + card anatomy |
| 9 | `preview/components.html` | All components in one place | btn, card, pillar, band-dark, quote, table, tab, ticker, station, badge |
| 10 | `preview/components-buttons.html` | Focused: 4 button variants Ã— 6 interaction states | `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-dark`, `.btn-link` |
| 11 | `preview/brand-assets.html` | Logo, wordmark, favicon, markers, icon-warning | all `assets/*.svg`, all `build/*.svg` |
| 12 | `preview/applied-aqua-alert.html` | Applied: WhatsApp + comparison table + pricing | WA bubble, comparison, pricing |
| 13 | `preview/applied-hydro-amdal.html` | Applied: doc preview + IDF curve + pricing | doc card, IDF SVG, pricing |

Every preview card pastes `colors_and_type.css` into its first
`<style>` block and links `assets/main.css` after it. The `brand-assets.html`
card visibly references `assets/*.svg` and `build/*.svg` files.

---

## Package Reuse Guide

### Step 1 â€” Bind tokens

Paste `colors_and_type.css` into the first `<style>` block of the new
artifact, then include `assets/main.css` after it. Order matters:
the OKLch tokens must win the cascade over the canonical components.

```html
<style>
/* paste colors_and_type.css content here */
</style>
<link rel="stylesheet" href="assets/main.css">
```

### Step 2 â€” Reuse the masthead

Copy the structure from `ui_kits/app/components/masthead.html`. Keep
it sticky. Keep it blurred. Brand mark left, five nav items middle,
one primary CTA right.

### Step 3 â€” Reuse the module kit

| Need | Use |
|---|---|
| Sticky masthead + hero | `ui_kits/app/components/masthead.html` |
| Dashboard (ticker, station, tab, kalender) | `ui_kits/app/components/dashboard.html` |
| AquaAlert (WA + tabel + harga) | `ui_kits/app/components/aqua-alert.html` |
| Hydro-AMDAL (doc + IDF + harga) | `ui_kits/app/components/hydro-amdal.html` |
| Citizen report (form + feed) | `ui_kits/app/components/citizen-report.html` |

### Step 4 â€” Honor the rules

| Rule | Why |
|---|---|
| `--accent` is the only loud color; at most one button + one kicker per viewport | One-accent rule preserves calm authority |
| Display = Bodoni Moda, body = Inter, mono = JetBrains Mono | Editorial-documentary pairing |
| Status colors reserved for actual status | Normal/Waspada/Siaga never as fills |
| One `band-dark` per long page | Editorial punctuation, not decoration |
| No emoji as UI icons | Document / press convention |
| Bahasa Indonesia formal, numerik-forward | Public-service voice |
| Coordinate, TMA, debit, T<sub>r</sub>, IDs, timestamps in mono | Number legibility |
| Currency: Indonesian format (`Rp 500rb`, `24,5 mÂ³/s`) | Localized, not generic SaaS |

### Step 5 â€” Audit before delivering

```powershell
Start-Process -FilePath $env:OD_NODE_BIN `
  -ArgumentList "`"$env:OD_BIN`"","tools","connectors","design-system-package-audit","--path",".","--fail-on-warnings" `
  -NoNewWindow -Wait -RedirectStandardOutput "$env:TEMP\od-audit.out" `
  -RedirectStandardError  "$env:TEMP\od-audit.err" `
  -WorkingDirectory (Get-Location)
```

(Bare `& $env:OD_NODE_BIN â€¦` fails on Windows because `$OD_NODE_BIN`
resolves to `Open Design.exe` â€” a path with spaces. Use
`Start-Process` as shown.)

---

## Reviewer Walk-Through

1. Open `preview/index.html` â†’ jump to any card.
2. Start at `preview/applied-public-dashboard.html` â€” the most
   information-dense screen.
3. Walk discipline by discipline:
   `colors-primary.html` â†’ `typography-specimens.html` â†’
   `spacing-tokens.html` â†’ `components-buttons.html` â†’
   `brand-assets.html`.
4. Re-enter the applied screens: `applied-aqua-alert.html`,
   `applied-hydro-amdal.html`.
5. Drop into the kit: `ui_kits/app/index.html` â†’ each `components/*.html`.
6. Compare to the source pages in `examples/` (verbatim) to verify
   the package preserved the source's editorial voice.

---

## Provenance Summary

| Category | Count | Folder |
|---|---|---|
| Preserved from source (byte-per-byte) | 8 | `examples/*.html`, `examples/*.pdf`, `assets/main.css`, `brand-spec.md`, `context/source-context.md` |
| Derived SVG assets (source-grounded) | 9 | `assets/*.svg` (logo, wordmark, favicon, pattern, map, 3 markers, icon), `build/*.svg` (3 runtime icons), `sih3-stations.json` |
| Derived token CSS | 1 | `colors_and_type.css` (verbatim OKLch + 14 hex fallbacks + 4 helper classes) |
| Derived preview cards | 13 | `preview/*.html` |
| Derived kit modules | 5 | `ui_kits/app/components/*.html` |
| Documentation | 3 | `DESIGN.md`, `SKILL.md`, `README.md` |
| Notes | 3 | `context/provenance.md`, `context/component-manifest.md`, `context/source-context.md` |

See `context/provenance.md` for the file-by-file mapping and
`context/component-manifest.md` for the 22-component catalog.

---

## Quick Reference

| Want toâ€¦ | Open this |
|---|---|
| Internalize the visual contract | `DESIGN.md` |
| See tokens | `colors_and_type.css` |
| Walk the design system | `preview/index.html` |
| Drop in a header | `ui_kits/app/components/masthead.html` |
| See the source | `examples/index.html` |
| Trace evidence | `context/provenance.md` |
| Catalog components | `context/component-manifest.md` |
| Run audit | `$OD_BIN tools connectors design-system-package-audit --path . --fail-on-warnings` (via `Start-Process`) |