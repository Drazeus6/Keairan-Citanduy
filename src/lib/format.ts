// =========================================================
// Indonesian Number & Currency Formatting
// Format: titik (.) = thousand separator, koma (,) = decimal
// =========================================================

/**
 * Format currency in Indonesian style.
 * Examples:
 *   formatRp(500000) -> "Rp 500rb"
 *   formatRp(1500000) -> "Rp 1,5jt"
 *   formatRp(75000) -> "Rp 75.000"
 */
export function formatRp(value: number): string {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    return `Rp ${formatIdDecimal(jt)}jt`;
  }
  if (value >= 1_000) {
    const rb = value / 1_000;
    if (rb % 1 === 0) {
      return `Rp ${formatId(rb)}rb`;
    }
    return `Rp ${formatIdDecimal(rb)}rb`;
  }
  return `Rp ${formatId(value)}`;
}

/**
 * Format a number using Indonesian separators.
 * 12345 -> "12.345"
 */
export function formatId(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Format a number using Indonesian separators + decimal comma.
 * 12.5 -> "12,5"
 */
export function formatIdDecimal(value: number): string {
  const str = value.toFixed(1);
  const parts = str.split(".");
  const intPart = parts[0];
  const decPart = parts[1];
  const formattedInt = intPart.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".");
  return `${formattedInt},${decPart}`;
}

/**
 * Format a discharge/debit value with m³/s unit.
 */
export function formatDebit(value: number): string {
  return `${formatIdDecimal(value)} m³/s`;
}

/**
 * Format a TMA (water level) value with cm unit.
 */
export function formatTma(value: number): string {
  return `${formatId(value)} cm`;
}

/**
 * Format a coordinate pair as "LAT LONG".
 */
export function formatCoord(lat: number, lng: number): string {
  const latStr = `${Math.abs(lat).toFixed(3)}° ${lat >= 0 ? "LU" : "LS"}`;
  const lngStr = `${Math.abs(lng).toFixed(3)}° ${lng >= 0 ? "BT" : "BB"}`;
  return `${latStr} · ${lngStr}`;
}
