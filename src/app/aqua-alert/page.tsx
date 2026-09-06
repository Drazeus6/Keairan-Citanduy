"use client";

import Link from "next/link";
import Image from "next/image";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { BandDark } from "@/components/chrome/BandDark";
import { useState } from "react";

const pricingTiers = [
  {
    name: "Pemula",
    subtitle: "1–2 Kolam",
    price: "Rp 500rb",
    priceUnit: "/bulan",
    desc: "Untuk pembudidaya kecil dengan 1–2 kolam/keramba di satu lokasi — tambak udang-bandeng maupun kolam ikan air tawar.",
    features: ["1 nomor WhatsApp", "Notifikasi Waspada & Siaga", "Laporan mingguan via email", "Akses dashboard publik gratis"],
    featured: false,
    cta: "Mulai",
  },
  {
    name: "Usaha",
    subtitle: "3–8 Kolam",
    price: "Rp 950rb",
    priceUnit: "/bulan",
    desc: "Untuk pembudidaya sedang dengan beberapa kolam/keramba di lokasi yang sama.",
    features: [
      "3 nomor WhatsApp",
      "Notifikasi Waspada & Siaga + prakiraan 24 jam",
      "Laporan harian via email & WhatsApp",
      "Rekomendasi teknis mingguan",
      "Akses dashboard publik gratis",
    ],
    featured: true,
    cta: "Mulai Sekarang",
  },
  {
    name: "Korporat",
    subtitle: "Multi-lokasi",
    price: "Rp 1,5jt",
    priceUnit: "/bulan",
    desc: "Untuk koperasi, eksportir, atau perusahaan akuakultur dengan beberapa lokasi produksi, baik tambak maupun kolam air tawar.",
    features: [
      "Nomor WhatsApp tak terbatas",
      "Notifikasi semua level + prakiraan 48 jam",
      "API akses untuk integrasi ERP",
      "Dukungan teknis 24/7",
      "Akses Hydro-AMDAL gratis (lisensi dasar)",
    ],
    featured: false,
    cta: "Hubungi Sales",
  },
];

const comparisonRows = [
  {
    scenario: "Hujan lebat di hulu",
    before: "Petambak tahu dari pengamatan visual atau kabar warga—terlambat 4–8 jam.",
    after: "Notifikasi WhatsApp otomatis dalam 15 menit setelah ambang terlampaui.",
  },
  {
    scenario: "Penurunan salinitas",
    before: "Refractometer hanya menunjukkan dampak setelah udang stres.",
    after: "Prediksi 12–24 jam sebelum salinitas turun ke < 8 ppt.",
  },
  {
    scenario: "Respons operasional",
    before: "Pompa diaktifkan terlambat, pintu intake sulit ditutup pada air pasang.",
    after: "Waktu 6–8 jam untuk isolasi kolam, persiapan aerator, panen darurat parsial.",
  },
  {
    scenario: "Kerugian rata-rata",
    before: "Rp 150–300 juta per kejadian (kerugian total).",
    after: "Rp 10–40 juta (kerusakan parsial + respons cepat).",
  },
];

const pilotStats = [
  { num: "5–10", label: "Lokasi pilot" },
  { num: "3 bln", label: "Gratis uji coba" },
  { num: "12–24 jam", label: "Jendela peringatan" },
  { num: "Lintas DAS", label: "Muara hingga hulu" },
];

