// =========================================================
// Domain Types for Keairan Citanduy
// =========================================================

export type FloodStatus = "normal" | "waspada" | "siaga";

export interface Station {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: FloodStatus;
  tma: number; // tinggi muka air (cm)
  debit: number; // m³/s
  trend: "naik" | "turun" | "stabil";
  updatedAt: string;
}

export interface ForecastDay {
  date: string; // ISO yyyy-mm-dd
  status: "ok" | "warn" | "alert" | "dim";
  rekomendasi: string;
  hujanMm: number;
  suhuMin: number;
  suhuMax: number;
  kelembapan: number;
}

export interface LaporanWarga {
  id: string;
  judul: string;
  deskripsi: string;
  kecamatan: string;
  status: "menunggu" | "divalidasi" | "ditolak";
  waktu: string;
}

export interface PelangganAqua {
  id: string;
  nama: string;
  lokasi: string;
  jumlahKolam: number;
  paket: "Dasar" | "Standar" | "Premium";
  whatsapp: string;
  tmaTerbaru: number;
  debitTerbaru: number;
}

export interface NotifikasiAqua {
  id: string;
  pelangganId: string;
  waktu: string;
  judul: string;
  pesan: string;
}

export interface AnalisisAmdal {
  id: string;
  pos: string;
  rentangTahun: string;
  gumbel: { tr2: number; tr5: number; tr10: number; tr25: number; tr50: number; tr100: number };
  logPearson: { tr2: number; tr5: number; tr10: number; tr25: number; tr50: number; tr100: number };
}
