/** Date/time formatting for the event widgets. */

/** Format an epoch value as a date, optionally in a specific IANA zone. */
export function formatEventDate(
  epochMs: number,
  dateStyle: 'short' | 'medium' | 'long',
  timeZone?: string,
): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle,
      ...(timeZone ? { timeZone } : {}),
    }).format(new Date(epochMs));
  } catch {
    // An invalid IANA name makes Intl throw; fall back to the viewer's own zone.
    return new Intl.DateTimeFormat(undefined, { dateStyle }).format(new Date(epochMs));
  }
}

/** Format an epoch value as a time of day. */
export function formatEventTime(
  epochMs: number,
  use24Hour: boolean,
  timeZone?: string,
): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !use24Hour,
      ...(timeZone ? { timeZone } : {}),
    }).format(new Date(epochMs));
  } catch {
    return new Intl.DateTimeFormat(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !use24Hour,
    }).format(new Date(epochMs));
  }
}

/** The viewer's own IANA zone, used when a widget leaves `timeZone` blank. */
export function resolvedTimeZone(timeZone: string): string {
  if (timeZone.trim()) return timeZone.trim();
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/** Short GMT offset label (e.g. `GMT+5:30`) for a zone. */
export function timeZoneOffsetLabel(timeZone: string): string {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
    }).formatToParts(new Date());
    return parts.find((part) => part.type === 'timeZoneName')?.value ?? '';
  } catch {
    return '';
  }
}
