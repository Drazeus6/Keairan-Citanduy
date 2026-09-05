# Keairan Citanduy — Design System

> Source project: **Website Clone** (`34f5303a-4fc3-4e6f-ac12-e392cdffb01c`)
> Surface: web
> Status: production-ready, evidenced from source files

## 0. Product Context & Source-Backed Evidence

### Product context

**Keairan Citanduy** is the digital implementation of the *Platform Intelijen
Hidrologi Terpadu WS Citanduy* blueprint (BBWS / SIH3, 4 September 2026). It is
a hydrological intelligence product for Indonesia's Citanduy River Basin
(±3.500 km², spanning Jabar and Jateng) and serves three distinct audiences
from a single data pipeline:

1. **Warga DAS Citanduy** — general public, mobile-first, free. They get the
   *Peta Pantau Banjir*, the *Kalender Cuaca Tani Mikro*, and the *Kanal
   Pelaporan Warga*.
2. **Petambak udang vaname & petani** — paying commercial users of **AquaAlert**,
   the WhatsApp + SMS early-warning gateway that translates upstream river
   discharge into 12–24 hour salinity and flood warnings per pond.
3. **Konsultan AMDAL & kawasan industri** — paying corporate users of
   **Hydro-AMDAL**, the document-generation product that drafts BAB III Analisis
   Hidrologi (IDF curves, debit rencana, T<sub>r</sub> tables) directly into
   PDF/DOCX.

The product is bilingual on the front (Indonesian primary, English small-caps
for labels), numerik-forward on the back (every reading, coordinate, currency
figure, and timestamp is mono typeset), and intentionally restrained on the
outside (one yellow accent, one dark editorial band per page).

### Primary surfaces

| Surface | Audience | Source evidence |
|---|---|---|
| `index.html` (Beranda) | All three | Hero + 3 pillars + spec table |
| `dashboard.html` (Peta & Dasbor Publik) | Warga + observers | Tabs: peta / kalender / laporan warga |
| `aqua-alert.html` (AquaAlert) | Petambak | Hero + WhatsApp message sample + before/after table + pricing |
| `hydro-amdal.html` (Hydro-AMDAL) | Konsultan | Doc preview + IDF curve + paket harga |
| `methodology.html` (Metodologi) | Researchers, press | Spec tables, pipeline diagram, references |

### Source-backed evidence (every token, component, and copy rule below traces here)

| Evidence | Where in this package | What it seeded |
|---|---|---|
| `assets/main.css` (24 KB, verbatim) | `assets/main.css` | All OKLch tokens, masthead, card, pillar, band-dark, quote, ticker, stat-strip, btn classes |
| `brand-spec.md` (verbatim) | `brand-spec.md` | Visual style direction and brand token list |
| `index.html` (Beranda, source) | `examples/index.html` | Hero pattern, kicker eyebrow, 3-pillar pricing layout, stat strip |
| `dashboard.html` (Peta & Dasbor Publik) | `examples/dashboard.html` | Tabbed shell, ticker pattern, station card, citizen-report form, mini chart |
| `aqua-alert.html` | `examples/aqua-alert.html` | WhatsApp message sample, comparison table, tiered pricing |
| `hydro-amdal.html` | `examples/hydro-amdal.html` | Doc-preview card, IDF curve SVG, paket harga |
| `methodology.html` | `examples/methodology.html` | Spec table rhythm, source citations, pipeline diagram |
| `Blueprint-Platform-Keairan-Citanduy.pdf` | `examples/Blueprint-Platform-Keairan-Citanduy.pdf` | Source blueprint: 27 pos pantau, 5 parameter, 3 pilar |
| `assets/favicon.svg`, `logo-mark.svg`, `wordmark.svg` | `assets/` | Brand mark + horizontal lockup |
| `assets/marker-status-{normal,waspada,siaga}.svg` | `assets/` | Status marker set used on map mock |
| `assets/map-das-citanduy.svg`, `pattern-topo.svg` | `assets/` | Map base layer and editorial pattern |
| `assets/icon-warning.svg` | `assets/` | Triangular warning glyph (replaces emoji) |
| `assets/sih3-stations.json` | `assets/` | 8 station coordinate records used in the public-dashboard preview |
| `build/icon-32.svg`, `build/apple-touch-icon.svg`, `build/og-cover.svg` | `build/` | Runtime icons preserved verbatim |

