"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { formatTma, formatDebit, formatCoord } from "@/lib/format";
import type { Station } from "@/types";

const MapboxMap = dynamic(
  () => import("@/components/dashboard/MapboxMap").then((mod) => mod.MapboxMap),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: 440,
        background: "var(--paper-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "var(--radius)",
        color: "var(--bg)",
        fontFamily: "var(--mono)",
        fontSize: 13,
        flexDirection: "column",
        gap: 12,
      }}>
        <span>Memuat Peta Satelit Citanduy...</span>
        <span style={{ fontSize: 11, color: "oklch(75% 0.02 95)", textAlign: "center", maxWidth: 300 }}>
          Data real-time akan aktif setelah integrasi dengan BBWS Citanduy.
        </span>
      </div>
    ),
  }
);

interface StationDetailData extends Station {
  subDas: string;
  kabupaten: string;
  ambangWaspada: number;
  ambangSiaga: number;
  history: { time: string; tma: number }[];
}

const defaultStations: StationDetailData[] = [
  {
    id: "st-01",
    name: "Pos Bantarkalong",
    lat: -7.412,
    lng: 108.213,
    status: "siaga",
    tma: 412,
    debit: 86.4,
    trend: "naik",
    updatedAt: "14:22 WIB",
    subDas: "Citanduy Hulu",
    kabupaten: "Kab. Tasikmalaya",
    ambangWaspada: 250,
    ambangSiaga: 350,
    history: [
      { time: "08:00", tma: 290 },
      { time: "10:00", tma: 320 },
      { time: "12:00", tma: 380 },
      { time: "14:00", tma: 412 },
    ],
  },
  {
    id: "st-02",
    name: "Pos Cihaur",
    lat: -7.301,
    lng: 108.385,
    status: "waspada",
    tma: 287,
    debit: 54.1,
    trend: "naik",
    updatedAt: "14:20 WIB",
    subDas: "Cimuntur",
    kabupaten: "Kab. Ciamis",
    ambangWaspada: 240,
    ambangSiaga: 320,
    history: [
      { time: "08:00", tma: 210 },
      { time: "10:00", tma: 245 },
      { time: "12:00", tma: 270 },
      { time: "14:00", tma: 287 },
    ],
  },
  {
    id: "st-03",
    name: "Pos Cineam",
    lat: -7.198,
    lng: 108.412,
    status: "normal",
    tma: 142,
    debit: 21.7,
    trend: "stabil",
    updatedAt: "14:15 WIB",
    subDas: "Ciseel",
    kabupaten: "Kab. Tasikmalaya",
    ambangWaspada: 200,
    ambangSiaga: 300,
    history: [
      { time: "08:00", tma: 135 },
      { time: "10:00", tma: 140 },
      { time: "12:00", tma: 142 },
      { time: "14:00", tma: 142 },
    ],
  },
  {
    id: "st-04",
    name: "Pos Banjar Pataruman",
    lat: -7.351,
    lng: 108.541,
    status: "siaga",
    tma: 312,
    debit: 78.2,
    trend: "naik",
    updatedAt: "14:22 WIB",
    subDas: "Citanduy Tengah",
    kabupaten: "Kota Banjar",
    ambangWaspada: 220,
    ambangSiaga: 290,
    history: [
      { time: "08:00", tma: 240 },
      { time: "10:00", tma: 275 },
      { time: "12:00", tma: 300 },
      { time: "14:00", tma: 312 },
    ],
  },
  {
    id: "st-05",
    name: "Pos Ciamis Hilir",
    lat: -7.331,
    lng: 108.354,
    status: "waspada",
    tma: 268,
    debit: 48.6,
    trend: "naik",
    updatedAt: "14:18 WIB",
    subDas: "Citanduy Tengah",
    kabupaten: "Kab. Ciamis",
    ambangWaspada: 230,
    ambangSiaga: 310,
    history: [
      { time: "08:00", tma: 205 },
      { time: "10:00", tma: 230 },
      { time: "12:00", tma: 255 },
      { time: "14:00", tma: 268 },
    ],
  },
  {
    id: "st-06",
    name: "Pos Kawalu",
    lat: -7.402,
    lng: 108.182,
    status: "normal",
    tma: 168,
    debit: 28.4,
    trend: "stabil",
    updatedAt: "14:10 WIB",
    subDas: "Citanduy Hulu",
    kabupaten: "Kota Tasikmalaya",
    ambangWaspada: 220,
    ambangSiaga: 300,
    history: [
      { time: "08:00", tma: 160 },
      { time: "10:00", tma: 165 },
      { time: "12:00", tma: 168 },
      { time: "14:00", tma: 168 },
    ],
  },
  {
    id: "st-07",
    name: "Pos Kalipucang",
    lat: -7.612,
    lng: 108.681,
    status: "waspada",
    tma: 245,
    debit: 45.2,
    trend: "naik",
    updatedAt: "14:15 WIB",
    subDas: "Citanduy Hilir",
    kabupaten: "Kab. Pangandaran",
    ambangWaspada: 200,
    ambangSiaga: 280,
    history: [
      { time: "08:00", tma: 190 },
      { time: "10:00", tma: 215 },
      { time: "12:00", tma: 235 },
      { time: "14:00", tma: 245 },
    ],
  },
  {
    id: "st-08",
    name: "Pos Muara Cilacap",
    lat: -7.685,
    lng: 108.752,
    status: "normal",
    tma: 121,
    debit: 18.5,
    trend: "turun",
    updatedAt: "14:05 WIB",
    subDas: "Muara Segara Anakan",
    kabupaten: "Kab. Cilacap",
    ambangWaspada: 180,
    ambangSiaga: 250,
    history: [
      { time: "08:00", tma: 140 },
      { time: "10:00", tma: 132 },
      { time: "12:00", tma: 125 },
      { time: "14:00", tma: 121 },
    ],
  },
];

