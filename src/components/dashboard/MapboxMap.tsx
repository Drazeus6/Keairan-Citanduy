"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  stationsGeoJSON,
  dasBoundaryGeoJSON,
  riverLinesGeoJSON,
  CITANDUY_BOUNDS,
  CITANDUY_CENTER,
  type StationFeatureProperties,
} from "@/data/das-citanduy-spatial";
import type { FloodStatus } from "@/types";

const STATUS_COLOR: Record<FloodStatus, string> = {
  normal: "#45B36E",
  waspada: "#F1C055",
  siaga: "#D8472C",
};

const STATUS_LABEL: Record<FloodStatus, string> = {
  normal: "Normal",
  waspada: "Waspada",
  siaga: "Siaga",
};

/**
 * Bersihkan token dari karakter-karakter yang sering nyangkut
 * ketika developer menyalin dari dashboard Mapbox:
 * - tanda kutip ganda/tunggal
 * - spasi / newline di awal atau akhir
 * - awalan pk./PK. (jika lupa ditulis)
 */
function cleanToken(raw: string): string {
  let t = (raw || "").trim();
  if (
    (t.startsWith("\"") && t.endsWith("\"")) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }
  return t;
}

export interface StyleOption {
  key: string;
  name: string;
  badge: string;
  url: string;
  desc: string;
}

export const MAP_STYLES: StyleOption[] = [
  {
    key: "light",
    name: "Light Editorial",
    badge: "Rekomendasi",
    url: "mapbox://styles/mapbox/light-v11",
    desc: "Nuansa kertas hangat, kontras tinggi untuk data hidrologi ala National Geographic",
  },
  {
    key: "outdoors",
    name: "Topografi & Bukit",
    badge: "Elevasi",
    url: "mapbox://styles/mapbox/outdoors-v12",
    desc: "Menampilkan kontur ketinggian perbukitan Priangan Timur & hulu sungai",
  },
  {
    key: "satellite",
    name: "Citra Satelit",
    badge: "Foto Udara",
    url: "mapbox://styles/mapbox/satellite-streets-v12",
    desc: "Foto udara resolusi tinggi pesisir Cilacap & muara Pangandaran",
  },
  {
    key: "dark",
    name: "Dark Nocturnal",
    badge: "Kontras",
    url: "mapbox://styles/mapbox/dark-v11",
    desc: "Latar gelap pekat, garis sungai cyan dan marker siaga bercahaya",
  },
];

export interface MapboxMapProps {
  selectedStationId?: string;
  onStationSelect?: (props: StationFeatureProperties) => void;
}

