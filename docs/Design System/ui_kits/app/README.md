# UI Kit · App · Keairan Citanduy

> Applied interface kit untuk **Keairan Citanduy**, hydrological
> intelligence platform untuk WS Citanduy.
> Sumber: source project `Website Clone` (`34f5303a-4fc3-4e6f-ac12-e392cdffb01c`).

Kit ini adalah resep turun-tangan untuk membangun permukaan produk baru
dari sistem desain yang sama dengan `index.html`, `dashboard.html`,
`aqua-alert.html`, `hydro-amdal.html`, dan `methodology.html` di sumber.
Setiap modul di sini merepresentasikan satu bagian produk yang siap
dipakai ulang.

## When to use

Use this kit when you need to compose a new product surface for the
Keairan Citanduy visual contract — specifically a surface that
combines one or more of: a sticky editorial masthead, the public
flood dashboard, an AquaAlert WhatsApp preview, a Hydro-AMDAL doc
preview, or a citizen-science report form. Every module already binds
the tokens from `colors_and_type.css` and the canonical classes from
`assets/main.css`.

## Structure

```
ui_kits/app/
├── index.html                 Launcher — kartu modul + daftar komponen
├── README.md                  File ini (reuse guide)
└── components/
    ├── masthead.html          Masthead sticky + hero asimetris 1.05fr / 1fr
    ├── dasbor.html            Ticker SIAGA, station card, tab strip, kalender
    ├── aqua-alert.html        WhatsApp bubble, tabel perbandingan, harga
    ├── hydro-amdal.html       Doc preview card, kurva IDF SVG
    └── citizen-report.html    Form pelaporan warga, feed umpan balik
```

## Component files

| File | Purpose | Source-backed by |
|---|---|---|
| `index.html` | Launcher listing 4 module cards + 12 component links + "Cara pakai ulang" workflow section | masthead, card, pillar, code-block classes |
| `components/masthead.html` | Sticky masthead + asymmetric hero 1.05fr / 1fr with 4:5 portrait photo and copy-paste `<pre class="code">` block | `examples/index.html` hero-grid + masthead |
| `components/dasbor.html` | Ticker SIAGA (live blink), 3-variant station card (Normal/Waspada/Siaga), tab strip, 7-column calendar | `examples/dashboard.html` ticker + station + tab + calendar |
| `components/aqua-alert.html` | WhatsApp bubble with `⚠ PERINGATAN DINI`, 2-column comparison table (sebelum/sesudah), 3-tier pricing | `examples/aqua-alert.html` WA + tabel + harga |
| `components/hydro-amdal.html` | Doc preview card (BAB III) + inline IDF curve SVG with T<sub>r</sub> 2/10/25 paths | `examples/hydro-amdal.html` doc + IDF |
| `components/citizen-report.html` | Citizen report form (focus ring `oklch(82% 0.18 95 / 0.4)`) + 3-item reports feed with `DIVALIDASI` / `DITINJAU` badges | `examples/dashboard.html` form + feed |

## Usage Workflow

1. Buka `index.html` kit ini di peramban — di sinilah semua modul
   dan komponen terdaftar sebagai kartu.
2. Klik kartu modul (Dasbor, AquaAlert, dll) untuk membuka contoh
   komponen dengan markup siap salin.
3. Salin blok markup yang Anda butuhkan ke artefak baru. Kelas yang
   digunakan (`masthead`, `ticker`, `station`, `wa-bubble`, `pillar`,
   `band-dark`, dst.) seluruhnya didefinisikan di `assets/main.css`.

### Three-step composition pattern

1. Paste `colors_and_type.css` into the first `<style>` block, then
   link `assets/main.css` after it. Order matters: the OKLch tokens
   must win the cascade over the canonical components.
2. Copy the masthead markup from `components/masthead.html` and paste
   it at the top of the body. It is `position: sticky; top: 0` with a
   backdrop blur — keep those properties intact.
3. Compose the page body by stacking any subset of the 4 modules in
   `components/`. Each module is self-contained: it carries its own
   `data-od-id`, semantic markup, and token references.

## Design Tokens and Base Styles

| Sumber | Path | Apa yang diikat |
|---|---|---|
| Token OKLch | `../../colors_and_type.css` | `--bg`, `--fg`, `--accent`, `--status-*`, font stacks |
| Gaya dasar | `../../assets/main.css` | `.wrap`, `.masthead`, `.btn`, `.card`, `.pillar`, `.band-dark`, dll |
| Aset merek | `../../assets/` | Logo, wordmark, favicon, penanda peta |
| Cetak biru | `../../examples/Blueprint-Platform-Keairan-Citanduy.pdf` | Konteks produk |

The kit loads `../../colors_and_type.css` in the first `<style>`
block of `index.html` and links `../../assets/main.css` after it.
Every `components/*.html` file also follows this order.

## Design Notes

Each component in this kit follows the same rules as `DESIGN.md`:

- **One primary button per viewport.** `btn-primary` is the only loud
  fill; other entries are ghost, dark, or text-link.
- **No emoji as UI icons.** The `⚠` and `ℹ` glyphs inside the WhatsApp
  bubble are the only acceptable place, because they are inside a
  screenshot reproduction of a real message — not UI chrome.
- **No page-chrome gradients.** Gradients live only inside the river
  map and the IDF curve fill.
- **Numbers use mono; status uses BBWS colors.** Coordinates, TMA,
  debit, T<sub>r</sub>, IDs, and timestamps are typeset in JetBrains
  Mono. Status (Normal / Waspada / Siaga) is reserved for map dots,
  station badges, calendar cells, and reports.
- **Hover never reduces contrast.** Hover lifts the card, inverts the
  button, or moves the underline. Text on a colored fill never goes
  paler on hover.

## Audit

Setiap perubahan pada kit ini harus lulus:

```
"$OD_NODE_BIN" "$OD_BIN" tools connectors design-system-package-audit \
  --path . --fail-on-warnings
```

Use the `Start-Process` PowerShell wrapper shown in the root
`README.md`; bare `& $env:OD_NODE_BIN …` fails on Windows because the
binary lives at a path with spaces.

## Source Basis

Each card in the launcher re-emits markup from a source file preserved
under `examples/`. Pemetaan sumber → modul:

| Modul UI kit | File sumber |
|---|---|
| `components/masthead.html` | `examples/index.html` (hero + masthead) |
| `components/dasbor.html` | `examples/dashboard.html` (ticker, station, tab, kalender) |
| `components/aqua-alert.html` | `examples/aqua-alert.html` (WA, tabel, harga) |
| `components/hydro-amdal.html` | `examples/hydro-amdal.html` (doc preview, IDF) |
| `components/citizen-report.html` | `examples/dashboard.html` (form + feed tab laporan) |

For deeper evidence (which lines seeded which tokens), see
`DESIGN.md` §0 and `context/provenance.md`.