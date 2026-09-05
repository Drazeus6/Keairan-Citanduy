import Link from "next/link";
import { BandDark } from "@/components/chrome/BandDark";

const dataCatalog = [
  { param: "Curah Hujan", tech: "Pos penakar presipitasi harian dan real-time di sub-DAS.", nilai: "Prediksi debit puncak hulu, analisis IDF, jadwal tani mikro." },
  { param: "Tinggi Muka Air (TMA)", tech: "Fluktuasi elevasi air sungai di pos duga air utama.", nilai: "Peringatan dini luapan bantaran sungai dan kalibrasi model penjalaran banjir hilir." },
  { param: "Debit Aliran Sungai", tech: "Volume aliran volumetrik (m³/s) pada periode tertentu.", nilai: "Estimasi daya serap limbah cair industri dan ketersediaan suplai air baku irigasi." },
  { param: "Klimatologi", tech: "Suhu, kelembapan relatif, radiasi matahari, kecepatan angin.", nilai: "Perhitungan evapotranspirasi potensial (Penman-Monteith) dan model risiko hama/jamur." },
  { param: "Kualitas Air", tech: "pH, kekeruhan, TDS, DO, dan baku mutu badan air.", nilai: "Rekomendasi penyedotan air tambak estuari dan kepatuhan baku mutu lingkungan (AMDAL)." },
];

const stackLayers = [
  {
    layer: "Frontend",
    title: "Aplikasi Web",
    items: [
      { name: "Framework", tech: "Next.js · React 18" },
      { name: "Styling", tech: "Design System Tokens" },
      { name: "Rendering", tech: "SSR · RSC" },
      { name: "Mobile-first", tech: "Responsive grid" },
    ],
  },
  {
    layer: "Backend",
    title: "API & Data",
    items: [
      { name: "API", tech: "FastAPI (Python)" },
      { name: "Database", tech: "PostgreSQL + PostGIS" },
      { name: "Sains Data", tech: "Pandas · SciPy · NumPy" },
      { name: "ML", tech: "scikit-learn · XGBoost" },
    ],
  },
  {
    layer: "Storage & Integrasi",
    title: "Layanan Pendukung",
    items: [
      { name: "Object Storage", tech: "S3-compatible" },
      { name: "Peta", tech: "Leaflet.js · Mapbox GL" },
      { name: "Pesan", tech: "WhatsApp Business API" },
      { name: "Pembayaran", tech: "Midtrans · Xendit" },
    ],
  },
];

const functionalSpecs = [
  { category: "Penyerapan Data", component: "Ekstraktor Data Otomatis", desc: "Skrip periodik untuk mengumpulkan dan memvalidasi rekaman curah hujan, TMA, dan debit dari portal SIH3." },
  { category: "Manajemen Spasial", component: "Lapisan PostGIS", desc: "Menyimpan titik koordinat stasiun duga air, poligon DAS, dan pin laporan masyarakat." },
  { category: "Antarmuka Publik", component: "Dashboard Terpadu Bebas Registrasi", desc: "Memuat visualisasi peta penanda status sungai, ringkasan cuaca tani, dan modul pelaporan genangan." },
  { category: "Mesin Rekomendasi", component: "Agen Pemrosesan Logika Tani", desc: "Mesin inferensi aturan berbasis ambang batas kelembapan dan presipitasi harian untuk saran pertanian." },
  { category: "Sistem Peringatan", component: "Mesin Pesan Pesisir", desc: "Pengiriman peringatan otomatis ke nomor WhatsApp pelanggan tambak saat debit sungai melewati ambang batas kritis." },
  { category: "Pelaporan B2B", component: "Generator Dokumen Teknik", desc: "Penghitungan otomatis analisis frekuensi distribusi Gumbel/Log-Pearson III serta ekspor format laporan .docx." },
];

const roadmapSteps = [
  {
    badge: "Fase 1 · Bulan 1–2",
    title: "Rekayasa Data & Validasi Rumus",
    desc: "Pengumpulan sampel data historis hidrologis dari portal SIH3 BBWS Citanduy (data 5–10 tahun terakhir).",
    points: [
      "Bangun skema basis data spasial (PostgreSQL + PostGIS).",
      "Pustaka komputasi Python untuk otomasi analisis hidrologi.",
      "Uji konsistensi & analisis frekuensi standar.",
    ],
  },
  {
    badge: "Fase 2 · Bulan 3–4",
    title: "Rilis Dashboard & Pilot Tambak",
    desc: "Peluncuran peta terpadu 3-in-1 untuk publik secara gratis—membangun visibilitas merek dan kepercayaan komunitas lokal.",
    points: [
      "Kemitraan percontohan dengan 5–10 petambak udang intensif.",
      "Pilot WhatsApp gateway pesisir Cilacap & Pangandaran.",
      "Onboarding pelaporan citizen science.",
    ],
  },
  {
    badge: "Fase 3 · Bulan 5–6",
    title: "Portal Korporat & Skalabilitas",
    desc: "Integrasi sistem pembayaran dan pemasaran ke biro konsultan serta kawasan industri prioritas.",
    points: [
      "Payment gateway Hydro-AMDAL & AquaAlert korporat.",
      "Kampanye pemasaran ke konsultan & kawasan industri.",
      "Formalisasi MoU dengan BBWS & BPBD setempat.",
    ],
  },
];

