import { http, HttpResponse } from "msw";
import type { Station, ForecastDay, LaporanWarga, PelangganAqua, NotifikasiAqua, AnalisisAmdal } from "@/types";

const stations: Station[] = [
  { id: "st-01", name: "Pos Bantarkalong", lat: -7.412, lng: 108.213, status: "siaga", tma: 412, debit: 86.4, trend: "naik", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-02", name: "Pos Cihaur", lat: -7.301, lng: 108.385, status: "waspada", tma: 287, debit: 54.1, trend: "naik", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-03", name: "Pos Cineam", lat: -7.198, lng: 108.412, status: "normal", tma: 142, debit: 21.7, trend: "stabil", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-04", name: "Pos Manonjaya", lat: -7.351, lng: 108.301, status: "siaga", tma: 391, debit: 78.2, trend: "naik", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-05", name: "Pos Tasik Selatan", lat: -7.331, lng: 108.221, status: "waspada", tma: 251, debit: 42.8, trend: "naik", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-06", name: "Pos Kawalu", lat: -7.402, lng: 108.182, status: "normal", tma: 168, debit: 28.4, trend: "stabil", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-07", name: "Pos Ciamis Hilir", lat: -7.331, lng: 108.354, status: "waspada", tma: 268, debit: 48.6, trend: "naik", updatedAt: "2026-09-05T10:15:00+07:00" },
  { id: "st-08", name: "Pos Pangandaran", lat: -7.685, lng: 108.652, status: "normal", tma: 121, debit: 18.5, trend: "turun", updatedAt: "2026-09-05T10:15:00+07:00" },
];

const kecamatanList = [
  "Cineam", "Manonjaya", "Kawalu", "Cihaur", "Bantarkalong", "Pangandaran", "Ciamis Hilir", "Tasik Selatan"
];

const forecast: ForecastDay[] = [
  { date: "2026-09-05", status: "alert", rekomendasi: "Tunda pemupukan. Risiko tinggi.", hujanMm: 84, suhuMin: 22, suhuMax: 28, kelembapan: 92 },
  { date: "2026-09-06", status: "warn", rekomendasi: "Pemupukan terbatas, hindari pagi.", hujanMm: 38, suhuMin: 23, suhuMax: 30, kelembapan: 87 },
  { date: "2026-09-07", status: "ok", rekomendasi: "Aman untuk tebar benih.", hujanMm: 8, suhuMin: 24, suhuMax: 32, kelembapan: 71 },
  { date: "2026-09-08", status: "ok", rekomendasi: "Aman untuk pemupukan.", hujanMm: 4, suhuMin: 24, suhuMax: 33, kelembapan: 65 },
  { date: "2026-09-09", status: "ok", rekomendasi: "Cocok untuk penjemuran.", hujanMm: 0, suhuMin: 25, suhuMax: 34, kelembapan: 60 },
  { date: "2026-09-10", status: "warn", rekomendasi: "Waspada hama jamur.", hujanMm: 22, suhuMin: 24, suhuMax: 31, kelembapan: 88 },
  { date: "2026-09-11", status: "dim", rekomendasi: "Hari libur, tidak ada aktivitas.", hujanMm: 0, suhuMin: 24, suhuMax: 33, kelembapan: 70 },
];

const reports: LaporanWarga[] = [
  { id: "lr-001", judul: "Genangan 50 cm di Jembatan Manonjaya", deskripsi: "Sungai meluap sejak subuh, akses jembatan terputus.", kecamatan: "Manonjaya", status: "divalidasi", waktu: "2026-09-05T07:42:00+07:00" },
  { id: "lr-002", judul: "Tanggul retak di Cihaur", deskripsi: "Retakan ± 1 meter, perlu pengecekan BPBD.", kecamatan: "Cihaur", status: "menunggu", waktu: "2026-09-05T08:15:00+07:00" },
  { id: "lr-003", judul: "Banjir rob Pangandaran", deskripsi: "Air rob masuk ke tambak udang.", kecamatan: "Pangandaran", status: "divalidasi", waktu: "2026-09-05T09:05:00+07:00" },
];

const pelangganAqua: PelangganAqua[] = [
  { id: "pl-001", nama: "Tambak Pak Hasan", lokasi: "Muara Cilacap", jumlahKolam: 4, paket: "Standar", whatsapp: "+62 812-3456-7890", tmaTerbaru: 287, debitTerbaru: 54.1 },
  { id: "pl-002", nama: "Tambak UD Sari Laut", lokasi: "Pangandaran", jumlahKolam: 8, paket: "Premium", whatsapp: "+62 813-1234-5678", tmaTerbaru: 168, debitTerbaru: 28.4 },
];

const notifikasiAqua: NotifikasiAqua[] = [
  { id: "nt-001", pelangganId: "pl-001", waktu: "2026-09-05T05:30:00+07:00", judul: "Peringatan Salinitas Turun", pesan: "Salinitas diprediksi turun ke 4 ppt dalam 18 jam. Naikkan pintu air." },
  { id: "nt-002", pelangganId: "pl-001", waktu: "2026-09-04T18:00:00+07:00", judul: "Info Debit Harian", pesan: "Debit 86,4 m³/s. Status Waspada di pos Bantarkalong." },
];

export const handlers = [
  http.get("/api/sih3/stations", () => HttpResponse.json(stations)),
  http.get("/api/tani/forecast", ({ request }) => {
    const url = new URL(request.url);
    const kecamatan = url.searchParams.get("kecamatan") ?? "Manonjaya";
    return HttpResponse.json({ kecamatan, days: forecast });
  }),
  http.get("/api/tani/kecamatan", () => HttpResponse.json(kecamatanList)),
  http.get("/api/reports", () => HttpResponse.json(reports)),
  http.post("/api/reports", async ({ request }) => {
    const body = await request.json() as Partial<LaporanWarga>;
    const newReport: LaporanWarga = {
      id: `lr-${String(reports.length + 1).padStart(3, "0")}`,
      judul: body.judul ?? "Laporan tanpa judul",
      deskripsi: body.deskripsi ?? "",
      kecamatan: body.kecamatan ?? "Tidak diketahui",
      status: "menunggu",
      waktu: new Date().toISOString(),
    };
    reports.unshift(newReport);
    return HttpResponse.json(newReport, { status: 201 });
  }),
  http.get("/api/aquaalert/customers", () => HttpResponse.json(pelangganAqua)),
  http.get("/api/aquaalert/notifications", () => HttpResponse.json(notifikasiAqua)),
  http.post("/api/amdal/analyze", async ({ request }) => {
    const body = await request.json() as { pos: string; rentang: string };
    const result: AnalisisAmdal = {
      id: `amdal-${Date.now()}`,
      pos: body.pos,
      rentangTahun: body.rentang,
      gumbel: { tr2: 78, tr5: 112, tr10: 145, tr25: 195, tr50: 234, tr100: 281 },
      logPearson: { tr2: 82, tr5: 118, tr10: 152, tr25: 203, tr50: 245, tr100: 295 },
    };
    return HttpResponse.json(result);
  }),
];
