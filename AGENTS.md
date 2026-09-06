# AGENTS.md â€” Keairan Citanduy

> Platform Intelijen Hidrologi Terpadu WS Citanduy (DAS Citanduy, Â±3.500 kmÂ², Jabarâ€“Jateng).
> Reference: *Blueprint BBWS/SIH3* (4 September 2026).

---

## Repo Nature

- **Docs + Next.js Frontend.** Static documentation in `docs/` plus an interactive Next.js
  implementation of the five product surfaces under `src/app/`. Mock API is served in the browser
  via MSW (no real backend yet).
- `docs/BRD_*.docx` â€” Business Requirements Document.
- `docs/PRD_*.docx` â€” Product Requirements Document.
- `docs/Design System/` â€” Reusable design-system package (visual contract, tokens, UI kit, examples).

---

## Quick Commands

| Action | Command |
|---|---|
| Dev server (localhost:3000) | `npm run dev` |
| Production build | `npm run build` |
| Start built server | `npm run start` |
| TypeScript check (no emit) | `npm run typecheck` |
| ESLint | `npm run lint` |

MSW intercepts fetch requests in the browser. The worker is initialised by `MSWProvider` (mounted
in `src/app/layout.tsx`) and must be served from `public/mockServiceWorker.js`. The current page
will appear "blank" briefly on first load while MSW boots â€” this is expected.

## Environment Variables

The `.env.local` file at the repo root contains placeholders only. **Do not commit secrets**; ignored by `.gitignore`.

| Variable | Scope | Required | Default | Purpose |
|---|---|---|---|---|
| `MAPBOX_SECRET_TOKEN` | **Server-only** (no `NEXT_PUBLIC_` prefix) | yes (server endpoints) | placeholder | Token rahasia Mapbox (`sk.eyJ...`) yang TIDAK PERNAH masuk ke bundle browser — hanya dipakai oleh Next.js API Routes |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Client (injected ke bundle) | yes | placeholder | Token publik Mapbox (`pk.eyJ...`) **URL-restricted** ke domain Vercel Anda |
| `NEXT_PUBLIC_MAPBOX_STYLE` | Client | no | `mapbox://styles/mapbox/light-v11` | URL gaya Mapbox default untuk peta Dashboard |

When `NEXT_PUBLIC_MAPBOX_TOKEN` belum terisi, `MapboxMap` menampilkan kartu fallback yang
mengarahkan developer menambahkan token, sehingga UI tidak crash saat demo offline.

### Arsitektur Token (Server vs Client)

```
+-----------------------------+         +----------------------------+
|  Vercel Server (Serverless)  |         |   Browser (Client Bundle) |
+-----------------------------+         +----------------------------+
| MAPBOX_SECRET_TOKEN=sk.eyJ  |  --->   | NEXT_PUBLIC_MAPBOX_TOKEN  |
| (hanya ada di server)        |  /api   | = pk.eyJ (URL-restricted) |
|                             |  /mapbox|                             |
+-----------------------------+  /config+----------------------------+
              ^                          ^
              |                          |
       Aman, tidak pernah              Aman karena
       dibundle ke client             URL-restricted ke
                                      domain Vercel saja
```

**Cara kerja**:
1. Client `MapboxMap.tsx` melakukan `fetch('/api/mapbox/config')` ke server.
2. Server (`/api/mapbox/config/route.ts`) membaca `MAPBOX_SECRET_TOKEN` dan `NEXT_PUBLIC_MAPBOX_TOKEN` dari `process.env`.
3. Server mengembalikan **hanya** token publik (`pk.eyJ...`) yang aman untuk browser.
4. Token rahasia (`sk.eyJ...`) TIDAK PERNAH sampai ke client.

---

## Deployment ke Vercel

### Persiapan Token Mapbox (Penting!)