const kecamatanOptions = [
  "Manonjaya (Tasikmalaya)",
  "Bantarkalong (Tasikmalaya)",
  "Kawalu (Kota Tasikmalaya)",
  "Ciamis Kota (Ciamis)",
  "Cihaurbeuti (Ciamis)",
  "Pataruman (Banjar)",
  "Kalipucang (Pangandaran)",
  "Kampung Laut (Cilacap)",
];

function DashboardContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "peta";

  const [activeTab, setActiveTab] = useState<"peta" | "tani" | "lapor">(
    initialTab === "tani" ? "tani" : initialTab === "lapor" ? "lapor" : "peta"
  );
  const [selectedStation, setSelectedStation] = useState<StationDetailData>(defaultStations[3]); // Banjar default
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [lowDataMode, setLowDataMode] = useState(false);

  // Tab Kalender state
  const [selectedKecamatan, setSelectedKecamatan] = useState<string>("Pataruman (Banjar)");
  const [cropType, setCropType] = useState("Padi Sawah");

  // Tab Lapor state
  const [reportType, setReportType] = useState("Genangan permukiman");
  const [urgency, setUrgency] = useState("Sedang — perlu tindak lanjut");
  const [reportDesc, setReportDesc] = useState("");
  const [reportFile, setReportFile] = useState<string | null>(null);
  const [reportFileSize, setReportFileSize] = useState<string | null>(null);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportsList, setReportsList] = useState([
    { id: "4821", type: "Genangan", loc: "Kel. Sukaraja, Ciamis", desc: "Genangan setinggi 40 cm menggenangi jalan kampung.", time: "14:02 WIB", status: "gen" },
    { id: "4830", type: "Tanggul", loc: "Desa Pataruman, Banjar", desc: "Retakan sepanjang 8 meter di tanggul sungai.", time: "12:18 WIB", status: "tanggul" },
    { id: "4842", type: "Kualitas", loc: "Pantai Pangandaran", desc: "Warna air berubah kecoklatan, berbau lumpur.", time: "09:44 WIB", status: "qual" },
    { id: "4855", type: "Genangan", loc: "Kel. Donan, Cilacap", desc: "Limpasan rob menutup akses jalan pelabuhan.", time: "07:11 WIB", status: "gen" },
  ]);

  // Handle local storage for user preferensi kecamatan
  useEffect(() => {
    const savedKecamatan = localStorage.getItem("keairan_kecamatan");
    if (savedKecamatan) {
      setSelectedKecamatan(savedKecamatan);
    }
  }, []);

  const handleKecamatanChange = (kec: string) => {
    setSelectedKecamatan(kec);
    localStorage.setItem("keairan_kecamatan", kec);
  };

  // Filter stations
  const filteredStations = defaultStations.filter((st) => {
    if (filterStatus === "all") return true;
    return st.status === filterStatus;
  });

  // Handle file select + client-side compression mockup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const origSize = (file.size / 1024).toFixed(0);
      setReportFile(file.name);
      // Simulate client side compression target <= 500KB
      const compSize = Math.min(Number(origSize), 340);
      setReportFileSize(`${compSize} KB (dikompresi dari ${origSize} KB)`);
    }
  };

  // Submit report
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportDesc.trim()) return;

    const newReport = {
      id: String(Math.floor(4800 + Math.random() * 100)),
      type: reportType.split(" ")[0],
      loc: selectedKecamatan,
      desc: reportDesc,
      time: "Baru saja",
      status: reportType.includes("Genangan") ? "gen" : "tanggul",
    };

    setReportsList([newReport, ...reportsList]);
    setReportDesc("");
    setReportFile(null);
    setReportFileSize(null);
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 4000);
  };

  return (
    <div style={{ paddingBottom: 64 }}>
      {/* ====== HEADER STRIP ====== */}
      <section style={{ padding: "40px 0 20px" }}>
        <div className="wrap">
          <p className="eyebrow">Layanan publik · bebas biaya</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginTop: 12 }}>
            <div>
              <h1 className="display" style={{ fontSize: "clamp(34px, 4.8vw, 64px)" }}>
                Dashboard Citanduy. Tiga modul, satu layar.
              </h1>
            </div>
            <div style={{ maxWidth: 420 }}>
              <p className="lede" style={{ margin: 0, fontSize: 15 }}>
                Pantau banjir DAS Citanduy, jadwalkan kerja tani, dan laporkan genangan dari ponsel Anda—tanpa registrasi.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--muted)", marginTop: 10 }}>
                <span>Aman</span>
                <div style={{ flex: 1, height: 6, borderRadius: 999, background: "linear-gradient(to right, var(--status-normal), var(--status-waspada), var(--status-siaga))" }} />
                <span>Siaga</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== LIVE TICKER ====== */}
      <section style={{ padding: "0 0 20px" }}>
        <div className="wrap">
          <div className="ticker">
            <span className="ticker-badge" style={{ background: "var(--status-siaga)" }}>
              <span className="ticker-blink" /> SIAGA
            </span>
            <div style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", fontSize: 13 }}>
              <span>Pos Banjar Pataruman · TMA 312 cm · ↑12 cm/jam</span>
              <span style={{ margin: "0 10px", opacity: 0.4 }}>|</span>
              <span>Estimasi tiba Pangandaran: 06–08 jam</span>
              <span style={{ margin: "0 10px", opacity: 0.4 }}>|</span>
              <span>Curah hujan hulu Ciamis 84 mm/24 jam</span>
              <span style={{ margin: "0 10px", opacity: 0.4 }}>|</span>
              <span>Update terakhir 14:22 WIB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== TABS NAVIGATION ====== */}
      <section style={{ paddingTop: 12 }}>
        <div className="wrap">
          <div className="tabs-nav" role="tablist">
            <button
              className={`tab-btn ${activeTab === "peta" ? "active" : ""}`}
              onClick={() => setActiveTab("peta")}
              role="tab"
              aria-selected={activeTab === "peta"}
            >
              <span className="mono" style={{ marginRight: 8, fontSize: 12, opacity: 0.6 }}>01</span>
              Peta Pantau Banjir
            </button>
            <button
              className={`tab-btn ${activeTab === "tani" ? "active" : ""}`}
              onClick={() => setActiveTab("tani")}
              role="tab"
              aria-selected={activeTab === "tani"}
            >
              <span className="mono" style={{ marginRight: 8, fontSize: 12, opacity: 0.6 }}>02</span>
              Kalender Cuaca Tani
            </button>
            <button
              className={`tab-btn ${activeTab === "lapor" ? "active" : ""}`}
              onClick={() => setActiveTab("lapor")}
              role="tab"
              aria-selected={activeTab === "lapor"}
            >
              <span className="mono" style={{ marginRight: 8, fontSize: 12, opacity: 0.6 }}>03</span>
              Kanal Pelaporan Warga
            </button>
          </div>

          {/* =========================================================
              TAB 1: PETA PANTAU BANJIR
              ========================================================= */}
          {activeTab === "peta" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                <div>
                  <h2 className="display" style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}>27 pos duga, satu sungai.</h2>
                  <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
                    Klik pos di peta atau di kartu bawah untuk melihat TMA, debit, dan estimasi waktu penjalaran air.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button
                    className={`btn ${lowDataMode ? "btn-dark" : "btn-ghost"}`}
                    onClick={() => setLowDataMode(!lowDataMode)}
                    style={{ fontSize: 12, padding: "6px 14px" }}
                  >
                    {lowDataMode ? "Mode Grafis Peta" : "Mode Hemat Data"}
                  </button>
                  <select
                    className="mono"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    style={{
                      padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border)",
                      background: "var(--bg)", fontSize: 12, outline: "none"
                    }}
                  >
                    <option value="all">Semua Status</option>
                    <option value="siaga">Siaga (Merah)</option>
                    <option value="waspada">Waspada (Kuning)</option>
                    <option value="normal">Normal (Hijau)</option>
                  </select>
                </div>
              </div>

              {/* Map Canvas / Low Data Mode */}
              {!lowDataMode ? (
                <div style={{ position: "relative" }}>
                  <MapboxMap
                    selectedStationId={selectedStation.id}
                    onStationSelect={(props) => {
                      const found = defaultStations.find((s) => s.id === props.id);
                      if (found) setSelectedStation(found);
                    }}
                  />

                  {/* Toast Float */}
                  <div style={{
                    position: "absolute", right: 16, bottom: 16,
                    background: "var(--status-siaga)", color: "white",
                    padding: "10px 14px", borderRadius: 8, fontSize: 12,
                    fontFamily: "var(--mono)", display: "flex", gap: 8, alignItems: "center",
                    boxShadow: "0 8px 24px -10px oklch(40% 0.2 25 / 0.6)",
                    pointerEvents: "none",
                  }}>
                    <span className="ticker-blink" /> Pos Banjar · Siaga · TMA 312 cm
                  </div>
                </div>
              ) : (
                /* Low data table mode */
                <div className="table-scroll" style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, background: "var(--surface)" }}>
                  <p className="mono" style={{ fontSize: 12, color: "var(--muted)", margin: "0 0 12px" }}>
                    MODE HEMAT DATA (Teks Saja) — Mengurangi pemakaian kuota internet hingga 90%
                  </p>
                  <table className="spec-table" style={{ margin: 0 }}>
                    <thead>
                      <tr>
                        <th>Pos Pantau</th>
                        <th>Status</th>
                        <th>TMA (cm)</th>
                        <th>Debit (m³/s)</th>
                        <th>Kecamatan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStations.map((st) => (
                        <tr key={st.id} onClick={() => setSelectedStation(st)} style={{ cursor: "pointer" }}>
                          <td data-label="Pos Pantau"><strong>{st.name}</strong></td>
                          <td data-label="Status">
                            <span className={`badge badge-${st.status}`}>{st.status}</span>
                          </td>
                          <td data-label="TMA (cm)" className="mono">{st.tma} cm</td>
                          <td data-label="Debit (m³/s)" className="mono">{st.debit} m³/s</td>
                          <td data-label="Kecamatan">{st.kabupaten}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Station Detail Box */}
              <div className="card surface" style={{
                marginTop: 28,
                padding: "clamp(16px, 2.5vw, 28px)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                    <span className={`badge badge-${selectedStation.status}`}>
                      {selectedStation.status}
                    </span>
                    <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                      {formatCoord(selectedStation.lat, selectedStation.lng)}
                    </span>
                  </div>
                  <h3 className="display" style={{ fontSize: "clamp(20px, 2.5vw, 26px)", marginBottom: 4 }}>
                    {selectedStation.name}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                    Sub-DAS: {selectedStation.subDas} · {selectedStation.kabupaten} · {selectedStation.updatedAt}
                  </p>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(85px, 1fr))",
                    gap: 12,
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                  }}>
                    <div>
                      <div className="eyebrow" style={{ fontSize: 9 }}>TMA Terkini</div>
                      <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--fg)", marginTop: 2 }}>
                        {formatTma(selectedStation.tma)}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
                        {selectedStation.trend === "naik" ? "↑ Naik" : "→ Stabil"}
                      </div>
                    </div>
                    <div>
                      <div className="eyebrow" style={{ fontSize: 9 }}>Debit Aliran</div>
                      <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--fg)", marginTop: 2 }}>
                        {formatDebit(selectedStation.debit)}
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>Volumetrik</div>
                    </div>
                    <div>
                      <div className="eyebrow" style={{ fontSize: 9 }}>Ambang Siaga</div>
                      <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--status-siaga)", marginTop: 2 }}>
                        {selectedStation.ambangSiaga} cm
                      </div>
                      <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>Waspada {selectedStation.ambangWaspada}cm</div>
                    </div>
                  </div>
                </div>

                {/* Mini Sparkline Chart */}
                <div>
                  <div className="eyebrow" style={{ marginBottom: 8, fontSize: 10 }}>Tren TMA 6 Jam Terakhir</div>
                  <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 8, padding: 12 }}>
                    <svg viewBox="0 0 300 120" style={{ width: "100%", height: 90 }}>
                      <defs>
                        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="var(--status-siaga)" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="var(--status-siaga)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid lines */}
                      <line x1="0" y1="30" x2="300" y2="30" stroke="var(--border)" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="300" y2="70" stroke="var(--border)" strokeDasharray="3 3" />
                      {/* Sparkline area */}
                      <path
                        d="M20,90 Q90,75 160,50 T280,25 L280,110 L20,110 Z"
                        fill="url(#chartFill)"
                      />
                      {/* Sparkline curve */}
                      <path
                        d="M20,90 Q90,75 160,50 T280,25"
                        fill="none"
                        stroke="var(--status-siaga)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      {/* Data dots */}
                      {selectedStation.history.map((h, idx) => {
                        const cx = 20 + idx * 86;
                        const cy = 110 - (h.tma / selectedStation.ambangSiaga) * 80;
                        return (
                          <g key={h.time}>
                            <circle cx={cx} cy={cy} r="4" fill="var(--status-siaga)" stroke="#fff" strokeWidth="2" />
                            <text x={cx} y={115} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted)">
                              {h.time}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--muted)", fontFamily: "var(--mono)" }}>
                      <span>08:00</span>
                      <span>10:00</span>
                      <span>12:00</span>
                      <span>14:00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Station Cards Grid */}
              <div style={{ marginTop: 36 }}>
                <div className="eyebrow" style={{ marginBottom: 14 }}>Daftar Lengkap Pos Duga Air</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
                  {filteredStations.map((st) => (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStation(st)}
                      className="card"
                      style={{
                        cursor: "pointer",
                        borderColor: selectedStation.id === st.id ? "var(--accent)" : "var(--border)",
                        boxShadow: selectedStation.id === st.id ? "0 0 0 2px var(--accent)" : "none",
                        padding: 16,
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--fg)" }}>{st.name}</span>
                        <span className={`badge badge-${st.status}`}>{st.status}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", fontFamily: "var(--mono)" }}>
                        <span>TMA: <strong style={{ color: "var(--fg)" }}>{st.tma} cm</strong></span>
                        <span>Debit: <strong style={{ color: "var(--fg)" }}>{st.debit} m³/s</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 2: KALENDER CUACA TANI
              ========================================================= */}
          {activeTab === "tani" && (
            <div>
              <div className="grid-2" style={{ alignItems: "start" }}>
                <div>
                  <span className="eyebrow">Kalender tani mingguan</span>
                  <h2 className="display" style={{ marginTop: 12, fontSize: "clamp(26px, 3vw, 40px)" }}>
                    Bahasa teknis,<br />diterjemahkan untuk<br />padi Anda.
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>
                    Aturan inferensi berbasis ambang batas kelembapan, presipitasi, dan temperatur
                    menerjemahkan parameter hidrologi menjadi saran praktis: waktu aman pemupukan,
                    penjemuran gabah, dan persiapan tebar benih.
                  </p>

                  <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {["Padi Sawah", "Palawija", "Tambak", "Sayuran"].map((c) => (
                      <button
                        key={c}
                        className={`btn ${cropType === c ? "btn-primary" : "btn-ghost"}`}
                        onClick={() => setCropType(c)}
                        style={{ padding: "6px 16px", fontSize: 13 }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  <blockquote className="quote" style={{ marginTop: 28 }}>
                    <p className="quote-text" style={{ fontSize: 18 }}>
                      „Kelembapan 87% + temperatur 28–31°C selama 4 hari berturut = kondisi ideal untuk ledakan wereng.”
                    </p>
                    <span className="quote-cite">Aturan inferensi · Keairan Citanduy</span>
                  </blockquote>
                </div>

                {/* Calendar Widget */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                    <div>
                      <h3 className="display" style={{ fontSize: 20 }}>Minggu ke-3 September 2026</h3>
                      <p className="mono" style={{ fontSize: 11, color: "var(--muted)", margin: "2px 0 0" }}>
                        Kecamatan: {selectedKecamatan}
                      </p>
                    </div>
                    <select
                      className="mono"
                      value={selectedKecamatan}
                      onChange={(e) => handleKecamatanChange(e.target.value)}
                      style={{
                        padding: "8px 12px", borderRadius: 6, border: "1px solid var(--border)",
                        background: "var(--surface)", fontSize: 12, outline: "none"
                      }}
                    >
                      {kecamatanOptions.map((k) => (
                        <option key={k} value={k}>{k}</option>
                      ))}
                    </select>
                  </div>

                  {/* 7 Days Grid */}
                  <div className="cal-grid">
                    {[
                      { day: "Sen", date: "15", status: "dim", tag: "—", label: "Histori" },
                      { day: "Sel", date: "16", status: "dim", tag: "—", label: "Histori" },
                      { day: "Rab", date: "17", status: "ok", tag: "OK", label: "Aman pupuk" },
                      { day: "Kam", date: "18", status: "ok", tag: "OK", label: "Tebar benih" },
                      { day: "Jum", date: "19", status: "ok", tag: "OK", label: "Jemur gabah" },
                      { day: "Sab", date: "20", status: "warn", tag: "WASPADA", label: "Hujan sore" },
                      { day: "Min", date: "21", status: "warn", tag: "WASPADA", label: "Tunda pupuk" },
                    ].map((d) => (
                      <div key={d.date} className={`cal-cell ${d.status}`}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="mono" style={{ fontWeight: 700, fontSize: 13 }}>{d.date}</span>
                          <span className="eyebrow" style={{ fontSize: 9 }}>{d.day}</span>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <span style={{
                            display: "inline-block", fontSize: 9, fontFamily: "var(--mono)",
                            padding: "2px 5px", borderRadius: 3, fontWeight: 700,
                            background: d.status === "ok" ? "var(--status-normal)" : d.status === "warn" ? "var(--status-waspada)" : "var(--border)",
                            color: d.status === "warn" ? "#000" : "#fff",
                          }}>
                            {d.tag}
                          </span>
                          <div style={{ fontSize: 11, marginTop: 4, color: "var(--fg)", lineHeight: 1.2 }}>{d.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Rule Boxes */}
                  <div className="grid-3" style={{ gap: 12, marginTop: 24 }}>
                    <div className="card surface" style={{ padding: 14 }}>
                      <span className="eyebrow" style={{ fontSize: 9 }}>Aturan 01</span>
                      <strong style={{ display: "block", fontSize: 13, margin: "4px 0" }}>Pemupukan</strong>
                      <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>
                        Tunda jika curah hujan &gt; 20 mm/hari atau kelembapan &gt; 85%.
                      </p>
                    </div>
                    <div className="card surface" style={{ padding: 14 }}>
                      <span className="eyebrow" style={{ fontSize: 9 }}>Aturan 02</span>
                      <strong style={{ display: "block", fontSize: 13, margin: "4px 0" }}>Penjemuran</strong>
                      <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>
                        Ideal saat radiasi &gt; 60% dan tidak ada potensi hujan 24 jam ke depan.
                      </p>
                    </div>
                    <div className="card surface" style={{ padding: 14 }}>
                      <span className="eyebrow" style={{ fontSize: 9 }}>Aturan 03</span>
                      <strong style={{ display: "block", fontSize: 13, margin: "4px 0" }}>Risiko Wereng</strong>
                      <p style={{ fontSize: 11, color: "var(--muted)", margin: 0, lineHeight: 1.4 }}>
                        Waspada bila RH &gt; 85% &amp; suhu 26–32°C selama ≥4 hari beruntun.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB 3: KANAL PELAPORAN WARGA
              ========================================================= */}
          {activeTab === "lapor" && (
            <div>
              <div className="grid-2" style={{ alignItems: "start" }}>
                {/* Form Col */}
                <div>
                  <span className="eyebrow">Citizen science · tanpa login</span>
                  <h2 className="display" style={{ marginTop: 12, fontSize: "clamp(26px, 3vw, 40px)" }}>
                    Ponsel Anda adalah<br />pos duga air.
                  </h2>
                  <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6, marginTop: 12 }}>
                    Laporkan genangan, kerusakan tanggul, atau perubahan warna air langsung dari lapangan.
                    Lokasi otomatis dari GPS, foto otomatis dikompresi, identitas Anda tidak ditampilkan publik.
                  </p>

                  <div className="card" style={{ marginTop: 24 }}>
                    {reportSuccess && (
                      <div style={{
                        background: "color-mix(in srgb, var(--status-normal) 15%, transparent)",
                        border: "1px solid var(--status-normal)", color: "var(--status-normal)",
                        padding: "12px 16px", borderRadius: 6, marginBottom: 16, fontSize: 13,
                        display: "flex", gap: 8, alignItems: "center"
                      }}>
                        ✓ Laporan berhasil dikirim! Menunggu validasi moderator (≤ 15 menit).
                      </div>
                    )}

                    <form onSubmit={handleSubmitReport}>
                      <div className="grid-2" style={{ gap: 14 }}>
                        <div className="field">
                          <label>Jenis Laporan</label>
                          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                            <option>Genangan permukiman</option>
                            <option>Kerusakan tanggul sungai</option>
                            <option>Perubahan warna air</option>
                            <option>Banjir kiriman hulu</option>
                            <option>Sampah / pendangkalan</option>
                          </select>
                        </div>
                        <div className="field">
                          <label>Tingkat Urgensi</label>
                          <select value={urgency} onChange={(e) => setUrgency(e.target.value)}>
                            <option>Rendah — informasi</option>
                            <option>Sedang — perlu tindak lanjut</option>
                            <option>Tinggi — bahaya aktif</option>
                          </select>
                        </div>
                      </div>

                      <div className="field">
                        <label>Lokasi (GPS Otomatis)</label>
                        <input type="text" value="-7.351° LS · 108.541° BT (Kec. Pataruman, Banjar)" readOnly className="mono" />
                      </div>

                      <div className="field">
                        <label>Deskripsi Singkat</label>
                        <textarea
                          placeholder="Apa yang Anda amati di lokasi? (misal: genangan 40cm memutus jalan kampung)"
                          value={reportDesc}
                          onChange={(e) => setReportDesc(e.target.value)}
                          required
                        />
                      </div>

                      <div className="field">
                        <label>Foto Bukti (Kamera/Galeri)</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {reportFileSize && (
                          <div className="mono" style={{ fontSize: 11, color: "var(--status-normal)", marginTop: 4 }}>
                            ✓ Kompresi selesai: {reportFileSize}
                          </div>
                        )}
                      </div>

                      <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
                        Kirim Laporan Warga →
                      </button>
                      <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", margin: "10px 0 0" }}>
                        Format cepat 3 langkah ≤ 60 detik. Privasi terlindungi sesuai PRD FR-LAPOR-01.
                      </p>
                    </form>
                  </div>
                </div>

                {/* Feed Col */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <span className="eyebrow">Laporan tervalidasi</span>
                      <h3 className="display" style={{ fontSize: 20 }}>24 Jam Terakhir</h3>
                    </div>
                    <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>
                      {reportsList.length} Laporan aktif
                    </span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {reportsList.map((rep) => (
                      <article key={rep.id} className="card" style={{ padding: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                            <span style={{
                              fontFamily: "var(--mono)", fontSize: 10, fontWeight: 700,
                              padding: "2px 6px", borderRadius: 4, textTransform: "uppercase",
                              background: rep.status === "gen" ? "color-mix(in srgb, var(--status-siaga) 15%, transparent)" : "color-mix(in srgb, var(--status-waspada) 20%, transparent)",
                              color: rep.status === "gen" ? "var(--status-siaga)" : "oklch(50% 0.16 80)",
                            }}>
                              #{rep.id} · {rep.type}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--fg)" }}>{rep.loc}</span>
                          </div>
                          <span className="mono" style={{ fontSize: 11, color: "var(--muted)" }}>{rep.time}</span>
                        </div>
                        <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>
                          {rep.desc}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div style={{ padding: "80px 0", textAlign: "center" }}>
      <span className="mono" style={{ color: "var(--muted)", fontSize: 13 }}>Memuat dashboard...</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  );
}
