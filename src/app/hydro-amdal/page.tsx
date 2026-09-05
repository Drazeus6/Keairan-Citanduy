"use client";

import Link from "next/link";
import { useState } from "react";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { BandDark } from "@/components/chrome/BandDark";

const autoSections = [
  { num: "BAB · 01", title: "Konsistensi Data", desc: "Uji outlier, uji tren, dan uji lompatan dengan kurva massa ganda (double mass curve) otomatis." },
  { num: "BAB · 02", title: "Analisis Frekuensi", desc: "Distribusi Gumbel, Log-Pearson III, dan Log-Normal dengan uji kecocokan Chi-Kuadrat & Smirnov-Kolmogorov." },
  { num: "BAB · 03", title: "Kurva IDF", desc: "Intensity-Duration-Frequency otomatis dengan formula Talbot, Sherman, dan Ishiguro—siap plot di AutoCAD." },
  { num: "BAB · 04", title: "Neraca Air", desc: "Perhitungan ketersediaan air baku (R80%) dan kebutuhan air proyek dalam format neraca bulanan." },
  { num: "BAB · 05", title: "Penyaluran Banjir", desc: "Hidrograf satuan sintetik Nakayasu atau Snyder berdasarkan parameter DAS yang Anda masukkan." },
  { num: "Lampiran", title: "Tabel & Grafik", desc: "Tabel rekapitulasi lengkap, grafik kurva, dan ringkasan metode—siap tempel ke laporan akhir." },
];

const workflowSteps = [
  { num: "01", title: "Pilih seri data", desc: "Pilih pos pantau dan rentang tahun dari katalog SIH3." },
  { num: "02", title: "Atur parameter", desc: "Tentukan kala ulang, distribusi, dan metode kurva IDF." },
  { num: "03", title: "Generate draf", desc: "Engine menghasilkan draf bab + tabel + grafik dalam 3–8 menit." },
  { num: "04", title: "Review & ekspor", desc: "Review oleh teknisi senior, lalu ekspor ke .docx/.xlsx/.pdf." },
];

const pricingPackages = [
  {
    name: "Lisensi Tahunan",
    subtitle: "Korporat",
    price: "Rp 20–50jt",
    priceUnit: "/tahun",
    desc: "Untuk biro konsultan dengan 3–20 teknisi. Termasuk pelatihan dan pembaruan metode.",
    features: [
      "Pengguna tidak terbatas (perusahaan)",
      "Generate laporan tidak terbatas",
      "Akses ke semua seri data historis",
      "Pelatihan teknis untuk staf baru",
      "Dukungan email & WhatsApp prioritas",
    ],
    cta: "Minta Penawaran",
    featured: false,
  },
  {
    name: "Per Proyek",
    subtitle: "Pay-per-Project",
    price: "Rp 3–7,5jt",
    priceUnit: "/laporan",
    desc: "Cocok untuk konsultan independen atau proyek AMDAL satu kali.",
    features: [
      "1 laporan lengkap terstandarisasi",
      "Ekspor .docx + .xlsx + grafik",
      "1 revisi gratis dalam 30 hari",
      "Akses katalog seri data SIH3",
      "Berlaku 30 hari setelah pembelian",
    ],
    cta: "Coba Bayar-per-Proyek",
    featured: true,
  },
];