export function MapboxMap({ selectedStationId, onStationSelect }: MapboxMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [tokenMissing, setTokenMissing] = useState(false);
  const [ready, setReady] = useState(false);
  const [currentStyle, setCurrentStyle] = useState<string>("light");
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  // Function to inject custom vector layers (boundary + rivers)
  const injectLayers = (map: mapboxgl.Map) => {
    // 1. DAS Boundary
    if (!map.getSource("das-boundary")) {
      map.addSource("das-boundary", {
        type: "geojson",
        data: dasBoundaryGeoJSON as unknown as GeoJSON.FeatureCollection,
      });

      map.addLayer({
        id: "das-boundary-fill",
        type: "fill",
        source: "das-boundary",
        paint: {
          "fill-color": "#F5C842",
          "fill-opacity": 0.08,
        },
      });

      map.addLayer({
        id: "das-boundary-line",
        type: "line",
        source: "das-boundary",
        paint: {
          "line-color": "#F5C842",
          "line-width": 2.5,
          "line-dasharray": [3, 3],
        },
      });
    }

    // 2. River Lines
    if (!map.getSource("river-lines")) {
      map.addSource("river-lines", {
        type: "geojson",
        data: riverLinesGeoJSON as unknown as GeoJSON.FeatureCollection,
      });

      map.addLayer({
        id: "river-main-glow",
        type: "line",
        source: "river-lines",
        filter: ["==", ["get", "tipe"], "main"],
        paint: {
          "line-color": "#386683",
          "line-width": 10,
          "line-opacity": 0.25,
          "line-blur": 3,
        },
      });

      map.addLayer({
        id: "river-main",
        type: "line",
        source: "river-lines",
        filter: ["==", ["get", "tipe"], "main"],
        paint: {
          "line-color": "#386683",
          "line-width": 4,
          "line-opacity": 0.95,
        },
      });

      map.addLayer({
        id: "river-tributary",
        type: "line",
        source: "river-lines",
        filter: ["==", ["get", "tipe"], "tributary"],
        paint: {
          "line-color": "#5fb6c9",
          "line-width": 2.5,
          "line-opacity": 0.85,
        },
      });
    }
  };

  // Function to add Native WebGL Circle Layers (drift-proof at any zoom level)
  const injectStationLayers = (map: mapboxgl.Map) => {
    if (!map.getSource("stations-source")) {
      map.addSource("stations-source", {
        type: "geojson",
        data: stationsGeoJSON as unknown as GeoJSON.FeatureCollection,
      });

      // 1. Siaga pulse ring (outer glowing red ring) - native WebGL circle
      map.addLayer({
        id: "stations-pulse",
        type: "circle",
        source: "stations-source",
        filter: ["==", ["get", "status"], "siaga"],
        paint: {
          "circle-radius": 18,
          "circle-color": "#D8472C",
          "circle-opacity": 0.35,
          "circle-stroke-width": 1.5,
          "circle-stroke-color": "#D8472C",
          "circle-stroke-opacity": 0.6,
        },
      });

      // 2. Selected highlight ring (yellow accent for active station)
      map.addLayer({
        id: "stations-selected-ring",
        type: "circle",
        source: "stations-source",
        filter: ["==", ["get", "id"], "__none__"],
        paint: {
          "circle-radius": 14,
          "circle-color": "transparent",
          "circle-stroke-width": 3,
          "circle-stroke-color": "#F5C842",
          "circle-stroke-opacity": 0.95,
        },
      });

      // 3. Station point (solid dot with white border) - WebGL = drift-proof
      map.addLayer({
        id: "stations-circle",
        type: "circle",
        source: "stations-source",
        paint: {
          "circle-radius": 7,
          "circle-color": [
            "match",
            ["get", "status"],
            "siaga", "#D8472C",
            "waspada", "#F1C055",
            "#45B36E", // normal
          ],
          "circle-stroke-width": 2.5,
          "circle-stroke-color": "#ffffff",
        },
      });

      // Click handler: open popup + sync selection
      map.on("click", "stations-circle", (e) => {
        const feature = e.features?.[0];
        if (!feature) return;
        const props = feature.properties as unknown as StationFeatureProperties;
        const coords = (feature.geometry as GeoJSON.Point).coordinates as [number, number];

        onStationSelect?.(props);

        // Remove previous popup if any
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }

        // Open editorial popup at click coords
        popupRef.current = new mapboxgl.Popup({
          offset: 14,
          closeButton: false,
          maxWidth: "260px",
          className: "kc-popup",
        })
          .setLngLat(coords)
          .setHTML(`
            <div class="kc-popup-inner">
              <div class="kc-popup-stripe kc-popup-stripe-${props.status}"></div>
              <div class="kc-popup-body">
                <div class="kc-popup-status kc-popup-status-${props.status}">
                  <span class="kc-popup-blink"></span>${STATUS_LABEL[props.status]}
                </div>
                <div class="kc-popup-title">${props.name}</div>
                <div class="kc-popup-sub">${props.subDas} · ${props.kabupaten}</div>
                <div class="kc-popup-data">
                  <div class="kc-popup-row">
                    <span class="kc-popup-label">TMA</span>
                    <span class="kc-popup-value">${props.tma} cm</span>
                  </div>
                  <div class="kc-popup-row">
                    <span class="kc-popup-label">Debit Aliran</span>
                    <span class="kc-popup-value">${Number(props.debit).toFixed(1)} m³/s</span>
                  </div>
                  <div class="kc-popup-row">
                    <span class="kc-popup-label">Ambang Siaga</span>
                    <span class="kc-popup-value">${props.ambangSiaga} cm</span>
                  </div>
                </div>
                <div class="kc-popup-footer">↓ Detail lengkap di panel bawah</div>
              </div>
            </div>
          `)
          .addTo(map);

        map.flyTo({
          center: coords,
          zoom: 12,
          duration: 1000,
          essential: true,
        });
      });

      // Hover handlers: change cursor
      map.on("mouseenter", "stations-circle", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "stations-circle", () => {
        map.getCanvas().style.cursor = "";
      });
    }
  };

  // Init map once
  useEffect(() => {
    // Resolve token from .env.local only
    const rawEnvToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
    const token = cleanToken(rawEnvToken);

    const isPlaceholder =
      !token ||
      token.includes("placeholder") ||
      token === "your_mapbox_public_token_here" ||
      !token.startsWith("pk.");

    if (isPlaceholder) {
      setTokenMissing(true);
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-console
        console.warn(
          "[Mapbox] Token tidak terbaca atau placeholder. Env token (cleaned):",
          token.slice(0, 12) + "...",
        );
      }
      return;
    }
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    // Detect initial style from environment or default to Light v11
    const envStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE || "";
    const matched = MAP_STYLES.find((s) => s.url === envStyle);
    const initialKey = matched ? matched.key : "light";
    setCurrentStyle(initialKey);

    const initialUrl = matched ? matched.url : "mapbox://styles/mapbox/light-v11";

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: initialUrl,
      center: CITANDUY_CENTER,
      zoom: 9.2,
      pitch: 0,
      bearing: 0,
      minZoom: 7,
      maxZoom: 18,
      attributionControl: true,
      cooperativeGestures: false,
    });

    mapRef.current = map;

    // Toolbar peta lengkap (default Mapbox)
    map.addControl(new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: false }), "top-right");
    map.addControl(new mapboxgl.ScaleControl({ unit: "metric", maxWidth: 120 }), "bottom-left");

    // Event listener whenever a style loads (initial & on switch)
    map.on("style.load", () => {
      injectLayers(map);
      injectStationLayers(map);
      setReady(true);
    });

    map.on("load", () => {
      map.fitBounds(CITANDUY_BOUNDS, {
        padding: { top: 40, bottom: 40, left: 40, right: 40 },
        duration: 0,
      });
    });

    return () => {
      if (popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Siaga Pulse animation via requestAnimationFrame (native WebGL paint update)
  useEffect(() => {
    if (!ready || !mapRef.current) return;
    let frame = 0;
    let rafId: number;

    const animatePulse = () => {
      frame = (frame + 1) % 80;
      const progress = frame / 80; // 0..1
      const radius = 10 + progress * 16; // grows from 10 to 26px
      const opacity = 0.55 * (1 - progress); // fades out

      if (mapRef.current && mapRef.current.getLayer("stations-pulse")) {
        try {
          mapRef.current.setPaintProperty("stations-pulse", "circle-radius", radius);
          mapRef.current.setPaintProperty("stations-pulse", "circle-opacity", opacity);
        } catch {
          // Ignore transient frame errors during style changes
        }
      }
      rafId = requestAnimationFrame(animatePulse);
    };

    rafId = requestAnimationFrame(animatePulse);
    return () => cancelAnimationFrame(rafId);
  }, [ready]);

  // Handle style switch
  const handleStyleChange = (styleKey: string) => {
    const selected = MAP_STYLES.find((s) => s.key === styleKey);
    if (!selected || !mapRef.current) return;

    setCurrentStyle(selected.key);
    setStyleDropdownOpen(false);

    // setStyle in Mapbox GL preserves center & zoom
    mapRef.current.setStyle(selected.url);
  };

  // Sync highlight selected station via WebGL layer filter
  useEffect(() => {
    if (!ready || !mapRef.current) return;

    if (mapRef.current.getLayer("stations-selected-ring")) {
      mapRef.current.setFilter("stations-selected-ring", [
        "==",
        ["get", "id"],
        selectedStationId || "__none__",
      ]);
    }

    if (selectedStationId) {
      const feature = stationsGeoJSON.features.find((f) => f.properties.id === selectedStationId);
      if (feature && mapRef.current) {
        mapRef.current.flyTo({
          center: feature.geometry.coordinates as [number, number],
          zoom: 11.5,
          duration: 1200,
          essential: true,
        });
      }
    }
  }, [selectedStationId, ready]);

  if (tokenMissing) {
    return (
      <div
        className="kc-map-fallback"
        style={{
          background: "var(--surface)",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius)",
          padding: "clamp(28px, 3vw, 40px)",
          color: "var(--fg)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <span
            className="eyebrow"
            style={{
              display: "inline-block",
              background: "var(--paper-dark)",
              color: "var(--accent)",
              padding: "4px 10px",
              borderRadius: 4,
              marginBottom: 12,
            }}
          >
            PETA MAPBOX · TOKEN BELUM TERBACA
          </span>
          <h3 className="display" style={{ fontSize: 22, margin: "8px 0 12px" }}>
            Token Mapbox belum dikonfigurasi.
          </h3>
          <p style={{ fontSize: 14, color: "var(--muted)", margin: "0 0 18px", lineHeight: 1.55 }}>
            Peta interaktif DAS Citanduy memerlukan Access Token publik dari akun Mapbox.
            Tambahkan token Anda pada file konfigurasi, lalu restart server.
          </p>

          <div
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "14px 16px",
              textAlign: "left",
              fontSize: 12,
              lineHeight: 1.65,
              color: "var(--fg)",
              margin: "0 auto",
              maxWidth: 480,
            }}
          >
            <strong style={{ display: "block", marginBottom: 6, fontSize: 12 }}>Cara Konfigurasi:</strong>
            <ol style={{ paddingLeft: 18, margin: 0 }}>
              <li>
                Buka file <code className="mono">.env.local</code> di root proyek.
              </li>
              <li>
                Ganti <code className="mono">NEXT_PUBLIC_MAPBOX_TOKEN</code> dengan
                token publik <code className="mono">pk....</code> akun Mapbox Anda.
              </li>
              <li>
                <strong>Matikan</strong> dev server (<kbd>Ctrl + C</kbd> di terminal), lalu{" "}
                <strong>jalankan ulang</strong> dengan <code className="mono">npm run dev</code>.
              </li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  const activeStyleObj = MAP_STYLES.find((s) => s.key === currentStyle) || MAP_STYLES[0];

  return (
    <div className="kc-map-wrap">
      {/* Floating Style Switcher */}
      <div className="kc-style-switcher">
        <button
          type="button"
          className="kc-style-btn"
          onClick={() => setStyleDropdownOpen(!styleDropdownOpen)}
          aria-expanded={styleDropdownOpen}
          aria-label="Pilih Gaya Peta"
        >
          <span className="kc-style-icon">🗺️</span>
          <span className="kc-style-name">{activeStyleObj.name}</span>
          <span className="kc-style-caret">{styleDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {styleDropdownOpen && (
          <div className="kc-style-menu">
            <div className="kc-style-menu-header">GAYA PETA MAPBOX</div>
            {MAP_STYLES.map((style) => {
              const isSelected = style.key === currentStyle;
              return (
                <button
                  key={style.key}
                  type="button"
                  className={`kc-style-option ${isSelected ? "active" : ""}`}
                  onClick={() => handleStyleChange(style.key)}
                >
                  <div className="kc-style-opt-top">
                    <strong>{style.name}</strong>
                    <span className="kc-style-badge">{style.badge}</span>
                  </div>
                  <small>{style.desc}</small>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div ref={containerRef} className="kc-map" />

      <style jsx global>{`
        .kc-map-wrap {
          position: relative;
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
          background: var(--paper-dark);
        }
        .kc-map {
          width: 100%;
          height: clamp(380px, 52vw, 560px);
          min-height: 380px;
        }

        /* ===== Style Switcher Control ===== */
        .kc-style-switcher {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 10;
        }
        .kc-style-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 7px 14px;
          font-family: var(--body);
          font-size: 12px;
          font-weight: 600;
          color: var(--fg);
          box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .kc-style-btn:hover {
          background: var(--surface);
          border-color: var(--fg);
        }
        .kc-style-icon {
          font-size: 13px;
        }
        .kc-style-name {
          font-family: var(--mono);
          letter-spacing: -0.01em;
        }
        .kc-style-caret {
          font-size: 9px;
          color: var(--muted);
        }

        .kc-style-menu {
          position: absolute;
          top: 42px;
          left: 0;
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: 0 18px 48px -12px rgba(0, 0, 0, 0.35);
          width: 280px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          animation: kcFadeIn 0.18s ease-out;
        }
        .kc-style-menu-header {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--muted);
          padding: 6px 10px 4px;
        }
        .kc-style-option {
          text-align: left;
          padding: 8px 10px;
          border-radius: 6px;
          background: transparent;
          border: 1px solid transparent;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .kc-style-option:hover {
          background: var(--surface);
          border-color: var(--border);
        }
        .kc-style-option.active {
          background: var(--surface);
          border-color: var(--accent);
        }
        .kc-style-opt-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--fg);
        }
        .kc-style-badge {
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
          background: var(--paper-dark);
          color: var(--accent);
          text-transform: uppercase;
        }
        .kc-style-option.active .kc-style-badge {
          background: var(--accent);
          color: var(--accent-ink);
        }
        .kc-style-option small {
          font-size: 11px;
          color: var(--muted);
          line-height: 1.35;
        }
        @keyframes kcFadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ===== Custom Marker (native WebGL circle layers) ===== */
        /* Native circle layers are rendered directly on the WebGL canvas and
           stay perfectly locked to their geographic coordinates at any zoom
           level, so no DOM/CSS adjustments are needed here. */

        /* ===== Mapbox Popup Styling (High Contrast on All Themes) ===== */
        .mapboxgl-popup-content.kc-popup .mapboxgl-popup-content,
        .kc-popup .mapboxgl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 0 !important;
        }
        .mapboxgl-popup.kc-popup {
          z-index: 50;
        }
        .mapboxgl-popup.kc-popup .mapboxgl-popup-tip {
          /* Tip pointer: warm paper + dark border so it stays visible on any map tone */
          border-top-color: #FBF9F3 !important;
          border-bottom-color: #FBF9F3 !important;
        }
        .mapboxgl-popup.kc-popup .mapboxgl-popup-tip::after {
          /* Add a subtle dark ring to the tip for satellite maps */
          box-shadow: inset 0 0 0 1px rgba(31, 34, 45, 0.3);
        }
        .mapboxgl-popup-content {
          /* Layered shadow + outer dark ring ensures readability on light AND dark maps */
          background: #FBF9F3 !important;
          border-radius: 12px !important;
          padding: 0 !important;
          box-shadow:
            0 0 0 1.5px #1F222D,
            0 0 0 3px #FBF9F3,
            0 20px 48px -10px rgba(0, 0, 0, 0.55),
            0 4px 12px rgba(0, 0, 0, 0.25) !important;
          border: 1px solid #FBF9F3 !important;
          outline: 1px solid rgba(31, 34, 45, 0.25);
          overflow: hidden;
          font-family: var(--body) !important;
          width: 250px !important;
          max-width: 260px !important;
          animation: kcPopupIn 0.18s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        @keyframes kcPopupIn {
          from { opacity: 0; transform: translateY(-4px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .kc-popup-inner { position: relative; padding: 0; width: 100%; box-sizing: border-box; }

        /* === Top status stripe === */
        .kc-popup-stripe {
          height: 4px;
          width: 100%;
        }
        .kc-popup-stripe-normal  { background: ${STATUS_COLOR.normal}; }
        .kc-popup-stripe-waspada { background: ${STATUS_COLOR.waspada}; }
        .kc-popup-stripe-siaga   { background: ${STATUS_COLOR.siaga}; }

        /* === Inner body padding === */
        .kc-popup-body {
          padding: 12px 14px 10px;
          box-sizing: border-box;
          background: #FBF9F3;
        }

        /* === Status pill === */
        .kc-popup-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 3px 8px;
          border-radius: 999px;
          margin-bottom: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }
        .kc-popup-status-normal  { background: ${STATUS_COLOR.normal}; color: #fff; }
        .kc-popup-status-waspada { background: ${STATUS_COLOR.waspada}; color: #1a1a1a; }
        .kc-popup-status-siaga   { background: ${STATUS_COLOR.siaga}; color: #fff; }

        .kc-popup-blink {
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          animation: kcBlinkPulse 1.2s infinite ease-in-out;
        }
        @keyframes kcBlinkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        /* === Title & Subtitle === */
        .kc-popup-title {
          font-family: var(--display);
          font-weight: 700;
          font-size: 17px;
          color: #1F222D;
          margin-bottom: 2px;
          line-height: 1.15;
          letter-spacing: -0.015em;
          word-break: break-word;
        }
        .kc-popup-sub {
          font-size: 11px;
          color: #6A6E83;
          margin-bottom: 10px;
          line-height: 1.35;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* === Data rows === */
        .kc-popup-data {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 8px;
          border-top: 1px solid #DED4C1;
        }
        .kc-popup-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          background: rgba(31, 34, 45, 0.04);
          padding: 5px 8px;
          border-radius: 4px;
          border: 1px solid rgba(31, 34, 45, 0.07);
          box-sizing: border-box;
        }
        .kc-popup-label {
          font-family: var(--mono);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #6A6E83;
          font-weight: 600;
          flex-shrink: 0;
        }
        .kc-popup-value {
          font-family: var(--mono);
          font-weight: 700;
          color: #1F222D;
          font-size: 12px;
          text-align: right;
          flex-shrink: 0;
        }

        /* === Footer hint === */
        .kc-popup-footer {
          margin-top: 8px;
          padding-top: 6px;
          border-top: 1px dashed #DED4C1;
          font-size: 9px;
          color: #6A6E83;
          text-align: center;
          font-family: var(--mono);
          letter-spacing: 0.03em;
        }

        /* === Closed marker (so it shows as light on all themes) === */
        .mapboxgl-popup-close-button {
          background: transparent !important;
          color: #1F222D !important;
          font-size: 18px !important;
          padding: 4px 8px !important;
        }

        .mapboxgl-ctrl-attrib {
          background: rgba(255, 255, 255, 0.75) !important;
          font-size: 10px !important;
        }
        @media (max-width: 600px) {
          .kc-map {
            height: clamp(320px, 60vw, 480px);
          }
          .kc-style-menu {
            width: 240px;
          }
        }
      `}</style>
    </div>
  );
}
