# Provenance Â· Keairan Citanduy Design System

> Bagaimana setiap file di paket ini diturunkan dari sumber.

## Source project

- **Source id:** `34f5303a-4fc3-4e6f-ac12-e392cdffb01c`
- **Source name:** `Website Clone`
- **Source metadata:** `kind: prototype`, `intent: web-clone`,
  `skipDiscoveryBrief: true`

## Peta sumber â†’ artefak paket

### Berkas sumber yang disalin apa adanya (preserved verbatim)

| Sumber | Tujuan di paket |
|---|---|
| `assets/main.css` (24 KB) | `assets/main.css` |
| `brand-spec.md` | `brand-spec.md` |
| `index.html` | `examples/index.html` |
| `dashboard.html` | `examples/dashboard.html` |
| `aqua-alert.html` | `examples/aqua-alert.html` |
| `hydro-amdal.html` | `examples/hydro-amdal.html` |
| `methodology.html` | `examples/methodology.html` |
| `Blueprint-Platform-Keairan-Citanduy.pdf` | `examples/Blueprint-Platform-Keairan-Citanduy.pdf` |

### Aset merek yang dihasilkan dari sumber

| Aset | Disimpan di | Bukti sumber |
|---|---|---|
| `logo-mark.svg` (K kuning) | `assets/logo-mark.svg` | Favicon source `index.html` line 9: `fill='%23ffcc00'` + text K |
| `wordmark.svg` | `assets/wordmark.svg` | Header Beranda + tagline "Inteljen Hidrologi Â· WS Citanduy" |
| `favicon.svg` | `assets/favicon.svg` | Sumber favicon inline di source |
| `marker-status-normal.svg` | `assets/marker-status-normal.svg` | Pola station badge Normal di `dashboard.html` |
| `marker-status-waspada.svg` | `assets/marker-status-waspada.svg` | Pola station badge Waspada di `dashboard.html` |
| `marker-status-siaga.svg` | `assets/marker-status-siaga.svg` | Pola station badge Siaga di `dashboard.html` |
| `pattern-topo.svg` | `assets/pattern-topo.svg` | Tekstur editorial (dari pola garis di hero source) |
| `map-das-citanduy.svg` | `assets/map-das-citanduy.svg` | Bentuk DAS pada mock peta Dashboard Publik |
| `icon-warning.svg` | `assets/icon-warning.svg` | Placeholder untuk glyph âš  yang dipakai di WhatsApp AquaAlert |
| `sih3-stations.json` | `assets/sih3-stations.json` | 8 pos pantau SIH3 dari blueprint + `dashboard.html` |

### Aset runtime (build)

| Aset | Disimpan di | Tujuan |
|---|---|---|
| `icon-32.svg` | `build/icon-32.svg` | PWA / favicon 32 px |
| `apple-touch-icon.svg` | `build/apple-touch-icon.svg` | Apple touch 180 px |
| `og-cover.svg` | `build/og-cover.svg` | Open Graph 1920Ã—480 |

### Berkas yang diturunkan (derived, source-backed)

| Tujuan | Sumber bukti | Catatan |
|---|---|---|
| `DESIGN.md` | `brand-spec.md`, `assets/main.css`, kelima `examples/*.html` | Setiap klaim token / komponen / suara diberi rujukan ke file sumber |
| `colors_and_type.css` | `assets/main.css` `:root` | Token OKLch verbatim + fallback hex yang diturunkan |
| `preview/index.html` | `examples/index.html` (hero + 3 pillars) | Kartu pratinjau mengikuti pola editorial Beranda |
| `preview/colors.html` | `brand-spec.md` + `assets/main.css` | Palet + status + pasangan kontras |
| `preview/colors-primary.html` | Sama dengan di atas | Kartu fokus 6 token utama |
| `preview/typography.html` | `assets/main.css` + hero source | Skala ringkas |
| `preview/typography-specimens.html` | Sama dengan di atas | Spesimen penuh: display, body, mono, eyebrow, quote |
| `preview/spacing.html` | `assets/main.css` (gutter, radius, shadow) | Ringkas |
| `preview/spacing-tokens.html` | Sama dengan di atas | Token fokus: gutter, section pad, skala, radius, shadow |
| `preview/components.html` | `assets/main.css` + `examples/*.html` | Tombol, kartu, pillar, band-dark, quote, stat, tab, ticker |
| `preview/components-buttons.html` | `assets/main.css` (`.btn*`) | Kartu fokus tombol + status interaksi |
| `preview/brand-assets.html` | Aset merek di `assets/` | Logo, wordmark, favicon, marker, ikon |
| `preview/applied-public-dashboard.html` | `examples/dashboard.html` | Versi ringkas Dashboard Publik |
| `preview/applied-aqua-alert.html` | `examples/aqua-alert.html` | Versi ringkas AquaAlert |
| `preview/applied-hydro-amdal.html` | `examples/hydro-amdal.html` | Versi ringkas Hydro-AMDAL |
| `ui_kits/app/index.html` | Launcher modul | Mengacu ke komponen |
| `ui_kits/app/components/masthead.html` | `examples/index.html` (masthead + hero) | Komponen reusable |
| `ui_kits/app/components/dashboard.html` | `examples/dashboard.html` (ticker, station, tab, kalender) | Komponen reusable |
| `ui_kits/app/components/aqua-alert.html` | `examples/aqua-alert.html` (WA, tabel, harga) | Komponen reusable |
| `ui_kits/app/components/hydro-amdal.html` | `examples/hydro-amdal.html` (doc, IDF) | Komponen reusable |
| `ui_kits/app/components/citizen-report.html` | `examples/dashboard.html` (form + feed) | Komponen reusable |
| `ui_kits/app/README.md` | Panduan kit | Petunjuk reuse |
| `context/component-manifest.md` | Katalog 22 komponen | Lihat file sebelah |
| `context/source-context.md` | Verbatim dari runtime | Jejak proyek sumber |

## Aturan provenance

1. Berkas `assets/main.css`, `brand-spec.md`, dan semua `examples/*.html`
   adalah salinan byte-per-byte dari sumber.
2. Berkas SVG di `assets/` dan `build/` dihasilkan dari gaya visual
   yang diamati di sumber â€” tidak ada elemen dekoratif yang
   ditambahkan tanpa justifikasi.
4. Token OKLch di `colors_and_type.css` adalah verbatim dari
   `assets/main.css`; fallback hex diturunkan dari konversi OKLchâ†’sRGB
   untuk renderer lama dan audit paket.
5. `DESIGN.md` selalu menunjuk ke file sumber spesifik untuk setiap
   klaim â€” tidak ada aturan visual yang lahir dari imajinasi.
6. Tidak ada emoji yang dipakai sebagai ikon UI (kecuali dalam
   reproduksi pesan WhatsApp yang memang berisi emoji sebagai bagian
   dari pesan asli).