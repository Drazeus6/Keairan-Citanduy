import Link from "next/link";
import Image from "next/image";
import { BandDark } from "@/components/chrome/BandDark";

const layananList = [
  {
    nama: "Dasbor Publik",
    target: "Warga & petani di sepanjang DAS Citanduy",
    manfaat:
      "Peta status sungai (Normal/Waspada/Siaga), kalender cuaca tani harian, dan kanal lapor genangan — gratis, tanpa perlu masuk akun.",
  },
  {
    nama: "AquaAlert",
    target: "Pelaku usaha tambak udang & bandeng",
    manfaat:
      "Notifikasi WhatsApp/SMS 12–24 jam sebelum debit dan salinitas air muara berubah drastis.",
  },
  {
    nama: "Hydro-AMDAL Engine",
    target: "Konsultan teknik & kawasan industri",
    manfaat:
      "Otomasi analisis frekuensi dan neraca air dari data historis, menjadi draf laporan teknis siap pakai.",
  },
];

const misiRows = [
  {
    fokus: "Akses Terbuka",
    aksi:
      "Menyediakan informasi status sungai dan peringatan dini yang mudah dipahami siapa saja, tanpa biaya dan tanpa hambatan akses.",
  },
  {
    fokus: "Kecepatan Bertindak",
    aksi:
      "Membantu pelaku usaha akuakultur mengambil keputusan lebih cepat lewat peringatan dini yang akurat dan tepat waktu.",
  },
  {
    fokus: "Efisiensi Kerja",
    aksi:
      "Mengotomasi pekerjaan teknis yang biasanya memakan waktu berhari-hari, agar konsultan bisa fokus pada analisis, bukan pengolahan data.",
  },
  {
    fokus: "Keberlanjutan",
    aksi:
      "Menjaga layanan publik tetap gratis lewat pendapatan layanan komersial — bukan dari donasi atau anggaran yang bisa berhenti sewaktu-waktu.",
  },
  {
    fokus: "Kolaborasi",
    aksi:
      "Menjalin kerja sama terbuka dengan BBWS Citanduy dan BPBD demi validitas data dan sinergi mitigasi bencana wilayah.",
  },
];

