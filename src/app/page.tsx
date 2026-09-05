import Image from "next/image";
import Link from "next/link";
import { BandDark } from "@/components/chrome/BandDark";
import { StatStrip } from "@/components/ui/StatStrip";

const statItems = [
  { num: "12", label: "Jam sebelumnya (peringatan salinitas)" },
  { num: "5", label: "Parameter SIH3 terintegrasi" },
  { num: "27", label: "Pos duga air di DAS" },
  { num: "Rp 0", label: "Untuk dasbor publik" },
];

const pillars = [
  {
    tag: "Pilar 1 · Komersial",
    title: "AquaAlert",
    desc: "Sistem peringatan dini berbasis WhatsApp & SMS gateway untuk petambak udang vaname dan bandeng intensif di muara Citanduy (Kabupaten Cilacap dan Pangandaran).",
    points: [
      "Notifikasi 12–24 jam sebelum penurunan salinitas.",
      "Prediksi debit sungai & salinitas muara berbasis ML.",
      "Berlangganan SaaS per lokasi kolam.",
    ],
    price: "Rp500rb–1,5jt",
    priceUnit: "/bulan/kolam",
    href: "/aqua-alert",
  },
  {
    tag: "Pilar 2 · Komersial",
    title: "Hydro-AMDAL Engine",
    desc: "Otomatisasi analisis hidrologi untuk konsultan lingkungan hidup, konsultan rekayasa sipil, dan divisi HSE kawasan industri.",
    points: [
      "Uji konsistensi data, analisis frekuensi (Gumbel, Log-Pearson III).",
      "Kurva IDF dan neraca air terstandarisasi siap ekspor.",
      "Lisensi tahunan atau bayar per laporan.",
    ],
    price: "Rp20–50jt",
    priceUnit: "/tahun",
    href: "/hydro-amdal",
  },
  {
    tag: "Pilar 3 · Publik",
    title: "Layanan 3-in-1",
    desc: "Mobile-first, tanpa registrasi, konsumsi data ringan—dirancang untuk perangkat ponsel di kawasan pedesaan DAS Citanduy.",
    points: [
      "Peta pantau banjir & jalur rawan genangan.",
      "Kalender cuaca tani mikro mingguan.",
      "Kanal pelaporan warga (Citizen Science).",
    ],
    price: "Gratis",
    priceUnit: "selamanya",
    href: "/dashboard",
  },
];

const storyCards = [
  {
    category: "Akuakultur",
    readTime: "4 menit",
    title: "Saat air tawar hulu menerjang tambak.",
    body: "Hujan lebat di Priangan Timur menurunkan salinitas muara dalam hitungan jam—risiko kematian massal udang vaname yang kerugiannya bisa melampaui ratusan juta rupiah per kolam.",
    href: "/aqua-alert",
    label: "Telusuri AquaAlert",
    img: "/assets/images/tambak-udang-juwana.webp",
    imgAlt: "Tambak udang vaname dan bandeng di pesisir Indonesia — kawasan dengan fluktuasi salinitas musiman tertinggi di DAS Citanduy.",
  },
  {
    category: "Rekayasa",
    readTime: "6 menit",
    title: "Analisis frekuensi, dari 30 jam menjadi 30 menit.",
    body: "Konsultan AMDAL dan kawasan industri mengolah seri data historis SIH3 secara manual untuk uji konsistensi, Gumbel, dan kurva IDF. Hydro-AMDAL mengotomasi semuanya.",
    href: "/hydro-amdal",
    label: "Telusuri Hydro-AMDAL",
    img: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    imgAlt: "Konsultan menganalisis data di laptop",
  },
  {
    category: "Pertanian",
    readTime: "5 menit",
    title: "Kalender tani yang memahami bahasa wereng.",
    body: "Kelembapan relatif di atas 85% ditambah fluktuasi temperatur memicu ledakan hama. Dasbor publik menerjemahkan parameter teknis menjadi saran tebar benih dan penjemuran gabah.",
    href: "/dashboard?tab=tani",
    label: "Buka Kalender Tani",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    imgAlt: "Petani di sawah tepi sungai saat pagi",
  },
];