Each token, component, and voice rule in the sections below cites one or more
of these files. When two pieces of evidence disagree, the file copied from
the source project wins.

## 1. Visual Theme & Atmosphere

**Keairan Citanduy** is a hydrological intelligence platform for Indonesia's
Citanduy River Basin (WS Citanduy). The visual language is an editorial-documentary
hybrid: **National Geographic cover energy on the surface, Indonesian public-service
clarity underneath**.

- **Genre cue:** long-form magazine — kicker labels, serif display headlines, natural
  photography, dense data tables, restrained accents.
- **Tone cue:** serious, transparent, expert. Bahasa Indonesia formal, but numerik
  (numbers are first-class citizens — they get mono fonts and uppercase captions).
- **Audience span:** three groups must feel addressed at once:
  1. Warga DAS Citanduy (general public, mobile-first, free);
  2. Petambak udang & petani (paying commercial users of AquaAlert);
  3. Konsultan AMDAL & kawasan industri (paying corporate users of Hydro-AMDAL).
- **Single decisive flourish:** the **yellow NatGeo accent** on a paper-warm canvas —
  appearing only on CTAs, small caps tags, and currency figures. Nothing else is
  yellow. Nothing else is allowed to be that loud.

The atmosphere is **calm authority**: a single editorial dark band per page breaks the
rhythm and tells the reader "you are looking at a serious platform".

## 2. Color

All tokens are OKLch-derived to keep perceived lightness stable across the warm
paper / cool ink / status palettes. Brand paper is warm; ink is cool; status colors
sit on the green→yellow→red gradient familiar to Indonesian public warnings.

### Brand tokens

| Token | OKLch | Role |
|---|---|---|
| `--bg` | `oklch(98% 0.005 95)` | Page background, warm paper |
| `--surface` | `oklch(94% 0.012 90)` | Panel editorial / table header |
| `--fg` | `oklch(16% 0.01 250)` | Primary ink — display, body |
| `--muted` | `oklch(45% 0.015 250)` | Secondary text, captions |
| `--border` | `oklch(86% 0.01 90)` | Hairline rules, table dividers |
| `--accent` | `oklch(82% 0.18 95)` | CTA fill, kicker labels, status high |
| `--accent-ink` | `oklch(20% 0.02 250)` | Text on accent |
| `--water` | `oklch(45% 0.09 220)` | Map river fill, dashboard blues |
| `--water-soft` | `oklch(80% 0.05 220)` | Map ocean / coastal fill |
| `--paper-dark` | `oklch(18% 0.01 250)` | Editorial dark band, footer |
| `--paper-dark-2` | `oklch(24% 0.012 250)` | Dark band inner panel |

### Status colors (BBWS standard)

| Status | OKLch | Use |
|---|---|---|
| Normal | `oklch(60% 0.16 145)` | Map dot, badge, status chip |
| Waspada | `oklch(78% 0.16 80)` | Map dot, badge, calendar cell |
| Siaga | `oklch(55% 0.22 25)` | Map dot, badge, alert pulse |

### Color usage rules

1. **One accent per screen** — `--accent` may appear twice per viewport maximum
   (once as a CTA fill, once as a kicker/label or a currency figure).
2. **No gradients on the page chrome** — gradients live only inside the river map
   (`mapBg`, `riverGrad`) and inside chart fills (`#cg` in the sparkline). The page
   itself is solid warm paper.
3. **Status dots are the only place three colors stack** — never decorate other
   components with red/yellow/green.
4. **Dark band is mandatory once per long page** — it is the editorial punctuation
   that makes the page feel like a magazine spread.
5. **Text on `--accent` is always `--accent-ink`**. Never `--fg`. The contrast pair
   is intentional; reversing them breaks readability.

## 3. Typography

Three families, three jobs, three weights.

| Role | Family | Weight | Use |
|---|---|---|---|
| Display | `"Bodoni Moda", "Playfair Display", "Times New Roman", serif` | 700 / 800 | H1–H4, hero numbers, currency |
| Body | `"Inter", "Helvetica Neue", Arial, sans-serif` | 400 / 500 / 600 | Paragraphs, UI controls, captions |
| Mono | `"JetBrains Mono", "IBM Plex Mono", ui-monospace, monospace` | 400 / 500 | Coordinates, TMA, debit, IDs, codes |