1. Login ke [account.mapbox.com](https://account.mapbox.com/access-tokens/).
2. Buat **dua token** terpisah:
   - **Secret Token** (`sk.eyJ...`): untuk `MAPBOX_SECRET_TOKEN` (server-only).
   - **Public Token** (`pk.eyJ...`): untuk `NEXT_PUBLIC_MAPBOX_TOKEN`. **PENTING** — saat membuat, tambahkan **URL Restrictions**:
     - `http://localhost:3000/*` (untuk development lokal)
     - `https://keairan-citanduy-*.vercel.app/*` (untuk domain Vercel)
     - Atau domain produksi Anda sendiri.

### Konfigurasi Vercel Environment Variables

1. Buka Vercel Project → **Settings** → **Environment Variables**.
2. Tambahkan tiga variabel berikut:

| Name | Value | Environments |
|---|---|---|
| `MAPBOX_SECRET_TOKEN` | `sk.eyJ1...` (token rahasia Anda) | Production, Preview, Development |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | `pk.eyJ1...` (token publik URL-restricted) | Production, Preview, Development |
| `NEXT_PUBLIC_MAPBOX_STYLE` | `mapbox://styles/mapbox/light-v11` | Production, Preview, Development |

3. **Penting**: Centang semua environment (Production, Preview, Development) agar variabel tersedia di semua lingkungan.
4. Klik **Save**.

### Langkah Deploy

```powershell
# Pastikan sudah push ke GitHub
git add .
git commit -m "feat: secure mapbox token architecture with server proxy"
git push origin main

# Vercel otomatis detect dan deploy dari branch main
# Atau gunakan Vercel CLI:
npm i -g vercel
vercel login
vercel --prod
```

### File Penting untuk Deployment

| File | Fungsi |
|---|---|
| `vercel.json` | Konfigurasi deployment (region, headers cache) |
| `next.config.mjs` | Optimasi gambar Next.js (format WebP/AVIF) |
| `src/app/api/mapbox/config/route.ts` | Server endpoint konfigurasi publik |
| `src/app/api/mapbox/style/route.ts` | Server endpoint proxy style (sk. mode) |

### Verifikasi Pasca-Deploy

1. Buka URL Vercel aplikasi Anda.
2. Buka DevTools Console, jalankan: `console.log(Object.keys(window))` — pastikan TIDAK ada `process` atau `MAPBOX_SECRET_TOKEN` yang bocor.
3. Buka tab **Network** — saat peta dimuat, harus ada request ke `/api/mapbox/config` (server-side fetch, bukan langsung ke Mapbox).
4. Cek Vercel **Logs** — pastikan `MAPBOX_SECRET_TOKEN` hanya muncul di server function logs (tidak pernah di client bundle).

---

## Key Directories

| Path | Role |
|---|---|
| `docs/Design System/assets/` | Verbatim source assets (do not edit) â€” also copied to `public/assets/` for runtime |
| `docs/Design System/examples/` | Verbatim source pages (do not edit) |
| `src/app/` | Next.js App Router pages (`/`, `/dashboard`, `/aqua-alert`, `/hydro-amdal`, `/about`) |
| `src/components/chrome/` | Masthead, Footer, BandDark |
| `src/components/ui/` | Ticker, StatStrip, DemoBadge, MSWProvider |
| `src/components/dashboard/` | (reserved for dashboard-specific component extraction if it grows) |
| `src/lib/format.ts` | Indonesian number/currency formatting helpers (titik = thousand, koma = decimal) |
| `src/mocks/handlers.ts` | MSW request handlers (stations, forecast, reports, customers, AMDAL analysis) |
| `src/mocks/browser.ts` | MSW browser worker bootstrap |
| `src/styles/globals.css` | Combined design tokens + main.css (cascade contract preserved) |
| `public/assets/` | Runtime brand assets (logo, wordmark, markers, map SVG, sih3-stations.json) |
| `public/mockServiceWorker.js` | Generated by `npx msw init public/` |

---

## Visual Contract (hard rules an agent will violate)

### Typography
- **Display = Bodoni Moda** (700/800, tight tracking). Never Inter for headings.
- **Body = Inter** (400/500/600).
- **Mono = JetBrains Mono** â€” for all data: coordinates, TMA, debit, T<sub>r</sub>, IDs, timestamps.

### Color
- `--accent` (yellow NatGeo) is the **only loud color** on the page. Max two uses per viewport:
  1. One primary CTA fill
  2. One kicker label or currency figure
- Status colors (Normal / Waspada / Siaga) are **reserved for map dots, station badges, calendar cells, and reports only**. Never as decorative fills.
- No gradients on page chrome. No background gradients except inside the river map and chart fill.
- No purple wash, no warm beige/cream backgrounds. Page background is warm paper (`oklch(98% 0.005 95)`).

### Layout
- One `band-dark` (dark editorial break) per long page â€” editorial punctuation, not decoration.
- Sticky masthead: `position: sticky; top: 0; backdrop-filter: blur(8px)`.
- 5-item nav + 1 primary CTA.

### Voice
- Bahasa Indonesia formal on public surfaces. English only for small-caps labels (eyebrow/caption).
- **Numerik-forward**: numbers are first-class citizens. Always mono.
- Indonesian number format: **period** (`.`) = thousand separator, **comma** (`,`) = decimal.
  - Correct: `Rp 500rb`, `312 cm`, `24,5 mÂ³/s`, `3.500 kmÂ²`
  - Wrong: `Rp 500,000`, `3,500 kmÂ²`
- Avoid emoji as functional UI icons. Emoji inside WhatsApp bubble samples are the only exception (they are a faithful reproduction of a real message).

### Anti-patterns (do not do these)
1. Inter as display type
2. More than one `--accent` CTA per viewport
3. Emoji as functional UI icons
4. Card with colored left bar
5. Hover that reduces text contrast (turns text gray/paler)
6. Three-button primary group
7. Page chrome gradients
8. Invented metrics not citing a source (SIH3, BBWS, BMKG, or labelled as placeholder)

---

## Three Audiences, Three Pillars

| Audience | Product | Pricing |
|---|---|---|
| Warga DAS Citanduy (general public) | Peta Pantau Banjir + Kalender Cuaca Tani Mikro + Kanal Pelaporan Warga | **Free**, no registration barrier |
| Petambak udang vaname & bandeng (muara Cilacap, Pangandaran) | **AquaAlert** â€” WhatsApp/SMS early-warning (12â€“24 hr lead) | Rp500rbâ€“Rp1,5jt/bulan/lokasi |
| Konsultan AMDAL & kawasan industri | **Hydro-AMDAL Engine** â€” automated IDF/Gumbel/Log-Pearson III + DOCX export | Rp20â€“50jt/tahun lisensi, atau Rp3â€“7,5jt per laporan |

AquaAlert and Hydro-AMDAL currently carry a "DEMO" badge in the masthead area. No auth â€” all routes
are public per the plan; full registration/payment is a backend concern.

---

## CSS Cascade Order

In Next.js the tokens + `main.css` content live in a single `globals.css` file (imported once from
`src/app/layout.tsx`). The order is:

1. `:root` brand tokens (OKLch primary) â€” top of `globals.css`
2. `main.css` content â€” below the tokens

This preserves the source design contract "OKLch tokens win the cascade over canonical components"
even though Next.js ships a single stylesheet.

---

## Source Files That Are Verbatim â€” Do Not Edit

- `docs/Design System/examples/*.html` (5 files)
- `docs/Design System/examples/Blueprint-Platform-Keairan-Citanduy.pdf`
- `docs/Design System/assets/main.css`
- `docs/Design System/brand-spec.md`
- `docs/Design System/context/source-context.md`

The Next.js implementation re-emits these designs in TSX but never modifies the source HTML/CSS
files. If you need to change visual contract, edit `src/styles/globals.css` and component code â€”
not the source.

---

## Audit Before Delivering

```powershell
Start-Process -FilePath $env:OD_NODE_BIN `
  -ArgumentList "`"$env:OD_BIN`"","tools","connectors","design-system-package-audit","--path","docs/Design System","--fail-on-warnings" `
  -NoNewWindow -Wait -RedirectStandardOutput "$env:TEMP\od-audit.out" `
  -RedirectStandardError  "$env:TEMP\od-audit.err" `
  -WorkingDirectory (Get-Location)
```

**Windows gotcha:** Bare `& $env:OD_NODE_BIN â€¦` fails because `OD_NODE_BIN` resolves to `Open Design.exe`
(path with spaces). Always use `Start-Process` with an argument list as shown.