const teamMembers = [
  {
    peran: "Pendiri & Penanggung Jawab",
    nama: "[Nama Founder]",
    fokus: "Arah strategis & hubungan kelembagaan dengan BBWS/BPBD",
  },
  {
    peran: "Pengembangan Layanan",
    nama: "[Nama/Tim]",
    fokus: "Menjalankan dan merawat ketiga layanan sehari-hari",
  },
  {
    peran: "Analisis Hidrologi",
    nama: "[Nama/Tim]",
    fokus: "Memastikan metodologi dan akurasi data yang disajikan",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-grid">
            <div>
              <span className="kicker">Tentang Kami</span>
              <h1 className="display" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                Satu data sungai, tiga cara kami membantu Anda.
              </h1>
              <p className="lede" style={{ marginTop: 20 }}>
                Kami mengolah data hidrologi terbuka BBWS Citanduy menjadi tiga layanan berbeda untuk
                tiga kebutuhan yang berbeda pula — mulai dari peringatan dini gratis untuk warga,
                hingga otomasi laporan teknis untuk korporat. Satu sumber data, tiga cara membaca
                risikonya.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                <a href="#layanan" className="btn btn-primary">
                  Lihat Layanan Kami
                </a>
                <a href="#kontak" className="btn btn-ghost">
                  Hubungi Kami
                </a>
              </div>
            </div>

            {/* Hero photo */}
            <figure className="hero-photo" style={{ position: "relative" }}>
              <Image
                src="/assets/images/sungai-citanduy-banjar.webp"
                alt="Lanskap DAS Citanduy dari hulu hingga muara — ±3.500 km², dua provinsi."
                width={1600}
                height={1200}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="pin">±3.500 KM²</span>
              <figcaption className="caption">
                Bentang alam DAS Citanduy dari perbukitan Tasikmalaya dan Ciamis hingga muara di
                Cilacap dan Pangandaran.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ====== STORY ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <span className="eyebrow">Cerita kami</span>
          <h2 className="display" style={{ marginTop: 14, fontSize: "clamp(28px, 4vw, 52px)" }}>
            Data yang sama, dibaca dengan cara berbeda.
          </h2>
        </div>
      </section>

      {/* Story body */}
      <section style={{ paddingTop: "clamp(32px, 4vw, 56px)" }}>
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "start" }}>
            <div>
              <p className="lede">
                Wilayah Sungai Citanduy membentang dari perbukitan Tasikmalaya dan Ciamis hingga
                muara di Cilacap dan Pangandaran. BBWS Citanduy sudah menyediakan data hidrologi
                ini secara terbuka selama bertahun-tahun — namun data mentah tersebut tidak berarti
                banyak tanpa seseorang yang menerjemahkannya.
              </p>
              <p className="lede" style={{ marginTop: 16 }}>
                Kami melihat tiga kelompok yang sebenarnya membutuhkan data yang sama, namun dengan
                bahasa yang berbeda: petambak udang yang kehilangan ratusan juta rupiah karena tidak
                tahu debit sungai akan naik, konsultan teknik yang menghabiskan puluhan jam mengolah
                angka secara manual, dan warga di bantaran sungai yang hanya ingin tahu kapan harus
                waspada. Dari situlah Keairan Citanduy dimulai pada September 2026 — dengan gagasan
                sederhana: satu data, tiga bahasa, satu tujuan.
              </p>
            </div>
            <blockquote className="quote" style={{ alignSelf: "center", marginTop: 0 }}>
              <p className="quote-text">
                „Kami tidak menciptakan data baru. Kami hanya membuat data yang sudah ada menjadi
                bisa dibaca oleh semua orang yang membutuhkannya."
              </p>
              <span className="quote-cite">[Nama Founder], Pendiri</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ====== VISI & MISI ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <span className="eyebrow">Visi &amp; misi</span>
          <h2 className="display" style={{ marginTop: 14, fontSize: "clamp(28px, 4vw, 52px)" }}>
            Menjaga sungai tetap bisa dibaca semua orang.
          </h2>

          <div style={{ marginTop: 40 }}>
            <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>Visi</p>
            <p className="lede">
              Menjadi kanal intelijen hidrologi tepercaya di Wilayah Sungai Citanduy —
              melindungi nyawa dan mata pencaharian masyarakat, sekaligus menjadi alat kerja
              standar bagi pelaku usaha dan konsultan teknik.
            </p>

            <p style={{ fontWeight: 700, fontSize: 15, marginTop: 28, marginBottom: 12 }}>
              Misi kami:
            </p>

            <div
              className="table-scroll"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
              }}
            >
              <table className="spec-table" style={{ margin: 0 }}>
                <thead>
                  <tr>
                    <th>Fokus</th>
                    <th>Yang Kami Lakukan</th>
                  </tr>
                </thead>
                <tbody>
                  {misiRows.map((row) => (
                    <tr key={row.fokus}>
                      <td data-label="Fokus">
                        <strong className="mono" style={{ fontSize: 13 }}>
                          {row.fokus}
                        </strong>
                      </td>
                      <td data-label="Yang Kami Lakukan" style={{ fontSize: 13 }}>{row.aksi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ====== OFFERS ====== */}
      <section id="layanan" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <span className="eyebrow">Apa yang kami tawarkan</span>
          <h2 className="display" style={{ marginTop: 14, fontSize: "clamp(28px, 4vw, 52px)" }}>
            Tiga layanan, satu sumber data.
          </h2>
          <p className="lede" style={{ marginTop: 16 }}>
            Ketiganya berjalan di atas data terbuka yang sama dari BBWS Citanduy, disajikan
            dengan cara berbeda sesuai siapa yang membacanya.
          </p>

          <div
            className="table-scroll"
            style={{
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              marginTop: 36,
            }}
          >
            <table className="spec-table" style={{ margin: 0 }}>
              <thead>
                <tr>
                  <th>Layanan</th>
                  <th>Untuk Siapa</th>
                  <th>Yang Anda Dapatkan</th>
                </tr>
              </thead>
              <tbody>
                {layananList.map((l) => (
                  <tr key={l.nama}>
                    <td data-label="Layanan">
                      <strong className="mono" style={{ fontSize: 13 }}>
                        {l.nama}
                      </strong>
                    </td>
                    <td data-label="Untuk Siapa" style={{ fontSize: 13, color: "var(--muted)" }}>{l.target}</td>
                    <td data-label="Yang Anda Dapatkan" style={{ fontSize: 13 }}>{l.manfaat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="lede" style={{ marginTop: 20, fontSize: 14, color: "var(--muted)" }}>
            Pendapatan dari AquaAlert dan Hydro-AMDAL Engine kami gunakan untuk menopang biaya
            operasional Dasbor Publik, sehingga layanan itu bisa tetap gratis untuk warga dan
            petani.
          </p>
        </div>
      </section>

      {/* ====== TEAM ====== */}
      <section style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <span className="eyebrow">Tim kami</span>
          <h2 className="display" style={{ marginTop: 14, fontSize: "clamp(28px, 4vw, 52px)" }}>
            Orang-orang di balik data.
          </h2>
          <p className="lede" style={{ marginTop: 14 }}>
            Tim kecil dengan latar belakang teknologi, analisis hidrologi, dan pemahaman
            lapangan tentang kehidupan di sepanjang DAS Citanduy.
          </p>

          <div className="grid-3" style={{ marginTop: 36 }}>
            {teamMembers.map((m) => (
              <div
                key={m.peran}
                className="card"
                style={{ padding: "clamp(20px, 2.4vw, 28px)" }}
              >
                <span className="eyebrow" style={{ color: "var(--accent)" }}>
                  {m.peran}
                </span>
                <h3 className="display" style={{ fontSize: 20, marginTop: 8, marginBottom: 8 }}>
                  {m.nama}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--muted)",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {m.fokus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CONTACT BAND-DARK ====== */}
      <section id="kontak" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="wrap">
          <BandDark
            eyebrow="Hubungi kami"
            title="Ingin tahu lebih lanjut?"
            description={
              <>
                Punya pertanyaan, ingin berlangganan AquaAlert, atau tertarik dengan
                Hydro-AMDAL Engine — kami senang mendengar dari Anda.
              </>
            }
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(12px, 2vw, 24px)",
                marginTop: 32,
              }}
            >
              {/* Email */}
              <div
                style={{
                  border: "1px solid oklch(28% 0.01 250)",
                  borderRadius: 8,
                  padding: "clamp(14px, 2vw, 22px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--accent)",
                    fontWeight: 700,
                    marginBottom: 6,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Email
                </div>
                <p
                  className="mono"
                  style={{ fontSize: 13, color: "oklch(98% 0.005 95)", margin: "4px 0" }}
                >
                  [alamat email]
                </p>
                <p style={{ color: "oklch(75% 0.015 95)", fontSize: 11, margin: 0 }}>
                  Untuk pertanyaan umum dan kerja sama
                </p>
              </div>

              {/* WhatsApp */}
              <div
                style={{
                  border: "1px solid oklch(28% 0.01 250)",
                  borderRadius: 8,
                  padding: "clamp(14px, 2vw, 22px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--accent)",
                    fontWeight: 700,
                    marginBottom: 6,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  WhatsApp
                </div>
                <p
                  className="mono"
                  style={{ fontSize: 13, color: "oklch(98% 0.005 95)", margin: "4px 0" }}
                >
                  [nomor aktif]
                </p>
                <p style={{ color: "oklch(75% 0.015 95)", fontSize: 11, margin: 0 }}>
                  Untuk respons lebih cepat
                </p>
              </div>

              {/* Pelaporan Darurat */}
              <div
                style={{
                  border: "1px solid oklch(28% 0.01 250)",
                  borderRadius: 8,
                  padding: "clamp(14px, 2vw, 22px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 10,
                    color: "var(--accent)",
                    fontWeight: 700,
                    marginBottom: 6,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Pelaporan Darurat
                </div>
                <p style={{ fontSize: 13, color: "oklch(98% 0.005 95)", margin: "4px 0" }}>
                  Gunakan Tombol Lapor Warga
                </p>
                <p style={{ color: "oklch(75% 0.015 95)", fontSize: 11, margin: 0 }}>
                  Langsung dari Peta Pantau, tanpa perlu menghubungi kami
                </p>
              </div>
            </div>
          </BandDark>
        </div>
      </section>
    </>
  );
}