### Type scale

Fluid and mobile-first. H1 grows from 34px → 68px; body stays 16–17px.

| Token | Min | Max | Where |
|---|---|---|---|
| `--h1-size` | 34px | 68px | Hero H1, page H1 |
| `--h2-size` | 28px | 56px | Section display H2 |
| `--h3-size` | 22px | 36px | Sub-section H3, pillar titles |
| `--h4-size` | 18px | 24px | Card H4, feature card |
| `.lede` | 17px | 21px | Editorial lede paragraph |
| `.eyebrow` | 11px | 11px | All uppercase small caps labels |

### Editorial type rules

1. Display headlines are set tight (`letter-spacing: -0.012em`; H1 at -0.025em) and
   lines are not hyphenated mid-word in a way that orphans a single letter.
2. Currency, TMA, debit, and IDs always use the **mono** family. They are facts,
   not prose.
3. Eyebrow labels are 11px / letter-spacing 0.18em / uppercase / `--muted`.
4. The "Rendah — informasi" / "Sedang — perlu tindak lanjut" inline range labels in
   select fields also follow the eyebrow pattern.
5. Quote text is display, weight 500, set with a 3px yellow left border and an
   italic cite line in 13px uppercase mono.

## 4. Spacing

Density is **editorial-generous**: pages breathe. The rhythm is built around a
clamped gutter and an 8-step scale.

| Token | Value | Use |
|---|---|---|
| `--gutter` | `clamp(16px, 3vw, 40px)` | Page horizontal padding |
| `--maxw` | `1320px` | Max content width |
| Section pad | `clamp(48px, 7vw, 112px)` 0 | Vertical between sections |
| Inner card | `clamp(20px, 2.4vw, 28px)` | Card body padding |
| Inline gap | `clamp(16px, 2vw, 28px)` | Flex / row gaps |

### Radius

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `4px` | Brand mark, small tags, pins |
| `--radius` | `10px` | Cards, panels, band-dark, pills |
| Pill | `999px` | Buttons, kickers, chips, status pills |

### Shadow

Two editorial shadows — both soft, both anchored low.

- Card hover: `0 18px 40px -22px oklch(10% 0.01 250 / 0.4)`
- Hero photo: `0 30px 80px -30px oklch(10% 0.01 250 / 0.45)`

## 5. Layout & Composition

- **Grid:** `grid-2`, `grid-3`, `grid-4` collapse to 2 columns at ≤1024px and to
  single column at ≤720px.
- **Hero:** asymmetric 1.05fr / 1fr two-column with a 4:5 portrait photo on the
  right; eyebrow + display H1 + lede + CTA pair + meta DL on the left.
- **Section head:** eyebrow → horizontal rule → display H2 → optional lede. The
  eyebrow is paired with a 1px hairline that runs to the column edge.
- **Dark band:** `band-dark` is the editorial punctuation. Use it once per long
  page. Inside, use `--bg` for text and `--accent` for the small caption tag.
- **Sticky masthead:** `position: sticky; top: 0; backdrop-filter: blur(8px) +
  saturate(140%)` so the page reads as a magazine that scrolls under a glass bar.

## 6. Components

Catalogued in `context/component-manifest.md`. The canonical set:

- **Masthead** — brand mark + wordmark + 5-item nav + primary CTA + mobile menu
  toggle. Sticky, blurred.
- **Brand mark** — yellow square (4px radius) with a black **K** in Bodoni Moda 800.
- **Button** — pill, 14px padding, primary (yellow), ghost (outline), dark
  (paper-dark fill), link (text underline).
- **Kicker / Eyebrow** — 11px uppercase mono-letterspaced, optionally on yellow pill.
- **Display heading** — Bodoni Moda 700/800, tight tracking, color `--fg`.
- **Lede paragraph** — Inter 17–21px, line-height 1.55, max-width 60ch.
- **Hero photo** — 4:5 aspect, 10px radius, drop shadow, caption + corner pin.
- **Card** — 1px border, 10px radius, hover lift -2px / 18px shadow.
- **Pillar card** — same shell as card but a dark `--paper-dark` variant signals
  "commercial / paid" while the light variant signals "public / free".
