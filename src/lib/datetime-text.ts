/**
 * Text <-> epoch conversion for the countdown editor, using a plain
 * `YYYY-MM-DD HH:mm` format so no native date-picker dependency is needed.
 */

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** Format an epoch value as local `YYYY-MM-DD HH:mm`. */
export function formatDateTime(epochMs: number): string {
  const date = new Date(epochMs);
  const ymd = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  return `${ymd} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Parse local `YYYY-MM-DD HH:mm` (time optional) into epoch milliseconds.
 * Returns null when the text isn't a complete, valid datetime.
 */
export function parseDateTime(text: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?$/.exec(text.trim());
  if (!match) return null;

  const [, year, month, day, hour = '0', minute = '0'] = match;
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
  );

  if (Number.isNaN(date.getTime())) return null;
  if (date.getMonth() !== Number(month) - 1 || date.getDate() !== Number(day)) return null;
  return date.getTime();
}
