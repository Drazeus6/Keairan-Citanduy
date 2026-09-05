---
name: keairan-citanduy-design-system
description: Editorial-documentary visual language for an Indonesian hydrological intelligence platform (WS Citanduy). Use when the user asks for a public-service / civic-tech product on a serious topic, a long-form editorial cover, a data dashboard that must present technical information with calm authority, or any artifact that should feel like a magazine rather than a SaaS landing page. Source-backed by `assets/main.css`, `brand-spec.md`, and five preserved `examples/*.html` pages.
user-invocable: true
---

# Keairan Citanduy — Design System Skill

A reusable Claude Design skill package extracted from the source project
**Website Clone** (`34f5303a-4fc3-4e6f-ac12-e392cdffb01c`).

## What is inside

```
keairan-citanduy/
├── DESIGN.md                       Source of truth: visual foundations, tokens, components, motion, voice, anti-patterns
├── SKILL.md                        This file (skill manifest)
├── README.md                       Package guide (product context, file map, preview manifest, reuse workflow)
├── colors_and_type.css             OKLch tokens + hex fallbacks + font stacks + helper classes
├── brand-spec.md                   Verbatim brand spec from source
│
├── assets/                         Brand & runtime assets (logo, wordmark, favicon, map markers, station JSON, topo pattern, icon-warning)
├── build/                          Runtime icons (PWA, Apple touch, OG cover)
│
├── preview/                        Reviewer landing + 8 focused preview cards
│   ├── index.html                  Landing linking every preview card
│   ├── colors.html                 All colors + status + contrast pairs
│   ├── colors-primary.html         Focused: 6 primary tokens + 4 contrast pairs
│   ├── typography.html             Type scale ringkas
│   ├── typography-specimens.html   Focused: display/body/mono/eyebrow/quote specimens
│   ├── spacing.html                Spacing & shape ringkas
│   ├── spacing-tokens.html         Focused: gutter, section pad, 8-step scale, radius, shadow, card anatomy
│   ├── components.html             All components
│   ├── components-buttons.html     Focused: 4 button variants × 6 interaction states
│   ├── brand-assets.html           Logo, wordmark, favicon, markers, icons
│   ├── applied-public-dashboard.html
│   ├── applied-aqua-alert.html
│   └── applied-hydro-amdal.html
│
├── ui_kits/app/                    Applied interface kit (loadable)
│   ├── index.html                  Launcher listing modules + components
│   ├── README.md                   Reuse guide
│   └── components/                 Modular files
│       ├── masthead.html           Sticky masthead + hero 4:5
│       ├── dasbor.html             Ticker / station card / tabs / calendar
│       ├── aqua-alert.html         WhatsApp bubble / comparison table / pricing
│       ├── hydro-amdal.html        Doc preview card / IDF curve SVG
│       └── citizen-report.html     Citizen-science form + reports feed
│
├── examples/                       Preserved source pages (verbatim)
│   ├── index.html                  Source: Beranda
│   ├── dashboard.html              Source: Peta & Dasbor Publik
│   ├── aqua-alert.html             Source: AquaAlert
│   ├── hydro-amdal.html            Source: Hydro-AMDAL
│   ├── methodology.html            Source: Metodologi
│   └── Blueprint-Platform-Keairan-Citanduy.pdf
│
└── context/                        Notes & provenance
    ├── source-context.md           Verbatim source project handoff
    ├── provenance.md               Source → package file map
    └── component-manifest.md       22-component catalog with file pointers
```

## Source context

| Aspect | Value |
|---|---|
| Source project id | `34f5303a-4fc3-4e6f-ac12-e392cdffb01c` |
| Source project name | `Website Clone` |
| Source `kind` | `prototype` |
| Source `intent` | `web-clone` |
| Source `skipDiscoveryBrief` | `true` |
| Source files copied | `dashboard.html`, `methodology.html`, `hydro-amdal.html`, `aqua-alert.html`, `index.html`, `assets/main.css`, `brand-spec.md`, `Blueprint-Platform-Keairan-Citanduy.pdf` |
| Reference blueprint | *Platform Intelijen Hidrologi Terpadu WS Citanduy*, BBWS / SIH3, 4 September 2026 |