- **Stat strip** — 4-up grid with 1px dividers, display numerals + uppercase caption.
- **Band-dark** — dark editorial break: yellow accent tag, display H2 in `--bg`,
  body copy in `oklch(85% 0.02 95)`.
- **Quote** — display 500, 22–36px, 3px yellow left border, italic cite.
- **Timeline** — 3-step horizontal grid with a 2px hairline and yellow badge pins.
- **Tab** — 14px / 600, accent underline on selected.
- **Ticker** — dark bar with red live tag and white-blink dot.
- **Map shell** — SVG canvas with stations layer, legend, toast, status dots.
- **Calendar cell** — 72px min height, dim / ok / warn / alert variants.
- **Chip** — pill, optional active fill.
- **Spec table** — minimal lines, no zebra; first column bold.
- **Footer** — dark `--paper-dark`, 4-column, h5 mono uppercase.
- **Report form** — input/select/textarea with yellow focus ring.

## 7. Motion & Interaction

Motion is restrained and editorial.

- **Hover (cards):** `transform: translateY(-2px)` + soft shadow — 250ms ease.
- **Hover (image inside card):** `transform: scale(1.04)` — 600ms ease.
- **Hover (nav link):** underline scales from `scaleX(0)` to `scaleX(1)` over 200ms
  from the left.
- **Hover (btn-primary):** lighten `--accent` by +4 on L channel
  (`oklch(86% 0.18 95)`).
- **Hover (btn-ghost):** invert — `--fg` background, `--bg` text.
- **Focus-visible:** 2px solid `--accent` outline + 3px offset. Universal.
- **Live blink:** `ticker .blink` and `flood-toast::before` pulse 1.2s infinite.
- **Siaga pulse on map:** SVG `<animate>` ring grows r=14→26, opacity 0.25→0,
  repeats.
- **Reduced motion:** keep the blink (accessibility), suppress hover transforms
  by `@media (prefers-reduced-motion: reduce)` if added.

## 8. Voice & Brand

**Bahasa Indonesia formal, numerik-forward, calm authority.**

- Headlines may use single italic accent words: *bicara*, *AquaAlert*, *30 menit*.
- Headlines break deliberately across 3 short lines to feel editorial.
- Eyebrows use English uppercase but Bahasa Indonesia captions.
- Numbers are written with the Indonesian format (titik sebagai pemisah ribuan,
  koma desimal): `Rp 500rb`, `312 cm`, `24,5 m³/s`.
- Avoid em dashes mid-sentence; prefer en dashes or commas.
- Avoid emoji as functional UI icons. The `⚠` and `ℹ` glyphs in the WhatsApp sample
  bubble are the only acceptable place, because they are inside a screenshot
  reproduction of a real message — not UI chrome.

## 9. Anti-patterns

Hard "do not"s that protect the editorial feel.

1. **No purple gradient wash.** No background gradients. The only gradients live
   inside the river map and the chart fill.
2. **No Inter as display type.** Display must be Bodoni Moda. Inter is body only.
3. **No emoji icons.** No 📊, 📈, 🚨, etc. as functional UI. Use status dots, mono
   numerals, and SVG.
4. **No "card with colored left bar" pattern.** It is not editorial; it is
   template-marketing. Use the full card with a `--surface` price panel instead.
5. **No hover that turns text gray or lighter.** Hover must either lift the card,
   invert the button, or move the underline. Never reduce contrast.
6. **No three-button primary group.** At most one `--accent` button per viewport.
   Other entries are ghost / text link.
7. **No warm beige by accident.** Background is warm but barely tinted — `oklch(98%
   0.005 95)`. If a deeper warm is needed, use `--surface` (94% L), not cream.
8. **No invented metrics.** Every number on a public surface cites a real source
   (SIH3, BBWS, BMKG, APBD) or is labelled as a placeholder.
9. **No control panel for the designer.** The product artifact is the surface —
   there is no inspector / settings strip floating on top of the design.
10. **No hover text-color change to `--muted`.** Muted is for static secondary
    text. Hover must keep contrast equal or higher than default.
