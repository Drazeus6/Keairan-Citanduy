// =========================================================
// GeoJSON Spatial Data for DAS Citanduy (±3.500 km²)
// Wilayah Sungai Citanduy (Jawa Barat – Jawa Tengah)
// =========================================================

import type { FloodStatus } from "@/types";

export interface StationFeatureProperties {
  id: string;
  name: string;
  subDas: string;
  kabupaten: string;
  status: FloodStatus;
  tma: number; // cm
  debit: number; // m³/s
  trend: "naik" | "turun" | "stabil";
  ambangWaspada: number;
  ambangSiaga: number;
  updatedAt: string;
}

export const stationsGeoJSON: GeoJSON.FeatureCollection<GeoJSON.Point, StationFeatureProperties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.213, -7.412],
      },
      properties: {
        id: "st-01",
        name: "Pos Bantarkalong",
        subDas: "Citanduy Hulu",
        kabupaten: "Kab. Tasikmalaya",
        status: "siaga",
        tma: 412,
        debit: 86.4,
        trend: "naik",
        ambangWaspada: 250,
        ambangSiaga: 350,
        updatedAt: "14:22 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.385, -7.301],
      },
      properties: {
        id: "st-02",
        name: "Pos Cihaur",
        subDas: "Cimuntur",
        kabupaten: "Kab. Ciamis",
        status: "waspada",
        tma: 287,
        debit: 54.1,
        trend: "naik",
        ambangWaspada: 240,
        ambangSiaga: 320,
        updatedAt: "14:20 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.412, -7.198],
      },
      properties: {
        id: "st-03",
        name: "Pos Cineam",
        subDas: "Ciseel",
        kabupaten: "Kab. Tasikmalaya",
        status: "normal",
        tma: 142,
        debit: 21.7,
        trend: "stabil",
        ambangWaspada: 200,
        ambangSiaga: 300,
        updatedAt: "14:15 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.541, -7.351],
      },
      properties: {
        id: "st-04",
        name: "Pos Banjar Pataruman",
        subDas: "Citanduy Tengah",
        kabupaten: "Kota Banjar",
        status: "siaga",
        tma: 312,
        debit: 78.2,
        trend: "naik",
        ambangWaspada: 220,
        ambangSiaga: 290,
        updatedAt: "14:22 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.354, -7.331],
      },
      properties: {
        id: "st-05",
        name: "Pos Ciamis Hilir",
        subDas: "Citanduy Tengah",
        kabupaten: "Kab. Ciamis",
        status: "waspada",
        tma: 268,
        debit: 48.6,
        trend: "naik",
        ambangWaspada: 230,
        ambangSiaga: 310,
        updatedAt: "14:18 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.182, -7.402],
      },
      properties: {
        id: "st-06",
        name: "Pos Kawalu",
        subDas: "Citanduy Hulu",
        kabupaten: "Kota Tasikmalaya",
        status: "normal",
        tma: 168,
        debit: 28.4,
        trend: "stabil",
        ambangWaspada: 220,
        ambangSiaga: 300,
        updatedAt: "14:10 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.681, -7.612],
      },
      properties: {
        id: "st-07",
        name: "Pos Kalipucang",
        subDas: "Citanduy Hilir",
        kabupaten: "Kab. Pangandaran",
        status: "waspada",
        tma: 245,
        debit: 45.2,
        trend: "naik",
        ambangWaspada: 200,
        ambangSiaga: 280,
        updatedAt: "14:15 WIB",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [108.752, -7.685],
      },
      properties: {
        id: "st-08",
        name: "Pos Muara Cilacap",
        subDas: "Muara Segara Anakan",
        kabupaten: "Kab. Cilacap",
        status: "normal",
        tma: 121,
        debit: 18.5,
        trend: "turun",
        ambangWaspada: 180,
        ambangSiaga: 250,
        updatedAt: "14:05 WIB",
      },
    },
  ],
};

// Batas Polygon Wilayah Sungai (DAS) Citanduy (±3.500 km²)
export const dasBoundaryGeoJSON: GeoJSON.FeatureCollection<GeoJSON.Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "Batas Hidrologis DAS Citanduy",
        luasKm2: 3500,
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [108.12, -7.15],
            [108.35, -7.12],
            [108.52, -7.18],
            [108.68, -7.28],
            [108.82, -7.42],
            [108.95, -7.58],
            [108.88, -7.72],
            [108.72, -7.76],
            [108.55, -7.65],
            [108.38, -7.58],
            [108.20, -7.52],
            [108.08, -7.38],
            [108.12, -7.15],
          ],
        ],
      },
    },
  ],
};

// Jalur Aliran Sungai Utama & Anak Sungai Citanduy
export const riverLinesGeoJSON: GeoJSON.FeatureCollection<GeoJSON.LineString> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Sungai Citanduy (Utama)", tipe: "main" },
      geometry: {
        type: "LineString",
        coordinates: [
          [108.213, -7.412], // Bantarkalong
          [108.28, -7.38],
          [108.354, -7.331], // Ciamis Hilir
          [108.45, -7.34],
          [108.541, -7.351], // Banjar
          [108.61, -7.48],
          [108.681, -7.612], // Kalipucang
          [108.752, -7.685], // Muara Cilacap
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Sungai Cimuntur (Anak Sungai)", tipe: "tributary" },
      geometry: {
        type: "LineString",
        coordinates: [
          [108.385, -7.301], // Cihaur
          [108.36, -7.32],
          [108.354, -7.331], // Sambung Citanduy
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Sungai Ciseel (Anak Sungai)", tipe: "tributary" },
      geometry: {
        type: "LineString",
        coordinates: [
          [108.412, -7.198], // Cineam
          [108.48, -7.28],
          [108.541, -7.351], // Sambung Banjar
        ],
      },
    },
  ],
};

// Bounding Box DAS Citanduy [SW, NE]
export const CITANDUY_BOUNDS: [[number, number], [number, number]] = [
  [108.05, -7.78], // Southwest [lng, lat]
  [108.95, -7.12], // Northeast [lng, lat]
];

export const CITANDUY_CENTER: [number, number] = [108.50, -7.42]; // [lng, lat]