const specTableData = [
  { param: "Curah Hujan", tech: "Pos penakar presipitasi harian dan real-time di sub-DAS.", nilai: "Prediksi debit puncak hulu, analisis IDF, jadwal tani mikro." },
  { param: "Tinggi Muka Air (TMA)", tech: "Fluktuasi elevasi air sungai di pos duga air utama.", nilai: "Peringatan dini luapan bantaran sungai dan kalibrasi model penjalaran banjir hilir." },
  { param: "Debit Aliran Sungai", tech: "Volume aliran volumetrik (m³/s) pada periode tertentu.", nilai: "Estimasi daya serap limbah cair industri dan ketersediaan suplai air baku irigasi." },
  { param: "Klimatologi", tech: "Suhu, kelembapan relatif, radiasi matahari, kecepatan angin.", nilai: "Perhitungan evapotranspirasi potensial (Penman-Monteith) dan model risiko hama/jamur." },
  { param: "Kualitas Air", tech: "pH, kekeruhan, TDS, DO, dan baku mutu badan air.", nilai: "Rekomendasi penyedotan air tambak estuari dan kepatuhan baku mutu lingkungan (AMDAL)." },
];

const roadmapSteps = [
  {
    badge: "Fase 1 · Bulan 1–2",
    title: "Rekayasa Data & Validasi Rumus",
    desc: "Pengumpulan 5–10 tahun data historis SIH3, pembangunan skema PostGIS, dan pustaka komputasi Python untuk analisis frekuensi dan uji distribusi.",
  },
  {
    badge: "Fase 2 · Bulan 3–4",
    title: "Rilis Dasbor & Pilot Tambak",
    desc: "Peluncuran peta terpadu 3-in-1 gratis dan pilot WhatsApp ke 5–10 petambak intensif pesisir Cilacap & Pangandaran.",
  },
  {
    badge: "Fase 3 · Bulan 5–6",
    title: "Portal Korporat & Skalabilitas",
    desc: "Integrasi gerbang pembayaran Hydro-AMDAL, pemasaran ke konsultan & kawasan industri, koordinasi resmi dengan BBWS & BPBD.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            {/* Deck */}
            <div>
              <span className="kicker">Edisi September 2026 · Wilayah Sungai Citanduy</span>
              <h1 className="display">
                Sungai yang<br />
                <em>bicara</em>,<br />
                kini punya<br />penerjemah.
              </h1>
              <p className="lede" style={{ marginTop: 16 }}>
                Keairan Citanduy menerjemahkan data hidrologi mentah dari pos duga SIH3 BBWS Citanduy
                menjadi peringatan dini, rekomendasi tani, dan intelijen korporat — sebuah model hibrida
                yang menopang layanan publik gratis lewat pendapatan sektor akuakultur dan konsultan.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <Link href="/dashboard" className="btn btn-primary">Lihat Peta Banjir</Link>
                <Link href="/methodology" className="btn btn-ghost">Baca Metodologi</Link>
              </div>

              {/* Meta DL */}
              <dl style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px",
                marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border)"
              }}>
                {[
                  { dt: "WS Citanduy", dd: "±3.500 km²" },
                  { dt: "Pos Pantau", dd: "27 aktif" },
                  { dt: "Parameter", dd: "5 utama" },
                  { dt: "Wilayah", dd: "Jabar · Jateng" },
                ].map((item) => (
                  <div key={item.dt}>
                    <dt className="eyebrow" style={{ fontSize: 10, marginBottom: 4 }}>{item.dt}</dt>
                    <dd className="mono" style={{ fontSize: 15, fontWeight: 600, color: "var(--fg)", margin: 0 }}>{item.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hero Photo */}
            <figure className="hero-photo" style={{ position: "relative" }}>
              <Image
                src="/assets/images/hero-citanduy.webp"
                alt="Belokan Sungai Citanduy di Perbatasan Jawa Barat – Jawa Tengah. Aliran alami DAS Citanduy yang melintasi Priangan Timur menuju muara Segara Anakan."
                width={1400}
                height={1866}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="pin">7°22′ LS · 108°39′ BT</span>
              <figcaption className="caption">
                Hulu Sungai Citanduy, DAS Priangan Timur — pos duga air SIH3. Foto: Wikimedia Commons.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ====== EDITORIAL LEDE + QUOTE ====== */}
      <section style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <p className="eyebrow">Lapor utama</p>
              <h2 className="display" style={{ marginTop: 14 }}>
                Data yang tidak<br />dimiliki publik<br />—kini mereka yang<br />memilikinya.
              </h2>
            </div>
            <div className="col" style={{ gap: 18 }}>
              <p className="lede">
                Bagi warga Ciamis, Cilacap, dan Pangandaran, angka debit dan tinggi muka air adalah
                bahasa asing. Namun bagi petambak udang vaname dan konsultan AMDAL, deret waktu itu
                bernilai ratusan juta rupiah per kejadian. <strong>Keairan Citanduy</strong> menutup
                jurang itu: satu pipa data terpusat, tiga pilar penggunaan.
              </p>
              <blockquote className="quote">
                <p className="quote-text">
                  „Air tidak pernah menunggu izin bicara. Tugas kami hanya menerjemahkan apa yang ia katakan."
                </p>
                <span className="quote-cite">Dokumen cetak biru · 4 September 2026</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ====== STAT STRIP ====== */}
      <section style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
        <div className="wrap">
          <StatStrip items={statItems} />
        </div>
      </section>

      {/* ====== TIGA PILAR ====== */}
      <section style={{ paddingTop: "clamp(40px, 5vw, 64px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Arsitektur bisnis</span>
            <h2 className="display" style={{ marginTop: 12 }}>Tiga pilar, satu sungai.</h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Pendapatan komersial bernilai tinggi menanggung seluruh biaya operasional server, basis
              data, dan komputasi kecerdasan buatan—sehingga warga dapat mengakses informasi publik
              secara cuma-cuma.
            </p>
          </div>

          <div className="grid-3">
            {pillars.map((p) => (
              <article key={p.title} className={`pillar ${p.href === "/dashboard" ? "" : "dark"}`}>
                <div>
                  <span style={{
                    display: "inline-block",
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "3px 8px",
                    borderRadius: 4,
                    marginBottom: 16,
                    background: p.href === "/dashboard" ? "var(--paper-dark)" : "transparent",
                    color: p.href === "/dashboard" ? "var(--accent)" : "oklch(75% 0.015 95)",
                    border: p.href === "/dashboard" ? "1px solid var(--paper-dark-2)" : "1px solid oklch(50% 0.01 250)",
                  }}>
                    {p.tag}
                  </span>
                  <h3 className="display" style={{ marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: p.href === "/dashboard" ? "var(--fg)" : "oklch(85% 0.02 95)" }}>
                    {p.desc}
                  </p>
                </div>
                <ul style={{
                  listStyle: "none", margin: 0, padding: 0,
                  display: "flex", flexDirection: "column", gap: 8,
                  fontSize: 13, color: p.href === "/dashboard" ? "var(--muted)" : "oklch(75% 0.015 95)"
                }}>
                  {p.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--accent)", flexShrink: 0 }}>—</span>{pt}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${p.href === "/dashboard" ? "var(--border)" : "oklch(30% 0.01 250)"}` }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>
                    {p.href === "/dashboard" ? "Akses" : "Langganan / Lisensi"}
                  </div>
                  <strong style={{ fontFamily: "var(--display)", fontSize: 20 }}>
                    {p.price}
                    <small style={{ fontFamily: "var(--body)", fontSize: 13, fontWeight: 400, marginLeft: 4 }}>{p.priceUnit}</small>
                  </strong>
                </div>
                <Link href={p.href} className="btn btn-ghost" style={{ marginTop: 16, fontSize: 13, textAlign: "center", justifyContent: "center" }}>
                  Selengkapnya →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== BAND-DARK: DASBOR PREVIEW ====== */}
      <BandDark
        eyebrow="Layanan publik · bebas biaya"
        title={
          <>
            Peta Citanduy,<br />dibaca ulang setiap<br />jam.
          </>
        }
        description={
          <>
            Visualisasi kode warna Normal, Waspada, dan Siaga untuk 27 pos duga air. Peringatan dini
            penjalaran air dari hulu ke hilir—dengan estimasi waktu tiba banjir ke pemukiman warga.
          </>
        }
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
          <Link href="/dashboard" className="btn btn-primary">Buka Dasbor</Link>
          <Link href="/dashboard?tab=tani" className="btn btn-dark">Lihat Kalender Tani</Link>
        </div>

        {/* Mini-map preview SVG */}
        <div style={{ marginTop: 48, borderRadius: "var(--radius)", overflow: "hidden", border: "1px solid oklch(28% 0.01 250)" }}>
          <svg viewBox="0 0 600 360" style={{ width: "100%", height: "auto", display: "block" }} role="img" aria-label="Pratinjau dasbor publik WS Citanduy">
            <defs>
              <linearGradient id="mapBg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#1d2e2a" />
                <stop offset="100%" stopColor="#0e1a18" />
              </linearGradient>
              <linearGradient id="riverGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#5fb6c9" />
                <stop offset="100%" stopColor="#3a8aa0" />
              </linearGradient>
            </defs>
            <rect width="600" height="360" fill="url(#mapBg)" />
            {/* Terrain */}
            <path d="M0,80 C150,30 320,140 600,90 L600,0 L0,0 Z" fill="#1f2e2a" />
            <path d="M0,360 C200,310 380,340 600,290 L600,360 Z" fill="#1a2a26" />
            {/* River */}
            <path d="M30,120 C140,100 220,200 300,160 S 460,240 570,190" fill="none" stroke="url(#riverGrad)" strokeWidth="14" strokeLinecap="round" opacity="0.85" />
            <path d="M180,140 C220,180 260,160 300,170" fill="none" stroke="#7fc6d4" strokeWidth="3" opacity="0.5" />
            <path d="M340,190 C380,230 430,240 460,250" fill="none" stroke="#7fc6d4" strokeWidth="3" opacity="0.5" />
            {/* Station Ciamis — Normal */}
            <g>
              <circle cx="80" cy="122" r="9" fill="#ffcc00" />
              <text x="98" y="118" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="10">Ciamis</text>
              <text x="98" y="130" fill="#ffcc00" fontFamily="JetBrains Mono, monospace" fontSize="9">NORMAL</text>
            </g>
            {/* Station Tasik — Waspada */}
            <g>
              <circle cx="240" cy="180" r="9" fill="#f0c95c" />
              <text x="258" y="176" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="10">Tasik</text>
              <text x="258" y="188" fill="#f0c95c" fontFamily="JetBrains Mono, monospace" fontSize="9">WASPADA</text>
            </g>
            {/* Station Banjar — Siaga + pulse */}
            <g>
              <circle cx="380" cy="210" r="9" fill="#e85a3c" />
              <circle cx="380" cy="210" r="14" fill="none" stroke="#e85a3c" strokeWidth="1.5" opacity="0.4">
                <animate attributeName="r" values="14;26;14" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
              </circle>
              <text x="398" y="206" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="10">Banjar</text>
              <text x="398" y="218" fill="#e85a3c" fontFamily="JetBrains Mono, monospace" fontSize="9">SIAGA</text>
            </g>
            {/* Station Cilacap — Normal */}
            <g>
              <circle cx="500" cy="230" r="9" fill="#7fc970" />
              <text x="518" y="226" fill="#fff" fontFamily="JetBrains Mono, monospace" fontSize="10">Cilacap</text>
              <text x="518" y="238" fill="#7fc970" fontFamily="JetBrains Mono, monospace" fontSize="9">NORMAL</text>
            </g>
            {/* Flood overlay */}
            <ellipse cx="380" cy="210" rx="55" ry="35" fill="#e85a3c" opacity="0.15" />
            <ellipse cx="380" cy="210" rx="110" ry="68" fill="#e85a3c" opacity="0.07" />
            {/* Compass */}
            <g transform="translate(540,45)">
              <circle r="22" fill="none" stroke="#ffcc00" strokeWidth="1" />
              <text y="-8" textAnchor="middle" fill="#ffcc00" fontFamily="JetBrains Mono, monospace" fontSize="10">N</text>
              <line x1="0" y1="-22" x2="0" y2="22" stroke="#ffcc00" strokeWidth="0.5" />
              <line x1="-22" y1="0" x2="22" y2="0" stroke="#ffcc00" strokeWidth="0.5" />
            </g>
          </svg>
        </div>
      </BandDark>

      {/* ====== STORY CARDS ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Liputan kawasan</span>
            <h2 className="display" style={{ marginTop: 12 }}>Tiga masalah, satu pipa data.</h2>
          </div>

          <div className="grid-3">
            {storyCards.map((card) => (
              <article key={card.title} className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ aspectRatio: "16/10", overflow: "hidden" }}>
                  <img
                    alt={card.imgAlt}
                    src={card.img}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease" }}
                  />
                </div>
                <div style={{ padding: "clamp(16px, 2vw, 24px)" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                    <span style={{
                      fontFamily: "var(--mono)", fontSize: 10, fontWeight: 600,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      background: "var(--surface)", padding: "3px 8px", borderRadius: 4,
                      border: "1px solid var(--border)"
                    }}>
                      {card.category}
                    </span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{card.readTime} baca</span>
                  </div>
                  <h3 className="display" style={{ fontSize: "var(--h4-size)", marginBottom: 10 }}>{card.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 16 }}>{card.body}</p>
                  <Link href={card.href} className="btn-link" style={{ fontSize: 13 }}>
                    {card.label} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== DATA TABLE ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Katalog data SIH3</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Lima parameter, lima cerita berbeda.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Sumber data utama adalah portal SIH3 BBWS Citanduy—dirilis berkala, terbuka untuk umum,
              dan kami olah ulang sebelum disajikan.
            </p>
          </div>

          <div className="table-scroll" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <table className="spec-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>Parameter</th>
                  <th style={{ width: "38%" }}>Karakteristik Teknis</th>
                  <th style={{ width: "42%" }}>Peluang Nilai</th>
                </tr>
              </thead>
              <tbody>
                {specTableData.map((row) => (
                  <tr key={row.param}>
                    <td>
                      <strong className="mono" style={{ fontSize: 13 }}>{row.param}</strong>
                    </td>
                    <td style={{ fontSize: 13, color: "var(--muted)" }}>{row.tech}</td>
                    <td style={{ fontSize: 13 }}>{row.nilai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== ROADMAP ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Peta jalan MVP</span>
            <h2 className="display" style={{ marginTop: 12 }}>Enam bulan, tiga fase.</h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Pelaksanaan proyek dibagi tiga tahapan terstruktur untuk mitigasi risiko teknis dan
              akselerasi arus kas positif.
            </p>
          </div>

          <div className="grid-3" style={{ paddingTop: 16, borderTop: "2px solid var(--border)" }}>
            {roadmapSteps.map((step) => (
              <article key={step.badge} className="card surface" style={{ padding: "clamp(16px, 2vw, 24px)" }}>
                <div style={{
                  display: "inline-flex", gap: 8, alignItems: "center",
                  marginBottom: 12, paddingBottom: 8,
                  borderBottom: "1px solid var(--border)"
                }}>
                  <span className="mono" style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>{step.badge}</span>
                </div>
                <h4 className="display" style={{ fontSize: 18, marginBottom: 8 }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA STRIP ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div className="card surface" style={{
            padding: "clamp(24px, 4vw, 48px)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
            <div>
              <p className="eyebrow">Untuk warga</p>
              <h3 className="display" style={{ marginTop: 10, fontSize: "clamp(22px, 3vw, 36px)" }}>
                Cek status sungai di dekat Anda hari ini.
              </h3>
              <p style={{ color: "var(--muted)", marginTop: 10, fontSize: 14, maxWidth: 600 }}>
                Tanpa registrasi. Buka dasbor publik, lihat peta, dan laporkan genangan dari ponsel Anda.
              </p>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/dashboard" className="btn btn-primary">Buka Dasbor Publik</Link>
              <Link href="/dashboard?tab=lapor" className="btn btn-ghost">Kirim Laporan Warga</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