Every token, component, and voice rule in this package is grounded in
one of the files above. See `context/provenance.md` for the exact
file-by-file mapping.

## When to use this skill

Use this skill when the user asks for:

- a **public-service / civic-tech product** on a serious topic
  (water, climate, disaster, public health);
- an **editorial cover, long-form landing page, or data report** that
  must read like a magazine rather than a SaaS page;
- a **dashboard or tool** that presents technical data with calm
  authority (numbers are first-class citizens, status colors are
  reserved for actual status);
- a **campaign or product site** that should feel documentary, not
  promotional.

Do not use this skill for playful consumer apps, generic SaaS, or any
artifact that needs bright primary colors and emoji-as-icons.

## How to use

1. **Bind tokens.** Paste `colors_and_type.css` into the first
   `<style>` block of the new artifact, then include `assets/main.css`
   after it for the canonical component classes.

2. **Honor the one-accent rule.** `--accent` is the only loud color.
   It appears on at most one CTA and one kicker/label per viewport.

3. **Use the masthead.** Copy the structure from
   `ui_kits/app/components/masthead.html`. Keep it sticky. Keep it
   blurred. Brand mark left, five nav items middle, one primary CTA
   right.

4. **Type pairing.** Display = Bodoni Moda (700/800, tight tracking).
   Body = Inter. Mono = JetBrains Mono. Do not mix them. Do not let
   Inter appear in display headings.

5. **Number rules.** Coordinates, TMA, debit, T<sub>r</sub>, IDs, and
   timestamps go in mono. Currency uses Indonesian format
   (`Rp 500rb`, `24,5 m³/s`). Status goes in uppercase mono on a small
   badge.

6. **Status colors are reserved.** Normal / Waspada / Siaga belong on
   map dots, station badges, calendar cells, and reports. Never as
   component fills.

8. **One dark band per long page.** Use `band-dark` once per long
   artifact. It is the editorial punctuation.

9. **Three readers.** Make sure each public surface addresses:
   - the general public (free, mobile-first);
   - petambak (paying AquaAlert user);
   - konsultan (paying Hydro-AMDAL user).

10. **Audit.** Before delivering, run:

```
"$OD_NODE_BIN" "$OD_BIN" tools connectors design-system-package-audit \
  --path . --fail-on-warnings
```

## Design system highlights

| Highlight | Source |
|---|---|
| 6 OKLch brand tokens + 3 BBWS status colors | `assets/main.css` `:root`, `brand-spec.md` |
| Display = Bodoni Moda, body = Inter, mono = JetBrains Mono | `assets/main.css`, `examples/index.html` |
| One yellow accent (`#F5C842` / `oklch(82% 0.18 95)`), max twice per viewport | `examples/index.html:9` favicon + `assets/main.css` |
| Asymmetric 1.05fr / 1fr hero with 4:5 photo | `examples/index.html` hero-grid |
| Sticky blurred masthead, 5-item nav, single primary CTA | `examples/index.html` masthead |
| Ticker SIAGA with blink dot | `examples/dashboard.html` ticker |
| 3 status badges (Normal / Waspada / Siaga) with mono caps | `examples/dashboard.html` station badges |
| WhatsApp message bubble with mono meta | `examples/aqua-alert.html` |
| Comparison table (sebelum/sesudah) | `examples/aqua-alert.html` |
| Doc preview card + IDF curve SVG | `examples/hydro-amdal.html` |
| Citizen report form + feed | `examples/dashboard.html` tab 3 |
| Bahasa Indonesia formal, numerik-forward voice | `examples/*.html` copy |
| 1 dark editorial band per long page | `examples/index.html` |

## Output contract

Every artifact produced with this skill must:
- include the masthead structure from `ui_kits/app/components/masthead.html`;
- bind tokens via `colors_and_type.css`;
- expose semantic `data-od-id="…"` attributes on its key regions;
- render without horizontal scroll at 360 px width;
- include at most one `--accent` button per viewport;
- include at least one dark editorial band if the page is long;
- avoid emoji as functional UI icons;
- pass the audit at the end of the run.