export default function AquaAlertPage() {
  const [onboardingStep, setOnboardingStep] = useState(0); // 0 = none, 1 = form, 2 = otp
  const [messageSegment, setMessageSegment] = useState<"muara" | "airtawar">("muara"); // "muara" | "airtawar"

  const handleStartOnboarding = () => setOnboardingStep(1);
  const handleOtpRequest = () => setOnboardingStep(2);

  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                <span className="kicker">Pilar 1 · Komersial</span>
                <span
                  className="mono"
                  aria-label="Status pengembangan"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent-ink)",
                    background: "var(--accent)",
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontWeight: 700,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--accent-ink)",
                      display: "inline-block",
                    }}
                  />
                  Dalam Pengembangan
                </span>
              </div>
              <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                Sebelum air sungai berubah drastis, AquaAlert sudah bicara — untuk <em>tambak maupun
                kolam Anda</em>.
              </h1>
              <p className="lede" style={{ marginTop: 16 }}>
                Sistem peringatan dini berbasis WhatsApp & SMS gateway untuk pembudidaya di sepanjang DAS
                Citanduy — dari tambak udang dan bandeng di muara, hingga kolam dan keramba jaring apung
                ikan air tawar di hulu-tengah. Notifikasi terkirim 12–24 jam sebelum lonjakan debit sungai
                berdampak pada usaha Anda, baik berupa penurunan salinitas, risiko luapan, maupun
                penurunan kualitas air.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <button onClick={handleStartOnboarding} className="btn btn-primary">
                  Mulai Berlangganan
                </button>
                <Link href="/dashboard" className="btn btn-ghost">Lihat Dashboard Publik</Link>
              </div>

              {/* Onboarding Mock */}
              {onboardingStep > 0 && (
                <div className="card" style={{ marginTop: 24 }}>
                  {onboardingStep === 1 && (
                    <form
                      onSubmit={(e) => { e.preventDefault(); handleOtpRequest(); }}
                    >
                      <h3 className="display" style={{ fontSize: 20, marginBottom: 16 }}>Pendaftaran AquaAlert</h3>
                      <div className="field">
                        <label>Nama Lengkap / Nama Usaha</label>
                        <input type="text" placeholder="Tambak Pak Hasan / UD Sari Laut" required />
                      </div>
                      <div className="field">
                        <label>Lokasi Kolam</label>
                        <select>
                          <option>Muara Cilacap, Kab. Cilacap (tambak)</option>
                          <option>Pesisir Pangandaran, Kab. Pangandaran (tambak)</option>
                          <option>Kalipucang, Kab. Pangandaran (tambak)</option>
                          <option>Kampung Laut, Kab. Cilacap (tambak)</option>
                          <option>Ciamis, hulu DAS (kolam air tawar)</option>
                          <option>Tasikmalaya, tengah DAS (keramba/KJA)</option>
                          <option>Manonjaya, hulu DAS (kolam nila/gurame)</option>
                        </select>
                      </div>
                      <div className="field">
                        <label>Nomor WhatsApp</label>
                        <input type="tel" placeholder="+62 812-xxxx-xxxx" required />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                        Kirim Kode OTP →
                      </button>
                      <p className="mono" style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 8 }}>
                        MODE DEMO — Backend belum aktif
                      </p>
                    </form>
                  )}
                  {onboardingStep === 2 && (
                    <div style={{ textAlign: "center" }}>
                      <h3 className="display" style={{ fontSize: 20, marginBottom: 8 }}>Verifikasi OTP</h3>
                      <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
                        Kode 4 digit dikirim ke nomor Anda. (Demo: gunakan <strong className="mono">1234</strong>)
                      </p>
                      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                        {["1", "2", "3", "4"].map((d) => (
                          <input
                            key={d}
                            type="text"
                            maxLength={1}
                            className="mono"
                            style={{
                              width: 52, height: 56, textAlign: "center", fontSize: 22,
                              border: "1px solid var(--border)", borderRadius: 8,
                              background: "var(--bg)", color: "var(--fg)"
                            }}
                            defaultValue={d}
                          />
                        ))}
                      </div>
                      <button
                        className="btn btn-primary"
                        style={{ width: "100%" }}
                        onClick={() => { setOnboardingStep(0); alert("Fitur penuh belum tersedia — ini adalah demonstrasi desain."); }}
                      >
                        Verifikasi & Lanjutkan
                      </button>
                      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
                        Tidak menerima kode?{" "}
                        <button
                          onClick={() => alert("Demo: kode baru dikirim.")}
                          style={{ color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "inherit" }}
                        >
                          Kirim ulang
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              )}

              <dl className="meta-dl">
                {[
                  { dt: "Jendela peringatan", dd: "12–24 jam" },
                  { dt: "Saluran", dd: "WhatsApp · SMS" },
                  { dt: "Wilayah", dd: "Sepanjang DAS Citanduy" },
                  { dt: "Status", dd: "Pilot aktif" },
                ].map((item) => (
                  <div key={item.dt}>
                    <dt className="eyebrow">{item.dt}</dt>
                    <dd>{item.dd}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hero Photo */}
            <figure className="hero-photo" style={{ position: "relative" }}>
              <Image
                src="/assets/images/tambak-udang-juwana.webp"
                alt="Tambak udang vaname dan bandeng di pesisir utara/selatan Jawa. Model pertambakan pesisir serupa dengan kawasan muara Citanduy di Cilacap dan Pangandaran."
                width={1400}
                height={1750}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="pin">Pesisir Cilacap · 7°43′ LS</span>
              <figcaption className="caption">
                Tambak udang di muara Citanduy — satu dari dua segmen yang dilayani AquaAlert, bersama
                kolam dan keramba ikan air tawar di wilayah hulu-tengah. Foto: Wikimedia Commons.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ====== PROBLEM STATEMENT ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <span className="eyebrow">Masalah kritis</span>
              <h2 className="display" style={{ marginTop: 14 }}>
                Air sungai berubah drastis dalam hitungan jam. Kerugian diukur ratusan juta — dari muara
                hingga hulu.
              </h2>
            </div>
            <div className="col" style={{ gap: 18 }}>
              <p className="lede">
                Hujan lebat di Priangan Timur mengirim air tawar dalam volume besar ke muara. Salinitas
                tambak yang biasanya 15–25 ppt bisa anjlok ke bawah 5 ppt dalam 6–12 jam — udang vaname
                yang sudah di atas 30 hari rentan mati massal, dengan kerugian rata-rata satu kolam
                produksi bisa melampaui <strong className="mono">Rp 200 juta per kejadian</strong>.
              </p>
              <p className="lede">
                Di wilayah hulu-tengah, kejadian hujan yang sama membawa risiko berbeda bagi kolam dan
                keramba jaring apung: luapan yang menghanyutkan jaring, atau penurunan oksigen terlarut
                mendadak yang memicu kematian massal ikan nila, gurame, dan jenis air tawar lainnya.
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 20,
                  marginTop: 12,
                  alignItems: "stretch",
                }}
              >
                {/* Quote 1 — Petambak Cilacap */}
                <blockquote
                  style={{
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--accent)",
                    borderRadius: "var(--radius)",
                    padding: "22px 24px",
                    minHeight: 180,
                  }}
                >
                  <p
                    className="display"
                    style={{
                      fontSize: "clamp(15px, 1.4vw, 18px)",
                      lineHeight: 1.45,
                      fontWeight: 500,
                      color: "var(--fg)",
                      margin: 0,
                      quotes: '"„" """',
                    }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--accent)", fontFamily: "var(--display)", marginRight: 4 }}>„</span>
                    Air tawar hulu tidak pernah memberi surat peringatan. Ia hanya tiba.
                    <span aria-hidden="true" style={{ color: "var(--accent)", fontFamily: "var(--display)", marginLeft: 2 }}>“</span>
                  </p>
                  <footer
                    className="mono"
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 24,
                        height: 1,
                        background: "var(--accent)",
                        display: "inline-block",
                      }}
                    />
                    Petambak · Cilacap
                  </footer>
                </blockquote>

                {/* Quote 2 — Pembudidaya Keramba Tasikmalaya */}
                <blockquote
                  style={{
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderLeft: "3px solid var(--accent)",
                    borderRadius: "var(--radius)",
                    padding: "22px 24px",
                    minHeight: 180,
                  }}
                >
                  <p
                    className="display"
                    style={{
                      fontSize: "clamp(15px, 1.4vw, 18px)",
                      lineHeight: 1.45,
                      fontWeight: 500,
                      color: "var(--fg)",
                      margin: 0,
                    }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--accent)", fontFamily: "var(--display)", marginRight: 4 }}>„</span>
                    Ikan tidak sempat kami selamatkan karena hujan besarnya datang malam hari, dan kami baru tahu paginya.
                    <span aria-hidden="true" style={{ color: "var(--accent)", fontFamily: "var(--display)", marginLeft: 2 }}>“</span>
                  </p>
                  <footer
                    className="mono"
                    style={{
                      marginTop: 18,
                      paddingTop: 14,
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 24,
                        height: 1,
                        background: "var(--accent)",
                        display: "inline-block",
                      }}
                    />
                    Pembudidaya Keramba · Tasikmalaya
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== HOW IT WORKS ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Cara kerja</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Tiga sensor, satu notifikasi ke ponsel Anda.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              AquaAlert menggabungkan tiga parameter utama ke dalam model prediksi yang sudah dilatih pada
              data historis 5–10 tahun SIH3 BBWS Citanduy.
            </p>
          </div>

          <div className="grid-3" style={{ marginBottom: 56 }}>
            {[
              { num: "INPUT · 01", title: "Curah Hulu", desc: "Data pos penakar presipitasi harian dan real-time di sub-DAS hulu (Ciamis, Tasikmalaya)." },
              { num: "INPUT · 02", title: "Debit & TMA", desc: "Fluktuasi elevasi air sungai di pos duga Banjar dan Pataruman sebagai proxy penjalaran." },
              { num: "MODEL · 03", title: "Peringatan Sesuai Jenis Usaha", desc: "Sistem menerjemahkan data yang sama menjadi peringatan berbeda sesuai jenis usaha Anda: prediksi salinitas untuk tambak muara, atau indikasi risiko luapan dan kualitas air untuk kolam/keramba air tawar." },
            ].map((f) => (
              <div key={f.num} className="card" style={{ padding: 24 }}>
                <span className="eyebrow" style={{ fontFamily: "var(--mono)", color: "var(--accent)" }}>{f.num}</span>
                <h3 className="display" style={{ marginTop: 12, fontSize: 22 }}>{f.title}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp Bubble Example */}
          <div className="grid-2" style={{ gap: 32, alignItems: "center" }}>
            <div>
              <span className="eyebrow">Contoh pesan · WhatsApp Gateway</span>
              <h3 className="display" style={{ marginTop: 12, fontSize: "clamp(20px, 2.4vw, 28px)" }}>
                Notifikasi yang sampai sebelum air tiba.
              </h3>
              <p style={{ color: "var(--muted)", marginTop: 14, fontSize: 14, lineHeight: 1.6 }}>
                Pesan AquaAlert dirancang singkat, berisi tiga informasi yang dapat ditindaklanjuti: ambang
                batas terlampaui, estimasi waktu dampak, dan rekomendasi teknis.
              </p>
              <ul style={{ color: "var(--muted)", fontSize: 14, paddingLeft: 18, marginTop: 16 }}>
                <li>Sumber data terlampir untuk transparansi.</li>
                <li>Bahasa Indonesia formal, tanpa istilah teknis.</li>
                <li>Tersedia versi SMS 160 karakter untuk daerah tanpa sinyal data.</li>
              </ul>
            </div>

            {/* WhatsApp Bubble with segment toggle */}
            <div style={{ maxWidth: 400, width: "100%", margin: "0 auto" }}>
              {/* Segment Selector aligned with bubble width */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                  }}
                >
                  Segmen Layanan:
                </span>
                <div
                  role="tablist"
                  aria-label="Pilih segmen pembudidaya"
                  style={{
                    display: "inline-flex",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 999,
                    padding: 3,
                  }}
                >
                  {[
                    { id: "muara" as const, label: "Tambak Muara" },
                    { id: "airtawar" as const, label: "Kolam & Keramba" },
                  ].map((t) => {
                    const active = messageSegment === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setMessageSegment(t.id)}
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: 11,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          padding: "6px 12px",
                          border: 0,
                          borderRadius: 999,
                          cursor: "pointer",
                          background: active ? "var(--accent)" : "transparent",
                          color: active ? "var(--accent-ink)" : "var(--muted)",
                          fontWeight: active ? 700 : 500,
                          transition: "background 0.15s, color 0.15s",
                        }}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chat bubble frame */}
              <div style={{
                background: "#0e1116", color: "white",
                borderRadius: 14, padding: 16,
                width: "100%",
                boxShadow: "0 12px 30px -10px oklch(20% 0.05 250 / 0.5)",
                border: "1px solid oklch(25% 0.01 250)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, fontSize: 11 }}>
                  <strong style={{ color: "#fff", letterSpacing: "0.02em" }}>AquaAlert · Keairan Citanduy</strong>
                  <span style={{ color: "oklch(75% 0.01 250)", fontFamily: "var(--mono)" }}>14:22 WIB</span>
                </div>

                {messageSegment === "muara" ? (
                  <>
                    <div style={{ background: "#1f2933", padding: "12px 14px", borderRadius: "10px 10px 4px 4px" }}>
                      <strong style={{ color: "var(--accent)", display: "block", marginBottom: 10, fontFamily: "var(--mono)", fontSize: 12 }}>
                        ⚠ PERINGATAN DINI · WASPADA
                      </strong>
                      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
                        Pos Banjar: TMA 312 cm (↑ 12 cm/jam). Estimasi salinitas muara turun ke &lt; 8 ppt dalam 8–10 jam.
                      </p>
                      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
                        <strong>Saran:</strong> tutup pintu intake, aktifkan pompa sirkulasi, siapkan aerator cadangan.
                      </p>
                      <p style={{ color: "oklch(70% 0.01 250)", fontSize: 11, margin: 0 }}>
                        Sumber: SIH3 BBWS Citanduy · #AQA-4821
                      </p>
                    </div>
                    <div style={{ background: "#1f2933", padding: "12px 14px", borderRadius: "10px 10px 4px 4px", marginTop: 8 }}>
                      <strong style={{ color: "#4cc9f0", display: "block", marginBottom: 10, fontFamily: "var(--mono)", fontSize: 12 }}>
                        ℹ PEMUTAKHIRAN · 18:45 WIB
                      </strong>
                      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                        Salinitas terpantau 9,4 ppt. Tren kenaikan debit melambat. Pemantauan lanjutan setiap 2 jam.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ background: "#1f2933", padding: "12px 14px", borderRadius: "10px 10px 4px 4px" }}>
                      <strong style={{ color: "var(--accent)", display: "block", marginBottom: 10, fontFamily: "var(--mono)", fontSize: 12 }}>
                        ⚠ PERINGATAN DINI · WASPADA
                      </strong>
                      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
                        Pos Manonjaya: debit naik tajam pasca hujan deras, TMA +38 cm/jam. Berpotensi meluap dalam 6–8 jam. Waspada penurunan oksigen terlarut (DO) untuk keramba nila &amp; gurame.
                      </p>
                      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, marginBottom: 10 }}>
                        <strong>Saran:</strong> amankan/naikkan jaring keramba, siapkan aerator cadangan, pertimbangkan panen parsial jika debit masih naik 2 jam ke depan.
                      </p>
                      <p style={{ color: "oklch(70% 0.01 250)", fontSize: 11, margin: 0 }}>
                        Sumber: SIH3 BBWS Citanduy · #AQA-5107
                      </p>
                    </div>
                    <div style={{ background: "#1f2933", padding: "12px 14px", borderRadius: "10px 10px 4px 4px", marginTop: 8 }}>
                      <strong style={{ color: "#4cc9f0", display: "block", marginBottom: 10, fontFamily: "var(--mono)", fontSize: 12 }}>
                        ℹ PEMUTAKHIRAN · 19:10 WIB
                      </strong>
                      <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                        Debit terpantau stabil di elevasi waspada. DO permukaan 5,1 mg/L (normal). Pemantauan lanjutan setiap 2 jam.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== COMPARISON TABLE ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Sebelum &amp; sesudah</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Sebelum AquaAlert, Anda bereaksi. Sesudahnya, Anda bersiap.
            </h2>
            <p className="lede" style={{ marginTop: 12, color: "var(--muted)" }}>
              Contoh skenario di bawah menggambarkan tambak muara. Pembudidaya kolam/keramba air tawar
              mengalami pola serupa — reaksi terlambat berubah menjadi kesiapan lebih awal — dengan
              risiko banjir dan kualitas air sebagai pemicu utamanya.
            </p>
          </div>

          <div className="table-scroll" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)" }}>
            <table className="spec-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  {["Skenario", "Sebelum AquaAlert", "Sesudah AquaAlert"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.scenario}>
                    <td data-label="Skenario" style={{ fontWeight: 600 }}>{row.scenario}</td>
                    <td data-label="Sebelum AquaAlert" style={{ color: "var(--muted)" }}>{row.before}</td>
                    <td data-label="Sesudah AquaAlert">{row.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== PRICING ====== */}
      <section id="pricing" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <div style={{ marginBottom: 36 }}>
            <span className="eyebrow">Skema harga</span>
            <h2 className="display" style={{ marginTop: 12 }}>
              Berlangganan per lokasi kolam.
            </h2>
            <p className="lede" style={{ marginTop: 12 }}>
              Tanpa biaya tersembunyi. Satu nomor WhatsApp per lokasi, dapat ditambah anggota keluarga
              atau mandor tanpa biaya ekstra.
            </p>
          </div>

          <div className="grid-3" style={{ alignItems: "stretch" }}>
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className="card"
                style={{
                  padding: "clamp(24px, 3vw, 32px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 20,
                  borderColor: tier.featured ? "var(--accent)" : "var(--border)",
                  borderWidth: tier.featured ? 2 : 1,
                  boxShadow: tier.featured ? "0 18px 40px -20px oklch(40% 0.16 80 / 0.45)" : "none",
                  position: "relative",
                  background: tier.featured ? "var(--surface)" : "var(--bg)",
                }}
              >
                <div>
                  {tier.featured && (
                    <div style={{
                      display: "inline-block",
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                      padding: "3px 10px",
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}>
                      Paling Populer
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                    <span className="eyebrow" style={{ fontSize: 11 }}>{tier.name}</span>
                    <span className="mono" style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{tier.subtitle}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 6, margin: "14px 0 10px" }}>
                    <span style={{ fontFamily: "var(--display)", fontSize: "clamp(28px, 3.2vw, 38px)", fontWeight: 800, color: "var(--fg)", lineHeight: 1 }}>
                      {tier.price}
                    </span>
                    <span style={{ fontFamily: "var(--body)", fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>
                      {tier.priceUnit}
                    </span>
                  </div>

                  <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.55, margin: "0 0 18px" }}>
                    {tier.desc}
                  </p>

                  <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                    <ul style={{
                      listStyle: "none",
                      margin: 0,
                      paddingLeft: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}>
                      {tier.features.map((f) => (
                        <li key={f} style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          fontSize: 13,
                          lineHeight: 1.45,
                          color: "var(--fg)",
                        }}>
                          <span style={{
                            color: "var(--status-normal)",
                            fontWeight: 700,
                            lineHeight: 1,
                            marginTop: 2,
                            flexShrink: 0,
                          }}>✓</span>
                          <span style={{ overflowWrap: "break-word", wordBreak: "break-word" }}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ paddingTop: 12 }}>
                  <button
                    className={`btn ${tier.featured ? "btn-primary" : "btn-ghost"}`}
                    onClick={() => {
                      if (tier.name === "Pemula") {
                        handleStartOnboarding();
                      } else if (tier.name === "Usaha") {
                        window.location.href = "mailto:aqua-alert@keairan.id?subject=Berlangganan%20AquaAlert%20-%20Paket%20Usaha";
                      } else {
                        window.location.href = "mailto:sales@keairan.id?subject=Permintaan%20Penawaran%20AquaAlert%20-%20Paket%20Korporat";
                      }
                    }}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PILOT BAND-DARK ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <BandDark
            eyebrow="Pilot testing · Fase 2"
            title="5–10 pembudidaya percontohan di DAS Citanduy."
            description={
              <>
                Kami mengundang pembudidaya di sepanjang DAS Citanduy — baik tambak udang dan bandeng di
                muara, maupun kolam dan keramba jaring apung ikan air tawar di wilayah hulu-tengah — untuk
                pilot gratis 3 bulan, termasuk instalasi dan pendampingan teknis.
              </>
            }
          >
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
              <a href="mailto:aqua-alert@keairan.id?subject=Pilot%20AquaAlert" className="btn btn-primary">
                Daftar Pilot
              </a>
              <Link href="/dashboard" className="btn btn-dark">Cek Dashboard Publik</Link>
            </div>

            <div className="grid-4" style={{
              marginTop: 40, paddingTop: 40, borderTop: "1px solid oklch(28% 0.01 250)"
            }}>
              {pilotStats.map((s) => (
                <div key={s.label} style={{
                  border: "1px solid oklch(28% 0.01 250)",
                  borderRadius: 8, padding: "18px 20px"
                }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 34, fontWeight: 700, color: "var(--bg)" }}>
                    {s.num}
                  </div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "oklch(75% 0.02 95)", marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </BandDark>
        </div>
      </section>
    </>
  );
}
