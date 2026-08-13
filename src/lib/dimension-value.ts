/**
 * Parsing/formatting for CSS-like dimension values, which may be a raw number of
 * pixels or a percentage string such as `"50%"`.
 */

export type DimensionValue = number | `${number}%`;

/** Render a stored dimension for display in a text input. */
export function formatDimension(value: DimensionValue | undefined): string {
  if (value === undefined) return '';
  return String(value);
}

/**
 * Parse user input into a dimension. Returns `undefined` for blank input (meaning
 * "unset") and `null` when the text isn't a valid dimension, so callers can ignore
 * intermediate keystrokes instead of clobbering the stored value.
 */
export function parseDimension(text: string): DimensionValue | undefined | null {
  const trimmed = text.trim();
  if (!trimmed) return undefined;

  if (trimmed.endsWith('%')) {
    const percent = Number(trimmed.slice(0, -1));
    if (!Number.isFinite(percent)) return null;
    return `${percent}%`;
  }

  const pixels = Number(trimmed);
  if (!Number.isFinite(pixels)) return null;
  return pixels;
}

/** Parse plain numeric input (spacing, radius, gap). Blank clears the value. */
export function parseNumber(text: string): number | undefined | null {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}