export default function MethodologyPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="kicker">Cetak biru · 4 September 2026</span>
              <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                Metodologi,<br />
                arsitektur, dan<br />
                peta jalan<br />
                enam bulan.
              </h1>
              <p className="lede" style={{ marginTop: 16 }}>
                Dokumen ini menguraikan arsitektur teknis, spesifikasi sistem, dan model bisnis untuk
                pengembangan platform berbasis web yang memanfaatkan data hidrologi terbuka SIH3 BBWS
                Citanduy—melalui strategi subsidi silang antara pilar komersial dan layanan publik gratis.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <a href="#roadmap" className="btn btn-primary">Lihat Peta Jalan</a>
                <a href="#stack" className="btn btn-ghost">Tumpukan Teknologi</a>
              </div>
            </div>

            {/* Hero Photo */}
            <figure className="hero-photo" style={{ position: "relative" }}>
              <img
                alt="Peta topografi dan bentang alam DAS Citanduy"
                src="https://images.unsplash.com/photo-1542223616-7408ec4b3a26?auto=format&fit=crop&w=1400&q=80"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="pin">±3.500 KM²</span>
              <figcaption className="caption">
                Bentang DAS Citanduy dari hulu Priangan hingga muara Cilacap—±3.500 km², dua provinsi.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ====== EXECUTIVE ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <span className="eyebrow">Ringkasan eksekutif</span>
              <h2 className="display" style={{ marginTop: 14 }}>
                Data mentah tidak<br />bernilai—<br />interpretasinya<br />yang bernilai.
              </h2>
            </div>
            <div className="col" style={{ gap: 18 }}>
              <p className="lede">
                Data hidrologi mentah dari stasiun pemantau sungai tidak memiliki nilai guna langsung
                bagi masyarakat awam tanpa proses interpretasi. Sebaliknya, bagi entitas komersial seperti
                pelaku industri budidaya tambak udang dan konsultan teknik sipil/AMDAL, data tersebut
                memiliki nilai mitigasi risiko bernilai ratusan juta rupiah per kejadian.
              </p>
              <blockquote className="quote">
                <p className="quote-text">
                  „Tiga prinsip: <strong>High-Value Monetization</strong>, <strong>Public Impact</strong>, dan <strong>Single Pipeline Efficiency</strong>."
                </p>
                <span className="quote-cite">Dokumen cetak biru</span>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ====== DATA CATALOG ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Katalog data SIH3</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Lima parameter utama yang kami olah ulang.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Data yang dirilis berkala melalui portal SIH3 BBWS Citanduy mencakup lima parameter
              dengan potensi pemanfaatan bernilai tinggi.
            </p>
          </div>

          <div className="table-scroll" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <table className="spec-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Karakteristik Teknis</th>
                  <th>Peluang Nilai Komersial & Sosial</th>
                </tr>
              </thead>
              <tbody>
                {dataCatalog.map((row) => (
                  <tr key={row.param}>
                    <td><strong className="mono" style={{ fontSize: 13 }}>{row.param}</strong></td>
                    <td style={{ fontSize: 13, color: "var(--muted)" }}>{row.tech}</td>
                    <td style={{ fontSize: 13 }}>{row.nilai}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== ARCHITECTURE ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Arsitektur perangkat lunak</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Satu pipa data, tiga antarmuka.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Arsitektur modular decoupled untuk menjamin keandalan pemrosesan data numerik skala
              besar tanpa memperlambat pengalaman pengguna.
            </p>
          </div>

          <div style={{
            background: "var(--paper-dark)", color: "var(--bg)",
            borderRadius: "var(--radius)", padding: "clamp(16px, 2.4vw, 28px)",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}>
            <pre style={{
              fontFamily: "var(--mono)",
              fontSize: "clamp(10px, 2.2vw, 12px)",
              whiteSpace: "pre",
              lineHeight: 1.6,
              margin: 0,
              minWidth: 600,
            }}>
{`+---------------------------------------------------------------------+
| Sumber Data Eksternal (SIH3 WS Citanduy)                          |
+---------------------------------------------------------------------+
                                  |
                                  v
+---------------------------------------------------------------------+
| Pipeline ETL · Python Automated Scraper                            |
+---------------------------------------------------------------------+
                                  |
                                  v
+---------------------------------------------------------------------+
| Mesin Pengolahan & Gudang Data Terpusat                            |
|  · Basis Data Spasial & Deret Waktu: PostgreSQL + PostGIS          |
|  · Engine Komputasi Hidrologi: Python (Pandas, SciPy, NumPy)       |
|  · Machine Learning Engine: Prediksi TMA & Salinitas Muara         |
+---------------------------------------------------------------------+
        |                  |                       |
        v                  v                       v
+--------------+   +-----------------+    +------------------+
| API Modul    |   | API AquaAlert   |    | API Hydro-AMDAL  |
| Publik       |   |                 |    |                  |
+--------------+   +-----------------+    +------------------+
        |                  |                       |
        v                  v                       v
[Web Dashboard]   [WhatsApp Gateway]    [Web Korporat]
Leaflet + TW      Notif Otomatis       Generator Dokumen`}
            </pre>
          </div>
        </div>
      </section>

      {/* ====== STACK ====== */}
      <section id="stack" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Tumpukan teknologi</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Buku-buku yang kami pakai.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Pemilihan teknologi mengutamakan tiga hal: ringan untuk ponsel di pedesaan, cepat untuk
              komputasi sains data, dan terbuka untuk di-audit.
            </p>
          </div>

          <div className="grid-3">
            {stackLayers.map((s) => (
              <div key={s.layer} className="card" style={{ padding: "clamp(20px, 2.4vw, 28px)" }}>
                <span className="eyebrow" style={{ color: "var(--accent)" }}>{s.layer}</span>
                <h3 className="display" style={{ fontSize: 22, marginTop: 8, marginBottom: 8 }}>{s.title}</h3>
                {s.items.map((it) => (
                  <div key={it.name} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    borderTop: "1px dashed var(--border)", padding: "10px 0",
                    gap: 8,
                  }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{it.name}</span>
                    <span className="mono" style={{ fontSize: 12, color: "var(--muted)", textAlign: "right" }}>{it.tech}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FUNCTIONAL SPECS ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Matriks spesifikasi kebutuhan</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Apa yang harus bisa dilakukan sistem.
            </h2>
          </div>

          <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <table className="spec-table">
              <thead>
                <tr>
                  <th>Kategori</th>
                  <th>Komponen Sistem</th>
                  <th>Deskripsi Persyaratan Fungsional</th>
                </tr>
              </thead>
              <tbody>
                {functionalSpecs.map((row) => (
                  <tr key={row.component}>
                    <td><strong className="mono" style={{ fontSize: 13 }}>{row.category}</strong></td>
                    <td style={{ fontWeight: 600 }}>{row.component}</td>
                    <td style={{ fontSize: 13, color: "var(--muted)" }}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== ROADMAP ====== */}
      <section id="roadmap" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Peta jalan MVP</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Enam bulan, tiga fase.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Pelaksanaan proyek dibagi tiga tahapan terstruktur untuk mitigasi risiko teknis dan
              akselerasi arus kas positif.
            </p>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 3vw, 40px)",
            paddingTop: 16, borderTop: "2px solid var(--border)"
          }}>
            {roadmapSteps.map((step) => (
              <article key={step.badge}>
                <span className="badge badge-waspada" style={{ marginBottom: 14, display: "inline-block" }}>
                  {step.badge}
                </span>
                <h4 className="display" style={{ fontSize: 18, margin: "8px 0 10px" }}>{step.title}</h4>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, marginBottom: 12 }}>
                  {step.desc}
                </p>
                <ul style={{ paddingLeft: 18, margin: 0, color: "var(--muted)", fontSize: 12 }}>
                  {step.points.map((p) => (
                    <li key={p} style={{ marginBottom: 4 }}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CITATIONS BAND-DARK ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <BandDark
            eyebrow="Sumber &amp; sitasi"
            title="Akuntabilitas data terbuka."
            description={
              <>
                Seluruh data yang digunakan berasal dari portal data terbuka pemerintah dan dirujuk
                kembali ke sumbernya pada setiap publikasi. Verifikasi silang dengan BBWS dan
                BPBD direncanakan pada Fase 3.
              </>
            }
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 32 }}>
              {[
                { id: "SIH3", name: "BBWS Citanduy", desc: "Sistem Informasi Hidrologi, Hidrometeorologi, dan Hidroklimatologi" },
                { id: "BMKG", name: "BMKG", desc: "Badan Meteorologi, Klimatologi, dan Geofisika" },
                { id: "PUPR", name: "Kementerian PUPR", desc: "Direktorat Jenderal Sumber Daya Air" },
                { id: "BPBD", name: "BPBD Setempat", desc: "Badan Penanggulangan Bencana Daerah" },
              ].map((s) => (
                <div key={s.id} style={{
                  border: "1px solid oklch(28% 0.01 250)", borderRadius: 8, padding: 18
                }}>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", fontWeight: 700, marginBottom: 6 }}>
                    {s.id}
                  </div>
                  <h5 className="display" style={{ color: "var(--bg)", fontSize: 16, margin: "4px 0 8px" }}>
                    {s.name}
                  </h5>
                  <p style={{ color: "oklch(75% 0.015 95)", fontSize: 12, lineHeight: 1.5, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </BandDark>
        </div>
      </section>
    </>
  );
}