export default function HydroAmdalPage() {
  const [selectedPos, setSelectedPos] = useState("Pos Banjar (Citanduy Tengah)");
  const [yearRange, setYearRange] = useState("2015–2024 (10 Tahun)");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    r2: string;
    gumbel: number[];
    logPearson: number[];
  }>({
    r2: "0,991",
    gumbel: [312, 498, 624, 812, 954, 1087],
    logPearson: [298, 472, 602, 794, 941, 1082],
  });

  const handleRunAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      // Simulate slight variation based on selected pos
      const factor = selectedPos.includes("Banjar") ? 1.0 : 0.85;
      setAnalysisResult({
        r2: "0,994",
        gumbel: [Math.round(312 * factor), Math.round(498 * factor), Math.round(624 * factor), Math.round(812 * factor), Math.round(954 * factor), Math.round(1087 * factor)],
        logPearson: [Math.round(298 * factor), Math.round(472 * factor), Math.round(602 * factor), Math.round(794 * factor), Math.round(941 * factor), Math.round(1082 * factor)],
      });
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span className="kicker">Pilar 2 · Komersial</span>
                <DemoBadge />
              </div>
              <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                30 jam analisis<br />
                hidrologi menjadi<br />
                <em>30 menit</em>.<br />
                Siap ekspor.
              </h1>
              <p className="lede" style={{ marginTop: 16 }}>
                Hydro-AMDAL Engine mengotomasi pengolahan seri data historis SIH3 menjadi draf bab
                hidrologi dan neraca air terstandarisasi—lengkap dengan kurva IDF, formula matematis,
                dan tabel analisis frekuensi. Untuk konsultan lingkungan hidup, konsultan rekayasa
                sipil, dan divisi HSE kawasan industri.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <a href="#pricing" className="btn btn-primary">Bandingkan Paket</a>
                <a href="#preview" className="btn btn-ghost">Lihat Pratinjau Laporan</a>
              </div>

              <dl style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: "14px 16px",
                marginTop: 28,
                paddingTop: 20,
                borderTop: "1px solid var(--border)",
              }}>
                {[
                  { dt: "Penghematan waktu", dd: "~95%" },
                  { dt: "Distribusi", dd: "Gumbel · LP-III" },
                  { dt: "Output", dd: ".docx · .pdf" },
                  { dt: "Lisensi", dd: "Tahunan / Proyek" },
                ].map((item) => (
                  <div key={item.dt}>
                    <dt className="eyebrow" style={{ fontSize: 10 }}>{item.dt}</dt>
                    <dd className="mono" style={{ fontSize: 13, fontWeight: 600, color: "var(--fg)", marginTop: 2 }}>{item.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hero Photo */}
            <figure className="hero-photo" style={{ position: "relative" }}>
              <img
                alt="Dokumen teknis hidrologi"
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="pin">DRAFT OTOMATIS · .DOCX</span>
              <figcaption className="caption">
                Draf bab hidrologi terstandarisasi—siap review oleh konsultan senior sebelum dikirim ke klien.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ====== PROBLEM ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <span className="eyebrow">Masalah klasik</span>
              <h2 className="display" style={{ marginTop: 14 }}>
                Uji konsistensi,<br />analisis frekuensi,<br />kurva IDF—<br />semua manual.
              </h2>
            </div>
            <div className="col" style={{ gap: 18 }}>
              <p className="lede">
                Proses pengolahan data mentah hidrologi—uji konsistensi data, analisis frekuensi dengan
                metode Gumbel atau Log-Pearson III, dan perancangan kurva IDF—memakan waktu analisis
                manual hingga puluhan jam kerja teknisi. Untuk satu proyek AMDAL kawasan industri,
                satu teknisi bisa terikat 1–2 minggu penuh hanya untuk bab hidrologi.
              </p>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>
                Hydro-AMDAL Engine tidak menggantikan penilaian profesional—ia mempercepat pekerjaan
                rutin sehingga teknisi dapat fokus pada interpretasi dan justifikasi teknis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Otomatisasi</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Apa yang di-<em>generate</em> otomatis.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Setiap laporan Hydro-AMDAL memuat blok-blok standar berikut, yang dihasilkan dari seri
              data historis SIH3 yang Anda pilih.
            </p>
          </div>

          <div className="grid-3">
            {autoSections.map((sec) => (
              <div key={sec.num} className="card" style={{ padding: 24 }}>
                <span className="eyebrow" style={{ color: "var(--accent)" }}>{sec.num}</span>
                <h3 className="display" style={{ fontSize: 20, marginTop: 10 }}>{sec.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SIMULATOR + PREVIEW ====== */}
      <section id="preview" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Generator &amp; Pratinjau draf</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Uji coba generator draf hidrologi.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Pilih pos pantau dan jalankan simulasi komputasi instan untuk melihat preview dokumen BAB III.
            </p>
          </div>

          {/* Interactive Generator Bar */}
          <div className="card surface" style={{ padding: "clamp(16px, 2vw, 20px)", marginBottom: 32 }}>
            <form
              onSubmit={handleRunAnalysis}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 14,
              }}
              className="generator-form"
            >
              <div className="field" style={{ margin: 0 }}>
                <label>Pos Pantau SIH3</label>
                <select value={selectedPos} onChange={(e) => setSelectedPos(e.target.value)}>
                  <option>Pos Banjar (Citanduy Tengah)</option>
                  <option>Pos Ciamis (Citanduy Hulu)</option>
                  <option>Pos Bantarkalong (Tasikmalaya)</option>
                  <option>Pos Kalipucang (Citanduy Hilir)</option>
                </select>
              </div>
              <div className="field" style={{ margin: 0 }}>
                <label>Rentang Seri Data</label>
                <select value={yearRange} onChange={(e) => setYearRange(e.target.value)}>
                  <option>2015–2024 (10 Tahun)</option>
                  <option>2019–2024 (5 Tahun)</option>
                  <option>2005–2024 (20 Tahun)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isAnalyzing} style={{ width: "100%" }}>
                {isAnalyzing ? "Memproses..." : "Jalankan Analisis →"}
              </button>
            </form>
          </div>

          <div className="grid-2" style={{ alignItems: "start", gap: 36 }}>
            {/* Word Document Mockup */}
            <div style={{
              background: "#fff", border: "1px solid var(--border)",
              borderRadius: "var(--radius)", boxShadow: "0 30px 80px -40px oklch(10% 0.01 250 / 0.4)",
              overflow: "hidden"
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 18px", borderBottom: "1px solid var(--border)",
                background: "var(--surface)", fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)"
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#e85a3c" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f1c055" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#45b36e" }} />
                </div>
                <div>BAB_III_HIDROLOGI.docx · {selectedPos.split(" ")[1]}</div>
                <div>Hydro-AMDAL v1.0</div>
              </div>

              <div style={{ padding: 28, fontFamily: "Times New Roman, serif", color: "var(--fg)" }}>
                <p style={{ textAlign: "center", fontWeight: 700, fontSize: 14, letterSpacing: "0.1em", margin: "0 0 16px" }}>
                  BAB III<br />ANALISIS HIDROLOGI
                </p>

                <h4 style={{ fontFamily: "Times New Roman, serif", fontSize: 16, fontWeight: 700, margin: "16px 0 6px" }}>
                  3.1 Uji Konsistensi Data
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "oklch(25% 0.01 250)", margin: "0 0 10px" }}>
                  Data curah hujan harian dari {selectedPos} selama periode {yearRange} diuji menggunakan
                  metode <em>double mass curve</em>. Hasil menunjukkan indeks konsistensi tinggi dengan korelasi R² = {analysisResult.r2}.
                </p>

                <div style={{
                  fontFamily: "Times New Roman, serif", fontStyle: "italic", textAlign: "center",
                  padding: 8, background: "var(--surface)", borderRadius: 4, margin: "10px 0", fontSize: 13
                }}>
                  Y = 1,024 · X + 12,4 &nbsp;·&nbsp; R² = {analysisResult.r2}
                </div>

                <h4 style={{ fontFamily: "Times New Roman, serif", fontSize: 16, fontWeight: 700, margin: "16px 0 6px" }}>
                  3.2 Analisis Frekuensi
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "oklch(25% 0.01 250)", margin: "0 0 10px" }}>
                  Analisis frekuensi debit puncak menggunakan dua distribusi: <strong>Gumbel</strong> dan <strong>Log-Pearson III</strong>. Uji kecocokan menggunakan Smirnov-Kolmogorov pada taraf signifikansi 5%.
                </p>

                <div className="table-scroll">
                  <table style={{ width: "100%", borderCollapse: "collapse", margin: "12px 0", fontFamily: "var(--body)", fontSize: 11, minWidth: 380 }}>
                    <thead>
                      <tr style={{ background: "var(--surface)" }}>
                        <th style={{ border: "1px solid var(--border)", padding: "6px 8px" }}>T<sub>r</sub> (th)</th>
                        <th style={{ border: "1px solid var(--border)", padding: "6px 8px" }}>Gumbel (m³/s)</th>
                        <th style={{ border: "1px solid var(--border)", padding: "6px 8px" }}>Log-Pearson III (m³/s)</th>
                        <th style={{ border: "1px solid var(--border)", padding: "6px 8px" }}>Δ<sub>kritik</sub></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tr: 2, dk: "0,082" },
                        { tr: 5, dk: "0,091" },
                        { tr: 10, dk: "0,074" },
                        { tr: 25, dk: "0,068" },
                        { tr: 50, dk: "0,062" },
                        { tr: 100, dk: "0,058" },
                      ].map((row, idx) => (
                        <tr key={row.tr} style={{ textAlign: "center" }}>
                          <td style={{ border: "1px solid var(--border)", padding: "5px 8px", fontFamily: "var(--mono)" }}>{row.tr}</td>
                          <td style={{ border: "1px solid var(--border)", padding: "5px 8px", fontFamily: "var(--mono)" }}>{analysisResult.gumbel[idx]}</td>
                          <td style={{ border: "1px solid var(--border)", padding: "5px 8px", fontFamily: "var(--mono)" }}>{analysisResult.logPearson[idx]}</td>
                          <td style={{ border: "1px solid var(--border)", padding: "5px 8px", fontFamily: "var(--mono)" }}>{row.dk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h4 style={{ fontFamily: "Times New Roman, serif", fontSize: 16, fontWeight: 700, margin: "16px 0 6px" }}>
                  3.3 Kurva IDF
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "oklch(25% 0.01 250)", margin: "0 0 8px" }}>
                  Kurva Intensity-Duration-Frequency diturunkan dengan metode <em>Talbot</em>:
                </p>
                <div style={{
                  fontFamily: "Times New Roman, serif", fontStyle: "italic", textAlign: "center",
                  padding: 8, background: "var(--surface)", borderRadius: 4, margin: "8px 0", fontSize: 13
                }}>
                  I = a · (t + b) ⁻¹ &nbsp; dengan a = 1280, b = 18
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                  <button
                    onClick={() => alert("Fitur ekspor dokumen Word (.docx) akan aktif pada Fase 3 integrasi backend.")}
                    className="btn btn-ghost"
                    style={{ fontSize: 12, padding: "8px 14px", width: "100%", justifyContent: "center" }}
                  >
                    Unduh Draf .docx (Placeholder)
                  </button>
                </div>
              </div>
            </div>

            {/* IDF Curve SVG */}
            <div>
              <span className="eyebrow">Kurva IDF otomatis</span>
              <h3 className="display" style={{ marginTop: 10, fontSize: 22 }}>Intensity-Duration-Frequency</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: "8px 0 16px" }}>
                Kurva IDF untuk berbagai kala ulang (T<sub>r</sub> 2 s/d 100 tahun), siap plot ulang atau ekspor ke gambar resolusi cetak.
              </p>

              <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16 }}>
                <svg viewBox="0 0 600 280" style={{ width: "100%", height: "auto", display: "block" }}>
                  <defs>
                    <pattern id="idfGrid" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f0ede6" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="600" height="280" fill="url(#idfGrid)" />

                  {/* Axes */}
                  <line x1="50" y1="240" x2="570" y2="240" stroke="#333" strokeWidth="1.5" />
                  <line x1="50" y1="20" x2="50" y2="240" stroke="#333" strokeWidth="1.5" />

                  <text x="300" y="265" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#555">Durasi (menit)</text>
                  <text x="20" y="130" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#555" transform="rotate(-90 20 130)">Intensitas (mm/jam)</text>

                  {/* X ticks */}
                  <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#666">
                    <text x="60" y="255" textAnchor="middle">5</text>
                    <text x="140" y="255" textAnchor="middle">15</text>
                    <text x="220" y="255" textAnchor="middle">30</text>
                    <text x="300" y="255" textAnchor="middle">60</text>
                    <text x="380" y="255" textAnchor="middle">120</text>
                    <text x="460" y="255" textAnchor="middle">240</text>
                    <text x="540" y="255" textAnchor="middle">480</text>
                  </g>

                  {/* Y ticks */}
                  <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#666" textAnchor="end">
                    <text x="46" y="244">0</text>
                    <text x="46" y="195">50</text>
                    <text x="46" y="145">100</text>
                    <text x="46" y="95">150</text>
                    <text x="46" y="45">200</text>
                  </g>

                  {/* Curves */}
                  <path d="M60,30 C100,40 140,55 220,80 C300,110 380,150 460,180 C500,195 540,210 570,215" fill="none" stroke="#999" strokeWidth="1.5" strokeDasharray="2 3" />
                  <path d="M60,40 C100,52 140,72 220,100 C300,135 380,170 460,200 C500,212 540,222 570,225" fill="none" stroke="#cba135" strokeWidth="1.5" strokeDasharray="2 3" />
                  <path d="M60,55 C100,68 140,90 220,125 C300,160 380,190 460,215 C500,222 540,228 570,232" fill="none" stroke="#e89338" strokeWidth="2" />
                  <path d="M60,75 C100,90 140,115 220,150 C300,180 380,205 460,225 C500,230 540,234 570,236" fill="none" stroke="#e85a3c" strokeWidth="2.5" />
                  <path d="M60,90 C100,108 140,135 220,170 C300,195 380,215 460,230 C500,234 540,237 570,238" fill="none" stroke="#c73e1d" strokeWidth="2.5" />
                  <path d="M60,105 C100,125 140,150 220,185 C300,205 380,222 460,233 C500,236 540,238 570,239" fill="none" stroke="#9c2e15" strokeWidth="3" />

                  {/* Legend */}
                  <g transform="translate(360,30)" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#333">
                    <text fontWeight="700">Kala ulang (tahun)</text>
                    <line x1="0" y1="14" x2="20" y2="14" stroke="#999" strokeWidth="1.5" strokeDasharray="2 3" />
                    <text x="26" y="17">Tr = 2</text>
                    <line x1="0" y1="28" x2="20" y2="28" stroke="#cba135" strokeWidth="1.5" strokeDasharray="2 3" />
                    <text x="26" y="31">Tr = 5</text>
                    <line x1="0" y1="42" x2="20" y2="42" stroke="#e89338" strokeWidth="2" />
                    <text x="26" y="45">Tr = 10</text>
                    <line x1="0" y1="56" x2="20" y2="56" stroke="#e85a3c" strokeWidth="2.5" />
                    <text x="26" y="59">Tr = 25</text>
                    <line x1="0" y1="70" x2="20" y2="70" stroke="#c73e1d" strokeWidth="2.5" />
                    <text x="26" y="73">Tr = 50</text>
                    <line x1="0" y1="84" x2="20" y2="84" stroke="#9c2e15" strokeWidth="3" />
                    <text x="26" y="87">Tr = 100</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== WORKFLOW ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Alur kerja</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Empat langkah, satu draf teknis.
            </h2>
          </div>

          <div className="grid-4">
            {workflowSteps.map((step) => (
              <div key={step.num} className="card" style={{ padding: 20 }}>
                <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{step.num}</span>
                <h4 className="display" style={{ fontSize: 18, margin: "10px 0 6px" }}>{step.title}</h4>
                <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRICING ====== */}
      <section id="pricing" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Skema harga</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Lisensi tahunan atau bayar per laporan.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Pilih lisensi korporat untuk pemakaian rutin, atau model <em>pay-per-project</em> untuk
              konsultan independen.
            </p>
          </div>

          <div className="grid-2">
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="card"
                style={{
                  padding: "clamp(20px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  borderColor: pkg.featured ? "var(--accent)" : "var(--border)",
                  boxShadow: pkg.featured ? "0 18px 50px -22px oklch(40% 0.16 80 / 0.5)" : "none",
                }}
              >
                <div>
                  <span className="eyebrow">{pkg.name}</span>
                  <h3 className="display" style={{ fontSize: 22, marginTop: 4 }}>{pkg.subtitle}</h3>
                </div>

                <div>
                  <span style={{ fontFamily: "var(--display)", fontSize: "clamp(30px, 3vw, 38px)", fontWeight: 700 }}>
                    {pkg.price}
                  </span>
                  <small style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)" }}>
                    {" "}{pkg.priceUnit}
                  </small>
                </div>

                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {pkg.desc}
                </p>

                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: 8, fontSize: 14, color: "var(--muted)" }}>
                      <span style={{ color: "var(--status-normal)", flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`btn ${pkg.featured ? "btn-primary" : "btn-ghost"}`}
                  onClick={() => alert("Fitur registrasi komersial akan dibuka pada Fase 3 implementasi backend.")}
                  style={{ marginTop: "auto", alignSelf: "flex-start", width: "100%", justifyContent: "center" }}
                >
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== AUDIENCE BAND-DARK ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <BandDark
            eyebrow="Siapa yang menggunakan"
            title={
              <>
                Tiga klien,<br />satu engine.
              </>
            }
            description={
              <>
                Hydro-AMDAL Engine dirancang untuk tiga segmen profesional yang bergulat dengan volume
                data hidrologi serupa.
              </>
            }
          >
            <div className="grid-3" style={{ marginTop: 32 }}>
              {[
                { title: "Konsultan Lingkungan", role: "Penyusun AMDAL & UKL-UPL", desc: "Mempercepat penyusunan bab hidrologi yang biasanya menyita 1–2 minggu teknisi." },
                { title: "Konsultan Rekayasa Sipil", role: "Desain drainase & jembatan", desc: "Kurva IDF dan debit banjir rancangan siap pakai untuk desain struktur." },
                { title: "Divisi HSE Kawasan Industri", role: "Kepatuhan & due diligence", desc: "Verifikasi cepat baku mutu air dan analisis dampak lingkungan rutin." },
              ].map((c) => (
                <div key={c.title} style={{
                  border: "1px solid oklch(28% 0.01 250)",
                  borderRadius: 8, padding: 20, background: "oklch(22% 0.012 250)"
                }}>
                  <strong style={{ color: "var(--accent)", fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {c.title}
                  </strong>
                  <h4 className="display" style={{ color: "var(--bg)", fontSize: 18, margin: "8px 0 6px" }}>
                    {c.role}
                  </h4>
                  <p style={{ color: "oklch(80% 0.02 95)", fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                    {c.desc}
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
