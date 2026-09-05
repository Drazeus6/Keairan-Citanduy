import { NextResponse } from "next/server";

/**
 * Server-Side Mapbox Style Proxy
 * 
 * Endpoint ini melakukan proxy terhadap style.json Mapbox menggunakan SECRET TOKEN
 * yang tersimpan aman di server (tidak pernah dibundle ke client JS).
 * 
 * Browser hanya melihat style JSON yang sudah diproses, tanpa pernah
 * menyentuh token rahasia Mapbox.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const styleUrl = searchParams.get("style") || process.env.NEXT_PUBLIC_MAPBOX_STYLE || "mapbox://styles/mapbox/light-v11";

  const secretToken = process.env.MAPBOX_SECRET_TOKEN || "";
  const cleanedSecret = secretToken.replace(/^["']|["']$/g, "").trim();
  const hasSecret =
    Boolean(cleanedSecret) && !cleanedSecret.includes("placeholder") && cleanedSecret.startsWith("sk.");

  // Jika tidak ada secret token valid, arahkan browser ke public URL endpoint
  if (!hasSecret) {
    // Return URL langsung agar MapboxMap.tsx pakai mode public token fallback
    return NextResponse.json({
      ok: false,
      reason: "MAPBOX_SECRET_TOKEN belum dikonfigurasi atau placeholder.",
      fallbackStyleUrl: styleUrl, // Browser akan menggunakan public token
    });
  }

  try {
    // Ambil style JSON dari Mapbox API menggunakan secret token (server-side)
    const mapboxUrl = `https://api.mapbox.com/styles/v1/${styleUrl.replace(
      "mapbox://styles/",
      ""
    )}?access_token=${encodeURIComponent(cleanedSecret)}`;

    const response = await fetch(mapboxUrl, {
      // Cache 1 jam di edge Vercel CDN
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, reason: `Mapbox API returned ${response.status}` },
        { status: 502 }
      );
    }

    const styleJson = await response.json();

    // Catatan penting: Kita mengirim style JSON ke browser, BUKAN token rahasianya.
    // Browser akan menggunakan token publik (URL-restricted) yang ada di env
    // untuk otentikasi tile fetching, sementara style JSON-nya sudah di-cache.
    return NextResponse.json({
      ok: true,
      proxiedStyle: styleJson,
      tokenSource: "secret-via-proxy",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        reason: "Gagal mem-proxy style Mapbox.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
