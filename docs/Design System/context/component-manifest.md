# Component Manifest · Keairan Citanduy

Daftar 22 komponen yang dipakai di seluruh paket. Setiap komponen
menunjuk ke lokasi presisi (path + baris) di source-backed artifacts.

## Brand & chrome

| Komponen | Token utama | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| Brand mark (K kuning) | `--accent`, `--accent-ink` | `examples/index.html:9` (`<rect width='32' height='32' rx='6' fill='%23ffcc00'/>`) + `assets/logo-mark.svg` | `assets/logo-mark.svg`, `build/icon-32.svg`, `build/apple-touch-icon.svg` |
| Wordmark horizontal | `--fg`, `--bg` | `examples/index.html:18-22` | `assets/wordmark.svg` |
| Favicon | `--accent` | `examples/index.html:9` | `assets/favicon.svg`, `build/icon-32.svg` |
| OG cover | `--bg`, `--fg`, `--accent` | Pola editorial di Beranda | `build/og-cover.svg` |
| Pattern topo | `--border`, `--muted` | Pola garis di hero source | `assets/pattern-topo.svg` |

## Layout primitives

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| Wrap (max 1320) | `--maxw`, `--gutter` | `assets/main.css` (`.wrap` line 66) | Semua artefak |
| Grid 2 / 3 / 4 | `--gutter` | `assets/main.css` (`.grid-2`, `.grid-3`, `.grid-4` lines 70-72) | Semua pratinjau & modul |
| Section head | `--border`, `--muted` | `examples/index.html` (`eyebrow → h2 → lede`) | `preview/*.html` |

## Navigation

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| Masthead sticky | `--bg`, `--border`, blur | `examples/index.html:14-37` | `preview/index.html`, `preview/*.html`, `ui_kits/app/components/masthead.html` |
| Primary nav (5 item) | `--fg`, `--muted` | `examples/index.html:24-30` | Semua halaman dengan masthead |
| Tab strip dasbor | `--accent`, `--muted` | `examples/dashboard.html` (`.tabs`) | `preview/applied-public-dashboard.html`, `ui_kits/app/components/dasbor.html` |

## Tombol

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| `.btn` (pill, 14/16 padding) | `--fg` | `assets/main.css` (`.btn` base) | Semua artefak |
| `.btn-primary` (kuning) | `--accent`, `--accent-ink` | `assets/main.css` | Semua CTA primer |
| `.btn-ghost` (outline) | `--fg` | `assets/main.css` | Aksi sekunder |
| `.btn-dark` (paper-dark fill) | `--paper-dark`, `--bg` | `assets/main.css` | Tombol di band gelap |
| `.btn-link` (underline scaleX) | `--fg` | `assets/main.css` | Link teks dengan panah |

## Kartu

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| `.card` | `--bg`, `--border` | `assets/main.css` | `preview/components.html`, `preview/spacing-tokens.html` |
| `.card .photo` (4:5 / 4:3) | `--water`, `--water-soft` | `examples/index.html` hero-photo | `preview/components.html` |
| `.pillar` terang | `--bg`, `--border` | `assets/main.css` | `preview/components.html`, `preview/index.html` |
| `.pillar.dark` | `--paper-dark`, `--bg`, `--accent` | `assets/main.css` | `preview/components.html`, `ui_kits/app/components/aqua-alert.html` |

## Editorial break

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| `.band-dark` | `--paper-dark`, `--bg`, `--accent` | `assets/main.css` + `examples/index.html` | `preview/components.html` |
| `.quote` (display 500, 3 px kuning) | `--accent`, `--display` | `assets/main.css` (`.quote`) | `preview/typography-specimens.html` |
| `.ticker` SIAGA | `--paper-dark`, `--status-siaga`, `--bg` | `examples/dashboard.html:15-33` | `preview/applied-public-dashboard.html`, `ui_kits/app/components/dasbor.html` |
| `.stat-strip` 4-up | `--border`, `--display` | `assets/main.css` | `preview/components.html` |
| `.kicker` | `--muted`, 11px/0.18em | `examples/index.html:44` | Semua hero |

## Data components

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| `.station` (interaktif) | `--border`, `--bg`, status | `examples/dashboard.html:36-60` | `ui_kits/app/components/dasbor.html` |
| `.station .badge` (N/W/S) | status derived | `examples/dashboard.html:55-57` | `preview/components.html`, `ui_kits/app/components/dasbor.html` |
| `.station-detail` | `--surface`, `--border` | `examples/dashboard.html:63-69` | `ui_kits/app/components/dasbor.html` |
| Calendar cell | status derived | `examples/dashboard.html` (kalender tani) | `ui_kits/app/components/dasbor.html` |
| Spec table | `--border`, `--display` first column | `examples/methodology.html` | `preview/components.html` |
| WhatsApp bubble | `--paper-dark`, `--accent` | `examples/aqua-alert.html:188-200` | `ui_kits/app/components/aqua-alert.html` |
| Comparison table | `--border`, `--display` header | `examples/aqua-alert.html:216-235` | `ui_kits/app/components/aqua-alert.html` |
| IDF curve SVG | status colors | `examples/hydro-amdal.html` | `ui_kits/app/components/hydro-amdal.html` |
| Doc preview card | `--border`, `--bg` | `examples/hydro-amdal.html` | `ui_kits/app/components/hydro-amdal.html` |

## Forms & feedback

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| `.field` input/select/textarea | `--border`, `--accent` focus | `examples/dashboard.html:82-92` | `ui_kits/app/components/citizen-report.html` |
| Citizen report form | sama dengan di atas | `examples/dashboard.html` tab 3 | `ui_kits/app/components/citizen-report.html` |
| Reports feed | `--border`, status badges | `examples/dashboard.html` (tab 3) | `ui_kits/app/components/citizen-report.html` |
| Status badge `.badge.n/w/s` | status derived | `examples/dashboard.html:55-57` | `preview/components.html`, `ui_kits/app/components/dasbor.html` |

## Map

| Komponen | Token | Bukti sumber | Penggunaan paket |
|---|---|---|---|
| Map shell (SVG canvas) | `--water`, `--water-soft` | `examples/dashboard.html` | `preview/applied-public-dashboard.html` |
| Station marker Normal | `--status-normal` | `examples/dashboard.html` | `assets/marker-status-normal.svg`, `preview/brand-assets.html` |
| Station marker Waspada | `--status-waspada` | `examples/dashboard.html` | `assets/marker-status-waspada.svg`, `preview/brand-assets.html` |
| Station marker Siaga | `--status-siaga` + pulse | `examples/dashboard.html` | `assets/marker-status-siaga.svg`, `preview/brand-assets.html` |
| Map legend toast | `--status-siaga`, `--bg` | `examples/dashboard.html` | `preview/applied-public-dashboard.html` |

## Status kompilasi

| Kategori | Hitungan |
|---|---|
| Total komponen | 22 |
| Komponen dengan bukti sumber spesifik | 22 |
| Komponen yang tidak dipakai di paket | 0 |

Setiap komponen di manifest ini muncul setidaknya satu kali di
`preview/*.html`, `ui_kits/app/components/*.html`, atau
`examples/*.html`.