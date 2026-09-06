import Link from "next/link";

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="col-foot">
          <div>
            <div className="brand" style={{ color: "var(--bg)", marginBottom: 14 }}>
              <span className="brand-mark">K</span>
              <span style={{ color: "var(--bg)" }}>
                KEAIRAN CITANDUY
                <small style={{ color: "oklch(75% 0.015 95)" }}>Platform Intelijen Hidrologi Terpadu WS Citanduy</small>
              </span>
            </div>
            <p style={{ color: "oklch(75% 0.015 95)", fontSize: 13, maxWidth: 360, marginTop: 12 }}>
              Mengolah data terbuka SIH3 BBWS Citanduy menjadi mitigasi bencana, jadwal tani mikro, dan analitik korporat.
            </p>
          </div>

          <div>
            <h5>Layanan Publik</h5>
            <ul>
              <li><Link href="/dashboard">Peta Pantau Banjir</Link></li>
              <li><Link href="/dashboard?tab=tani">Kalender Cuaca Tani</Link></li>
              <li><Link href="/dashboard?tab=lapor">Pelaporan Warga</Link></li>
              <li><Link href="/about">Tentang Kami</Link></li>
            </ul>
          </div>

          <div>
            <h5>Layanan Komersial</h5>
            <ul>
              <li><Link href="/aqua-alert">AquaAlert Tambak</Link></li>
              <li><Link href="/hydro-amdal">Hydro-AMDAL Engine</Link></li>
              <li><Link href="/aqua-alert#pricing">Paket & Harga</Link></li>
              <li><Link href="/hydro-amdal#api">Integrasi Korporat</Link></li>
            </ul>
          </div>

          <div>
            <h5>Atribusi & Kontak</h5>
            <ul>
              <li><span style={{ color: "oklch(75% 0.015 95)", fontSize: 13 }}>Sumber: BBWS Citanduy / SIH3</span></li>
              <li><span style={{ color: "oklch(75% 0.015 95)", fontSize: 13 }}>Wilayah: Jabar – Jateng (±3.500 km²)</span></li>
              <li><span style={{ color: "oklch(75% 0.015 95)", fontSize: 13 }}>Kedaruratan: Hubungi BPBD Terkait</span></li>
            </ul>
          </div>
        </div>

        <div className="foot-bottom">
          <div>© 2026 Platform Intelijen Hidrologi WS Citanduy. Model Subsidi Silang Civic-Tech.</div>
          <div>Format Numerik: Standar Indonesia (titik ribuan, koma desimal)</div>
        </div>
      </div>
    </footer>
  );
}
