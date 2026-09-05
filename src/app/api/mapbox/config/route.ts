import { NextResponse } from "next/server";

/**
 * Server-Side Mapbox Configuration Endpoint
 * 
 * Endpoint ini berjalan HANYA di server (Node.js / Vercel Serverless Function).
 * Dapat mengakses MAPBOX_SECRET_TOKEN secara aman tanpa mengeksposnya ke browser.
 */
export async function GET() {
  const secretToken = process.env.MAPBOX_SECRET_TOKEN || "";
  const publicToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const defaultStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/light-v11";

  // Periksa apakah secret token ada dan bukan placeholder
  const hasSecret = Boolean(
    secretToken &&
    !secretToken.includes("placeholder") &&
    secretToken.startsWith("sk.")
  );

  // Periksa apakah public token ada dan valid
  const hasPublic = Boolean(
    publicToken &&
    !publicToken.includes("placeholder") &&
    publicToken.startsWith("pk.")
  );

  // Bersihkan token dari tanda kutip tidak disengaja
  const cleanedPublic = publicToken.replace(/^["']|["']$/g, "").trim();

  return NextResponse.json(
    {
      configured: hasPublic || hasSecret,
      hasSecretToken: hasSecret,
      // Browser WebGL Mapbox memerlukan token public (pk.) dengan URL-restriction
      publicToken: cleanedPublic,
      defaultStyle,
      serverTimestamp: new Date().toISOString(),
      // Batas wilayah DAS Citanduy [SW, NE]
      bounds: [
        [108.05, -7.78],
        [108.95, -7.12],
      ],
      center: [108.5, -7.42],
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
